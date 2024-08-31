import type { DeployContract, BaseFunction} from './contract';
import { DeployBuilder } from "./contract";

import type {  SharedAllOptions, Governance } from '../shared/1-option-all';
import {  defaults } from '../shared/1-option-all';

import { defaults as infoDefaults } from "./set-info";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

function withDeployDefaults(opts: SharedAllOptions): Required<SharedAllOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeployAllStepOne(opts: SharedAllOptions = defaults): string {
  return printDeployContract(buildDeployAllStepOne(opts));
}

export function buildDeployAllStepOne(opts: SharedAllOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = getDeployFunction();
  c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);`, fn);
  
  setSubDeployment(c, fn, allOpts.governance);

  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {

    const Script = {
        name: 'Script',
        path: '@redprint-forge-std/Script.sol',
    };
    c.addParent(Script, []);
      
    const IDeployer = {
        name: 'IDeployer',
        path: '@redprint-deploy/deployer/DeployerFunctions.sol',
    };
    c.addModule(IDeployer);
    c.addVariable(`IDeployer deployerProcedue;`);

}

function setSubDeployment(c: DeployBuilder, fn: BaseFunction, gov: Governance) {

    switch (gov) {
      case 'safe-multisig': {

        const DeploySafeProxyScript = {
            name: 'DeploySafeProxyScript',
            path: '@script/100_DeploySafeProxyScript.s.sol',
        };
        c.addModule(DeploySafeProxyScript);

        c.addFunctionCode(`DeploySafeProxyScript safeDeployments = new DeploySafeProxyScript();
        //1) set up Safe Multisig
        safeDeployments.deploy();`, fn);

        break;
      }
      case 'governor': {

        const DeployGovernerScript = {
            name: 'DeployGovernerScript',
            path: '@script/100_DeployGovernerScript.s.sol',
        };

        c.addModule(DeployGovernerScript);
        c.addFunctionCode(`DeployGovernerScript govDeployments = new DeployGovernerScript();
        //1) set up Governer
        govDeployments.deploy();`, fn);
        break;
      }
    }
  }

function getDeployFunction() {
  const fn = {
    name: 'run',
    args: [],
    returns: [] , 
    kind: 'public' as const,
  };

  return fn;
}
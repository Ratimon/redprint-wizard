import type { DeployContract, BaseFunction} from '../contract';
import { DeployBuilder } from "../contract";

import type {  SharedStepOneAllOptions, Governance } from '../../shared/1-governance/option-all';
import {  defaults } from '../../shared/1-governance/option-all';

import { defaults as infoDefaults } from "../../shared/set-info";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

function withDeployDefaults(opts: SharedStepOneAllOptions): Required<SharedStepOneAllOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeployStepOneAll(opts: SharedStepOneAllOptions = defaults): string {
  return printDeployContract(buildDeployStepOneAll(opts));
}

export function buildDeployStepOneAll(opts: SharedStepOneAllOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = getDeployFunction();
  
  setSafeDeployment(c, fn, allOpts.governance);

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
        path: '@redprint-deploy/deployer/DeployScript.sol',
    };
    c.addImportOnly(IDeployer);
    const getDeployer = {
      name: 'getDeployer',
      path: '@redprint-deploy/deployer/DeployScript.sol',
    };
    c.addImportOnly(getDeployer);

    c.addVariable(`IDeployer deployerProcedue;`);

}

function setSafeDeployment(c: DeployBuilder, fn: BaseFunction, gov: Governance) {

    switch (gov) {
      case 'safe-multisig': {

        const DeploySafeProxyScript = {
            name: 'DeploySafeProxyScript',
            path: '@scripts/101_DeploySafeProxyScript.s.sol',
        };
        c.addImportOnly(DeploySafeProxyScript);

        c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);
          
        DeploySafeProxyScript safeDeployments = new DeploySafeProxyScript();
        //1) set up Safe Multisig
        safeDeployments.deploy();`, fn);

        break;
      }
      case 'governor': {

        const DeployGovernerScript = {
            name: 'DeployGovernerScript',
            path: '@scripts/100_DeployGovernerScript.s.sol',
        };

        c.addImportOnly(DeployGovernerScript);
        c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);
        
        DeployGovernerScript govDeployments = new DeployGovernerScript();
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
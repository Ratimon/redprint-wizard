import type { DeployContract, BaseFunction} from '../contract';
import { DeployBuilder } from "../contract";

import type {  SharedStepFourAllOptions, Governance } from '../../shared/4-opchain/option-all';
import {  defaults } from '../../shared/4-opchain/option-all';

import { defaults as infoDefaults } from "../set-info";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

function withDeployDefaults(opts: SharedStepFourAllOptions): Required<SharedStepFourAllOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeployStepFourAll(opts: SharedStepFourAllOptions = defaults): string {
  return printDeployContract(buildDeployStepFourAll(opts));
}

export function buildDeployStepFourAll(opts: SharedStepFourAllOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = getDeployFunction();
  
  setGovernanceDeployment(c, fn, allOpts.governance);
  setSuperchainDeployment(c, fn);
  setOpDeployment(c, fn);

  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {

    const Script = {
        name: 'Script',
        path: '@redprint-forge-std/Script.sol',
    };
    c.addParent(Script, []);

}

function setGovernanceDeployment(c: DeployBuilder, fn: BaseFunction, gov: Governance) {

    switch (gov) {
      case 'safe-multisig': {

        const DeploySafeProxyScript = {
            name: 'DeploySafeProxyScript',
            path: '@script/101_DeploySafeProxyScript.s.sol',
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

function setSuperchainDeployment(c: DeployBuilder, fn: BaseFunction) {

  const SetupSuperchainScript = {
      name: 'SetupSuperchainScript',
      path: '@script/200_SetupSuperchain.s.sol',
  };
  c.addModule(SetupSuperchainScript);


  c.addFunctionCode(`SetupSuperchainScript superchainSetups = new SetupSuperchainScript();
        superchainSetups.run();`, fn);

}


function setOpDeployment(c: DeployBuilder, fn: BaseFunction) {

  const SetupOpchainScript = {
      name: 'SetupOpchainScript',
      path: '@script/400_SetupOpchain.s.sol',
  };
  c.addModule(SetupOpchainScript);


  c.addFunctionCode(`SetupOpchainScript opchainSetups = new SetupOpchainScript();
        opchainSetups.run();`, fn);
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
import type { DeployContract, BaseFunction} from './contract';
import { DeployBuilder } from "./contract";

import type {  SharedAllOptions } from '../shared/1-all-option';
import {  defaults } from '../shared/1-all-option';

import { defaults as infoDefaults } from "./set-info";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";


function withDeployDefaults(opts: SharedAllOptions): Required<SharedAllOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
    // ...withCommonDefaults(opts)
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


}


function getDeployFunction() {
  const fn = {
    name: 'deploy',
    args: [],
    returns: ['SafeProxyFactory safeProxyFactory_', 'Safe safeSingleton_, SafeProxy safeProxy_' ] , 
    kind: 'external' as const,
  };

  return fn;
}
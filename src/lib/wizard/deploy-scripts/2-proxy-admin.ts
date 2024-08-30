import type { DeployContract, BaseFunction} from './contract';
import { DeployBuilder } from "./contract";

import type { SharedProxyAdminOptions } from '../shared/2-option-proxy-admin';
import { withCommonDefaults, defaults } from "../shared/2-option-proxy-admin";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

function withDeployDefaults(opts: SharedProxyAdminOptions): Required<SharedProxyAdminOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployProxyAdmin(opts: SharedProxyAdminOptions = defaults): string {
  return printDeployContract(buildDeployProxyAdmin(opts));
}

export function buildDeployProxyAdmin(opts: SharedProxyAdminOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = getDeployFunction();

  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {
  const DeployFunctions = {
    name: 'DeployerFunctions',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addLibrary(DeployFunctions, `IDeployer`);
  const IDeployer = {
    name: 'IDeployer',
    path: '@redprint-deploy/deployer/DeployerFunctions.sol',
  };
  c.addModule(IDeployer);

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-deploy/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);

  const AddressManager = {
    name: 'AddressManager',
    path: '@redprint-core/legacy/AddressManager.sol',
  };
  c.addModule(AddressManager);

  const fn : BaseFunction = getDeployFunction();
  c.addFunctionCode(`return AddressManager(deployer.deploy_AddressManager("AddressManager"));`, fn);

}

function getDeployFunction() {
  const fn = {
    name: 'deploy',
    args: [],
    returns: ['AddressManager' ] , 
    kind: 'external' as const,
  };

  return fn;
}
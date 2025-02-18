import type { DeployContract, BaseFunction} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedAddressManagerOptions } from '../../shared/2-superchain/1A-option-address-manager';
import { withCommonDefaults, defaults } from "../../shared/2-superchain/1A-option-address-manager";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

function withDeployDefaults(opts: SharedAddressManagerOptions): Required<SharedAddressManagerOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeployAddressManager(opts: SharedAddressManagerOptions = defaults): string {
  return printDeployContract(buildDeployAddressManager(opts));
}

export function buildDeployAddressManager(opts: SharedAddressManagerOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);

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
  c.addImportOnly(IDeployer);

  const DeployScript = {
    name: 'DeployScript',
    path: '@redprint-deploy/deployer/DeployScript.sol',
  };
  c.addParent(DeployScript, []);

  const AddressManager = {
    name: 'AddressManager',
    path: '@redprint-core/legacy/AddressManager.sol',
  };
  c.addImportOnly(AddressManager);

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
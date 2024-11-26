import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedTransferAddressManagerOwnershipOptions } from '../../shared/4-opchain-proxies/1L-option-transfer-address-manager-ownership';
import { defaults as commonDefaults } from '../../shared/4-opchain-proxies/1L-option-transfer-address-manager-ownership';

import { defaults as infoDefaults } from "../set-info";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedTransferAddressManagerOwnershipOptions): Required<SharedTransferAddressManagerOwnershipOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printTransferAddressManagerOwnership(opts: SharedTransferAddressManagerOwnershipOptions = commonDefaults): string {
  return printDeployContract(buildTransferAddressManagerOwnership(opts));
}

export function buildTransferAddressManagerOwnership(opts: SharedTransferAddressManagerOwnershipOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  
  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {

  const Script = {
      name: 'Script',
      path: '@redprint-forge-std/Script.sol',
  };
  c.addParent(Script, []);

  const console = {
    name: 'console',
    path: '@redprint-forge-std/console.sol',
  };
  c.addModule(console);

  const Vm = {
    name: 'Vm',
    path: '@redprint-forge-std/Vm.sol',
  };
  c.addModule(Vm);
  const VmSafe = {
    name: 'VmSafe',
    path: '@redprint-forge-std/Vm.sol',
  };
  c.addModule(VmSafe);
    
  const IDeployer = {
      name: 'IDeployer',
      path: '@redprint-deploy/deployer/DeployScript.sol',
  };
  c.addModule(IDeployer);

  const getDeployer = {
    name: 'getDeployer',
    path: '@redprint-deploy/deployer/DeployScript.sol',
  };
  c.addModule(getDeployer);

  const AddressManager = {
    name: 'AddressManager',
    path: '@redprint-core/legacy/AddressManager.sol',
  };
  c.addModule(AddressManager);

  

  c.addVariable(`IDeployer deployerProcedue;`);

  c.addFunctionCode(`deployerProcedue = getDeployer();
      deployerProcedue.setAutoSave(true);

      console.log("Transferring AddressManager ownership to ProxyAdmin");
      AddressManager addressManager = AddressManager(deployerProcedue.mustGetAddress("AddressManager"));
      address owner = addressManager.owner();
      address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
      (VmSafe.CallerMode mode ,address msgSender, ) = vm.readCallers();

      if (owner != proxyAdmin) {

          if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
              console.log("Pranking owner ...");
              vm.prank(owner);
            } else {
              console.log("Broadcasting ...");
              vm.broadcast(owner);
            }

          addressManager.transferOwnership(proxyAdmin);
          console.log("AddressManager ownership transferred to %s", proxyAdmin);
      }

      require(addressManager.owner() == proxyAdmin);`, functions.run);

}

const functions = defineFunctions({
  run: {
      kind: 'public' as const,
      args: [],
  },

});
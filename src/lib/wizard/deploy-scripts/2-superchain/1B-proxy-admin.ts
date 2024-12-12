import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedProxyAdminOptions, OpSec } from '../../shared/2-superchain/1B-option-proxy-admin';
import { withCommonDefaults, defaults } from "../../shared/2-superchain/1B-option-proxy-admin";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

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
  setOpsec(c, allOpts.opSec);
  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder) {

  const console = {
    name: 'console',
    path: '@redprint-forge-std/console.sol',
  };
  c.addImportOnly(console);

  const Vm = {
    name: 'Vm',
    path: '@redprint-forge-std/Vm.sol',
  };
  c.addImportOnly(Vm);
  const VmSafe = {
    name: 'VmSafe',
    path: '@redprint-forge-std/Vm.sol',
  };
  c.addImportOnly(VmSafe);

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

  const IAddressManager = {
    name: 'IAddressManager',
    path: '@redprint-core/legacy/interfaces/IAddressManager.sol',
  };
  c.addImportOnly(IAddressManager);

  const AddressManager = {
    name: 'AddressManager',
    path: '@redprint-core/legacy/AddressManager.sol',
  };
  c.addImportOnly(AddressManager);

  const ProxyAdmin = {
    name: 'ProxyAdmin',
    path: '@redprint-core/universal/ProxyAdmin.sol',
  };
  c.addImportOnly(ProxyAdmin);

  c.addVariable(`ProxyAdmin proxyAdmin;`);

  // deploy
  c.addFunctionCode(`proxyAdmin = deployer.deploy_ProxyAdmin("ProxyAdmin", address(owner));
        require(proxyAdmin.owner() == address(owner));
        return proxyAdmin;`, functions.deploy);

  // initialize
  c.addFunctionCode(`AddressManager addressManager = AddressManager(deployer.mustGetAddress("AddressManager"));
        (VmSafe.CallerMode mode ,address msgSender, ) = vm.readCallers();
        if ( address(proxyAdmin.addressManager()) != address(addressManager)) {
             if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
                console.log("Pranking owner ...");
                vm.prank(owner);
             } else {
                console.log("Broadcasting ...");
                vm.broadcast(owner);
             }
            proxyAdmin.setAddressManager( IAddressManager(address(addressManager)));
            console.log("AddressManager setted to : %s", address(addressManager));
        }
        address safe = deployer.mustGetAddress("SystemOwnerSafe");
        if (proxyAdmin.owner() != safe) {
            if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
                console.log("Pranking owner ...");
                vm.prank(owner);
             } else {
                console.log("Broadcasting ...");
                vm.broadcast(owner);
             }

            proxyAdmin.transferOwnership(safe);
            console.log("ProxyAdmin ownership transferred to Safe at: %s", safe);
        }`, functions.initialize);

}

function setOpsec(c: DeployBuilder, opsec: OpSec) {
  switch (opsec) {
    case 'address': {
      c.addVariable(`address owner = vm.envAddress("DEPLOYER_ADDRESS");`);

      break;
    }
    case 'key': {
      c.addVariable(`uint256 ownerPrivateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");`);
      c.addVariable(`address owner = vm.envOr("DEPLOYER_ADDRESS", vm.addr(ownerPrivateKey));`);

      break;
    }
    case 'mnemonic': {
      c.addVariable(`string mnemonic = vm.envString("MNEMONIC");`);
      c.addVariable(`uint256 ownerPrivateKey = vm.deriveKey(mnemonic, "m/44'/60'/0'/0/", 1);`);
      c.addVariable(`address owner = vm.envOr("DEPLOYER_ADDRESS", vm.addr(ownerPrivateKey));`);
      
      break;
    }
  }
}

const functions = defineFunctions({
  deploy: {
      kind: 'external' as const,
      args: [],
      returns: ['ProxyAdmin'],
  },

  initialize: {
    kind: 'external' as const,
    args: [],
  },
});
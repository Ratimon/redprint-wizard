import type { DeployContract} from './contract';
import { DeployBuilder } from "./contract";

import { withCommonDefaults, defaults as commonDefaults } from "../shared/2-option-superchain-config-proxy";
import type { SharedSuperchainConfigProxyOptions } from '../shared/2-option-superchain-config-proxy';

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

import { defineFunctions } from '../utils/define-functions';

function withDeployDefaults(opts: SharedSuperchainConfigProxyOptions): Required<SharedSuperchainConfigProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}


export function printDeploySuperchainConfigProxy(opts: SharedSuperchainConfigProxyOptions = commonDefaults): string {
  return printDeployContract(buildDeploySuperchainConfigProxy(opts));
}

export function buildDeploySuperchainConfigProxy(opts: SharedSuperchainConfigProxyOptions): DeployContract {
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


  const ProxyAdmin = {
    name: 'ProxyAdmin',
    path: '@redprint-core/universal/ProxyAdmin.sol',
  };
  c.addModule(ProxyAdmin);

  c.addVariable(`ProxyAdmin proxyAdmin;`);

  // deploy
  c.addFunctionCode(`proxyAdmin = deployer.deploy_ProxyAdmin("ProxyAdmin", address(owner));
        require(proxyAdmin.owner() == address(owner));
        return proxyAdmin;`, functions.deploy);

  // initialize
  c.addFunctionCode(`AddressManager addressManager = AddressManager(deployer.mustGetAddress("AddressManager"));
        (VmSafe.CallerMode mode ,address msgSender, ) = vm.readCallers();
        if (proxyAdmin.addressManager() != addressManager) {
             if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
                console.log("Pranking ower ...");
                vm.prank(owner);
             } else {
                console.log("Broadcasting ...");
                vm.broadcast(owner);
             }
            proxyAdmin.setAddressManager(addressManager);
            console.log("AddressManager setted to : %s", address(addressManager));
        }
        address safe = deployer.mustGetAddress("SystemOwnerSafe");
        if (proxyAdmin.owner() != safe) {
            if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
                console.log("Pranking ower ...");
                vm.prank(owner);
             } else {
                console.log("Broadcasting ...");
                vm.broadcast(owner);
             }

            proxyAdmin.transferOwnership(safe);
            console.log("ProxyAdmin ownership transferred to Safe at: %s", safe);
        }`, functions.initialize);

  
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
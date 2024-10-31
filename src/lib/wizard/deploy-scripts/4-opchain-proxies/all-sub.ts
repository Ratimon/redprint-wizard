import type { DeployContract, BaseFunction} from '../contract';
import { DeployBuilder } from "../contract";

import type {  SharedStepFourPointOneAllSubOptions } from '../../shared/4-opchain-proxies/option-all-sub';
import {  defaults } from '../../shared/4-opchain-proxies/option-all-sub';

import { defaults as infoDefaults } from "../set-info";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';


function withDeployDefaults(opts: SharedStepFourPointOneAllSubOptions): Required<SharedStepFourPointOneAllSubOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeployStepFourPointOneAllSub(opts: SharedStepFourPointOneAllSubOptions = defaults): string {
  return printDeployContract(buildDeployStepFourPointOneAllSub(opts));
}

export function buildDeployStepFourPointOneAllSub(opts: SharedStepFourPointOneAllSubOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = functions.run;
  c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);`, fn);
  
  setOpDeployment(c, fn);

  setInfo(c, allOpts.deployInfo);

  c.addFunctionCode(`
        console.log("OptimismPortalProxy at: ", deployerProcedue.getAddress("OptimismPortalProxy"));
        console.log("SystemConfigProxy at: ", deployerProcedue.getAddress("SystemConfigProxy"));
        console.log("L1CrossDomainMessengerProxy at: ", deployerProcedue.getAddress("L1CrossDomainMessengerProxy"));
        console.log("L1ERC721BridgeProxy at: ", deployerProcedue.getAddress("L1ERC721BridgeProxy"));

        console.log("DisputeGameFactoryProxy at: ", deployerProcedue.getAddress("DisputeGameFactoryProxy"));
        console.log("L2OutputOracleProxy at: ", deployerProcedue.getAddress("L2OutputOracleProxy"));
        console.log("DelayedWETHProxy at: ", deployerProcedue.getAddress("DelayedWETHProxy"));
        console.log("PermissionedDelayedWETHProxy at: ", deployerProcedue.getAddress("PermissionedDelayedWETHProxy"));
        console.log("AnchorStateRegistryProxy at: ", deployerProcedue.getAddress("AnchorStateRegistryProxy"));`, fn);

  return c;
}

function addBase(c: DeployBuilder) {

    const console = {
        name: 'console',
        path: '@redprint-forge-std/console.sol',
    };
    c.addModule(console);

    const Script = {
        name: 'Script',
        path: '@redprint-forge-std/Script.sol',
    };
    c.addParent(Script, []);

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

    c.addVariable(`IDeployer deployerProcedue;`);

    const AddressManager = {
      name: 'AddressManager',
      path: '@redprint-core/legacy/AddressManager.sol',
    };
    c.addModule(AddressManager);

}

function setOpDeployment(c: DeployBuilder, fn: BaseFunction) {

  const DeployOptimismPortalProxyScript = {
    name: 'DeployOptimismPortalProxyScript',
    path: '@script/401A_DeployOptimismPortalProxyScript.s.sol',
  };
  c.addModule(DeployOptimismPortalProxyScript);

  const DeploySystemConfigProxyScript = {
    name: 'DeploySystemConfigProxyScript',
    path: '@script/401B_DeploySystemConfigProxyScript.s.sol',
  };
  c.addModule(DeploySystemConfigProxyScript);

  const DeployL1StandardBridgeProxyScript = {
    name: 'DeployL1StandardBridgeProxyScript',
    path: '@script/401C_DeployL1StandardBridgeProxyScript.s.sol',
  };
  c.addModule(DeployL1StandardBridgeProxyScript);

  const DeployL1CrossDomainMessengerProxyScript = {
    name: 'DeployL1CrossDomainMessengerProxyScript',
    path: '@script/401D_DeployL1CrossDomainMessengerProxyScript.s.sol',
  };
  c.addModule(DeployL1CrossDomainMessengerProxyScript);

  const DeployOptimismMintableERC20FactoryProxyScript = {
    name: 'DeployOptimismMintableERC20FactoryProxyScript',
    path: '@script/401E_DeployOptimismMintableERC20FactoryProxyScript.s.sol',
  };
  c.addModule(DeployOptimismMintableERC20FactoryProxyScript);

  const DeployL1ERC721BridgeProxyScript = {
    name: 'DeployL1ERC721BridgeProxyScript',
    path: '@script/401F_DeployL1ERC721BridgeProxyScript.s.sol',
  };
  c.addModule(DeployL1ERC721BridgeProxyScript);

  const DeployDisputeGameFactoryProxyScript = {
    name: 'DeployDisputeGameFactoryProxyScript',
    path: '@script/401G_DeployDisputeGameFactoryProxyScript.s.sol',
  };
  c.addModule(DeployDisputeGameFactoryProxyScript);

  const DeployL2OutputOracleProxyScript = {
    name: 'DeployL2OutputOracleProxyScript',
    path: '@script/401H_DeployL2OutputOracleProxyScript.s.sol',
  };
  c.addModule(DeployL2OutputOracleProxyScript);

  const DeployDelayedWETHProxyScript = {
    name: 'DeployDelayedWETHProxyScript',
    path: '@script/401I_DeployDelayedWETHProxyScript.s.sol',
  };
  c.addModule(DeployDelayedWETHProxyScript);

  const DeployPermissionedDelayedWETHProxyScript = {
    name: 'DeployPermissionedDelayedWETHProxyScript',
    path: '@script/401J_DeployPermissionedDelayedWETHProxyScript.s.sol',
  };
  c.addModule(DeployPermissionedDelayedWETHProxyScript);

  const DeployAnchorStateRegistryProxyScript = {
    name: 'DeployAnchorStateRegistryProxyScript',
    path: '@script/401K_DeployAnchorStateRegistryProxyScript.s.sol',
  };
  c.addModule(DeployAnchorStateRegistryProxyScript);

  c.addFunctionCode(`
        DeployOptimismPortalProxyScript optimismPortalProxyDeployments = new DeployOptimismPortalProxyScript();
        DeploySystemConfigProxyScript systemConfigProxyDeployments = new DeploySystemConfigProxyScript();
        DeployL1StandardBridgeProxyScript l1StandardBridgeProxyDeployments = new DeployL1StandardBridgeProxyScript();
        DeployL1CrossDomainMessengerProxyScript l1CrossDomainMessengerProxyDeployments = new DeployL1CrossDomainMessengerProxyScript();
        DeployOptimismMintableERC20FactoryProxyScript optimismMintableERC20FactoryProxyDeployments = new DeployOptimismMintableERC20FactoryProxyScript();
        DeployL1ERC721BridgeProxyScript l1ERC721BridgeProxyDeployments = new DeployL1ERC721BridgeProxyScript();
        DeployDisputeGameFactoryProxyScript disputeGameFactoryProxyDeployments = new DeployDisputeGameFactoryProxyScript();
        DeployL2OutputOracleProxyScript l2OutputOracleProxyDeployments = new DeployL2OutputOracleProxyScript();
        DeployDelayedWETHProxyScript delayedWETHProxyDeployments = new DeployDelayedWETHProxyScript();
        DeployPermissionedDelayedWETHProxyScript permissionedDelayedWETHProxyDeployments = new DeployPermissionedDelayedWETHProxyScript();
        DeployAnchorStateRegistryProxyScript anchorStateRegistryProxyDeployments = new DeployAnchorStateRegistryProxyScript();

        optimismPortalProxyDeployments.deploy();
        systemConfigProxyDeployments.deploy();
        l1StandardBridgeProxyDeployments.deploy();
        l1CrossDomainMessengerProxyDeployments.deploy();
        optimismMintableERC20FactoryProxyDeployments.deploy();
        l1ERC721BridgeProxyDeployments.deploy();
        disputeGameFactoryProxyDeployments.deploy();
        l2OutputOracleProxyDeployments.deploy();
        delayedWETHProxyDeployments.deploy();
        permissionedDelayedWETHProxyDeployments.deploy();
        anchorStateRegistryProxyDeployments.deploy();
        transferAddressManagerOwnership();`, fn);

      c.addFunctionCode(`
        console.log("Transferring AddressManager ownership to ProxyAdmin");
        AddressManager addressManager = AddressManager(deployerProcedue.mustGetAddress("AddressManager"));
        address owner = addressManager.owner();
        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        (VmSafe.CallerMode mode ,address msgSender, ) = vm.readCallers();

        if (owner != proxyAdmin) {

            if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
                console.log("Pranking ower ...");
                vm.prank(owner);
             } else {
                console.log("Broadcasting ...");
                vm.broadcast(owner);
             }

            addressManager.transferOwnership(proxyAdmin);
            console.log("AddressManager ownership transferred to %s", proxyAdmin);
        }

        require(addressManager.owner() == proxyAdmin);`, functions.transferAddressManagerOwnership);


}


const functions = defineFunctions({

  run :{
    kind: 'public' as const,
    args: [],
    returns: [] , 
  },
  transferAddressManagerOwnership: {
    kind: 'internal' as const,
    args: [],
    returns: [],
},

});
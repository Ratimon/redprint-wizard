import type { DeployContract, BaseFunction} from '../contract';
import { DeployBuilder } from "../contract";

import type {  SharedStepFourPointTwoAllSubOptions, SystemConfig, OptimismPortal } from '../../shared/4-opchain-implementations/option-all-sub';
import {  defaults } from '../../shared/4-opchain-implementations/option-all-sub';

import { defaults as infoDefaults } from "../set-info";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';


function withDeployDefaults(opts: SharedStepFourPointTwoAllSubOptions): Required<SharedStepFourPointTwoAllSubOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeployStepFourPointTwoAllSub(opts: SharedStepFourPointTwoAllSubOptions = defaults): string {
  return printDeployContract(buildDeployStepFourPointTwoAllSub(opts));
}

export function buildDeployStepFourPointTwoAllSub(opts: SharedStepFourPointTwoAllSubOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c);
  const fn : BaseFunction = functions.run;
  c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);`, fn);
  
  setOpProxiesDeployment(c, fn);

  c.addFunctionCode(`
        console.log("OptimismPortalProxy at: ", deployerProcedue.getAddress("OptimismPortalProxy"));
        console.log("SystemConfigProxy at: ", deployerProcedue.getAddress("SystemConfigProxy"));
        console.log("L1CrossDomainMessengerProxy at: ", deployerProcedue.getAddress("L1CrossDomainMessengerProxy"));
        console.log("L1ERC721BridgeProxy at: ", deployerProcedue.getAddress("L1ERC721BridgeProxy"));

        console.log("DisputeGameFactoryProxy at: ", deployerProcedue.getAddress("DisputeGameFactoryProxy"));
        console.log("L2OutputOracleProxy at: ", deployerProcedue.getAddress("L2OutputOracleProxy"));
        console.log("DelayedWETHProxy at: ", deployerProcedue.getAddress("DelayedWETHProxy"));
        console.log("PermissiTwodDelayedWETHProxy at: ", deployerProcedue.getAddress("PermissiTwodDelayedWETHProxy"));
        console.log("AnchorStateRegistryProxy at: ", deployerProcedue.getAddress("AnchorStateRegistryProxy"));`, fn);


  setOpImplementationsDeployment(c, fn, allOpts.systemConfig, allOpts.optimismPortal );

  setInfo(c, allOpts.deployInfo);

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

function setOpImplementationsDeployment(c: DeployBuilder, fn: BaseFunction, systemconfig: SystemConfig, optimismPortal: OptimismPortal) {

  const DeployL1CrossDomainMessengerScript = {
    name: 'DeployL1CrossDomainMessengerScript',
    path: '@script/402A_DeployL1CrossDomainMessengerScript.s.sol',
  };
  c.addModule(DeployL1CrossDomainMessengerScript);

  const DeployOptimismMintableERC20FactoryScript = {
    name: 'DeployOptimismMintableERC20FactoryScript',
    path: '@script/402B_DeployOptimismMintableERC20Factory.s.sol',
  };
  c.addModule(DeployOptimismMintableERC20FactoryScript);

  switch (systemconfig) {
    case 'system-config': {
      const DeploySystemConfigScript = {
          name: 'DeploySystemConfigScript',
          path: '@script/402C_DeploySystemConfigScript.s.sol',
      };
      c.addModule(DeploySystemConfigScript);
      break;
    }
    case 'system-config-interop': {
      const DeploySystemConfigInteropScript = {
          name: 'DeploySystemConfigInteropScript',
          path: '@script/402C_DeploySystemConfigInteropScript.s.sol',
      };
      c.addModule(DeploySystemConfigInteropScript);
      break;
    }
  }

  const DeployL1StandardBridgeScript = {
    name: 'DeployL1StandardBridgeScript',
    path: '@script/402D_DeployL1StandardBridgeScript.s.sol',
  };
  c.addModule(DeployL1StandardBridgeScript);

  const DeployL1ERC721BridgeScript = {
    name: 'DeployL1ERC721BridgeScript',
    path: '@script/402E_DeployL1ERC721BridgeScript.s.sol',
  };
  c.addModule(DeployL1ERC721BridgeScript);

  const DeployOptimismPortalScript = {
    name: 'DeployOptimismPortalScript',
    path: '@script/402F_DeployOptimismPortalScript.s.sol',
  };
  c.addModule(DeployOptimismPortalScript);

  const DeployL2OutputOracleScript = {
    name: 'DeployL2OutputOracleScript',
    path: '@script/402G_DeployL2OutputOracleScript.s.sol',
  };
  c.addModule(DeployL2OutputOracleScript);

  switch (optimismPortal) {
    case 'optimism-portal-2': {
      const DeployOptimismPortal2Script = {
        name: 'DeployOptimismPortal2Script',
        path: '@script/402H_DeployOptimismPortal2Script.s.sol',
      };
      c.addModule(DeployOptimismPortal2Script);
      break;
    }
    case 'optimism-portal-interop': {
      const DeployOptimismPortalInteropScript = {
          name: 'DeployOptimismPortalInteropScript',
          path: '@script/402H_DeployOptimismPortalInteropScript.s.sol',
      };
      c.addModule(DeployOptimismPortalInteropScript);
      break;
    }
  }

  const DeployDisputeGameFactoryScript = {
    name: 'DeployDisputeGameFactoryScript',
    path: '@script/402I_DeployDisputeGameFactoryScript.s.sol',
  };
  c.addModule(DeployDisputeGameFactoryScript);

  const DeployDelayedWETHScript = {
    name: 'DeployDelayedWETHScript',
    path: '@script/402J_DeployDelayedWETHScript.s.sol',
  };
  c.addModule(DeployDelayedWETHScript);

  const DeployPreimageOracleScript = {
    name: 'DeployPreimageOracleScript',
    path: '@script/402K_DeployPreimageOracleScript.s.sol',
  };
  c.addModule(DeployPreimageOracleScript);

  const DeployMIPSScript = {
    name: 'DeployMIPSScript',
    path: '@script/402L_DeployMIPSScript.s.sol',
  };
  c.addModule(DeployMIPSScript);

  const DeployAnchorStateRegistryScript = {
    name: 'DeployAnchorStateRegistryScript',
    path: '@script/402M_DeployAnchorStateRegistryScript.s.sol',
  };
  c.addModule(DeployAnchorStateRegistryScript);

  const InitializeImplementationsScript = {
    name: 'InitializeImplementationsScript',
    path: '@script/402N_InitializeImplementationsScript.s.sol',
  };
  c.addModule(InitializeImplementationsScript);

  const SetFaultGameImplementationScript = {
    name: 'SetFaultGameImplementationScript',
    path: '@script/402O_SetFaultGameImplementationScript.s.sol',
  };
  c.addModule(SetFaultGameImplementationScript);

  // start Deployments
  c.addFunctionCode(`
        DeployL1CrossDomainMessengerScript l1CrossDomainMessengerDeployments = new DeployL1CrossDomainMessengerScript();
        DeployOptimismMintableERC20FactoryScript optimismMintableERC20FactoryDeployments = new DeployOptimismMintableERC20FactoryScript();`, fn);

  switch (systemconfig) {
    case 'system-config': {
      c.addFunctionCode(`DeploySystemConfigScript systemConfigDeployments = new DeploySystemConfigScript();`, fn);
      break;
    }
    case 'system-config-interop': {
      c.addFunctionCode(`DeploySystemConfigInteropScript systemConfigDeployments = new DeploySystemConfigInteropScript();;`, fn);
      break;
    }
  }
  c.addFunctionCode(`DeployL1StandardBridgeScript l1StandardBridgeDeployments = new DeployL1StandardBridgeScript();
        DeployL1ERC721BridgeScript l1ERC721BridgeDeployments = new DeployL1ERC721BridgeScript();
        DeployOptimismPortalScript optimismPortalDeployments = new DeployOptimismPortalScript();
        DeployL2OutputOracleScript l2OutputOracleDeployments = new DeployL2OutputOracleScript();`, fn);

  switch (optimismPortal) {
    case 'optimism-portal-2': {
      c.addFunctionCode(`DeployOptimismPortal2Script optimismPortal2Deployments = new DeployOptimismPortal2Script();`, fn);
      break;
    }
    case 'optimism-portal-interop': {
      c.addFunctionCode(`DeployOptimismPortalInteropScript optimismPortal2Deployments = new DeployOptimismPortalInteropScript();`, fn);
      break;
    }
  }

  c.addFunctionCode(`DeployDisputeGameFactoryScript disputeGameFactoryDeployments = new DeployDisputeGameFactoryScript();
        DeployDelayedWETHScript delayedWETHDeployments = new DeployDelayedWETHScript();
        DeployPreimageOracleScript preimageOracleDeployments = new DeployPreimageOracleScript();
        DeployMIPSScript mipsDeployments = new DeployMIPSScript();
        DeployAnchorStateRegistryScript anchorStateRegistryDeployments = new DeployAnchorStateRegistryScript();
        InitializeImplementationsScript initializeImplementations = new InitializeImplementationsScript();
        SetFaultGameImplementationScript setFaultGameImplementation = new SetFaultGameImplementationScript();`, fn);

  c.addFunctionCode(`
        l1CrossDomainMessengerDeployments.deploy();
        optimismMintableERC20FactoryDeployments.deploy();
        systemConfigDeployments.deploy();
        l1StandardBridgeDeployments.deploy();
        l1ERC721BridgeDeployments.deploy();
        optimismPortalDeployments.deploy();
        l2OutputOracleDeployments.deploy();
        optimismPortal2Deployments.deploy();
        disputeGameFactoryDeployments.deploy();
        delayedWETHDeployments.deploy();
        preimageOracleDeployments.deploy();
        mipsDeployments.deploy();
        anchorStateRegistryDeployments.deploy();
        initializeImplementations.run();
        setFaultGameImplementation.run();

        console.log("L1CrossDomainMessenger at: ", deployerProcedue.getAddress("L1CrossDomainMessenger"));
        console.log("OptimismMintableERC20Factory at: ", deployerProcedue.getAddress("OptimismMintableERC20Factory"));
        console.log("SystemConfig at: ", deployerProcedue.getAddress("SystemConfig"));
        console.log("L1StandardBridge at: ", deployerProcedue.getAddress("L1StandardBridge"));
        console.log("L1ERC721Bridge at: ", deployerProcedue.getAddress("L1ERC721Bridge"));
        console.log("OptimismPortal at: ", deployerProcedue.getAddress("OptimismPortal"));
        console.log("L2OutputOracle at: ", deployerProcedue.getAddress("L2OutputOracle"));
        console.log("OptimismPortal2 at: ", deployerProcedue.getAddress("OptimismPortal2"));
        console.log("DisputeGameFactory at: ", deployerProcedue.getAddress("DisputeGameFactory"));
        console.log("DelayedWETH at: ", deployerProcedue.getAddress("DelayedWETH"));
        console.log("PreimageOracle at: ", deployerProcedue.getAddress("PreimageOracle"));
        console.log("MIPS at: ", deployerProcedue.getAddress("Mips"));
        console.log("AnchorStateRegistry at: ", deployerProcedue.getAddress("AnchorStateRegistry"));`, fn);

}

function setOpProxiesDeployment(c: DeployBuilder, fn: BaseFunction) {

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

  const TransferAddressManagerOwnershipScript = {
    name: 'TransferAddressManagerOwnershipScript',
    path: '@script/401L_TransferAddressManagerOwnershipScript.s.sol',
  };
  c.addModule(TransferAddressManagerOwnershipScript);

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
        TransferAddressManagerOwnershipScript transferAddressManagerOwnership = new TransferAddressManagerOwnershipScript();

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
        transferAddressManagerOwnership.run();`, fn);

}

const functions = defineFunctions({

  run :{
    kind: 'public' as const,
    args: [],
    returns: [] , 
  },

});
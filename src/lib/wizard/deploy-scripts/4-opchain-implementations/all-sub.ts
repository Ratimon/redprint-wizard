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
  c.addFunctionCode(`
        deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);`, fn);
  
  setOpProxiesDeployment(c, fn);

  c.addFunctionCode(`
        console.log("Setup Opchain ... ");
        
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
    c.addImportOnly(console);

    const Script = {
        name: 'Script',
        path: '@redprint-forge-std/Script.sol',
    };
    c.addParent(Script, []);

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

    const AddressManager = {
      name: 'AddressManager',
      path: '@redprint-core/legacy/AddressManager.sol',
    };
    c.addImportOnly(AddressManager);

}

function setOpImplementationsDeployment(c: DeployBuilder, fn: BaseFunction, systemconfig: SystemConfig, optimismPortal: OptimismPortal) {

  const DeployL1CrossDomainMessengerScript = {
    name: 'DeployL1CrossDomainMessengerScript',
    path: '@scripts/402A_DeployL1CrossDomainMessengerScript.s.sol',
  };
  c.addImportOnly(DeployL1CrossDomainMessengerScript);

  const DeployOptimismMintableERC20FactoryScript = {
    name: 'DeployOptimismMintableERC20FactoryScript',
    path: '@scripts/402B_DeployOptimismMintableERC20Factory.s.sol',
  };
  c.addImportOnly(DeployOptimismMintableERC20FactoryScript);

  switch (systemconfig) {
    case 'system-config': {
      const DeploySystemConfigScript = {
          name: 'DeploySystemConfigScript',
          path: '@scripts/402C_DeploySystemConfigScript.s.sol',
      };
      c.addImportOnly(DeploySystemConfigScript);
      break;
    }
    case 'system-config-interop': {
      const DeploySystemConfigInteropScript = {
          name: 'DeploySystemConfigInteropScript',
          path: '@scripts/402C_DeploySystemConfigInteropScript.s.sol',
      };
      c.addImportOnly(DeploySystemConfigInteropScript);
      break;
    }
  }

  const DeployL1StandardBridgeScript = {
    name: 'DeployL1StandardBridgeScript',
    path: '@scripts/402D_DeployL1StandardBridgeScript.s.sol',
  };
  c.addImportOnly(DeployL1StandardBridgeScript);

  const DeployL1ERC721BridgeScript = {
    name: 'DeployL1ERC721BridgeScript',
    path: '@scripts/402E_DeployL1ERC721BridgeScript.s.sol',
  };
  c.addImportOnly(DeployL1ERC721BridgeScript);

  const DeployOptimismPortalScript = {
    name: 'DeployOptimismPortalScript',
    path: '@scripts/402F_DeployOptimismPortalScript.s.sol',
  };
  c.addImportOnly(DeployOptimismPortalScript);

  const DeployL2OutputOracleScript = {
    name: 'DeployL2OutputOracleScript',
    path: '@scripts/402G_DeployL2OutputOracleScript.s.sol',
  };
  c.addImportOnly(DeployL2OutputOracleScript);

  switch (optimismPortal) {
    case 'optimism-portal-2': {
      const DeployOptimismPortal2Script = {
        name: 'DeployOptimismPortal2Script',
        path: '@scripts/402H_DeployOptimismPortal2Script.s.sol',
      };
      c.addImportOnly(DeployOptimismPortal2Script);
      break;
    }
    case 'optimism-portal-interop': {
      const DeployOptimismPortalInteropScript = {
          name: 'DeployOptimismPortalInteropScript',
          path: '@scripts/402H_DeployOptimismPortalInteropScript.s.sol',
      };
      c.addImportOnly(DeployOptimismPortalInteropScript);
      break;
    }
  }

  const DeployDisputeGameFactoryScript = {
    name: 'DeployDisputeGameFactoryScript',
    path: '@scripts/402I_DeployDisputeGameFactoryScript.s.sol',
  };
  c.addImportOnly(DeployDisputeGameFactoryScript);

  const DeployDelayedWETHScript = {
    name: 'DeployDelayedWETHScript',
    path: '@scripts/402J_DeployDelayedWETHScript.s.sol',
  };
  c.addImportOnly(DeployDelayedWETHScript);

  const DeployPreimageOracleScript = {
    name: 'DeployPreimageOracleScript',
    path: '@scripts/402K_DeployPreimageOracleScript.s.sol',
  };
  c.addImportOnly(DeployPreimageOracleScript);

  const DeployMIPSScript = {
    name: 'DeployMIPSScript',
    path: '@scripts/402L_DeployMIPSScript.s.sol',
  };
  c.addImportOnly(DeployMIPSScript);

  const DeployAnchorStateRegistryScript = {
    name: 'DeployAnchorStateRegistryScript',
    path: '@scripts/402M_DeployAnchorStateRegistryScript.s.sol',
  };
  c.addImportOnly(DeployAnchorStateRegistryScript);

  const InitializeImplementationsScript = {
    name: 'InitializeImplementationsScript',
    path: '@scripts/402N_InitializeImplementationsScript.s.sol',
  };
  c.addImportOnly(InitializeImplementationsScript);

  const SetFaultGameImplementationScript = {
    name: 'SetFaultGameImplementationScript',
    path: '@scripts/402O_SetFaultGameImplementationScript.s.sol',
  };
  c.addImportOnly(SetFaultGameImplementationScript);

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
    path: '@scripts/401A_DeployOptimismPortalProxyScript.s.sol',
  };
  c.addImportOnly(DeployOptimismPortalProxyScript);

  const DeploySystemConfigProxyScript = {
    name: 'DeploySystemConfigProxyScript',
    path: '@scripts/401B_DeploySystemConfigProxyScript.s.sol',
  };
  c.addImportOnly(DeploySystemConfigProxyScript);

  const DeployL1StandardBridgeProxyScript = {
    name: 'DeployL1StandardBridgeProxyScript',
    path: '@scripts/401C_DeployL1StandardBridgeProxyScript.s.sol',
  };
  c.addImportOnly(DeployL1StandardBridgeProxyScript);

  const DeployL1CrossDomainMessengerProxyScript = {
    name: 'DeployL1CrossDomainMessengerProxyScript',
    path: '@scripts/401D_DeployL1CrossDomainMessengerProxyScript.s.sol',
  };
  c.addImportOnly(DeployL1CrossDomainMessengerProxyScript);

  const DeployOptimismMintableERC20FactoryProxyScript = {
    name: 'DeployOptimismMintableERC20FactoryProxyScript',
    path: '@scripts/401E_DeployOptimismMintableERC20FactoryProxyScript.s.sol',
  };
  c.addImportOnly(DeployOptimismMintableERC20FactoryProxyScript);

  const DeployL1ERC721BridgeProxyScript = {
    name: 'DeployL1ERC721BridgeProxyScript',
    path: '@scripts/401F_DeployL1ERC721BridgeProxyScript.s.sol',
  };
  c.addImportOnly(DeployL1ERC721BridgeProxyScript);

  const DeployDisputeGameFactoryProxyScript = {
    name: 'DeployDisputeGameFactoryProxyScript',
    path: '@scripts/401G_DeployDisputeGameFactoryProxyScript.s.sol',
  };
  c.addImportOnly(DeployDisputeGameFactoryProxyScript);

  const DeployL2OutputOracleProxyScript = {
    name: 'DeployL2OutputOracleProxyScript',
    path: '@scripts/401H_DeployL2OutputOracleProxyScript.s.sol',
  };
  c.addImportOnly(DeployL2OutputOracleProxyScript);

  const DeployDelayedWETHProxyScript = {
    name: 'DeployDelayedWETHProxyScript',
    path: '@scripts/401I_DeployDelayedWETHProxyScript.s.sol',
  };
  c.addImportOnly(DeployDelayedWETHProxyScript);

  const DeployPermissionedDelayedWETHProxyScript = {
    name: 'DeployPermissionedDelayedWETHProxyScript',
    path: '@scripts/401J_DeployPermissionedDelayedWETHProxyScript.s.sol',
  };
  c.addImportOnly(DeployPermissionedDelayedWETHProxyScript);

  const DeployAnchorStateRegistryProxyScript = {
    name: 'DeployAnchorStateRegistryProxyScript',
    path: '@scripts/401K_DeployAnchorStateRegistryProxyScript.s.sol',
  };
  c.addImportOnly(DeployAnchorStateRegistryProxyScript);

  const TransferAddressManagerOwnershipScript = {
    name: 'TransferAddressManagerOwnershipScript',
    path: '@scripts/401L_TransferAddressManagerOwnershipScript.s.sol',
  };
  c.addImportOnly(TransferAddressManagerOwnershipScript);

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
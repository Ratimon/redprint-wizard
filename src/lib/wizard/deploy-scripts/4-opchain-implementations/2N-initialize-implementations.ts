import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type { SharedInitializeImplementationsOptions, OpSec, UseFaultProofs } from '../../shared/4-opchain-implementations/2N-option-initialize-implementations';
import { defaults as commonDefaults } from '../../shared/4-opchain-implementations/2N-option-initialize-implementations'

import { defaults as infoDefaults } from "../set-info";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedInitializeImplementationsOptions): Required<SharedInitializeImplementationsOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeployInitializeImplementations(opts: SharedInitializeImplementationsOptions = commonDefaults): string {
  return printDeployContract(buildDeployInitializeImplementations(opts));
}

export function buildDeployInitializeImplementations(opts: SharedInitializeImplementationsOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c , allOpts.useFaultProofs);
  setFaultProofsOptions(c, allOpts.useFaultProofs);
  setOpsec(c, allOpts.opSec);
  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder, useFaultProofs: UseFaultProofs) {
    
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

    const SafeScript = {
        name: 'SafeScript',
        path: '@redprint-deploy/safe-management/SafeScript.sol',
    };
    c.addParent(SafeScript, []);

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
    

    const DeployConfig = {
        name: 'DeployConfig',
        path: '@redprint-deploy/deployer/DeployConfig.s.sol',
    };
    c.addModule(DeployConfig);
    

    const Types = {
        name: 'Types',
        path: '@redprint-deploy/optimism/Types.sol',
    };
    c.addModule(Types);
    
    const ChainAssertions = {
        name: 'ChainAssertions',
        path: '@redprint-deploy/optimism/ChainAssertions.sol',
    };
    c.addModule(ChainAssertions);

    switch (useFaultProofs) {
        case 'yes-optimism-portal-2': {

            const GameType = {
                name: 'GameType',
                path: '@redprint-core/dispute/lib/LibUDT.sol',
            };
            c.addModule(GameType);
        
            const IDisputeGameFactory = {
                name: 'IDisputeGameFactory',
                path: '@redprint-core/dispute/interfaces/IDisputeGameFactory.sol',
            };
            c.addModule(IDisputeGameFactory);
        
            const ISystemConfig = {
                name: 'ISystemConfig',
                path: '@redprint-core/L1/interfaces/ISystemConfig.sol',
            };
            c.addModule(ISystemConfig);
        
            const ISuperchainConfig = {
                name: 'ISuperchainConfig',
                path: '@redprint-core/L1/interfaces/ISuperchainConfig.sol',
            };
            c.addModule(ISuperchainConfig);
        
            const OptimismPortal2 = {
                name: 'OptimismPortal2',
                path: '@redprint-core/L1/OptimismPortal2.sol',
            };
            c.addModule(OptimismPortal2);

        break;
        }
        case 'no-optimism-portal': {

            const IL2OutputOracle = {
                name: 'IL2OutputOracle',
                path: '@redprint-core/L1/interfaces/IL2OutputOracle.sol',
            };
            c.addModule(IL2OutputOracle);

            const ISystemConfig = {
                name: 'ISystemConfig',
                path: '@redprint-core/L1/interfaces/ISystemConfig.sol',
            };
            c.addModule(ISystemConfig);
        
            const ISuperchainConfig = {
                name: 'ISuperchainConfig',
                path: '@redprint-core/L1/interfaces/ISuperchainConfig.sol',
            };
            c.addModule(ISuperchainConfig);
        
            const OptimismPortal = {
                name: 'OptimismPortal',
                path: '@redprint-core/L1/OptimismPortal.sol',
            };
            c.addModule(OptimismPortal);

        break;
        }
    }
  

    c.addVariable(`IDeployer deployerProcedue;`);

    // run
    c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);

        console.log("Initializing implementations");

        (VmSafe.CallerMode mode ,address msgSender, ) = vm.readCallers();
        if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
            console.log("Pranking owner ...");
            vm.startPrank(owner);`, functions.run);

    switch (useFaultProofs) {
        case 'yes-optimism-portal-2': {
            c.addFunctionCode(`    initializeOptimismPortal2();`, functions.run);
            break;
            
        }
        case 'no-optimism-portal': {
            c.addFunctionCode(`    initializeOptimismPortal();`, functions.run);
            break;
        }
    }

    // run
    c.addFunctionCode(`    console.log("Pranking Stopped ...");

            vm.stopPrank();
        } else {
            console.log("Broadcasting ...");
            vm.startBroadcast(owner);`, functions.run);

    switch (useFaultProofs) {
        case 'yes-optimism-portal-2': {
            c.addFunctionCode(`    initializeOptimismPortal2();`, functions.run);
            break;
            
        }
        case 'no-optimism-portal': {
            c.addFunctionCode(`    initializeOptimismPortal();`, functions.run);
            break;
        }
    }

    // run
    c.addFunctionCode(`    console.log("Broadcasted");

            vm.stopBroadcast();
        }`, functions.run);


}

function setFaultProofsOptions(c: DeployBuilder, useFaultProofs: UseFaultProofs) {
    switch (useFaultProofs) {
        case 'yes-optimism-portal-2': {
            // initializeOptimismPortal2
            c.addFunctionCode(`console.log("Upgrading and initializing OptimismPortal2 proxy");

        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address optimismPortalProxy = deployerProcedue.mustGetAddress("OptimismPortalProxy");
        address optimismPortal2 = deployerProcedue.mustGetAddress("OptimismPortal2");
        address disputeGameFactoryProxy = deployerProcedue.mustGetAddress("DisputeGameFactoryProxy");
        address systemConfigProxy = deployerProcedue.mustGetAddress("SystemConfigProxy");
        address superchainConfigProxy = deployerProcedue.mustGetAddress("SuperchainConfigProxy");

        DeployConfig cfg = deployerProcedue.getConfig();

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,   
            _proxy: payable(optimismPortalProxy),
            _implementation: optimismPortal2,
            _innerCallData: abi.encodeCall(
                OptimismPortal2.initialize,
                    (
                        IDisputeGameFactory(disputeGameFactoryProxy),
                        ISystemConfig(systemConfigProxy),
                        ISuperchainConfig(superchainConfigProxy),
                        GameType.wrap(uint32(cfg.respectedGameType()))
                    )
            )
        });

        OptimismPortal2 portal = OptimismPortal2(payable(optimismPortalProxy));
        string memory version = portal.version();
        console.log("OptimismPortal2 version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkOptimismPortal2({ _contracts: proxies, _cfg: cfg, _isProxy: true });`, functions.initializeOptimismPortal2);

                break;
        }
        case 'no-optimism-portal': {

            // initializeOptimismPortal
            c.addFunctionCode(`console.log("Upgrading and initializing OptimismPortal2 proxy");

        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address optimismPortalProxy = deployerProcedue.mustGetAddress("OptimismPortalProxy");
        address optimismPortal = deployerProcedue.mustGetAddress("OptimismPortal");
        address l2OutputOracleProxy = deployerProcedue.mustGetAddress("L2OutputOracleProxy");
        address systemConfigProxy = deployerProcedue.mustGetAddress("SystemConfigProxy");
        address superchainConfigProxy = deployerProcedue.mustGetAddress("SuperchainConfigProxy");

        DeployConfig cfg = deployerProcedue.getConfig();

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,   
            _proxy: payable(optimismPortalProxy),
            _implementation: optimismPortal,
            _innerCallData: abi.encodeCall(
                OptimismPortal.initialize,
                    (
                        IL2OutputOracle(l2OutputOracleProxy),
                        ISystemConfig(systemConfigProxy),
                        ISuperchainConfig(superchainConfigProxy)
                    )
            )
        });

        OptimismPortal portal = OptimismPortal(payable(optimismPortalProxy));
        string memory version = portal.version();
        console.log("OptimismPortal2 version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkOptimismPortal({ _contracts: proxies, _cfg: cfg, _isProxy: true });`, functions.initializeOptimismPortal);
                break;
        }
    }
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
  run: {
      kind: 'public' as const,
      args: [],
  },
  initializeOptimismPortal2: {
    kind: 'internal' as const,
    args: [],
  },
  initializeOptimismPortal: {
    kind: 'internal' as const,
    args: [],
  },

});
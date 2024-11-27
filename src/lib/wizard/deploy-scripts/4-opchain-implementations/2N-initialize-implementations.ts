import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type {
    SharedInitializeImplementationsOptions,
    OpSec,
    UseFaultProofs,
    UseCustomToken
} from '../../shared/4-opchain-implementations/2N-option-initialize-implementations';
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
  
  addBase(c , allOpts.useFaultProofs, allOpts.useCustomToken, allOpts.customGasTokenaddress);
  setFaultProofsOptions(c, allOpts.useFaultProofs);
  setCustomTokenOptions(c);
  setOpsec(c, allOpts.opSec);
  setInfo(c, allOpts.deployInfo);

  return c;
}

function addBase(c: DeployBuilder, useFaultProofs: UseFaultProofs, useCustomToken: UseCustomToken, customGasTokenaddress: string) {
    
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

    const Constants = {
        name: 'Constants',
        path: '@redprint-core/libraries/Constants.sol',
    };
    c.addModule(Constants);

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

    const SystemConfig = {
        name: 'SystemConfig',
        path: '@redprint-core/L1/SystemConfig.sol',
    };
    c.addModule(SystemConfig);
  

    c.addVariable(`IDeployer deployerProcedue;`);

    switch (useCustomToken) {
        case 'yes-custom-token': {
            c.addVariable(`address public constant customGasTokenAddress = ${customGasTokenaddress};`);
            break;
        }
        case 'no-custom-token': {
            c.addVariable(`address public constant customGasTokenAddress = Constants.ETHER;`);
            break;
        }
    }

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
            c.addFunctionCode(`    initializeOptimismPortal2();
            initializeSystemConfig();`, functions.run);
            break;
            
        }
        case 'no-optimism-portal': {
            c.addFunctionCode(`    initializeOptimismPortal();
            initializeSystemConfig();`, functions.run);
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
            c.addFunctionCode(`    initializeOptimismPortal2();
            initializeSystemConfig();`, functions.run);
            break;
            
        }
        case 'no-optimism-portal': {
            c.addFunctionCode(`    initializeOptimismPortal();
            initializeSystemConfig();`, functions.run);
            break;
        }
    }

    // run
    c.addFunctionCode(`    console.log("Broadcasted");

            vm.stopBroadcast();
        }`, functions.run);


}

function setFaultProofsOptions(c: DeployBuilder, useFaultProofs: UseFaultProofs ) {
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

function setCustomTokenOptions(c: DeployBuilder) {

    // initializeSystemConfig
    c.addFunctionCode(`console.log("Upgrading and initializing SystemConfig proxy");

        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address systemConfigProxy = deployerProcedue.mustGetAddress("SystemConfigProxy");
        address systemConfig = deployerProcedue.mustGetAddress("SystemConfig");

        DeployConfig cfg = deployerProcedue.getConfig();

        bytes32 batcherHash = bytes32(uint256(uint160(cfg.batchSenderAddress())));


        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,   
            _proxy: payable(systemConfigProxy),
            _implementation: systemConfig,
            _innerCallData: abi.encodeCall(
                SystemConfig.initialize,
                (
                    cfg.finalSystemOwner(),
                    cfg.basefeeScalar(),
                    cfg.blobbasefeeScalar(),
                    batcherHash,
                    uint64(cfg.l2GenesisBlockGasLimit()),
                    cfg.p2pSequencerAddress(),
                    Constants.DEFAULT_RESOURCE_CONFIG(),
                    cfg.batchInboxAddress(),
                    SystemConfig.Addresses({
                        l1CrossDomainMessenger: deployerProcedue.mustGetAddress("L1CrossDomainMessengerProxy"),
                        l1ERC721Bridge: deployerProcedue.mustGetAddress("L1ERC721BridgeProxy"),
                        l1StandardBridge: deployerProcedue.mustGetAddress("L1StandardBridgeProxy"),
                        disputeGameFactory: deployerProcedue.mustGetAddress("DisputeGameFactoryProxy"),
                        optimismPortal: deployerProcedue.mustGetAddress("OptimismPortalProxy"),
                        optimismMintableERC20Factory: deployerProcedue.mustGetAddress("OptimismMintableERC20FactoryProxy"),
                        gasPayingToken: customGasTokenAddress 
                    })
                )
            )
        });

        SystemConfig config = SystemConfig(systemConfigProxy);
        string memory version = config.version();
        console.log("SystemConfig version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkSystemConfig({ _contracts: proxies, _cfg: cfg, _isProxy: true });`, functions.initializeSystemConfig);

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
  initializeSystemConfig: {
    kind: 'internal' as const,
    args: [],
  },

});
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
  setOptimismPortalWithFaultProofsOptions(c, allOpts.useFaultProofs);
  setSystemConfigWithCustomTokenOptions(c);
  setL1StandardBridge(c);
  setL1ERC721Bridge(c);
  setOptimismMintableERC20Factory(c);
  setL1CrossDomainMessenger(c);
  setL2OutputOracle(c);
  setDisputeGameFactory(c);
  setDelayedWETH(c);
  setPermissionedDelayedWETH(c);
  setAnchorStateRegistry(c);
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

    const SafeScript = {
        name: 'SafeScript',
        path: '@redprint-deploy/safe-management/SafeScript.sol',
    };
    c.addParent(SafeScript, []);

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
    
    const DeployConfig = {
        name: 'DeployConfig',
        path: '@redprint-deploy/deployer/DeployConfig.s.sol',
    };
    c.addImportOnly(DeployConfig);
    

    const Types = {
        name: 'Types',
        path: '@redprint-deploy/optimism/Types.sol',
    };
    c.addImportOnly(Types);
    
    const ChainAssertions = {
        name: 'ChainAssertions',
        path: '@redprint-deploy/optimism/ChainAssertions.sol',
    };
    c.addImportOnly(ChainAssertions);

    const Constants = {
        name: 'Constants',
        path: '@redprint-core/libraries/Constants.sol',
    };
    c.addImportOnly(Constants);

    switch (useFaultProofs) {
        case 'yes-optimism-portal-2': {

            const GameType = {
                name: 'GameType',
                path: '@redprint-core/dispute/lib/LibUDT.sol',
            };
            c.addImportOnly(GameType);
        
            const IDisputeGameFactory = {
                name: 'IDisputeGameFactory',
                path: '@redprint-core/dispute/interfaces/IDisputeGameFactory.sol',
            };
            c.addImportOnly(IDisputeGameFactory);
        
            const ISystemConfig = {
                name: 'ISystemConfig',
                path: '@redprint-core/L1/interfaces/ISystemConfig.sol',
            };
            c.addImportOnly(ISystemConfig);
        
            const ISuperchainConfig = {
                name: 'ISuperchainConfig',
                path: '@redprint-core/L1/interfaces/ISuperchainConfig.sol',
            };
            c.addImportOnly(ISuperchainConfig);
        
            const OptimismPortal2 = {
                name: 'OptimismPortal2',
                path: '@redprint-core/L1/OptimismPortal2.sol',
            };
            c.addImportOnly(OptimismPortal2);

        break;
        }
        case 'no-optimism-portal': {

            const IL2OutputOracle = {
                name: 'IL2OutputOracle',
                path: '@redprint-core/L1/interfaces/IL2OutputOracle.sol',
            };
            c.addImportOnly(IL2OutputOracle);

            const ISystemConfig = {
                name: 'ISystemConfig',
                path: '@redprint-core/L1/interfaces/ISystemConfig.sol',
            };
            c.addImportOnly(ISystemConfig);
        
            const ISuperchainConfig = {
                name: 'ISuperchainConfig',
                path: '@redprint-core/L1/interfaces/ISuperchainConfig.sol',
            };
            c.addImportOnly(ISuperchainConfig);
        
            const OptimismPortal = {
                name: 'OptimismPortal',
                path: '@redprint-core/L1/OptimismPortal.sol',
            };
            c.addImportOnly(OptimismPortal);

        break;
        }
    }

    const SystemConfig = {
        name: 'SystemConfig',
        path: '@redprint-core/L1/SystemConfig.sol',
    };
    c.addImportOnly(SystemConfig);

    const IL1CrossDomainMessenger = {
        name: 'IL1CrossDomainMessenger',
        path: '@redprint-core/L1/interfaces/IL1CrossDomainMessenger.sol',
    };
    c.addImportOnly(IL1CrossDomainMessenger);

    const ProxyAdmin = {
        name: 'ProxyAdmin',
        path: '@redprint-core/universal/ProxyAdmin.sol',
    };
    c.addImportOnly(ProxyAdmin);

    const Safe = {
        name: 'Safe',
        path: '@redprint-safe-contracts/Safe.sol',
    };
    c.addImportOnly(Safe);

    const L1StandardBridge = {
        name: 'L1StandardBridge',
        path: '@redprint-core/L1/L1StandardBridge.sol',
    };
    c.addImportOnly(L1StandardBridge);

    const L1ERC721Bridge = {
        name: 'L1ERC721Bridge',
        path: '@redprint-core/L1/L1ERC721Bridge.sol',
    };
    c.addImportOnly(L1ERC721Bridge);

    const OptimismMintableERC20Factory = {
        name: 'OptimismMintableERC20Factory',
        path: '@redprint-core/universal/OptimismMintableERC20Factory.sol',
    };
    c.addImportOnly(OptimismMintableERC20Factory);

    const IOptimismPortal = {
        name: 'IOptimismPortal',
        path: '@redprint-core/L1/interfaces/IOptimismPortal.sol',
    };
    c.addImportOnly(IOptimismPortal);

    const L1CrossDomainMessenger = {
        name: 'L1CrossDomainMessenger',
        path: '@redprint-core/L1/L1CrossDomainMessenger.sol',
    };
    c.addImportOnly(L1CrossDomainMessenger);

    const L2OutputOracle = {
        name: 'L2OutputOracle',
        path: '@redprint-core/L1/L2OutputOracle.sol',
    };
    c.addImportOnly(L2OutputOracle);

    const DisputeGameFactory = {
        name: 'DisputeGameFactory',
        path: '@redprint-core/dispute/DisputeGameFactory.sol',
    };
    c.addImportOnly(DisputeGameFactory);

    const DelayedWETH = {
        name: 'DelayedWETH',
        path: '@redprint-core/dispute/DelayedWETH.sol',
    };
    c.addImportOnly(DelayedWETH);

    const AnchorStateRegistry = {
        name: 'AnchorStateRegistry',
        path: '@redprint-core/dispute/AnchorStateRegistry.sol',
    };
    c.addImportOnly(AnchorStateRegistry);

    const GameTypes = {
        name: 'GameTypes',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addImportOnly(GameTypes);

    const OutputRoot = {
        name: 'OutputRoot',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addImportOnly(OutputRoot);

    const Hash = {
        name: 'Hash',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addImportOnly(Hash);
  

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
    c.addFunctionCode(`    initializeL1StandardBridge();
            initializeL1ERC721Bridge();
            initializeOptimismMintableERC20Factory();
            initializeL1CrossDomainMessenger();
            initializeL2OutputOracle();
            initializeDisputeGameFactory();
            initializeDelayedWETH();
            initializePermissionedDelayedWETH();
            initializeAnchorStateRegistry();
            console.log("Pranking Stopped ...");

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
    c.addFunctionCode(`    initializeL1StandardBridge();
            initializeL1ERC721Bridge();
            initializeOptimismMintableERC20Factory();
            initializeL1CrossDomainMessenger();
            initializeL2OutputOracle();
            initializeDisputeGameFactory();
            initializeDelayedWETH();
            initializePermissionedDelayedWETH();
            initializeAnchorStateRegistry();
            console.log("Broadcasted");

            vm.stopBroadcast();
        }`, functions.run);

}

function setOptimismPortalWithFaultProofsOptions(c: DeployBuilder, useFaultProofs: UseFaultProofs ) {
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

function setSystemConfigWithCustomTokenOptions(c: DeployBuilder) {

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

function setL1StandardBridge(c: DeployBuilder) {

    // initializeL1StandardBridge
    c.addFunctionCode(`console.log("Upgrading and initializing L1StandardBridge proxy");
        address proxyAdminAddress = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safeAddress = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address l1StandardBridgeProxy = deployerProcedue.mustGetAddress("L1StandardBridgeProxy");
        address l1StandardBridge = deployerProcedue.mustGetAddress("L1StandardBridge");
        address l1CrossDomainMessengerProxy = deployerProcedue.mustGetAddress("L1CrossDomainMessengerProxy");
        address superchainConfigProxy = deployerProcedue.mustGetAddress("SuperchainConfigProxy");
        address systemConfigProxy = deployerProcedue.mustGetAddress("SystemConfigProxy");

        uint256 proxyType = uint256(ProxyAdmin(proxyAdminAddress).proxyType(l1StandardBridgeProxy));

        ProxyAdmin proxyAdmin = ProxyAdmin(proxyAdminAddress);
        Safe safe = Safe(payable(safeAddress));

        if (proxyType != uint256(ProxyAdmin.ProxyType.CHUGSPLASH)) {
            _callViaSafe({
                _safe: safe,
                _owner: owner,
                _target: address(proxyAdmin),
                _data: abi.encodeCall(ProxyAdmin.setProxyType, (l1StandardBridgeProxy, ProxyAdmin.ProxyType.CHUGSPLASH))
            });
        }

        require(uint256(proxyAdmin.proxyType(l1StandardBridgeProxy)) == uint256(ProxyAdmin.ProxyType.CHUGSPLASH),"Type not CHUGSPLASH");

        _upgradeAndCallViaSafe({
            _proxyAdmin: address(proxyAdmin),
            _safe: address(safe),
            _owner: owner,
            _proxy: payable(l1StandardBridgeProxy),
            _implementation: l1StandardBridge,
            _innerCallData: abi.encodeCall(
                L1StandardBridge.initialize,
                (
                    IL1CrossDomainMessenger(l1CrossDomainMessengerProxy),
                    ISuperchainConfig(superchainConfigProxy),
                    ISystemConfig(systemConfigProxy)
                )
            )
        });

        string memory version = L1StandardBridge(payable(l1StandardBridgeProxy)).version();
        console.log("L1StandardBridge version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkL1StandardBridge({ _contracts: proxies, _isProxy: true });`, functions.initializeL1StandardBridge);

}

function setL1ERC721Bridge(c: DeployBuilder) {

    // initializeL1ERC721Bridge
    c.addFunctionCode(`console.log("Upgrading and initializing L1ERC721Bridge proxy");
        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address l1ERC721BridgeProxy = deployerProcedue.mustGetAddress("L1ERC721BridgeProxy");
        address l1ERC721Bridge = deployerProcedue.mustGetAddress("L1ERC721Bridge");
        address l1CrossDomainMessengerProxy = deployerProcedue.mustGetAddress("L1CrossDomainMessengerProxy");
        address superchainConfigProxy = deployerProcedue.mustGetAddress("SuperchainConfigProxy");
        address systemConfigProxy = deployerProcedue.mustGetAddress("SystemConfigProxy");

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,
            _proxy: payable(l1ERC721BridgeProxy),
            _implementation: l1ERC721Bridge,
            _innerCallData: abi.encodeCall(
                L1ERC721Bridge.initialize,
                (
                    IL1CrossDomainMessenger(l1CrossDomainMessengerProxy),
                    ISuperchainConfig(superchainConfigProxy)
                )
            )
        });

        L1ERC721Bridge bridge = L1ERC721Bridge(l1ERC721BridgeProxy);
        string memory version = bridge.version();
        console.log("L1ERC721Bridge version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();

        ChainAssertions.checkL1ERC721Bridge({ _contracts: proxies, _isProxy: true });`, functions.initializeL1ERC721Bridge);

}

function setOptimismMintableERC20Factory(c: DeployBuilder) {

    // initializeOptimismMintableERC20Factory
    c.addFunctionCode(`console.log("Upgrading and initializing OptimismMintableERC20Factory proxy");
        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address optimismMintableERC20FactoryProxy = deployerProcedue.mustGetAddress("OptimismMintableERC20FactoryProxy");
        address optimismMintableERC20Factory = deployerProcedue.mustGetAddress("OptimismMintableERC20Factory");
        address l1StandardBridgeProxy = deployerProcedue.mustGetAddress("L1StandardBridgeProxy");

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,
            _proxy: payable(optimismMintableERC20FactoryProxy),
            _implementation: optimismMintableERC20Factory,
            _innerCallData: abi.encodeCall(OptimismMintableERC20Factory.initialize, (l1StandardBridgeProxy))
        });

        OptimismMintableERC20Factory factory = OptimismMintableERC20Factory(optimismMintableERC20FactoryProxy);
        string memory version = factory.version();
        console.log("OptimismMintableERC20Factory version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkOptimismMintableERC20Factory({ _contracts: proxies, _isProxy: true });`, functions.initializeOptimismMintableERC20Factory);

}

function setL1CrossDomainMessenger(c: DeployBuilder) {

    // initializeL1CrossDomainMessenger
    c.addFunctionCode(`console.log("Upgrading and initializing L1CrossDomainMessenger Proxy");
        address proxyAdminAddress = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safeAddress = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address l1CrossDomainMessengerProxy = deployerProcedue.mustGetAddress("L1CrossDomainMessengerProxy");
        address l1CrossDomainMessenger = deployerProcedue.mustGetAddress("L1CrossDomainMessenger");
        address superchainConfigProxy = deployerProcedue.mustGetAddress("SuperchainConfigProxy");
        address optimismPortalProxy = deployerProcedue.mustGetAddress("OptimismPortalProxy");
        address systemConfigProxy = deployerProcedue.mustGetAddress("SystemConfigProxy");

        ProxyAdmin proxyAdmin = ProxyAdmin(proxyAdminAddress);
        Safe safe = Safe(payable(safeAddress));

        uint256 proxyType = uint256(proxyAdmin.proxyType(l1CrossDomainMessengerProxy));
        
        if (proxyType != uint256(ProxyAdmin.ProxyType.RESOLVED)) {
            _callViaSafe({
                _safe: safe,
                _owner: owner,
                _target: address(proxyAdmin),
                _data: abi.encodeCall(
                    ProxyAdmin.setProxyType,
                    (
                        l1CrossDomainMessengerProxy,
                        ProxyAdmin.ProxyType.RESOLVED
                    )
                )
            });
        }
        require(uint256(proxyAdmin.proxyType(l1CrossDomainMessengerProxy)) == uint256(ProxyAdmin.ProxyType.RESOLVED));

        string memory contractName = "OVM_L1CrossDomainMessenger";
        string memory implName = proxyAdmin.implementationName(l1CrossDomainMessenger);
        if (keccak256(bytes(contractName)) != keccak256(bytes(implName))) {
            _callViaSafe({
                _safe: safe,
                _owner: owner,
                _target: address(proxyAdmin),
                _data: abi.encodeCall(
                    ProxyAdmin.setImplementationName,
                    (
                        l1CrossDomainMessengerProxy,
                        contractName
                    )
                )
            });
        }
        require(
            keccak256(bytes(proxyAdmin.implementationName(l1CrossDomainMessengerProxy)))
                == keccak256(bytes(contractName))
        );

        _upgradeAndCallViaSafe({
            _proxyAdmin: address(proxyAdmin),
            _safe: address(safe),
            _owner: owner,
            _proxy: payable(l1CrossDomainMessengerProxy),
            _implementation: l1CrossDomainMessenger,
            _innerCallData: abi.encodeCall(
                L1CrossDomainMessenger.initialize,
                (
                    ISuperchainConfig(superchainConfigProxy),
                    IOptimismPortal(payable(optimismPortalProxy)),
                    ISystemConfig(systemConfigProxy)
                )
            )
        });

        L1CrossDomainMessenger messenger = L1CrossDomainMessenger(l1CrossDomainMessengerProxy);
        string memory version = messenger.version();
        console.log("L1CrossDomainMessenger version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkL1CrossDomainMessenger({ _contracts: proxies, _vm: vm, _isProxy: true });`, functions.initializeL1CrossDomainMessenger);

}

function setL2OutputOracle(c: DeployBuilder) {

    // initializeL2OutputOracle
    c.addFunctionCode(`console.log("Upgrading and initializing L2OutputOracle proxy");
        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address l2OutputOracleProxy = deployerProcedue.mustGetAddress("L2OutputOracleProxy");
        address l2OutputOracle = deployerProcedue.mustGetAddress("L2OutputOracle");

        DeployConfig cfg = deployerProcedue.getConfig();

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: address(safe),
            _owner: owner,
            _proxy: payable(l2OutputOracleProxy),
            _implementation: l2OutputOracle,
            _innerCallData: abi.encodeCall(
                L2OutputOracle.initialize,
                (
                    cfg.l2OutputOracleSubmissionInterval(),
                    cfg.l2BlockTime(),
                    cfg.l2OutputOracleStartingBlockNumber(),
                    cfg.l2OutputOracleStartingTimestamp(),
                    cfg.l2OutputOracleProposer(),
                    cfg.l2OutputOracleChallenger(),
                    cfg.finalizationPeriodSeconds()
                )
            )
        });

        L2OutputOracle oracle = L2OutputOracle(l2OutputOracleProxy);
        string memory version = oracle.version();
        console.log("L2OutputOracle version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();

        ChainAssertions.checkL2OutputOracle({
            _contracts: proxies,
            _cfg: cfg,
            _l2OutputOracleStartingTimestamp: cfg.l2OutputOracleStartingTimestamp(),
            _isProxy: true
        });`, functions.initializeL2OutputOracle);

}

function setDisputeGameFactory(c: DeployBuilder) {

    // initializeDisputeGameFactory
    c.addFunctionCode(`console.log("Upgrading and initializing DisputeGameFactory proxy");
        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address disputeGameFactoryProxy = deployerProcedue.mustGetAddress("DisputeGameFactoryProxy");
        address disputeGameFactory = deployerProcedue.mustGetAddress("DisputeGameFactory");

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,
            _proxy: payable(disputeGameFactoryProxy),
            _implementation: disputeGameFactory,
            _innerCallData: abi.encodeCall(
                DisputeGameFactory.initialize,
                (owner)
            )
        });

        string memory version = DisputeGameFactory(disputeGameFactoryProxy).version();
        console.log("DisputeGameFactory version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkDisputeGameFactory({ _contracts: proxies, _expectedOwner: owner, _isProxy: true });`, functions.initializeDisputeGameFactory);

}

function setDelayedWETH(c: DeployBuilder) {

    // initializeDelayedWETH
    c.addFunctionCode(`console.log("Upgrading and initializing DelayedWETH proxy");
        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address delayedWETHProxy = deployerProcedue.mustGetAddress("DelayedWETHProxy");
        address delayedWETH = deployerProcedue.mustGetAddress("DelayedWETH");
        address superchainConfigProxy = deployerProcedue.mustGetAddress("SuperchainConfigProxy");

        DeployConfig cfg = deployerProcedue.getConfig();

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,
            _proxy: payable(delayedWETHProxy),
            _implementation: delayedWETH,
            _innerCallData: abi.encodeCall(
                DelayedWETH.initialize, (
                    owner,
                    ISuperchainConfig(superchainConfigProxy)
                )
            )
        });

        string memory version = DelayedWETH(payable(delayedWETHProxy)).version();
        console.log("DelayedWETH version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkDelayedWETH({
            _contracts: proxies,
            _cfg: cfg,
            _isProxy: true,
            _expectedOwner: owner
        });`, functions.initializeDelayedWETH);

}

function setPermissionedDelayedWETH(c: DeployBuilder) {
    // initializePermissionedDelayedWETH
    c.addFunctionCode(`console.log("Upgrading and initializing permissioned DelayedWETH proxy");

        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address delayedWETHProxy = deployerProcedue.mustGetAddress("PermissionedDelayedWETHProxy");
        address delayedWETH = deployerProcedue.mustGetAddress("DelayedWETH");
        address superchainConfigProxy = deployerProcedue.mustGetAddress("SuperchainConfigProxy");

        DeployConfig cfg = deployerProcedue.getConfig();

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,
            _proxy: payable(delayedWETHProxy),
            _implementation: delayedWETH,
            _innerCallData: abi.encodeCall(
                DelayedWETH.initialize, (
                    owner,
                    ISuperchainConfig(superchainConfigProxy)
                )
            )
        });

        string memory version = DelayedWETH(payable(delayedWETHProxy)).version();
        console.log("DelayedWETH version: %s", version);

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();

        ChainAssertions.checkPermissionedDelayedWETH({
            _contracts: proxies,
            _cfg: cfg,
            _isProxy: true,
            _expectedOwner: owner
        });`, functions.initializePermissionedDelayedWETH);

}

function setAnchorStateRegistry(c: DeployBuilder) {

    // initializeAnchorStateRegistry
    c.addFunctionCode(`console.log("Upgrading and initializing AnchorStateRegistry proxy");

        address proxyAdmin = deployerProcedue.mustGetAddress("ProxyAdmin");
        address safe = deployerProcedue.mustGetAddress("SystemOwnerSafe");

        address anchorStateRegistryProxy = deployerProcedue.mustGetAddress("AnchorStateRegistryProxy");
        address anchorStateRegistry = deployerProcedue.mustGetAddress("AnchorStateRegistry");
        address superchainConfigProxy = deployerProcedue.mustGetAddress("SuperchainConfigProxy");

        DeployConfig cfg = deployerProcedue.getConfig();

        AnchorStateRegistry.StartingAnchorRoot[] memory roots = new AnchorStateRegistry.StartingAnchorRoot[](5);
        roots[0] = AnchorStateRegistry.StartingAnchorRoot({
            gameType: GameTypes.CANNON,
            outputRoot: OutputRoot({
                root: Hash.wrap(cfg.faultGameGenesisOutputRoot()),
                l2BlockNumber: cfg.faultGameGenesisBlock()
            })
        });
        roots[1] = AnchorStateRegistry.StartingAnchorRoot({
            gameType: GameTypes.PERMISSIONED_CANNON,
            outputRoot: OutputRoot({
                root: Hash.wrap(cfg.faultGameGenesisOutputRoot()),
                l2BlockNumber: cfg.faultGameGenesisBlock()
            })
        });
        roots[2] = AnchorStateRegistry.StartingAnchorRoot({
            gameType: GameTypes.ALPHABET,
            outputRoot: OutputRoot({
                root: Hash.wrap(cfg.faultGameGenesisOutputRoot()),
                l2BlockNumber: cfg.faultGameGenesisBlock()
            })
        });
        roots[3] = AnchorStateRegistry.StartingAnchorRoot({
            gameType: GameTypes.ASTERISC,
            outputRoot: OutputRoot({
                root: Hash.wrap(cfg.faultGameGenesisOutputRoot()),
                l2BlockNumber: cfg.faultGameGenesisBlock()
            })
        });
        roots[4] = AnchorStateRegistry.StartingAnchorRoot({
            gameType: GameTypes.FAST,
            outputRoot: OutputRoot({
                root: Hash.wrap(cfg.faultGameGenesisOutputRoot()),
                l2BlockNumber: cfg.faultGameGenesisBlock()
            })
        });

        _upgradeAndCallViaSafe({
            _proxyAdmin: proxyAdmin,
            _safe: safe,
            _owner: owner,
            _proxy: payable(anchorStateRegistryProxy),
            _implementation: anchorStateRegistry,
            _innerCallData: abi.encodeCall(AnchorStateRegistry.initialize, (roots, ISuperchainConfig(superchainConfigProxy)))
        });

        string memory version = AnchorStateRegistry(payable(anchorStateRegistryProxy)).version();
        console.log("AnchorStateRegistry version: %s", version);`, functions.initializeAnchorStateRegistry);
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
  initializeL1StandardBridge: {
    kind: 'internal' as const,
    args: [],
  },
  initializeL1ERC721Bridge: {
    kind: 'internal' as const,
    args: [],
  },
  initializeOptimismMintableERC20Factory: {
    kind: 'internal' as const,
    args: [],
  },
  initializeL1CrossDomainMessenger: {
    kind: 'internal' as const,
    args: [],
  },
  initializeL2OutputOracle: {
    kind: 'internal' as const,
    args: [],
  },
  initializeDisputeGameFactory: {
    kind: 'internal' as const,
    args: [],
  },
  initializeDelayedWETH: {
    kind: 'internal' as const,
    args: [],
  },
  initializePermissionedDelayedWETH: {
    kind: 'internal' as const,
    args: [],
  },
  initializeAnchorStateRegistry: {
    kind: 'internal' as const,
    args: [],
  },

});
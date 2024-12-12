import type { DeployContract} from '../contract';
import { DeployBuilder } from "../contract";

import type {
    SharedSetFaultGameImplementationOptions,
    OpSec,
} from '../../shared/4-opchain-implementations/2O-option-set-fault-game-implementation';
import { defaults as commonDefaults } from '../../shared/4-opchain-implementations/2O-option-set-fault-game-implementation'
import { defaults as infoDefaults } from "../set-info";

import { printDeployContract } from "../print";
import { setInfo } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDeployDefaults(opts: SharedSetFaultGameImplementationOptions): Required<SharedSetFaultGameImplementationOptions> {
  return {
    ...opts,
    deployInfo: infoDefaults
  };
}

export function printDeploySetFaultGameImplementation(opts: SharedSetFaultGameImplementationOptions = commonDefaults): string {
  return printDeployContract(buildDeploySetFaultGameImplementation(opts));
}

export function buildDeploySetFaultGameImplementation(opts: SharedSetFaultGameImplementationOptions): DeployContract {
  const allOpts = withDeployDefaults(opts);
  const c = new DeployBuilder(allOpts.deployName);
  
  addBase(c );
  setAlphabetFaultGameImplementation(c);
  setFastFaultGameImplementation(c);
  setPermissionedCannonFaultGameImplementations(c, allOpts.prestateProofMtPath, allOpts.prestateProofStPath);
  setFaultGameImplementation(c);
  setTransferDisputeGameFactoryOwnership(c);
  setTransferDelayedWETHOwnership(c);

  setOpsec(c, allOpts.opSec);
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

    const Chains = {
        name: 'Chains',
        path: '@redprint-deploy/libraries/Chains.sol',
    };
    c.addImportOnly(Chains);

    const Config = {
        name: 'Config',
        path: '@redprint-deploy/libraries/Config.sol',
    };
    c.addImportOnly(Config);

    const Process = {
        name: 'Process',
        path: '@redprint-deploy/libraries/Process.sol',
    };
    c.addImportOnly(Process);

    const IBigStepper = {
        name: 'IBigStepper',
        path: '@redprint-core/dispute/interfaces/IBigStepper.sol',
    };
    c.addImportOnly(IBigStepper);
    
    const GameType = {
        name: 'GameType',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addImportOnly(GameType);

    const GameTypes = {
        name: 'GameTypes',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addImportOnly(GameTypes);

    const Claim = {
        name: 'Claim',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addImportOnly(Claim);

    const Duration = {
        name: 'Duration',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addImportOnly(Duration);

    const IAnchorStateRegistry = {
        name: 'IAnchorStateRegistry',
        path: '@redprint-core/dispute/interfaces/IAnchorStateRegistry.sol',
    };
    c.addImportOnly(IAnchorStateRegistry);
    
    const DisputeGameFactory = {
        name: 'DisputeGameFactory',
        path: '@redprint-core/dispute/DisputeGameFactory.sol',
    };
    c.addImportOnly(DisputeGameFactory);

    const FaultDisputeGame = {
        name: 'FaultDisputeGame',
        path: '@redprint-core/dispute/FaultDisputeGame.sol',
    };
    c.addImportOnly(FaultDisputeGame);

    const IDisputeGame = {
        name: 'IDisputeGame',
        path: '@redprint-core/dispute/interfaces/IDisputeGame.sol',
    };
    c.addImportOnly(IDisputeGame);

    const PermissionedDisputeGame = {
        name: 'PermissionedDisputeGame',
        path: '@redprint-core/dispute/PermissionedDisputeGame.sol',
    };
    c.addImportOnly(PermissionedDisputeGame);


    const IDelayedWETH = {
        name: 'IDelayedWETH',
        path: '@redprint-core/dispute/interfaces/IDelayedWETH.sol',
    };
    c.addImportOnly(IDelayedWETH);

    const AlphabetVM = {
        name: 'AlphabetVM',
        path: '@redprint-test/mocks/AlphabetVM.sol',
    };
    c.addImportOnly(AlphabetVM);

    const IPreimageOracle = {
        name: 'IPreimageOracle',
        path: '@redprint-core/dispute/interfaces/IBigStepper.sol',
    };
    c.addImportOnly(IPreimageOracle);

    const PreimageOracle = {
        name: 'PreimageOracle',
        path: '@redprint-core/cannon/PreimageOracle.sol',
    };
    c.addImportOnly(PreimageOracle);

    const IDisputeGameFactory = {
        name: 'IDisputeGameFactory',
        path: '@redprint-core/dispute/interfaces/IDisputeGameFactory.sol',
    };
    c.addImportOnly(IDisputeGameFactory);


    c.addVariable(`IDeployer deployerProcedue;`);

    c.addVariable(`struct FaultDisputeGameParams {
        IAnchorStateRegistry anchorStateRegistry;
        IDelayedWETH weth;
        GameType gameType;
        Claim absolutePrestate;
        IBigStepper faultVm;
        uint256 maxGameDepth;
        Duration maxClockDuration;
    }`);

    // run
    c.addFunctionCode(`deployerProcedue = getDeployer();
        deployerProcedue.setAutoSave(true);

        console.log("Set FaultGameImplementations Ccontract");

        (VmSafe.CallerMode mode ,address msgSender, ) = vm.readCallers();
        if(mode != VmSafe.CallerMode.Broadcast && msgSender != owner) {
            console.log("Pranking owner ...");
            vm.startPrank(owner);
            setAlphabetFaultGameImplementation({ _allowUpgrade: false });
            setFastFaultGameImplementation({ _allowUpgrade: false });
            setCannonFaultGameImplementation({ _allowUpgrade: false });
            transferDisputeGameFactoryOwnership();
            transferDelayedWETHOwnership();
  
            console.log("Pranking Stopped ...");

            vm.stopPrank();
        } else {
            console.log("Broadcasting ...");
            vm.startBroadcast(owner);
            setAlphabetFaultGameImplementation({ _allowUpgrade: false });
            setFastFaultGameImplementation({ _allowUpgrade: false });
            setCannonFaultGameImplementation({ _allowUpgrade: false });
            transferDisputeGameFactoryOwnership();
            transferDelayedWETHOwnership();
   
            console.log("Broadcasted");

            vm.stopBroadcast();
        }`, functions.run);


}

function setAlphabetFaultGameImplementation(c: DeployBuilder ) {

    c.addFunctionCode(`console.log("Setting Alphabet FaultDisputeGame implementation");
        DisputeGameFactory factory = DisputeGameFactory(deployerProcedue.mustGetAddress("DisputeGameFactoryProxy"));
        IDelayedWETH weth = IDelayedWETH(deployerProcedue.mustGetAddress("DelayedWETHProxy"));

        DeployConfig cfg = deployerProcedue.getConfig();

        Claim outputAbsolutePrestate = Claim.wrap(bytes32(cfg.faultGameAbsolutePrestate()));
        _setFaultGameImplementation({
            _factory: factory,
            _allowUpgrade: _allowUpgrade,
            _params: FaultDisputeGameParams({
                anchorStateRegistry: IAnchorStateRegistry(deployerProcedue.mustGetAddress("AnchorStateRegistryProxy")),
                weth: weth,
                gameType: GameTypes.ALPHABET,
                absolutePrestate: outputAbsolutePrestate,
                faultVm: IBigStepper(new AlphabetVM(outputAbsolutePrestate, IPreimageOracle(deployerProcedue.mustGetAddress("PreimageOracle")))),
                // The max depth for the alphabet trace is always 3. Add 1 because split depth is fully inclusive.
                maxGameDepth: cfg.faultGameSplitDepth() + 3 + 1,
                maxClockDuration: Duration.wrap(uint64(cfg.faultGameMaxClockDuration()))
            })
        });`, functions.setAlphabetFaultGameImplementation);

}

function setFastFaultGameImplementation(c: DeployBuilder ) {

    c.addFunctionCode(`console.log("Setting Fast FaultDisputeGame implementation");
        DisputeGameFactory factory = DisputeGameFactory(deployerProcedue.mustGetAddress("DisputeGameFactoryProxy"));
        IDelayedWETH weth = IDelayedWETH(deployerProcedue.mustGetAddress("DelayedWETHProxy"));

        DeployConfig cfg = deployerProcedue.getConfig();

        Claim outputAbsolutePrestate = Claim.wrap(bytes32(cfg.faultGameAbsolutePrestate()));
        PreimageOracle fastOracle = new PreimageOracle(cfg.preimageOracleMinProposalSize(), 0);
        _setFaultGameImplementation({
            _factory: factory,
            _allowUpgrade: _allowUpgrade,
            _params: FaultDisputeGameParams({
                anchorStateRegistry: IAnchorStateRegistry(deployerProcedue.mustGetAddress("AnchorStateRegistryProxy")),
                weth: weth,
                gameType: GameTypes.FAST,
                absolutePrestate: outputAbsolutePrestate,
                faultVm: IBigStepper(new AlphabetVM(outputAbsolutePrestate, IPreimageOracle(address(fastOracle)))),
                // The max depth for the alphabet trace is always 3. Add 1 because split depth is fully inclusive.
                maxGameDepth: cfg.faultGameSplitDepth() + 3 + 1,
                maxClockDuration: Duration.wrap(0) // Resolvable immediately
             })
        });`, functions.setFastFaultGameImplementation);

}



function setPermissionedCannonFaultGameImplementations(c: DeployBuilder, prestateProofMtPath: string, prestateProofStPath: string ) {

    // setCannonFaultGameImplementation
    c.addFunctionCode(`console.log("Setting Cannon FaultDisputeGame implementation");
        DisputeGameFactory factory = DisputeGameFactory(deployerProcedue.mustGetAddress("DisputeGameFactoryProxy"));
        IDelayedWETH weth = IDelayedWETH(deployerProcedue.mustGetAddress("DelayedWETHProxy"));

        DeployConfig cfg = deployerProcedue.getConfig();

        // Set the Cannon FaultDisputeGame implementation in the factory.
        _setFaultGameImplementation({
            _factory: factory,
            _allowUpgrade: _allowUpgrade,
            _params: FaultDisputeGameParams({
                anchorStateRegistry: IAnchorStateRegistry(deployerProcedue.mustGetAddress("AnchorStateRegistryProxy")),
                weth: weth,
                gameType: GameTypes.CANNON,
                absolutePrestate: loadMipsAbsolutePrestate(),
                faultVm: IBigStepper(deployerProcedue.mustGetAddress("Mips")),
                maxGameDepth: cfg.faultGameMaxDepth(),
                maxClockDuration: Duration.wrap(uint64(cfg.faultGameMaxClockDuration()))
            })
        });`, functions.setCannonFaultGameImplementation);

    // setPermissionedCannonFaultGameImplementation
    c.addFunctionCode(`console.log("Setting Cannon PermissionedDisputeGame implementation");
        DisputeGameFactory factory = DisputeGameFactory(deployerProcedue.mustGetAddress("DisputeGameFactoryProxy"));
        IDelayedWETH weth = IDelayedWETH(deployerProcedue.mustGetAddress("PermissionedDelayedWETHProxy"));

        DeployConfig cfg = deployerProcedue.getConfig();

        // Set the Cannon FaultDisputeGame implementation in the factory.
        _setFaultGameImplementation({
            _factory: factory,
            _allowUpgrade: _allowUpgrade,
            _params: FaultDisputeGameParams({
                anchorStateRegistry: IAnchorStateRegistry(deployerProcedue.mustGetAddress("AnchorStateRegistryProxy")),
                weth: weth,
                gameType: GameTypes.PERMISSIONED_CANNON,
                absolutePrestate: loadMipsAbsolutePrestate(),
                faultVm: IBigStepper(deployerProcedue.mustGetAddress("Mips")),
                maxGameDepth: cfg.faultGameMaxDepth(),
                maxClockDuration: Duration.wrap(uint64(cfg.faultGameMaxClockDuration()))
            })
        });`, functions.setPermissionedCannonFaultGameImplementation);

    // loadMipsAbsolutePrestate
    //  note \\"present\\"" is actually \"present\""
    c.addFunctionCode(`DeployConfig cfg = deployerProcedue.getConfig();

        if (block.chainid == Chains.LocalDevnet || block.chainid == Chains.GethDevnet) {
            if (Config.useMultithreadedCannon()) {
                return _loadDevnetMtMipsAbsolutePrestate();
            } else {
                return _loadDevnetStMipsAbsolutePrestate();
            }
        } else {
            console.log(
                "[Cannon Dispute Game] Using absolute prestate from config: %x", cfg.faultGameAbsolutePrestate()
            );
            mipsAbsolutePrestate_ = Claim.wrap(bytes32(cfg.faultGameAbsolutePrestate()));
        }`, functions.loadMipsAbsolutePrestate);

    // _loadDevnetMtMipsAbsolutePrestate
    c.addFunctionCode(`// Fetch the absolute prestate dump
        string memory filePath = string.concat(vm.projectRoot(), "${prestateProofMtPath}");
        string[] memory commands = new string[](3);
        commands[0] = "bash";
        commands[1] = "-c";
        commands[2] = string.concat("[[ -f ", filePath, " ]] && echo \\"present\\"");
        if (Process.run(commands).length == 0) {
            revert(
                "Deploy: MT-Cannon prestate dump not found, generate it with 'make cannon-prestate-mt' in the monorepo root"
            );
        }
        commands[2] = string.concat("cat ", filePath, " | jq -r .pre");
        mipsAbsolutePrestate_ = Claim.wrap(abi.decode(Process.run(commands), (bytes32)));
        console.log(
            "[MT-Cannon Dispute Game] Using devnet MIPS2 Absolute prestate: %s",
            vm.toString(Claim.unwrap(mipsAbsolutePrestate_))
        );`, functions._loadDevnetMtMipsAbsolutePrestate);

    // _loadDevnetStMipsAbsolutePrestate
    c.addFunctionCode(`// Fetch the absolute prestate dump
        string memory filePath = string.concat(vm.projectRoot(), "${prestateProofStPath}");
        string[] memory commands = new string[](3);
        commands[0] = "bash";
        commands[1] = "-c";
        commands[2] = string.concat("[[ -f ", filePath, " ]] && echo \\"present\\"");
        if (Process.run(commands).length == 0) {
            revert(
                "Deploy: cannon prestate dump not found, generate it with 'make cannon-prestate' in the monorepo root"
            );
        }
        commands[2] = string.concat("cat ", filePath, " | jq -r .pre");
        mipsAbsolutePrestate_ = Claim.wrap(abi.decode(Process.run(commands), (bytes32)));
        console.log(
            "[Cannon Dispute Game] Using devnet MIPS Absolute prestate: %s",
            vm.toString(Claim.unwrap(mipsAbsolutePrestate_))
        );`, functions._loadDevnetStMipsAbsolutePrestate);

}

function setFaultGameImplementation(c: DeployBuilder ) {

    c.addFunctionCode(`if (address(_factory.gameImpls(_params.gameType)) != address(0) && !_allowUpgrade) {
            console.log(
                "[WARN] DisputeGameFactoryProxy: 'FaultDisputeGame' implementation already set for game type: %s",
                vm.toString(GameType.unwrap(_params.gameType))
            );
            return;
        }

        DeployConfig cfg = deployerProcedue.getConfig();
        uint32 rawGameType = GameType.unwrap(_params.gameType);
        if (rawGameType != GameTypes.PERMISSIONED_CANNON.raw()) {

            address faultDisputeGameAddress = address(new FaultDisputeGame({
                _gameType: _params.gameType,
                _absolutePrestate: _params.absolutePrestate,
                _maxGameDepth: _params.maxGameDepth,
                _splitDepth: cfg.faultGameSplitDepth(),
                _clockExtension: Duration.wrap(uint64(cfg.faultGameClockExtension())),
                _maxClockDuration: _params.maxClockDuration,
                _vm: _params.faultVm,
                _weth: _params.weth,
                _anchorStateRegistry: _params.anchorStateRegistry,
                _l2ChainId: cfg.l2ChainID()
            }));

            _factory.setImplementation(
                _params.gameType,
                IDisputeGame(faultDisputeGameAddress)
            );
           
        } else {
            address permissionedDisputeGameAddress = address(new PermissionedDisputeGame({
                    _gameType: _params.gameType,
                    _absolutePrestate: _params.absolutePrestate,
                    _maxGameDepth: _params.maxGameDepth,
                    _splitDepth: cfg.faultGameSplitDepth(),
                    _clockExtension: Duration.wrap(uint64(cfg.faultGameClockExtension())),
                    _maxClockDuration: Duration.wrap(uint64(cfg.faultGameMaxClockDuration())),
                    _vm: _params.faultVm,
                    _weth: _params.weth,
                    _anchorStateRegistry: _params.anchorStateRegistry,
                    _l2ChainId: cfg.l2ChainID(),
                    _proposer: cfg.l2OutputOracleProposer(),
                    _challenger: cfg.l2OutputOracleChallenger()
            }));
            
            _factory.setImplementation(
                _params.gameType,
                IDisputeGame(permissionedDisputeGameAddress)
            );
        }

        string memory gameTypeString;
        if (rawGameType == GameTypes.CANNON.raw()) {
            gameTypeString = "Cannon";
        } else if (rawGameType == GameTypes.PERMISSIONED_CANNON.raw()) {
            gameTypeString = "PermissionedCannon";
        } else if (rawGameType == GameTypes.ALPHABET.raw()) {
            gameTypeString = "Alphabet";
        } else {
            gameTypeString = "Unknown";
        }

        console.log(
            "DisputeGameFactoryProxy: set 'FaultDisputeGame' implementation (Backend: %s | GameType: %s)",
            gameTypeString,
            vm.toString(rawGameType)
        );`, functions._setFaultGameImplementation);

}

function setTransferDisputeGameFactoryOwnership(c: DeployBuilder) {
    c.addFunctionCode(`console.log("Transferring DisputeGameFactory ownership to Safe");
        IDisputeGameFactory disputeGameFactory = IDisputeGameFactory(deployerProcedue.mustGetAddress("DisputeGameFactoryProxy"));
        address _owner = disputeGameFactory.owner();

        DeployConfig cfg = deployerProcedue.getConfig();
        address finalSystemOwner = cfg.finalSystemOwner();

        if (_owner != finalSystemOwner) {
            disputeGameFactory.transferOwnership(finalSystemOwner);
            console.log("DisputeGameFactory ownership transferred to final system owner at: %s", finalSystemOwner);
        }

        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkDisputeGameFactory({
            _contracts: proxies,
            _expectedOwner: finalSystemOwner,
            _isProxy: true
        });`, functions.transferDisputeGameFactoryOwnership);
}

function setTransferDelayedWETHOwnership(c: DeployBuilder) {
    c.addFunctionCode(`console.log("Transferring DelayedWETH ownership to Safe");
        IDelayedWETH weth = IDelayedWETH(deployerProcedue.mustGetAddress("DelayedWETHProxy"));
        address _owner = weth.owner();

        DeployConfig cfg = deployerProcedue.getConfig();
        address finalSystemOwner = cfg.finalSystemOwner();
        if (_owner != finalSystemOwner) {
            weth.transferOwnership(finalSystemOwner);
            console.log("DelayedWETH ownership transferred to final system owner at: %s", finalSystemOwner);
        }
        
        Types.ContractSet memory proxies =  deployerProcedue.getProxies();
        ChainAssertions.checkDelayedWETH({
            _contracts: proxies,
            _cfg: cfg,
            _isProxy: true,
            _expectedOwner: finalSystemOwner
        });`, functions.transferDelayedWETHOwnership);
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
  setAlphabetFaultGameImplementation: {
    kind: 'internal' as const,
    args: [
        { name: '_allowUpgrade', type: 'bool' }
    ],
  },
  setFastFaultGameImplementation: {
    kind: 'internal' as const,
    args: [
        { name: '_allowUpgrade', type: 'bool' }
    ],
  },
  _setFaultGameImplementation: {
    kind: 'internal' as const,
    args: [
        { name: '_factory', type: 'DisputeGameFactory' },
        { name: '_allowUpgrade', type: 'bool' },
        { name: '_params', type: 'FaultDisputeGameParams memory' }
    ],
  },
  setCannonFaultGameImplementation: {
    kind: 'internal' as const,
    args: [
        { name: '_allowUpgrade', type: 'bool' }
    ],
  },
  setPermissionedCannonFaultGameImplementation: {
    kind: 'internal' as const,
    args: [
        { name: '_allowUpgrade', type: 'bool' }
    ],
  },
  transferDisputeGameFactoryOwnership: {
    kind: 'internal' as const,
    args: [],
  },
  transferDelayedWETHOwnership: {
    kind: 'internal' as const,
    args: [],
  },
  loadMipsAbsolutePrestate: {
    kind: 'internal' as const,
    args: [],
    returns: ['Claim mipsAbsolutePrestate_'],
  },
  _loadDevnetMtMipsAbsolutePrestate: {
    kind: 'internal' as const,
    args: [],
    returns: ['Claim mipsAbsolutePrestate_'],
  },
  _loadDevnetStMipsAbsolutePrestate: {
    kind: 'internal' as const,
    args: [],
    returns: ['Claim mipsAbsolutePrestate_'],
  }

});
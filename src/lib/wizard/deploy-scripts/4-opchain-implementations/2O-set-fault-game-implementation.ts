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
  setFaultGameImplementation(c);
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
    
    const DeployConfig = {
        name: 'DeployConfig',
        path: '@redprint-deploy/deployer/DeployConfig.s.sol',
    };
    c.addModule(DeployConfig);


    const IBigStepper = {
        name: 'IBigStepper',
        path: '@redprint-core/dispute/interfaces/IBigStepper.sol',
    };
    c.addModule(IBigStepper);
    

    const GameType = {
        name: 'GameType',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addModule(GameType);

    const GameTypes = {
        name: 'GameTypes',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addModule(GameTypes);

    const Claim = {
        name: 'Claim',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addModule(Claim);

    const Duration = {
        name: 'Duration',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addModule(Duration);

    const IAnchorStateRegistry = {
        name: 'IAnchorStateRegistry',
        path: '@redprint-core/dispute/interfaces/IAnchorStateRegistry.sol',
    };
    c.addModule(IAnchorStateRegistry);
    
    const DisputeGameFactory = {
        name: 'DisputeGameFactory',
        path: '@redprint-core/dispute/DisputeGameFactory.sol',
    };
    c.addModule(DisputeGameFactory);

    const FaultDisputeGame = {
        name: 'FaultDisputeGame',
        path: '@redprint-core/dispute/FaultDisputeGame.sol',
    };
    c.addModule(FaultDisputeGame);

    const IDisputeGame = {
        name: 'IDisputeGame',
        path: '@redprint-core/dispute/interfaces/IDisputeGame.sol',
    };
    c.addModule(IDisputeGame);

    const PermissionedDisputeGame = {
        name: 'PermissionedDisputeGame',
        path: '@redprint-core/dispute/PermissionedDisputeGame.sol',
    };
    c.addModule(PermissionedDisputeGame);


    const IDelayedWETH = {
        name: 'IDelayedWETH',
        path: '@redprint-core/dispute/interfaces/IDelayedWETH.sol',
    };
    c.addModule(IDelayedWETH);

    const AlphabetVM = {
        name: 'AlphabetVM',
        path: '@redprint-test/mocks/AlphabetVM.sol',
    };
    c.addModule(AlphabetVM);

    const IPreimageOracle = {
        name: 'IPreimageOracle',
        path: '@redprint-core/dispute/interfaces/IBigStepper.sol',
    };
    c.addModule(IPreimageOracle);


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
  
            console.log("Pranking Stopped ...");

            vm.stopPrank();
        } else {
            console.log("Broadcasting ...");
            vm.startBroadcast(owner);
            setAlphabetFaultGameImplementation({ _allowUpgrade: false });
   
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
             deployerProcedue.save("FaultDisputeGame", faultDisputeGameAddress);

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
            
            deployerProcedue.save("PermissionedDisputeGame", permissionedDisputeGameAddress);
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
  _setFaultGameImplementation: {
    kind: 'internal' as const,
    args: [
        { name: '_factory', type: 'DisputeGameFactory' },
        { name: '_allowUpgrade', type: 'bool' },
        { name: '_params', type: 'FaultDisputeGameParams memory' }
    ],
  }

});
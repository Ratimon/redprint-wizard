import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2M-option-anchor-state-registry';
import type { SharedAnchorStateRegistryOptions } from '../../shared//4-opchain-implementations/2M-option-anchor-state-registry';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';


function withDefaults(opts: SharedAnchorStateRegistryOptions): Required<SharedAnchorStateRegistryOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}


export function printAnchorStateRegistry(opts: SharedAnchorStateRegistryOptions = commonDefaults): string {
  return printContract(buildAnchorStateRegistry(opts));
}

export function buildAnchorStateRegistry(opts: SharedAnchorStateRegistryOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const Initializable = {
        name: 'Initializable',
        path: '@redprint-openzeppelin/proxy/utils/Initializable.sol',
    };
    c.addParent(Initializable, []);

    const Types = {
        name: '',
        path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addImportOnly(Types);

    const Unauthorized = {
        name: 'Unauthorized',
        path: '@redprint-core/libraries/errors/CommonErrors.sol',
    };
    c.addImportOnly(Unauthorized);


    const UnregisteredGame = {
        name: 'UnregisteredGame',
        path: '@redprint-core/dispute/lib/Errors.sol',
    };
    c.addImportOnly(UnregisteredGame);

    const InvalidGameStatus = {
        name: 'InvalidGameStatus',
        path: '@redprint-core/dispute/lib/Errors.sol',
    };
    c.addImportOnly(InvalidGameStatus);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver);

    const IFaultDisputeGame = {
        name: 'IFaultDisputeGame',
        path: '@redprint-core/dispute/interfaces/IFaultDisputeGame.sol',
    };
    c.addImportOnly(IFaultDisputeGame);

    const IDisputeGame = {
        name: 'IDisputeGame',
        path: '@redprint-core/dispute/interfaces/IDisputeGame.sol',
    };
    c.addImportOnly(IDisputeGame);

    const IDisputeGameFactory = {
        name: 'IDisputeGameFactory',
        path: '@redprint-core/dispute/interfaces/IDisputeGameFactory.sol',
    };
    c.addImportOnly(IDisputeGameFactory);

    const ISuperchainConfig = {
        name: 'ISuperchainConfig',
        path: '@redprint-core/L1/interfaces/ISuperchainConfig.sol',
    };
    c.addImportOnly(ISuperchainConfig);


    c.addVariable(`/// @notice Describes an initial anchor state for a game type.
    struct StartingAnchorRoot {
        GameType gameType;
        OutputRoot outputRoot;
    }`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 2.0.1-beta.3
    string public constant version = "2.0.1-beta.3";`);

    c.addVariable(`/// @notice DisputeGameFactory address.
    IDisputeGameFactory internal immutable DISPUTE_GAME_FACTORY;`);

    c.addVariable(`/// @notice Returns the anchor state for the given game type.
    mapping(GameType => OutputRoot) public anchors;`);

    c.addVariable(`/// @notice Address of the SuperchainConfig contract.
    ISuperchainConfig public superchainConfig;`);

   
    c.addConstructorArgument({
        type: 'IDisputeGameFactory',
        name: '_disputeGameFactory'
    });
    c.addConstructorCode(`DISPUTE_GAME_FACTORY = _disputeGameFactory;
        _disableInitializers();`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`for (uint256 i = 0; i < _startingAnchorRoots.length; i++) {
            StartingAnchorRoot memory startingAnchorRoot = _startingAnchorRoots[i];
            anchors[startingAnchorRoot.gameType] = startingAnchorRoot.outputRoot;
        }
        superchainConfig = _superchainConfig;`, functions.initialize);


    // disputeGameFactory()
    c.addFunctionCode(`return DISPUTE_GAME_FACTORY;`, functions.disputeGameFactory);

    // tryUpdateAnchorState()
    c.addFunctionCode(`// Grab the game and game data.
        IFaultDisputeGame game = IFaultDisputeGame(msg.sender);
        (GameType gameType, Claim rootClaim, bytes memory extraData) = game.gameData();

        // Grab the verified address of the game based on the game data.
        // slither-disable-next-line unused-return
        (IDisputeGame factoryRegisteredGame,) =
            DISPUTE_GAME_FACTORY.games({ _gameType: gameType, _rootClaim: rootClaim, _extraData: extraData });

        // Must be a valid game.
        if (address(factoryRegisteredGame) != address(game)) revert UnregisteredGame();

        // No need to update anything if the anchor state is already newer.
        if (game.l2BlockNumber() <= anchors[gameType].l2BlockNumber) {
            return;
        }

        // Must be a game that resolved in favor of the state.
        if (game.status() != GameStatus.DEFENDER_WINS) {
            return;
        }

        // Actually update the anchor state.
        anchors[gameType] = OutputRoot({ l2BlockNumber: game.l2BlockNumber(), root: Hash.wrap(game.rootClaim().raw()) });`, functions.tryUpdateAnchorState);

    // setAnchorState()
    c.addFunctionCode(`if (msg.sender != superchainConfig.guardian()) revert Unauthorized();

        // Get the metadata of the game.
        (GameType gameType, Claim rootClaim, bytes memory extraData) = _game.gameData();

        // Grab the verified address of the game based on the game data.
        // slither-disable-next-line unused-return
        (IDisputeGame factoryRegisteredGame,) =
            DISPUTE_GAME_FACTORY.games({ _gameType: gameType, _rootClaim: rootClaim, _extraData: extraData });

        // Must be a valid game.
        if (address(factoryRegisteredGame) != address(_game)) revert UnregisteredGame();

        // The game must have resolved in favor of the root claim.
        if (_game.status() != GameStatus.DEFENDER_WINS) revert InvalidGameStatus();

        // Update the anchor.
        anchors[gameType] =
            OutputRoot({ l2BlockNumber: _game.l2BlockNumber(), root: Hash.wrap(_game.rootClaim().raw()) });`, functions.setAnchorState);



    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({


    initialize: {
      kind: 'public' as const,
      args: [
        { name: '_startingAnchorRoots', type: 'StartingAnchorRoot[] memory' },
        { name: '_superchainConfig', type: 'ISuperchainConfig' },
      ],
    },

    disputeGameFactory : {
        kind: 'external' as const,
        args: [],
        returns: ['IDisputeGameFactory'],
        mutability: 'view',
    },

    tryUpdateAnchorState : {
        kind: 'external' as const,
        args: [],
    },

    setAnchorState : {
        kind: 'external' as const,
        args: [
            { name: '_game', type: 'IFaultDisputeGame' },
        ],
    },
    
  });
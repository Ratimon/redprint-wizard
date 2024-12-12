import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/4-opchain-implementations/2I-option-dispute-game-factory";
import type { SharedDisputeGameFactoryOptions } from '../../shared/4-opchain-implementations/2I-option-dispute-game-factory';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedDisputeGameFactoryOptions): Required<SharedDisputeGameFactoryOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printDisputeGameFactory(opts: SharedDisputeGameFactoryOptions = commonDefaults): string {
  return printContract(buildDisputeGameFactory(opts));
}

export function buildDisputeGameFactory(opts: SharedDisputeGameFactoryOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const OwnableUpgradeable = {
      name: 'OwnableUpgradeable',
      path: '@redprint-openzeppelin-upgradeable/access/OwnableUpgradeable.sol',
    };
    c.addParent(OwnableUpgradeable, [{ lit: '' }]);

    const LibClone = {
      name: 'LibClone',
      path: '@redprint-solady/utils/LibClone.sol',
    };
    c.addLibrary(LibClone, `address`);

    const Types = {
      name: '',
      path: '@redprint-core/dispute/lib/Types.sol',
    };
    c.addImportOnly(Types);

    const Errors = {
        name: '',
        path: '@redprint-core/dispute/lib/Errors.sol',
    };    
    c.addImportOnly(Errors);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver, []);

    const IDisputeGame = {
        name: 'IDisputeGame',
        path: '@redprint-core/dispute/interfaces/IDisputeGame.sol',
    };    
    c.addImportOnly(IDisputeGame);


    c.addVariable(`/// @notice Emitted when a new dispute game is created
    /// @param disputeProxy The address of the dispute game proxy
    /// @param gameType The type of the dispute game proxy's implementation
    /// @param rootClaim The root claim of the dispute game
    event DisputeGameCreated(address indexed disputeProxy, GameType indexed gameType, Claim indexed rootClaim);`);
    
    c.addVariable(`/// @notice Emitted when a new game implementation added to the factory
    /// @param impl The implementation contract for the given GameType.
    /// @param gameType The type of the DisputeGame.
    event ImplementationSet(address indexed impl, GameType indexed gameType);`);

    c.addVariable(`/// @notice Emitted when a game type's initialization bond is updated
    /// @param gameType The type of the DisputeGame.
    /// @param newBond The new bond (in wei) for initializing the game type.
    event InitBondUpdated(GameType indexed gameType, uint256 indexed newBond);`);

    c.addVariable(`/// @notice Information about a dispute game found in a findLatestGames search.
    struct GameSearchResult {
        uint256 index;
        GameId metadata;
        Timestamp timestamp;
        Claim rootClaim;
        bytes extraData;
    }`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 1.0.1-beta.2
    string public constant version = "1.0.1-beta.2";`);

    c.addVariable(`/// @notice gameImpls is a mapping that maps 'GameType's to their respective
    ///         'IDisputeGame' implementations.
    mapping(GameType => IDisputeGame) public gameImpls;`);

    c.addVariable(`/// @notice Returns the required bonds for initializing a dispute game of the given type.
    mapping(GameType => uint256) public initBonds;`);

    c.addVariable(`//// @notice Mapping of a hash of 'gameType || rootClaim || extraData' to the deployed 'IDisputeGame' clone where
    //          || denotes concatenation).
    mapping(Hash => GameId) internal _disputeGames;`);

    c.addVariable(`/// @notice An append-only array of disputeGames that have been created. Used by offchain game solvers to
    ///         efficiently track dispute games.
    GameId[] internal _disputeGameList;`);


    c.addConstructorCode('initialize(address(0));');

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`__Ownable_init();
        _transferOwnership(_owner);`, functions.initialize);

    // gameCount
    c.addFunctionCode(`gameCount_ = _disputeGameList.length;`, functions.gameCount);

    // games
    c.addFunctionCode(`Hash uuid = getGameUUID(_gameType, _rootClaim, _extraData);
        (, Timestamp timestamp, address proxy) = _disputeGames[uuid].unpack();
        (proxy_, timestamp_) = (IDisputeGame(proxy), timestamp);`, functions.games);

    // gameAtIndex
    c.addFunctionCode(`(GameType gameType, Timestamp timestamp, address proxy) = _disputeGameList[_index].unpack();
        (gameType_, timestamp_, proxy_) = (gameType, timestamp, IDisputeGame(proxy));`, functions.gameAtIndex);

    // create
    c.addFunctionCode(`// Grab the implementation contract for the given 'GameType'.
        IDisputeGame impl = gameImpls[_gameType];

        // If there is no implementation to clone for the given 'GameType', revert.
        if (address(impl) == address(0)) revert NoImplementation(_gameType);

        // If the required initialization bond is not met, revert.
        if (msg.value != initBonds[_gameType]) revert IncorrectBondAmount();

        // Get the hash of the parent block.
        bytes32 parentHash = blockhash(block.number - 1);

        // Clone the implementation contract and initialize it with the given parameters.
        //
        // CWIA Calldata Layout:
        // ┌──────────────┬────────────────────────────────────┐
        // │    Bytes     │            Description             │
        // ├──────────────┼────────────────────────────────────┤
        // │ [0, 20)      │ Game creator address               │
        // │ [20, 52)     │ Root claim                         │
        // │ [52, 84)     │ Parent block hash at creation time │
        // │ [84, 84 + n) │ Extra data (opaque)                │
        // └──────────────┴────────────────────────────────────┘
        proxy_ = IDisputeGame(address(impl).clone(abi.encodePacked(msg.sender, _rootClaim, parentHash, _extraData)));
        proxy_.initialize{ value: msg.value }();

        // Compute the unique identifier for the dispute game.
        Hash uuid = getGameUUID(_gameType, _rootClaim, _extraData);

        // If a dispute game with the same UUID already exists, revert.
        if (GameId.unwrap(_disputeGames[uuid]) != bytes32(0)) revert GameAlreadyExists(uuid);

        // Pack the game ID.
        GameId id = LibGameId.pack(_gameType, Timestamp.wrap(uint64(block.timestamp)), address(proxy_));

        // Store the dispute game id in the mapping & emit the 'DisputeGameCreated' event.
        _disputeGames[uuid] = id;
        _disputeGameList.push(id);
        emit DisputeGameCreated(address(proxy_), _gameType, _rootClaim);`, functions.create);


    // getGameUUID
    c.addFunctionCode(`uuid_ = Hash.wrap(keccak256(abi.encode(_gameType, _rootClaim, _extraData)));`, functions.getGameUUID);

    // findLatestGames
    c.addFunctionCode(`// If the '_start' index is greater than or equal to the game array length or '_n == 0', return an empty array.
        if (_start >= _disputeGameList.length || _n == 0) return games_;

        // Allocate enough memory for the full array, but start the array's length at '0'. We may not use all of the
        // memory allocated, but we don't know ahead of time the final size of the array.
        assembly {
            games_ := mload(0x40)
            mstore(0x40, add(games_, add(0x20, shl(0x05, _n))))
        }

        // Perform a reverse linear search for the '_n' most recent games of type '_gameType'.
        for (uint256 i = _start; i >= 0 && i <= _start;) {
            GameId id = _disputeGameList[i];
            (GameType gameType, Timestamp timestamp, address proxy) = id.unpack();

            if (gameType.raw() == _gameType.raw()) {
                // Increase the size of the 'games_' array by 1.
                // SAFETY: We can safely lazily allocate memory here because we pre-allocated enough memory for the max
                //         possible size of the array.
                assembly {
                    mstore(games_, add(mload(games_), 0x01))
                }

                bytes memory extraData = IDisputeGame(proxy).extraData();
                Claim rootClaim = IDisputeGame(proxy).rootClaim();
                games_[games_.length - 1] = GameSearchResult({
                    index: i,
                    metadata: id,
                    timestamp: timestamp,
                    rootClaim: rootClaim,
                    extraData: extraData
                });
                if (games_.length >= _n) break;
            }

            unchecked {
                i--;
            }
        }`, functions.findLatestGames);

    // setImplementation
    c.addModifier('onlyOwner', functions.setImplementation);
    c.addFunctionCode(`gameImpls[_gameType] = _impl;
        emit ImplementationSet(address(_impl), _gameType);`, functions.setImplementation);

    // setInitBond
    c.addModifier('onlyOwner', functions.setInitBond);
    c.addFunctionCode(`initBonds[_gameType] = _initBond;
        emit InitBondUpdated(_gameType, _initBond);`, functions.setInitBond);

    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({
    initialize: {
      kind: 'public' as const,
      args: [
          { name: '_owner', type: 'address' },
        ],
    },

    gameCount: {
        kind: 'external' as const,
        args: [
        ],
        returns: ['uint256 gameCount_'],
        mutability: 'view',
    },

    games: {
        kind: 'external' as const,
        args: [
            { name: '_gameType', type: 'GameType' },
            { name: '_rootClaim', type: 'Claim' },
            { name: '_extraData', type: 'bytes calldata' },
        ],
        returns: ['IDisputeGame proxy_', 'Timestamp timestamp_'],
        mutability: 'view',
    },

    gameAtIndex: {
        kind: 'external' as const,
        args: [
            { name: '_index', type: 'uint256' },
        ],
        returns: ['GameType gameType_', 'Timestamp timestamp_', 'IDisputeGame proxy_'],
        mutability: 'view',
    },


    create: {
        kind: 'external payable' as const,
        args: [
            { name: '_gameType', type: 'GameType' },
            { name: '_rootClaim', type: 'Claim' },
            { name: '_extraData', type: 'bytes calldata' },
        ],
        returns: ['IDisputeGame proxy_'],
    },


    getGameUUID: {
        kind: 'public' as const,
        args: [
            { name: '_gameType', type: 'GameType' },
            { name: '_rootClaim', type: 'Claim' },
            { name: '_extraData', type: 'bytes calldata' },
        ],
        returns: ['Hash uuid_'],
        mutability: 'pure',
    },

    findLatestGames: {
        kind: 'external' as const,
        args: [
            { name: '_gameType', type: 'GameType' },
            { name: '_start', type: 'uint256' },
            { name: '_n', type: 'uint256' },
        ],
        returns: ['GameSearchResult[] memory games_'],
        mutability: 'view',
    },

    setImplementation: {
        kind: 'external' as const,
        args: [
            { name: '_gameType', type: 'GameType' },
            { name: '_impl', type: 'IDisputeGame' },
        ],
        returns: [],
    },

    setInitBond: {
        kind: 'public' as const,
        args: [
            { name: '_gameType', type: 'GameType' },
            { name: '_initBond', type: 'uint256' },
        ],
        returns: [],
    },

});
import type { Contract, BaseModifier} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2H-option-optimism-portal2';
import type { SharedOptimismPortal2Options } from '../../shared//4-opchain-implementations/2H-option-optimism-portal2';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';


function withDefaults(opts: SharedOptimismPortal2Options): Required<SharedOptimismPortal2Options> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}


export function printOptimismPortal2(opts: SharedOptimismPortal2Options = commonDefaults): string {
  return printContract(buildOptimismPortal2(opts));
}

export function buildOptimismPortal2(opts: SharedOptimismPortal2Options): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const Initializable = {
        name: 'Initializable',
        path: '@redprint-openzeppelin/proxy/utils/Initializable.sol',
    };
    c.addParent(Initializable, []);

    const ResourceMetering = {
        name: 'ResourceMetering',
        path: '@redprint-core/L1/ResourceMetering.sol',
    };
    c.addParent(ResourceMetering);

    const SafeERC20 = {
        name: 'SafeERC20',
        path: '@redprint-openzeppelin/token/ERC20/utils/SafeERC20.sol',
    };
    c.addLibrary(SafeERC20, `IERC20`);

    const SafeCall = {
        name: 'SafeCall',
        path: '@redprint-core/libraries/SafeCall.sol',
    };
    c.addModule(SafeCall);

    const Constants = {
        name: 'Constants',
        path: '@redprint-core/libraries/Constants.sol',
    };
    c.addModule(Constants);

    const Types = {
        name: 'Types',
        path: '@redprint-core/libraries/Types.sol',
    };
    c.addModule(Types);

    const Hashing = {
        name: 'Hashing',
        path: '@redprint-core/libraries/Hashing.sol',
    };
    c.addModule(Hashing);

    const SecureMerkleTrie = {
        name: 'SecureMerkleTrie',
        path: '@redprint-core/libraries/trie/SecureMerkleTrie.sol',
    };
    c.addModule(SecureMerkleTrie);

    const Predeploys = {
        name: 'Predeploys',
        path: '@redprint-core/libraries/Predeploys.sol',
    };
    c.addModule(Predeploys);

    const AddressAliasHelper = {
        name: 'AddressAliasHelper',
        path: '@redprint-core/vendor/AddressAliasHelper.sol',
    };
    c.addModule(AddressAliasHelper);

    const PortalErrors = {
        name: '',
        path: '@redprint-core/libraries/PortalErrors.sol'
    };
    c.addModule(PortalErrors);

    const DisputeGameTypes = {
        name: '',
        path: '@redprint-core/dispute/lib/Types.sol'
    };
    c.addModule(DisputeGameTypes);

    const IERC20 = {
        name: 'IERC20',
        path: '@redprint-openzeppelin/token/ERC20/IERC20.sol',
    };
    c.addModule(IERC20);

    const ISemver = {
      name: 'ISemver',
      path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver);

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

    const IResourceMetering = {
        name: 'IResourceMetering',
        path: '@redprint-core/L1/interfaces/IResourceMetering.sol',
    };
    c.addModule(IResourceMetering);

    const ISuperchainConfig = {
      name: 'ISuperchainConfig',
      path: '@redprint-core/L1/interfaces/ISuperchainConfig.sol',
    };
    c.addModule(ISuperchainConfig);

    const IDisputeGameFactory = {
        name: 'IDisputeGameFactory',
        path: '@redprint-core/dispute/interfaces/IDisputeGameFactory.sol',
    };
    c.addModule(IDisputeGameFactory);

    const IDisputeGame = {
        name: 'IDisputeGame',
        path: '@redprint-core/dispute/interfaces/IDisputeGame.sol',
    };
    c.addModule(IDisputeGame);


    const IL1Block = {
        name: 'IL1Block',
        path: '@redprint-core/L2/interfaces/IL1Block.sol',
    };
    c.addModule(IL1Block);
    
    c.addVariable(`//// @notice Represents a proven withdrawal.
    /// @custom:field disputeGameProxy The address of the dispute game proxy that the withdrawal was proven against.
    /// @custom:field timestamp        Timestamp at whcih the withdrawal was proven.
    struct ProvenWithdrawal {
        IDisputeGame disputeGameProxy;
        uint64 timestamp;
    }`);

    c.addVariable(`/// @notice The delay between when a withdrawal transaction is proven and when it may be finalized.
    uint256 internal immutable PROOF_MATURITY_DELAY_SECONDS;`);

    c.addVariable(`/// @notice The delay between when a dispute game is resolved and when a withdrawal proven against it may be
    ///         finalized.
    uint256 internal immutable DISPUTE_GAME_FINALITY_DELAY_SECONDS;`);

    c.addVariable(`/// @notice Version of the deposit event.
    uint256 internal constant DEPOSIT_VERSION = 0;`);

    c.addVariable(`/// @notice The L2 gas limit set when eth is deposited using the receive() function.
    uint64 internal constant RECEIVE_DEFAULT_GAS_LIMIT = 100_000;`);

    c.addVariable(`/// @notice The L2 gas limit for system deposit transactions that are initiated from L1.
    uint32 internal constant SYSTEM_DEPOSIT_GAS_LIMIT = 200_000;`);

    c.addVariable(`/// @notice Address of the L2 account which initiated a withdrawal in this transaction.
    ///         If the of this variable is the default L2 sender address, then we are NOT inside of
    ///         a call to finalizeWithdrawalTransaction.
    address public l2Sender;`);

    c.addVariable(`/// @notice A list of withdrawal hashes which have been successfully finalized.
    mapping(bytes32 => bool) public finalizedWithdrawals;`);


    c.addVariable(`/// @custom:legacy
    /// @custom:spacer provenWithdrawals
    /// @notice Spacer taking up the legacy provenWithdrawals mapping slot.
    bytes32 private spacer_52_0_32;`);

    c.addVariable(`/// @custom:legacy
    /// @custom:spacer paused
    /// @notice Spacer for backwards compatibility.
    bool private spacer_53_0_1;`);

    c.addVariable(`/// @notice Contract of the Superchain Config.
    ISuperchainConfig public superchainConfig;`);

    c.addVariable(`/// @custom:legacy
    /// @custom:spacer l2Oracle
    /// @notice Spacer taking up the legacy l2Oracle address slot.
    address private spacer_54_0_20;`);

    c.addVariable(`/// @notice Contract of the SystemConfig.
        /// @custom:network-specific
        ISystemConfig public systemConfig;`);

    c.addVariable(`/// @notice Address of the DisputeGameFactory.
    /// @custom:network-specific
    IDisputeGameFactory public disputeGameFactory;`);
        

    c.addVariable(`/// @notice A mapping of withdrawal hashes to proof submitters to ProvenWithdrawal data.
    mapping(bytes32 => mapping(address => ProvenWithdrawal)) public provenWithdrawals;`);

    
    c.addVariable(`/// @notice A mapping of dispute game addresses to whether or not they are blacklisted.
    mapping(IDisputeGame => bool) public disputeGameBlacklist;`)

    c.addVariable(`/// @notice The game type that the OptimismPortal consults for output proposals.
    GameType public respectedGameType;`)

    c.addVariable(`/// @notice The timestamp at which the respected game type was last updated.
    uint64 public respectedGameTypeUpdatedAt;`)

    c.addVariable(`/// @notice Mapping of withdrawal hashes to addresses that have submitted a proof for the
    ///         withdrawal. Original OptimismPortal contract only allowed one proof to be submitted
    ///         for any given withdrawal hash. Fault Proofs version of this contract must allow
    ///         multiple proofs for the same withdrawal hash to prevent a malicious user from
    ///         blocking other withdrawals by proving them against invalid proposals. Submitters
    ///         are tracked in an array to simplify the off-chain process of determining which
    ///         proof submission should be used when finalizing a withdrawal.
    mapping(bytes32 => address[]) public proofSubmitters;`)

    c.addVariable(`/// @notice Represents the amount of native asset minted in L2. This may not
    ///         be 100% accurate due to the ability to send ether to the contract
    ///         without triggering a deposit transaction. It also is used to prevent
    ///         overflows for L2 account balances when custom gas tokens are used.
    ///         It is not safe to trust ERC20.balanceOf as it may lie.
    uint256 internal _balance;`)

    c.addVariable(`/// @notice Emitted when a transaction is deposited from L1 to L2.
    ///         The parameters of this event are read by the rollup node and used to derive deposit
    ///         transactions on L2.
    /// @param from       Address that triggered the deposit transaction.
    /// @param to         Address that the deposit transaction is directed to.
    /// @param version    Version of this deposit transaction event.
    /// @param opaqueData ABI encoded deposit data to be parsed off-chain.
    event TransactionDeposited(address indexed from, address indexed to, uint256 indexed version, bytes opaqueData);`)

    c.addVariable(`/// @notice Emitted when a withdrawal transaction is proven.
    /// @param withdrawalHash Hash of the withdrawal transaction.
    /// @param from           Address that triggered the withdrawal transaction.
    /// @param to             Address that the withdrawal transaction is directed to.
    event WithdrawalProven(bytes32 indexed withdrawalHash, address indexed from, address indexed to);`)

    c.addVariable(`/// @notice Emitted when a withdrawal transaction is proven. Exists as a separate event to allow for backwards
    ///         compatibility for tooling that observes the WithdrawalProven event.
    /// @param withdrawalHash Hash of the withdrawal transaction.
    /// @param proofSubmitter Address of the proof submitter.
    event WithdrawalProvenExtension1(bytes32 indexed withdrawalHash, address indexed proofSubmitter);`)

    c.addVariable(`/// @notice Emitted when a withdrawal transaction is finalized.
    /// @param withdrawalHash Hash of the withdrawal transaction.
    /// @param success        Whether the withdrawal transaction was successful.
    event WithdrawalFinalized(bytes32 indexed withdrawalHash, bool success);`)

    c.addVariable(`/// @notice Emitted when a dispute game is blacklisted by the Guardian.
    /// @param disputeGame Address of the dispute game that was blacklisted.
    event DisputeGameBlacklisted(IDisputeGame indexed disputeGame);`)


    c.addVariable(`/// @notice Emitted when the Guardian changes the respected game type in the portal.
    /// @param newGameType The new respected game type.
    /// @param updatedAt   The timestamp at which the respected game type was updated.
    event RespectedGameTypeSet(GameType indexed newGameType, Timestamp indexed updatedAt);`)


    const whenNotPaused : BaseModifier = getWhenNotPausedModifier();
    c.addModiferCode(`if (paused()) revert CallPaused();
        _;`, whenNotPaused)

    // version
    c.addModifier('virtual', functions.version);
    c.addFunctionCode(`return "3.11.0-beta.5";`, functions.version);


    c.addConstructorArgument({
        type: 'uint256',
        name: '_proofMaturityDelaySeconds'
    });
    c.addConstructorArgument({
        type: 'uint256',
        name: '_disputeGameFinalityDelaySeconds'
    });
        
    c.addConstructorCode(`PROOF_MATURITY_DELAY_SECONDS = _proofMaturityDelaySeconds;
        DISPUTE_GAME_FINALITY_DELAY_SECONDS = _disputeGameFinalityDelaySeconds;

        initialize({
            _disputeGameFactory: IDisputeGameFactory(address(0)),
            _systemConfig: ISystemConfig(address(0)),
            _superchainConfig: ISuperchainConfig(address(0)),
            _initialRespectedGameType: GameType.wrap(0)
        });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`disputeGameFactory = _disputeGameFactory;
        systemConfig = _systemConfig;
        superchainConfig = _superchainConfig;

        // Set the l2Sender slot, only if it is currently empty. This signals the first initialization of the
        // contract.
        if (l2Sender == address(0)) {
            l2Sender = Constants.DEFAULT_L2_SENDER;

            // Set the respectedGameTypeUpdatedAt timestamp, to ignore all games of the respected type prior
            // to this operation.
            respectedGameTypeUpdatedAt = uint64(block.timestamp);

            // Set the initial respected game type
            respectedGameType = _initialRespectedGameType;
        }

        __ResourceMetering_init();`, functions.initialize);


    // balance()
    c.addFunctionCode(`(address token,) = gasPayingToken();
        if (token == Constants.ETHER) {
            return address(this).balance;
        } else {
            return _balance;
        }`, functions.balance);


    // guardian()
    c.addFunctionCode(`return superchainConfig.guardian();`, functions.guardian);

    // paused()
    c.addFunctionCode(`paused_ = superchainConfig.paused();`, functions.paused);

    // proofMaturityDelaySeconds()
    c.addFunctionCode(`return PROOF_MATURITY_DELAY_SECONDS;`, functions.proofMaturityDelaySeconds);

    // disputeGameFinalityDelaySeconds()
    c.addFunctionCode(`return DISPUTE_GAME_FINALITY_DELAY_SECONDS;`, functions.disputeGameFinalityDelaySeconds);

    // minimumGasLimit()
    c.addFunctionCode(`return _byteCount * 16 + 21000;`, functions.minimumGasLimit);

    c.addReceiveCode(`depositTransaction(msg.sender, msg.value, RECEIVE_DEFAULT_GAS_LIMIT, false, bytes(""));`)

    // donateETH()
    c.addFunctionCode(`// Intentionally empty.`, functions.donateETH);

    // gasPayingToken()
    c.addFunctionCode(`(addr_, decimals_) = systemConfig.gasPayingToken();`, functions.gasPayingToken);

    // _resourceConfig()
    c.addModifier('override', functions._resourceConfig);
    c.addFunctionCode(`IResourceMetering.ResourceConfig memory config = systemConfig.resourceConfig();
        assembly ("memory-safe") {
            config_ := config
        }`, functions._resourceConfig);


    // proveWithdrawalTransaction()
    c.addModifier('whenNotPaused', functions.proveWithdrawalTransaction);
    c.addFunctionCode(`// Prevent users from creating a deposit transaction where this address is the message
        // sender on L2. Because this is checked here, we do not need to check again in
        // finalizeWithdrawalTransaction.
        if (_tx.target == address(this)) revert BadTarget();

        // Fetch the dispute game proxy from the DisputeGameFactory contract.
        (GameType gameType,, IDisputeGame gameProxy) = disputeGameFactory.gameAtIndex(_disputeGameIndex);
        Claim outputRoot = gameProxy.rootClaim();

        // The game type of the dispute game must be the respected game type.
        if (gameType.raw() != respectedGameType.raw()) revert InvalidGameType();

        // Verify that the output root can be generated with the elements in the proof.
        if (outputRoot.raw() != Hashing.hashOutputRootProof(_outputRootProof)) revert InvalidProof();

        // Load the ProvenWithdrawal into memory, using the withdrawal hash as a unique identifier.
        bytes32 withdrawalHash = Hashing.hashWithdrawal(_tx);

        // We do not allow for proving withdrawals against dispute games that have resolved against the favor
        // of the root claim.
        if (gameProxy.status() == GameStatus.CHALLENGER_WINS) revert InvalidDisputeGame();

        // Compute the storage slot of the withdrawal hash in the L2ToL1MessagePasser contract.
        // Refer to the Solidity documentation for more information on how storage layouts are
        // computed for mappings.
        bytes32 storageKey = keccak256(
            abi.encode(
                withdrawalHash,
                uint256(0) // The withdrawals mapping is at the first slot in the layout.
            )
        );

        // Verify that the hash of this withdrawal was stored in the L2toL1MessagePasser contract
        // on L2. If this is true, under the assumption that the SecureMerkleTrie does not have
        // bugs, then we know that this withdrawal was actually triggered on L2 and can therefore
        // be relayed on L1.
        if (
            SecureMerkleTrie.verifyInclusionProof({
                _key: abi.encode(storageKey),
                _value: hex"01",
                _proof: _withdrawalProof,
                _root: _outputRootProof.messagePasserStorageRoot
            }) == false
        ) revert InvalidMerkleProof();

        // Designate the withdrawalHash as proven by storing the disputeGameProxy & timestamp in the
        // provenWithdrawals mapping. A withdrawalHash can only be proven once unless the dispute game it proved
        // against resolves against the favor of the root claim.
        provenWithdrawals[withdrawalHash][msg.sender] =
            ProvenWithdrawal({ disputeGameProxy: gameProxy, timestamp: uint64(block.timestamp) });

        // Emit a WithdrawalProven event.
        emit WithdrawalProven(withdrawalHash, _tx.sender, _tx.target);
        // Emit a WithdrawalProvenExtension1 event.
        emit WithdrawalProvenExtension1(withdrawalHash, msg.sender);

        // Add the proof submitter to the list of proof submitters for this withdrawal hash.
        proofSubmitters[withdrawalHash].push(msg.sender);`, functions.proveWithdrawalTransaction);

    // finalizeWithdrawalTransaction()
    c.addModifier('whenNotPaused', functions.finalizeWithdrawalTransaction);
    c.addFunctionCode(`finalizeWithdrawalTransactionExternalProof(_tx, msg.sender);`, functions.finalizeWithdrawalTransaction);

    // finalizeWithdrawalTransactionExternalProof()
    c.addModifier('whenNotPaused', functions.finalizeWithdrawalTransactionExternalProof);
    c.addFunctionCode(`// Make sure that the l2Sender has not yet been set. The l2Sender is set to a value other
        // than the default value when a withdrawal transaction is being finalized. This check is
        // a defacto reentrancy guard.
        if (l2Sender != Constants.DEFAULT_L2_SENDER) revert NonReentrant();

        // Compute the withdrawal hash.
        bytes32 withdrawalHash = Hashing.hashWithdrawal(_tx);

        // Check that the withdrawal can be finalized.
        checkWithdrawal(withdrawalHash, _proofSubmitter);

        // Mark the withdrawal as finalized so it can't be replayed.
        finalizedWithdrawals[withdrawalHash] = true;

        // Set the l2Sender so contracts know who triggered this withdrawal on L2.
        l2Sender = _tx.sender;

        bool success;
        (address token,) = gasPayingToken();
        if (token == Constants.ETHER) {
            // Trigger the call to the target contract. We use a custom low level method
            // SafeCall.callWithMinGas to ensure two key properties
            //   1. Target contracts cannot force this call to run out of gas by returning a very large
            //      amount of data (and this is OK because we don't care about the returndata here).
            //   2. The amount of gas provided to the execution context of the target is at least the
            //      gas limit specified by the user. If there is not enough gas in the current context
            //      to accomplish this, callWithMinGas will revert.
            success = SafeCall.callWithMinGas(_tx.target, _tx.gasLimit, _tx.value, _tx.data);
        } else {
            // Cannot call the token contract directly from the portal. This would allow an attacker
            // to call approve from a withdrawal and drain the balance of the portal.
            if (_tx.target == token) revert BadTarget();

            // Only transfer value when a non zero value is specified. This saves gas in the case of
            // using the standard bridge or arbitrary message passing.
            if (_tx.value != 0) {
                // Update the contracts internal accounting of the amount of native asset in L2.
                _balance -= _tx.value;

                // Read the balance of the target contract before the transfer so the consistency
                // of the transfer can be checked afterwards.
                uint256 startBalance = IERC20(token).balanceOf(address(this));

                // Transfer the ERC20 balance to the target, accounting for non standard ERC20
                // implementations that may not return a boolean. This reverts if the low level
                // call is not successful.
                IERC20(token).safeTransfer({ to: _tx.target, value: _tx.value });

                // The balance must be transferred exactly.
                if (IERC20(token).balanceOf(address(this)) != startBalance - _tx.value) {
                    revert TransferFailed();
                }
            }

            // Make a call to the target contract only if there is calldata.
            if (_tx.data.length != 0) {
                success = SafeCall.callWithMinGas(_tx.target, _tx.gasLimit, 0, _tx.data);
            } else {
                success = true;
            }
        }

        // Reset the l2Sender back to the default value.
        l2Sender = Constants.DEFAULT_L2_SENDER;

        // All withdrawals are immediately finalized. Replayability can
        // be achieved through contracts built on top of this contract
        emit WithdrawalFinalized(withdrawalHash, success);

        // Reverting here is useful for determining the exact gas cost to successfully execute the
        // sub call to the target contract if the minimum gas limit specified by the user would not
        // be sufficient to execute the sub call.
        if (!success && tx.origin == Constants.ESTIMATION_ADDRESS) {
            revert GasEstimation();
        }`, functions.finalizeWithdrawalTransactionExternalProof);

    // depositERC20Transaction()
    c.addModifier('metered(_gasLimit)', functions.depositERC20Transaction);
    c.addFunctionCode(`// Can only be called if an ERC20 token is used for gas paying on L2
        (address token,) = gasPayingToken();
        if (token == Constants.ETHER) revert OnlyCustomGasToken();

        // Gives overflow protection for L2 account balances.
        _balance += _mint;

        // Get the balance of the portal before the transfer.
        uint256 startBalance = IERC20(token).balanceOf(address(this));

        // Take ownership of the token. It is assumed that the user has given the portal an approval.
        IERC20(token).safeTransferFrom({ from: msg.sender, to: address(this), value: _mint });

        // Double check that the portal now has the exact amount of token.
        if (IERC20(token).balanceOf(address(this)) != startBalance + _mint) {
            revert TransferFailed();
        }

        _depositTransaction({
            _to: _to,
            _mint: _mint,
            _value: _value,
            _gasLimit: _gasLimit,
            _isCreation: _isCreation,
            _data: _data
        });`, functions.depositERC20Transaction);


    // depositTransaction()
    c.addModifier('payable metered(_gasLimit)', functions.depositTransaction);
    c.addFunctionCode(`(address token,) = gasPayingToken();
        if (token != Constants.ETHER && msg.value != 0) revert NoValue();

        _depositTransaction({
            _to: _to,
            _mint: msg.value,
            _value: _value,
            _gasLimit: _gasLimit,
            _isCreation: _isCreation,
            _data: _data
        });`, functions.depositTransaction);

    // _depositTransaction()
    c.addFunctionCode(`// Just to be safe, make sure that people specify address(0) as the target when doing
        // contract creations.
        if (_isCreation && _to != address(0)) revert BadTarget();

        // Prevent depositing transactions that have too small of a gas limit. Users should pay
        // more for more resource usage.
        if (_gasLimit < minimumGasLimit(uint64(_data.length))) revert SmallGasLimit();

        // Prevent the creation of deposit transactions that have too much calldata. This gives an
        // upper limit on the size of unsafe blocks over the p2p network. 120kb is chosen to ensure
        // that the transaction can fit into the p2p network policy of 128kb even though deposit
        // transactions are not gossipped over the p2p network.
        if (_data.length > 120_000) revert LargeCalldata();

        // Transform the from-address to its alias if the caller is a contract.
        address from = msg.sender;
        if (msg.sender != tx.origin) {
            from = AddressAliasHelper.applyL1ToL2Alias(msg.sender);
        }

        // Compute the opaque data that will be emitted as part of the TransactionDeposited event.
        // We use opaque data so that we can update the TransactionDeposited event in the future
        // without breaking the current interface.
        bytes memory opaqueData = abi.encodePacked(_mint, _value, _gasLimit, _isCreation, _data);

        // Emit a TransactionDeposited event so that the rollup node can derive a deposit
        // transaction for this deposit.
        emit TransactionDeposited(from, _to, DEPOSIT_VERSION, opaqueData);`, functions._depositTransaction);

    // setGasPayingToken()
    c.addFunctionCode(`if (msg.sender != address(systemConfig)) revert Unauthorized();

        // Set L2 deposit gas as used without paying burning gas. Ensures that deposits cannot use too much L2 gas.
        // This value must be large enough to cover the cost of calling L1Block.setGasPayingToken.
        useGas(SYSTEM_DEPOSIT_GAS_LIMIT);

        // Emit the special deposit transaction directly that sets the gas paying
        // token in the L1Block predeploy contract.
        emit TransactionDeposited(
            Constants.DEPOSITOR_ACCOUNT,
            Predeploys.L1_BLOCK_ATTRIBUTES,
            DEPOSIT_VERSION,
            abi.encodePacked(
                uint256(0), // mint
                uint256(0), // value
                uint64(SYSTEM_DEPOSIT_GAS_LIMIT), // gasLimit
                false, // isCreation,
                abi.encodeCall(IL1Block.setGasPayingToken, (_token, _decimals, _name, _symbol))
            )
        );`, functions.setGasPayingToken);

    // blacklistDisputeGame()
    c.addFunctionCode(`if (msg.sender != guardian()) revert Unauthorized();
        disputeGameBlacklist[_disputeGame] = true;
        emit DisputeGameBlacklisted(_disputeGame);`, functions.blacklistDisputeGame);

    // setRespectedGameType()
    c.addFunctionCode(`if (msg.sender != guardian()) revert Unauthorized();
        respectedGameType = _gameType;
        respectedGameTypeUpdatedAt = uint64(block.timestamp);
        emit RespectedGameTypeSet(_gameType, Timestamp.wrap(respectedGameTypeUpdatedAt));`, functions.setRespectedGameType);

    // checkWithdrawal()
    c.addFunctionCode(`ProvenWithdrawal memory provenWithdrawal = provenWithdrawals[_withdrawalHash][_proofSubmitter];
        IDisputeGame disputeGameProxy = provenWithdrawal.disputeGameProxy;

        // The dispute game must not be blacklisted.
        if (disputeGameBlacklist[disputeGameProxy]) revert Blacklisted();

        // A withdrawal can only be finalized if it has been proven. We know that a withdrawal has
        // been proven at least once when its timestamp is non-zero. Unproven withdrawals will have
        // a timestamp of zero.
        if (provenWithdrawal.timestamp == 0) revert Unproven();

        uint64 createdAt = disputeGameProxy.createdAt().raw();

        // As a sanity check, we make sure that the proven withdrawal's timestamp is greater than
        // starting timestamp inside the Dispute Game. Not strictly necessary but extra layer of
        // safety against weird bugs in the proving step.
        require(
            provenWithdrawal.timestamp > createdAt,
            "OptimismPortal: withdrawal timestamp less than dispute game creation timestamp"
        );

        // A proven withdrawal must wait at least PROOF_MATURITY_DELAY_SECONDS before finalizing.
        require(
            block.timestamp - provenWithdrawal.timestamp > PROOF_MATURITY_DELAY_SECONDS,
            "OptimismPortal: proven withdrawal has not matured yet"
        );

        // A proven withdrawal must wait until the dispute game it was proven against has been
        // resolved in favor of the root claim (the output proposal). This is to prevent users
        // from finalizing withdrawals proven against non-finalized output roots.
        if (disputeGameProxy.status() != GameStatus.DEFENDER_WINS) revert ProposalNotValidated();

        // The game type of the dispute game must be the respected game type. This was also checked in
        // proveWithdrawalTransaction, but we check it again in case the respected game type has changed since
        // the withdrawal was proven.
        if (disputeGameProxy.gameType().raw() != respectedGameType.raw()) revert InvalidGameType();

        // The game must have been created after respectedGameTypeUpdatedAt. This is to prevent users from creating
        // invalid disputes against a deployed game type while the off-chain challenge agents are not watching.
        require(
            createdAt >= respectedGameTypeUpdatedAt,
            "OptimismPortal: dispute game created before respected game type was updated"
        );

        // Before a withdrawal can be finalized, the dispute game it was proven against must have been
        // resolved for at least DISPUTE_GAME_FINALITY_DELAY_SECONDS. This is to allow for manual
        // intervention in the event that a dispute game is resolved incorrectly.
        require(
            block.timestamp - disputeGameProxy.resolvedAt().raw() > DISPUTE_GAME_FINALITY_DELAY_SECONDS,
            "OptimismPortal: output proposal in air-gap"
        );

        // Check that this withdrawal has not already been finalized, this is replay protection.
        if (finalizedWithdrawals[_withdrawalHash]) revert AlreadyFinalized();`, functions.checkWithdrawal);


    // numProofSubmitters()
    c.addFunctionCode(`return proofSubmitters[_withdrawalHash].length;`, functions.numProofSubmitters);


    setInfo(c, allOpts.contractInfo);
    return c;
}

function getWhenNotPausedModifier() {
    const mod = {
      name: 'whenNotPaused',
      args: [],
    };
  
    return mod;
}

const functions = defineFunctions({

    version: {
        kind: 'public' as const,
        args: [
        ],
        returns: ['string memory'],
        mutability: 'pure',
    },

    initialize: {
      kind: 'public' as const,
      args: [
        { name: '_disputeGameFactory', type: 'IDisputeGameFactory' },
        { name: '_systemConfig', type: 'ISystemConfig' },
        { name: '_superchainConfig', type: 'ISuperchainConfig' },
        { name: '_initialRespectedGameType', type: 'GameType' },
      ],
    },

    balance : {
        kind: 'public' as const,
        args: [],
        returns: ['uint256'],
        mutability: 'view',
    },

    guardian : {
        kind: 'public' as const,
        args: [],
        returns: ['address'],
        mutability: 'view',
    },

    paused : {
        kind: 'public' as const,
        args: [],
        returns: ['bool paused_'],
        mutability: 'view',
    },

    proofMaturityDelaySeconds : {
        kind: 'public' as const,
        args: [],
        returns: ['uint256'],
        mutability: 'view',
    },

    disputeGameFinalityDelaySeconds : {
        kind: 'public' as const,
        args: [],
        returns: ['uint256'],
        mutability: 'view',
    },

    
    minimumGasLimit : {
        kind: 'public' as const,
        args: [
            { name: '_byteCount', type: 'uint64' },
        ],
        returns: ['uint64'],
        mutability: 'pure',
    },

    donateETH : {
        kind: 'external payable' as const,
        args: [],
    },

    gasPayingToken : {
        kind: 'internal' as const,
        args: [],
        returns: ['address addr_', 'uint8 decimals_'],
        mutability: 'view',
    },

    _resourceConfig : {
        kind: 'internal' as const,
        args: [],
        returns: ['ResourceMetering.ResourceConfig memory config_'],
        mutability: 'view',
    },

    proveWithdrawalTransaction : {
        kind: 'external' as const,
        args: [
            { name: '_tx', type: 'Types.WithdrawalTransaction memory' },
            { name: '_disputeGameIndex', type: 'uint256' },
            { name: '_outputRootProof', type: 'Types.OutputRootProof calldata' },
            { name: '_withdrawalProof', type: 'bytes[] calldata' },
        ],
    },

    finalizeWithdrawalTransaction : {
        kind: 'external' as const,
        args: [
            { name: '_tx', type: 'Types.WithdrawalTransaction memory' },
        ],
    },

    finalizeWithdrawalTransactionExternalProof : {
        kind: 'public' as const,
        args: [
            { name: '_tx', type: 'Types.WithdrawalTransaction memory' },
            { name: '_proofSubmitter', type: 'address' },
        ],
    },

    depositERC20Transaction : {
        kind: 'public' as const,
        args: [
            { name: '_to', type: 'address' },
            { name: '_mint', type: 'uint256' },
            { name: '_value', type: 'uint256' },
            { name: '_gasLimit', type: 'uint64' },
            { name: '_isCreation', type: 'bool' },
            { name: '_data', type: 'bytes memory' },
        ],
    },

    depositTransaction : {
        kind: 'public' as const,
        args: [
            { name: '_to', type: 'address' },
            { name: '_value', type: 'uint256' },
            { name: '_gasLimit', type: 'uint64' },
            { name: '_isCreation', type: 'bool' },
            { name: '_data', type: 'bytes memory' },
        ],
    },

    _depositTransaction : {
        kind: 'internal' as const,
        args: [
            { name: '_to', type: 'address' },
            { name: '_mint', type: 'uint256' },
            { name: '_value', type: 'uint256' },
            { name: '_gasLimit', type: 'uint64' },
            { name: '_isCreation', type: 'bool' },
            { name: '_data', type: 'bytes memory' },
        ],
    },

    setGasPayingToken : {
        kind: 'external' as const,
        args: [
            { name: '_token', type: 'address' },
            { name: '_decimals', type: 'uint8' },
            { name: '_name', type: 'bytes32' },
            { name: '_symbol', type: 'bytes32' },
        ],
    },

    blacklistDisputeGame : {
        kind: 'external' as const,
        args: [
            { name: '_disputeGame', type: 'IDisputeGame' },
        ],
    },

    setRespectedGameType : {
        kind: 'external' as const,
        args: [
            { name: '_gameType', type: 'GameType' },
        ],
    },

    checkWithdrawal : {
        kind: 'public' as const,
        args: [
            { name: '_withdrawalHash', type: 'bytes32' },
            { name: '_proofSubmitter', type: 'address' },
        ],
        mutability: 'view',
    },

    numProofSubmitters : {
        kind: 'external' as const,
        args: [
            { name: '_withdrawalHash', type: 'bytes32' },
        ],
        returns: ['uint256'],
        mutability: 'view',
    },
    
});
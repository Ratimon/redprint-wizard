import type { Contract, BaseModifier} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2F-option-optimism-portal';
import type { SharedOptimismPortalOptions } from '../../shared//4-opchain-implementations/2F-option-optimism-portal';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';


function withDefaults(opts: SharedOptimismPortalOptions): Required<SharedOptimismPortalOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}


export function printOptimismPortal(opts: SharedOptimismPortalOptions = commonDefaults): string {
  return printContract(buildOptimismPortal(opts));
}

export function buildOptimismPortal(opts: SharedOptimismPortalOptions): Contract {
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

    const IL1Block = {
        name: 'IL1Block',
        path: '@redprint-core/L2/interfaces/IL1Block.sol',
    };
    c.addModule(IL1Block);
    
    c.addVariable(`/// @notice Represents a proven withdrawal.
    /// @custom:field outputRoot    Root of the L2 output this was proven against.
    /// @custom:field timestamp     Timestamp at whcih the withdrawal was proven.
    /// @custom:field l2OutputIndex Index of the output this was proven against.
    struct ProvenWithdrawal {
        bytes32 outputRoot;
        uint128 timestamp;
        uint128 l2OutputIndex;
    }`);

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

    c.addVariable(`/// @notice A mapping of withdrawal hashes to ProvenWithdrawal data.
    mapping(bytes32 => ProvenWithdrawal) public provenWithdrawals;`);

    c.addVariable(`/// @custom:legacy
    /// @custom:spacer paused
    /// @notice Spacer for backwards compatibility.
    bool private spacer_53_0_1;`);

    c.addVariable(`/// @notice Contract of the Superchain Config.
    ISuperchainConfig public superchainConfig;`);

    c.addVariable(`/// @notice Contract of the L2OutputOracle.
    /// @custom:network-specific
    IL2OutputOracle public l2Oracle;`);

    c.addVariable(`//// @notice Contract of the SystemConfig.
    /// @custom:network-specific
    ISystemConfig public systemConfig;`)

    c.addVariable(`/// @custom:spacer disputeGameFactory
    /// @notice Spacer for backwards compatibility.
    address private spacer_56_0_20;

    /// @custom:spacer provenWithdrawals
    /// @notice Spacer for backwards compatibility.
    bytes32 private spacer_57_0_32;

    /// @custom:spacer disputeGameBlacklist
    /// @notice Spacer for backwards compatibility.
    bytes32 private spacer_58_0_32;

    /// @custom:spacer respectedGameType + respectedGameTypeUpdatedAt
    /// @notice Spacer for backwards compatibility.
    bytes32 private spacer_59_0_32;

    /// @custom:spacer proofSubmitters
    /// @notice Spacer for backwards compatibility.
    bytes32 private spacer_60_0_32;`)

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

    c.addVariable(`/// @notice Emitted when a withdrawal transaction is finalized.
    /// @param withdrawalHash Hash of the withdrawal transaction.
    /// @param success        Whether the withdrawal transaction was successful.
    event WithdrawalFinalized(bytes32 indexed withdrawalHash, bool success);`)


    const whenNotPaused : BaseModifier = getWhenNotPausedModifier();
    c.addModiferCode(`if (paused()) revert CallPaused();
        _;`, whenNotPaused)

    // version
    c.addModifier('virtual', functions.version);
    c.addFunctionCode(`return "2.8.1-beta.3";`, functions.version);
        

    c.addConstructorCode(`initialize({
            _l2Oracle: IL2OutputOracle(address(0)),
            _systemConfig: ISystemConfig(address(0)),
            _superchainConfig: ISuperchainConfig(address(0))
        });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`l2Oracle = _l2Oracle;
        systemConfig = _systemConfig;
        superchainConfig = _superchainConfig;
        if (l2Sender == address(0)) {
            l2Sender = Constants.DEFAULT_L2_SENDER;
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
        return ResourceConfig({
            maxResourceLimit: config.maxResourceLimit,
            elasticityMultiplier: config.elasticityMultiplier,
            baseFeeMaxChangeDenominator: config.baseFeeMaxChangeDenominator,
            minimumBaseFee: config.minimumBaseFee,
            systemTxMaxGas: config.systemTxMaxGas,
            maximumBaseFee: config.maximumBaseFee
        });`, functions._resourceConfig);


    // proveWithdrawalTransaction()
    c.addModifier('whenNotPaused', functions.proveWithdrawalTransaction);
    c.addFunctionCode(`// Prevent users from creating a deposit transaction where this address is the message
        // sender on L2. Because this is checked here, we do not need to check again in
        // finalizeWithdrawalTransaction.
        if (_tx.target == address(this)) revert BadTarget();

        // Get the output root and load onto the stack to prevent multiple mloads. This will
        // revert if there is no output root for the given block number.
        bytes32 outputRoot = l2Oracle.getL2Output(_l2OutputIndex).outputRoot;

        // Verify that the output root can be generated with the elements in the proof.
        require(
            outputRoot == Hashing.hashOutputRootProof(_outputRootProof), "OptimismPortal: invalid output root proof"
        );

        // Load the ProvenWithdrawal into memory, using the withdrawal hash as a unique identifier.
        bytes32 withdrawalHash = Hashing.hashWithdrawal(_tx);
        ProvenWithdrawal memory provenWithdrawal = provenWithdrawals[withdrawalHash];

        // We generally want to prevent users from proving the same withdrawal multiple times
        // because each successive proof will update the timestamp. A malicious user can take
        // advantage of this to prevent other users from finalizing their withdrawal. However,
        // since withdrawals are proven before an output root is finalized, we need to allow users
        // to re-prove their withdrawal only in the case that the output root for their specified
        // output index has been updated.
        require(
            provenWithdrawal.timestamp == 0
                || l2Oracle.getL2Output(provenWithdrawal.l2OutputIndex).outputRoot != provenWithdrawal.outputRoot,
            "OptimismPortal: withdrawal hash has already been proven"
        );

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
        require(
            SecureMerkleTrie.verifyInclusionProof({
                _key: abi.encode(storageKey),
                _value: hex"01",
                _proof: _withdrawalProof,
                _root: _outputRootProof.messagePasserStorageRoot
            }),
            "OptimismPortal: invalid withdrawal inclusion proof"
        );

        // Designate the withdrawalHash as proven by storing the outputRoot, timestamp, and
        // l2BlockNumber in the provenWithdrawals mapping. A withdrawalHash can only be
        // proven once unless it is submitted again with a different outputRoot.
        provenWithdrawals[withdrawalHash] = ProvenWithdrawal({
            outputRoot: outputRoot,
            timestamp: uint128(block.timestamp),
            l2OutputIndex: uint128(_l2OutputIndex)
        });

        // Emit a WithdrawalProven event.
        emit WithdrawalProven(withdrawalHash, _tx.sender, _tx.target);`, functions.proveWithdrawalTransaction);

    // finalizeWithdrawalTransaction()
    c.addModifier('whenNotPaused', functions.finalizeWithdrawalTransaction);
    c.addFunctionCode(`// Make sure that the l2Sender has not yet been set. The l2Sender is set to a value other
        // than the default value when a withdrawal transaction is being finalized. This check is
        // a defacto reentrancy guard.
        if (l2Sender != Constants.DEFAULT_L2_SENDER) revert NonReentrant();

        // Grab the proven withdrawal from the provenWithdrawals map.
        bytes32 withdrawalHash = Hashing.hashWithdrawal(_tx);
        ProvenWithdrawal memory provenWithdrawal = provenWithdrawals[withdrawalHash];

        // A withdrawal can only be finalized if it has been proven. We know that a withdrawal has
        // been proven at least once when its timestamp is non-zero. Unproven withdrawals will have
        // a timestamp of zero.
        require(provenWithdrawal.timestamp != 0, "OptimismPortal: withdrawal has not been proven yet");

        // As a sanity check, we make sure that the proven withdrawal's timestamp is greater than
        // starting timestamp inside the L2OutputOracle. Not strictly necessary but extra layer of
        // safety against weird bugs in the proving step.
        require(
            provenWithdrawal.timestamp >= l2Oracle.startingTimestamp(),
            "OptimismPortal: withdrawal timestamp less than L2 Oracle starting timestamp"
        );

        // A proven withdrawal must wait at least the finalization period before it can be
        // finalized. This waiting period can elapse in parallel with the waiting period for the
        // output the withdrawal was proven against. In effect, this means that the minimum
        // withdrawal time is proposal submission time + finalization period.
        require(
            _isFinalizationPeriodElapsed(provenWithdrawal.timestamp),
            "OptimismPortal: proven withdrawal finalization period has not elapsed"
        );

        // Grab the OutputProposal from the L2OutputOracle, will revert if the output that
        // corresponds to the given index has not been proposed yet.
        Types.OutputProposal memory proposal = l2Oracle.getL2Output(provenWithdrawal.l2OutputIndex);

        // Check that the output root that was used to prove the withdrawal is the same as the
        // current output root for the given output index. An output root may change if it is
        // deleted by the challenger address and then re-proposed.
        require(
            proposal.outputRoot == provenWithdrawal.outputRoot,
            "OptimismPortal: output root proven is not the same as current output root"
        );

        // Check that the output proposal has also been finalized.
        require(
            _isFinalizationPeriodElapsed(proposal.timestamp),
            "OptimismPortal: output proposal finalization period has not elapsed"
        );

        // Check that this withdrawal has not already been finalized, this is replay protection.
        require(finalizedWithdrawals[withdrawalHash] == false, "OptimismPortal: withdrawal has already been finalized");

        // Mark the withdrawal as finalized so it can't be replayed.
        finalizedWithdrawals[withdrawalHash] = true;

        // Set the l2Sender so contracts know who triggered this withdrawal on L2.
        // This acts as a reentrancy guard.
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
        if (success == false && tx.origin == Constants.ESTIMATION_ADDRESS) {
            revert GasEstimation();
        }`, functions.finalizeWithdrawalTransaction);

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
    c.addFunctionCode(` // Just to be safe, make sure that people specify address(0) as the target when doing
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

    // isOutputFinalized()
    c.addFunctionCode(`return _isFinalizationPeriodElapsed(l2Oracle.getL2Output(_l2OutputIndex).timestamp);`, functions.isOutputFinalized);

    // _isFinalizationPeriodElapsed()
    c.addFunctionCode(`return block.timestamp > _timestamp + l2Oracle.FINALIZATION_PERIOD_SECONDS();`, functions._isFinalizationPeriodElapsed);


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
        { name: '_l2Oracle', type: 'IL2OutputOracle' },
        { name: '_systemConfig', type: 'ISystemConfig' },
        { name: '_superchainConfig', type: 'ISuperchainConfig' },
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
        returns: ['ResourceConfig memory'],
        mutability: 'view',
    },

    proveWithdrawalTransaction : {
        kind: 'external' as const,
        args: [
            { name: '_tx', type: 'Types.WithdrawalTransaction memory' },
            { name: '_l2OutputIndex', type: 'uint256' },
            { name: '_outputRootProof', type: 'Types.OutputRootProof calldata' },
            { name: '_withdrawalProof', type: 'bytes[] calldata' },
        ],
    },

    finalizeWithdrawalTransaction : {
        kind: 'external' as const,
        args: [
            { name: '_tx', type: 'Types.WithdrawalTransaction memory' },
        ],
        returns: [],
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

    isOutputFinalized : {
        kind: 'external' as const,
        args: [
            { name: '_l2OutputIndex', type: 'uint256' },
        ],
        returns: ['bool'],
        mutability: 'view',
    },

    _isFinalizationPeriodElapsed : {
        kind: 'internal' as const,
        args: [
            { name: '_timestamp', type: 'uint256' },
        ],
        returns: ['bool'],
        mutability: 'view',
    },

    
  });
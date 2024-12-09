import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/3-plasmachain/1B-option-data-availability-challenge";
import type { SharedDataAvailabilityChallengeOptions } from '../../shared/3-plasmachain/1B-option-data-availability-challenge';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedDataAvailabilityChallengeOptions): Required<SharedDataAvailabilityChallengeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printDataAvailabilityChallenge(opts: SharedDataAvailabilityChallengeOptions = commonDefaults): string {
  return printContract(buildDataAvailabilityChallenge(opts));
}

export function buildDataAvailabilityChallenge(opts: SharedDataAvailabilityChallengeOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);


    const OwnableUpgradeable = {
        name: 'OwnableUpgradeable',
        path: '@redprint-openzeppelin-upgradeable/access/OwnableUpgradeable.sol',
    };
    c.addParent(OwnableUpgradeable, [{ lit: '' }]);

    const SafeCall = {
      name: 'SafeCall',
      path: '@redprint-core/libraries/SafeCall.sol',
    };
    c.addModule(SafeCall);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addModule(ISemver);

    c.addOutsidecode(`/// @dev An enum representing the status of a DA challenge.
enum ChallengeStatus {
    Uninitialized,
    Active,
    Resolved,
    Expired
}`)

    c.addOutsidecode(`/// @dev An enum representing known commitment types.
enum CommitmentType {
    Keccak256
}`)

    c.addOutsidecode(`/// @dev A struct representing a single DA challenge.
/// @custom:field status The status of the challenge.
/// @custom:field challenger The address that initiated the challenge.
/// @custom:field startBlock The block number at which the challenge was initiated.
struct Challenge {
    address challenger;
    uint256 lockedBond;
    uint256 startBlock;
    uint256 resolvedBlock;
}`)

c.addOutsidecode(`/// @notice Compute the expected commitment for a given blob of data.
/// @param _data The blob of data to compute a commitment for.
/// @return The commitment for the given blob of data.
function computeCommitmentKeccak256(bytes memory _data) pure returns (bytes memory) {
    return bytes.concat(bytes1(uint8(CommitmentType.Keccak256)), keccak256(_data));
}`)

    c.addVariable(`/// @notice Error for when the provided resolver refund percentage exceeds 100%.
    error InvalidResolverRefundPercentage(uint256 invalidResolverRefundPercentage);`);
    
    c.addVariable(`/// @notice Error for when the challenger's bond is too low.
    error BondTooLow(uint256 balance, uint256 required);`);

    c.addVariable(`/// @notice Error for when attempting to challenge a commitment that already has a challenge.
    error ChallengeExists();`);

    c.addVariable(`/// @notice Error for when attempting to resolve a challenge that is not active.
    error ChallengeNotActive();`);

    c.addVariable(`/// @notice Error for when attempting to unlock a bond from a challenge that is not expired.
    error ChallengeNotExpired();`);

    c.addVariable(`/// @notice Error for when attempting to challenge a commitment that is not in the challenge window.
    error ChallengeWindowNotOpen();`);

    c.addVariable(`/// @notice Error for when the provided input data doesn't match the commitment.
    error InvalidInputData(bytes providedDataCommitment, bytes expectedCommitment);`);

    c.addVariable(`/// @notice Error for when the call to withdraw a bond failed.
    error WithdrawalFailed();`);

    c.addVariable(`/// @notice Error for when a the type of a given commitment is unknown
    error UnknownCommitmentType(uint8 commitmentType);`);

    c.addVariable(`/// @notice Error for when the commitment length does not match the commitment type
    error InvalidCommitmentLength(uint8 commitmentType, uint256 expectedLength, uint256 actualLength);`);

    c.addVariable(`/// @notice An event that is emitted when the status of a challenge changes.
    /// @param challengedCommitment The commitment that is being challenged.
    /// @param challengedBlockNumber The block number at which the commitment was made.
    /// @param status The new status of the challenge.
    event ChallengeStatusChanged(
        uint256 indexed challengedBlockNumber, bytes challengedCommitment, ChallengeStatus status
    );

    /// @notice An event that is emitted when the bond size required to initiate a challenge changes.
    event RequiredBondSizeChanged(uint256 challengeWindow);

    /// @notice An event that is emitted when the percentage of the resolving cost to be refunded to the resolver
    /// changes.
    event ResolverRefundPercentageChanged(uint256 resolverRefundPercentage);

    /// @notice An event that is emitted when a user's bond balance changes.
    event BalanceChanged(address account, uint256 balance);`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 1.0.1-beta.2
    string public constant version = "1.0.1-beta.2";

    /// @notice The fixed cost of resolving a challenge.
    /// @dev The value is estimated by measuring the cost of resolving with 'bytes(0)'
    uint256 public constant fixedResolutionCost = 72925;

    /// @notice The variable cost of resolving a callenge per byte scaled by the variableResolutionCostPrecision.
    /// @dev upper limit; The value is estimated by measuring the cost of resolving with variable size data where each
    /// byte is non-zero.
    uint256 public constant variableResolutionCost = 16640;

    /// @dev The precision of the variable resolution cost.
    uint256 public constant variableResolutionCostPrecision = 1000;

    /// @notice The block interval during which a commitment can be challenged.
    uint256 public challengeWindow;

    /// @notice The block interval during which a challenge can be resolved.
    uint256 public resolveWindow;

    /// @notice The amount required to post a challenge.
    uint256 public bondSize;

    /// @notice The percentage of the resolving cost to be refunded to the resolver.
    /// @dev There are no decimals, ie a value of 50 corresponds to 50%.
    uint256 public resolverRefundPercentage;

    /// @notice A mapping from addresses to their bond balance in the contract.
    mapping(address => uint256) public balances;

    /// @notice A mapping from challenged block numbers to challenged commitments to challenges.
    mapping(uint256 => mapping(bytes => Challenge)) internal challenges;`);

    
    c.addConstructorCode(`initialize({
            _owner: address(0xdEaD),
            _challengeWindow: 0,
            _resolveWindow: 0,
            _bondSize: 0,
            _resolverRefundPercentage: 0
        });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`__Ownable_init();
        challengeWindow = _challengeWindow;
        resolveWindow = _resolveWindow;
        setBondSize(_bondSize);
        setResolverRefundPercentage(_resolverRefundPercentage);
        _transferOwnership(_owner);`, functions.initialize);


    // setBondSize
    c.addModifier('onlyOwner', functions.setBondSize);
    c.addFunctionCode(`bondSize = _bondSize;
        emit RequiredBondSizeChanged(_bondSize);`, functions.setBondSize);

    // setResolverRefundPercentage
    c.addModifier('onlyOwner', functions.setResolverRefundPercentage);
    c.addFunctionCode(`if (_resolverRefundPercentage > 100) {
            revert InvalidResolverRefundPercentage(_resolverRefundPercentage);
        }
        resolverRefundPercentage = _resolverRefundPercentage;`, functions.setResolverRefundPercentage);

    c.addReceiveCode(`deposit();`)

    // deposit
    c.addModifier('payable', functions.deposit);
    c.addFunctionCode(`balances[msg.sender] += msg.value;
        emit BalanceChanged(msg.sender, balances[msg.sender]);`, functions.deposit);

    // withdraw
    c.addFunctionCode(`// get caller's balance
        uint256 balance = balances[msg.sender];

        // set caller's balance to 0
        balances[msg.sender] = 0;
        emit BalanceChanged(msg.sender, 0);

        // send caller's balance to caller
        bool success = SafeCall.send(msg.sender, gasleft(), balance);
        if (!success) {
            revert WithdrawalFailed();
        }`, functions.withdraw);

    // _isInChallengeWindow
    c.addFunctionCode(`return (block.number >= _challengedBlockNumber && block.number <= _challengedBlockNumber + challengeWindow);`, functions._isInChallengeWindow);

    // _isInResolveWindow
    c.addFunctionCode(`return block.number <= _challengeStartBlockNumber + resolveWindow;`, functions._isInResolveWindow);

    // getChallenge
    c.addFunctionCode(`return challenges[_challengedBlockNumber][_challengedCommitment];`, functions.getChallenge);

    // getChallengeStatus
    c.addFunctionCode(`Challenge memory _challenge = challenges[_challengedBlockNumber][_challengedCommitment];
        // if the address is 0, the challenge is uninitialized
        if (_challenge.challenger == address(0)) return ChallengeStatus.Uninitialized;

        // if the challenge has a resolved block, it is resolved
        if (_challenge.resolvedBlock != 0) return ChallengeStatus.Resolved;

        // if the challenge's start block is in the resolve window, it is active
        if (_isInResolveWindow(_challenge.startBlock)) return ChallengeStatus.Active;

        // if the challenge's start block is not in the resolve window, it is expired
        return ChallengeStatus.Expired;`, functions.getChallengeStatus);

    // _getCommitmentType
    c.addFunctionCode(`return uint8(bytes1(_commitment));`, functions._getCommitmentType);

    // validateCommitment
    c.addFunctionCode(`uint8 commitmentType = _getCommitmentType(_commitment);
        if (commitmentType == uint8(CommitmentType.Keccak256)) {
            if (_commitment.length != 33) {
                revert InvalidCommitmentLength(uint8(CommitmentType.Keccak256), 33, _commitment.length);
            }
            return;
        }

        revert UnknownCommitmentType(commitmentType);`, functions.validateCommitment);

    // challenge
    c.addFunctionCode(`// require the commitment type to be known
        validateCommitment(_challengedCommitment);

        // deposit value sent with the transaction as bond
        deposit();

        // require the caller to have a bond
        if (balances[msg.sender] < bondSize) {
            revert BondTooLow(balances[msg.sender], bondSize);
        }

        // require the challenge status to be uninitialized
        if (getChallengeStatus(_challengedBlockNumber, _challengedCommitment) != ChallengeStatus.Uninitialized) {
            revert ChallengeExists();
        }

        // require the current block to be in the challenge window
        if (!_isInChallengeWindow(_challengedBlockNumber)) {
            revert ChallengeWindowNotOpen();
        }

        // reduce the caller's balance
        balances[msg.sender] -= bondSize;

        // store the challenger's address, bond size, and start block of the challenge
        challenges[_challengedBlockNumber][_challengedCommitment] =
            Challenge({ challenger: msg.sender, lockedBond: bondSize, startBlock: block.number, resolvedBlock: 0 });

        // emit an event to notify that the challenge status is now active
        emit ChallengeStatusChanged(_challengedBlockNumber, _challengedCommitment, ChallengeStatus.Active);`, functions.challenge);

    // resolve
    c.addFunctionCode(`// require the commitment type to be known
        validateCommitment(_challengedCommitment);

        // require the challenge to be active (started, not resolved, and resolve window still open)
        if (getChallengeStatus(_challengedBlockNumber, _challengedCommitment) != ChallengeStatus.Active) {
            revert ChallengeNotActive();
        }

        // compute the commitment corresponding to the given resolveData
        uint8 commitmentType = _getCommitmentType(_challengedCommitment);
        bytes memory computedCommitment;
        if (commitmentType == uint8(CommitmentType.Keccak256)) {
            computedCommitment = computeCommitmentKeccak256(_resolveData);
        }

        // require the provided input data to correspond to the challenged commitment
        if (keccak256(computedCommitment) != keccak256(_challengedCommitment)) {
            revert InvalidInputData(computedCommitment, _challengedCommitment);
        }

        // store the block number at which the challenge was resolved
        Challenge storage activeChallenge = challenges[_challengedBlockNumber][_challengedCommitment];
        activeChallenge.resolvedBlock = block.number;

        // emit an event to notify that the challenge status is now resolved
        emit ChallengeStatusChanged(_challengedBlockNumber, _challengedCommitment, ChallengeStatus.Resolved);

        // distribute the bond among challenger, resolver and address(0)
        _distributeBond(activeChallenge, _resolveData.length, msg.sender);`, functions.resolve);

    // _distributeBond
    c.addFunctionCode(`uint256 lockedBond = _resolvedChallenge.lockedBond;
        address challenger = _resolvedChallenge.challenger;

        // approximate the cost of resolving a challenge with the provided pre-image size
        uint256 resolutionCost = (
            fixedResolutionCost + _preImageLength * variableResolutionCost / variableResolutionCostPrecision
        ) * block.basefee;

        // refund bond exceeding the resolution cost to the challenger
        if (lockedBond > resolutionCost) {
            balances[challenger] += lockedBond - resolutionCost;
            lockedBond = resolutionCost;
            emit BalanceChanged(challenger, balances[challenger]);
        }

        // refund a percentage of the resolution cost to the resolver (but not more than the locked bond)
        uint256 resolverRefund = resolutionCost * resolverRefundPercentage / 100;
        if (resolverRefund > lockedBond) {
            resolverRefund = lockedBond;
        }
        if (resolverRefund > 0) {
            balances[_resolver] += resolverRefund;
            lockedBond -= resolverRefund;
            emit BalanceChanged(_resolver, balances[_resolver]);
        }

        // burn the remaining bond
        if (lockedBond > 0) {
            payable(address(0)).transfer(lockedBond);
        }
        _resolvedChallenge.lockedBond = 0;`, functions._distributeBond);

    // unlockBond
    c.addFunctionCode(`// require the challenge to be active (started, not resolved, and in the resolve window)
        if (getChallengeStatus(_challengedBlockNumber, _challengedCommitment) != ChallengeStatus.Expired) {
            revert ChallengeNotExpired();
        }

        // Unlock the bond associated with the challenge
        Challenge storage expiredChallenge = challenges[_challengedBlockNumber][_challengedCommitment];
        balances[expiredChallenge.challenger] += expiredChallenge.lockedBond;
        expiredChallenge.lockedBond = 0;

        // Emit balance update event
        emit BalanceChanged(expiredChallenge.challenger, balances[expiredChallenge.challenger]);`, functions.unlockBond);

    setInfo(c, allOpts.contractInfo);
    return c;
}


const functions = defineFunctions({

    initialize: {
      kind: 'public' as const,
      args: [
          { name: '_owner', type: 'address' },
          { name: '_challengeWindow', type: 'uint256' },
          { name: '_resolveWindow', type: 'uint256' },
          { name: '_bondSize', type: 'uint256' },
          { name: '_resolverRefundPercentage', type: 'uint256' },
      ],
    },
  

    setBondSize: {
      kind: 'public' as const,
      args: [
        { name: '_bondSize', type: 'uint256' },
      ],
    },
  
    setResolverRefundPercentage: {
      kind: 'public' as const,
      args: [
        { name: '_resolverRefundPercentage', type: 'uint256' },
      ],
    },

    deposit: {
        kind: 'public' as const,
        args: [
        ],
    },

    withdraw: {
        kind: 'external' as const,
        args: [
        ],
    },

    _isInChallengeWindow: {
        kind: 'internal' as const,
        args: [
            { name: '_challengedBlockNumber', type: 'uint256' },
        ],
        returns: ['bool'],
        mutability: 'view',
    },

    _isInResolveWindow: {
        kind: 'internal' as const,
        args: [
            { name: '_challengeStartBlockNumber', type: 'uint256' },
        ],
        returns: ['bool'],
        mutability: 'view',
    },
    
    getChallenge: {
        kind: 'public' as const,
        args: [
            { name: '_challengedBlockNumber', type: 'uint256' },
            { name: '_challengedCommitment', type: 'bytes calldata' },
        ],
        returns: ['Challenge memory'],
        mutability: 'view',
    },

    getChallengeStatus: {
        kind: 'public' as const,
        args: [
            { name: '_challengedBlockNumber', type: 'uint256' },
            { name: '_challengedCommitment', type: 'bytes calldata' },
        ],
        returns: ['ChallengeStatus'],
        mutability: 'view',
    },

    _getCommitmentType: {
        kind: 'internal' as const,
        args: [
            { name: '_commitment', type: 'bytes calldata' },
        ],
        returns: ['uint8'],
        mutability: 'pure',
    },

    validateCommitment: {
        kind: 'public' as const,
        args: [
            { name: '_commitment', type: 'bytes calldata' },
        ],
        mutability: 'pure',
    },

    challenge: {
        kind: 'external payable' as const,
        args: [
            { name: '_challengedBlockNumber', type: 'uint256' },
            { name: '_challengedCommitment', type: 'bytes calldata' },
        ],
    },
  
    resolve: {
        kind: 'external' as const,
        args: [
            { name: '_challengedBlockNumber', type: 'uint256' },
            { name: '_challengedCommitment', type: 'bytes calldata' },
            { name: '_resolveData', type: 'bytes calldata' },
        ],
    },

    _distributeBond: {
        kind: 'internal' as const,
        args: [
            { name: '_resolvedChallenge', type: 'Challenge storage' },
            { name: '_preImageLength', type: 'uint256' },
            { name: '_resolver', type: 'address' },
        ],
    },

    unlockBond: {
        kind: 'external' as const,
        args: [
            { name: '_challengedBlockNumber', type: 'uint256' },
            { name: '_challengedCommitment', type: 'bytes calldata' },
        ],
    },
 
  
  });
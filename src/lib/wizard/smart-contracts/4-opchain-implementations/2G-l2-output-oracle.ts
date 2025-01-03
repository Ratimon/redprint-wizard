import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2G-option-l2-output-oracle';
import type { SharedL2OutputOracleOptions } from '../../shared//4-opchain-implementations/2G-option-l2-output-oracle';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';


function withDefaults(opts: SharedL2OutputOracleOptions): Required<SharedL2OutputOracleOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}


export function printL2OutputOracle(opts: SharedL2OutputOracleOptions = commonDefaults): string {
  return printContract(buildL2OutputOracle(opts));
}

export function buildL2OutputOracle(opts: SharedL2OutputOracleOptions): Contract {
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
        name: 'Types',
        path: '@redprint-core/libraries/Types.sol',
    };
    c.addImportOnly(Types);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver);

    c.addVariable(`uint256 public startingBlockNumber;`);

    c.addVariable(`/// @notice The timestamp of the first L2 block recorded in this contract.
    uint256 public startingTimestamp;`);

    c.addVariable(`/// @notice An array of L2 output proposals.
    Types.OutputProposal[] internal l2Outputs;`);

    c.addVariable(`/// @notice The interval in L2 blocks at which checkpoints must be submitted.
    /// @custom:network-specific
    uint256 public submissionInterval;`);

    c.addVariable(`/// @notice The time between L2 blocks in seconds. Once set, this value MUST NOT be modified.
    /// @custom:network-specific
    uint256 public l2BlockTime;`);

    c.addVariable(`/// @notice The address of the challenger. Can be updated via upgrade.
    /// @custom:network-specific
    address public challenger;`);

    c.addVariable(`/// @notice The address of the proposer. Can be updated via upgrade.
    /// @custom:network-specific
    address public proposer;`);

    c.addVariable(`/// @notice The minimum time (in seconds) that must elapse before a withdrawal can be finalized.
    /// @custom:network-specific
    uint256 public finalizationPeriodSeconds;`);

    c.addVariable(`/// @notice Emitted when an output is proposed.
    /// @param outputRoot    The output root.
    /// @param l2OutputIndex The index of the output in the l2Outputs array.
    /// @param l2BlockNumber The L2 block number of the output root.
    /// @param l1Timestamp   The L1 timestamp when proposed.
    event OutputProposed(
        bytes32 indexed outputRoot, uint256 indexed l2OutputIndex, uint256 indexed l2BlockNumber, uint256 l1Timestamp
    );`);

    c.addVariable(`/// @notice Emitted when outputs are deleted.
    /// @param prevNextOutputIndex Next L2 output index before the deletion.
    /// @param newNextOutputIndex  Next L2 output index after the deletion.
    event OutputsDeleted(uint256 indexed prevNextOutputIndex, uint256 indexed newNextOutputIndex);`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 1.8.1-beta.2
    string public constant version = "1.8.1-beta.2";`);

        

    c.addConstructorCode(`initialize({
            _submissionInterval: 1,
            _l2BlockTime: 1,
            _startingBlockNumber: 0,
            _startingTimestamp: 0,
            _proposer: address(0),
            _challenger: address(0),
            _finalizationPeriodSeconds: 0
        });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`require(_submissionInterval > 0, "L2OutputOracle: submission interval must be greater than 0");
        require(_l2BlockTime > 0, "L2OutputOracle: L2 block time must be greater than 0");
        require(
            _startingTimestamp <= block.timestamp,
            "L2OutputOracle: starting L2 timestamp must be less than current time"
        );

        submissionInterval = _submissionInterval;
        l2BlockTime = _l2BlockTime;
        startingBlockNumber = _startingBlockNumber;
        startingTimestamp = _startingTimestamp;
        proposer = _proposer;
        challenger = _challenger;
        finalizationPeriodSeconds = _finalizationPeriodSeconds;`, functions.initialize);


    // SUBMISSION_INTERVAL()
    c.addFunctionCode(`return submissionInterval;`, functions.SUBMISSION_INTERVAL);

    // CHALLENGER()
    c.addFunctionCode(`return challenger;`, functions.CHALLENGER);

    // L2_BLOCK_TIME()
    c.addFunctionCode(`return l2BlockTime;`, functions.L2_BLOCK_TIME);

    // PROPOSER()
    c.addFunctionCode(`return proposer;`, functions.PROPOSER);

    // FINALIZATION_PERIOD_SECONDS()
    c.addFunctionCode(`return finalizationPeriodSeconds;`, functions.FINALIZATION_PERIOD_SECONDS);


    // deleteL2Outputs()
    c.addFunctionCode(`require(msg.sender == challenger, "L2OutputOracle: only the challenger address can delete outputs");

        // Make sure we're not *increasing* the length of the array.
        require(
            _l2OutputIndex < l2Outputs.length, "L2OutputOracle: cannot delete outputs after the latest output index"
        );

        // Do not allow deleting any outputs that have already been finalized.
        require(
            block.timestamp - l2Outputs[_l2OutputIndex].timestamp < finalizationPeriodSeconds,
            "L2OutputOracle: cannot delete outputs that have already been finalized"
        );

        uint256 prevNextL2OutputIndex = nextOutputIndex();

        // Use assembly to delete the array elements because Solidity doesn't allow it.
        assembly {
            sstore(l2Outputs.slot, _l2OutputIndex)
        }

        emit OutputsDeleted(prevNextL2OutputIndex, _l2OutputIndex);`, functions.deleteL2Outputs);

    // proposeL2Output()
    c.addFunctionCode(`require(msg.sender == proposer, "L2OutputOracle: only the proposer address can propose new outputs");

        require(
            _l2BlockNumber == nextBlockNumber(),
            "L2OutputOracle: block number must be equal to next expected block number"
        );

        require(
            computeL2Timestamp(_l2BlockNumber) < block.timestamp,
            "L2OutputOracle: cannot propose L2 output in the future"
        );

        require(_outputRoot != bytes32(0), "L2OutputOracle: L2 output proposal cannot be the zero hash");

        if (_l1BlockHash != bytes32(0)) {
            // This check allows the proposer to propose an output based on a given L1 block,
            // without fear that it will be reorged out.
            // It will also revert if the blockheight provided is more than 256 blocks behind the
            // chain tip (as the hash will return as zero). This does open the door to a griefing
            // attack in which the proposer's submission is censored until the block is no longer
            // retrievable, if the proposer is experiencing this attack it can simply leave out the
            // blockhash value, and delay submission until it is confident that the L1 block is
            // finalized.
            require(
                blockhash(_l1BlockNumber) == _l1BlockHash,
                "L2OutputOracle: block hash does not match the hash at the expected height"
            );
        }

        emit OutputProposed(_outputRoot, nextOutputIndex(), _l2BlockNumber, block.timestamp);

        l2Outputs.push(
            Types.OutputProposal({
                outputRoot: _outputRoot,
                timestamp: uint128(block.timestamp),
                l2BlockNumber: uint128(_l2BlockNumber)
            })
        );`, functions.proposeL2Output);

    // getL2Output()
    c.addFunctionCode(`return l2Outputs[_l2OutputIndex];`, functions.getL2Output);

    // getL2OutputIndexAfter()
    c.addFunctionCode(`// Make sure an output for this block number has actually been proposed.
        require(
            _l2BlockNumber <= latestBlockNumber(),
            "L2OutputOracle: cannot get output for a block that has not been proposed"
        );

        // Make sure there's at least one output proposed.
        require(l2Outputs.length > 0, "L2OutputOracle: cannot get output as no outputs have been proposed yet");

        // Find the output via binary search, guaranteed to exist.
        uint256 lo = 0;
        uint256 hi = l2Outputs.length;
        while (lo < hi) {
            uint256 mid = (lo + hi) / 2;
            if (l2Outputs[mid].l2BlockNumber < _l2BlockNumber) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }

        return lo;`, functions.getL2OutputIndexAfter);

    // getL2OutputAfter()
    c.addFunctionCode(`return l2Outputs[getL2OutputIndexAfter(_l2BlockNumber)];`, functions.getL2OutputAfter);

    // latestOutputIndex()
    c.addFunctionCode(`return l2Outputs.length - 1;`, functions.latestOutputIndex);

    // nextOutputIndex()
    c.addFunctionCode(`return l2Outputs.length;`, functions.nextOutputIndex);

    // latestBlockNumber()
    c.addFunctionCode(`return l2Outputs.length == 0 ? startingBlockNumber : l2Outputs[l2Outputs.length - 1].l2BlockNumber;`, functions.latestBlockNumber);

    // nextBlockNumber()
    c.addFunctionCode(`return latestBlockNumber() + submissionInterval;`, functions.nextBlockNumber);

    // computeL2Timestamp()
    c.addFunctionCode(` return startingTimestamp + ((_l2BlockNumber - startingBlockNumber) * l2BlockTime);`, functions.computeL2Timestamp);


    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({


    initialize: {
      kind: 'public' as const,
      args: [
        { name: '_submissionInterval', type: 'uint256' },
        { name: '_l2BlockTime', type: 'uint256' },
        { name: '_startingBlockNumber', type: 'uint256' },
        { name: '_startingTimestamp', type: 'uint256' },
        { name: '_proposer', type: 'address' },
        { name: '_challenger', type: 'address' },
        { name: '_finalizationPeriodSeconds', type: 'uint256' },
      ],
    },

    SUBMISSION_INTERVAL : {
        kind: 'external' as const,
        args: [],
        returns: ['uint256'],
        mutability: 'view',
    },

    L2_BLOCK_TIME : {
        kind: 'external' as const,
        args: [],
        returns: ['uint256'],
        mutability: 'view',
    },

    CHALLENGER : {
        kind: 'external' as const,
        args: [],
        returns: ['address'],
        mutability: 'view',
    },

    PROPOSER : {
        kind: 'external' as const,
        args: [],
        returns: ['address'],
        mutability: 'view',
    },

    FINALIZATION_PERIOD_SECONDS : {
        kind: 'external' as const,
        args: [
        ],
        returns: ['uint256'],
        mutability: 'view',
    },

    deleteL2Outputs : {
        kind: 'external' as const,
        args: [
            { name: '_l2OutputIndex', type: 'uint256' },
        ],
    },

    proposeL2Output : {
        kind: 'external payable' as const,
        args: [
            { name: '_outputRoot', type: 'bytes32' },
            { name: '_l2BlockNumber', type: 'uint256' },
            { name: '_l1BlockHash', type: 'bytes32' },
            { name: '_l1BlockNumber', type: 'uint256' },
        ],
        returns: [],
    },

    getL2Output : {
        kind: 'external' as const,
        args: [
            { name: '_l2OutputIndex', type: 'uint256' },
        ],
        returns: ['Types.OutputProposal memory'],
        mutability: 'view',
    },

    getL2OutputIndexAfter : {
        kind: 'public' as const,
        args: [
            { name: '_l2BlockNumber', type: 'uint256' },
        ],
        returns: ['uint256'],
        mutability: 'view',
    },

    getL2OutputAfter : {
        kind: 'external' as const,
        args: [
            { name: '_l2BlockNumber', type: 'uint256' },
        ],
        returns: ['Types.OutputProposal memory'],
        mutability: 'view',
    },

    latestOutputIndex : {
        kind: 'external' as const,
        args: [],
        returns: ['uint256'],
        mutability: 'view',
    },

    nextOutputIndex : {
        kind: 'public' as const,
        args: [],
        returns: ['uint256'],
        mutability: 'view',
    },

    latestBlockNumber : {
        kind: 'public' as const,
        args: [],
        returns: ['uint256'],
        mutability: 'view',
    },

    nextBlockNumber : {
        kind: 'public' as const,
        args: [],
        returns: ['uint256'],
        mutability: 'view',
    },

    computeL2Timestamp : {
        kind: 'public' as const,
        args: [
            { name: '_l2BlockNumber', type: 'uint256' },
        ],
        returns: ['uint256'],
        mutability: 'view',
    },

    
  });
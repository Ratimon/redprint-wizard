import type { BaseFunction, Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/4-opchain-implementations/2K-option-preimage-oracle";
import type { SharedPreimageOracleOptions } from '../../shared/4-opchain-implementations/2K-option-preimage-oracle';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedPreimageOracleOptions): Required<SharedPreimageOracleOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printPreimageOracle(opts: SharedPreimageOracleOptions = commonDefaults): string {
  return printContract(buildPreimageOracle(opts));
}

export function buildPreimageOracle(opts: SharedPreimageOracleOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);


    const LibKeccak = {
        name: 'LibKeccak',
        path: '@redprint-lib-keccak/LibKeccak.sol',
    };    
    c.addImportOnly(LibKeccak);

    const PreimageKeyLib = {
        name: 'PreimageKeyLib',
        path: '@redprint-core/cannon/PreimageKeyLib.sol',
    };    
    c.addImportOnly(PreimageKeyLib);

    const CannonErrors = {
        name: '',
        path: '@redprint-core/cannon/libraries/CannonErrors.sol',
    };
    c.addImportOnly(CannonErrors);

    const CannonTypes = {
        name: '',
        path: '@redprint-core/cannon/libraries/CannonTypes.sol',
    };    
    c.addImportOnly(CannonTypes);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver, []);

    c.addVariable(`////////////////////////////////////////////////////////////////
    //                   Constants & Immutables                   //
    ////////////////////////////////////////////////////////////////

    /// @notice The duration of the large preimage proposal challenge period.
    uint256 internal immutable CHALLENGE_PERIOD;
    /// @notice The minimum size of a preimage that can be proposed in the large preimage path.
    uint256 internal immutable MIN_LPP_SIZE_BYTES;
    /// @notice The minimum bond size for large preimage proposals.
    uint256 public constant MIN_BOND_SIZE = 0.25 ether;
    /// @notice The depth of the keccak256 merkle tree. Supports up to 65,536 keccak blocks, or ~8.91MB preimages.
    uint256 public constant KECCAK_TREE_DEPTH = 16;
    /// @notice The maximum number of keccak blocks that can fit into the merkle tree.
    uint256 public constant MAX_LEAF_COUNT = 2 ** KECCAK_TREE_DEPTH - 1;
    /// @notice The reserved gas for precompile call setup.
    uint256 public constant PRECOMPILE_CALL_RESERVED_GAS = 100_000;`);
    
    c.addVariable(`/// @notice The semantic version of the Preimage Oracle contract.
    /// @custom:semver 1.1.3-beta.5
    string public constant version = "1.1.3-beta.5";`);

    c.addVariable(`////////////////////////////////////////////////////////////////
    //                 Authorized Preimage Parts                  //
    ////////////////////////////////////////////////////////////////

    /// @notice Mapping of pre-image keys to pre-image lengths.
    mapping(bytes32 => uint256) public preimageLengths;
    /// @notice Mapping of pre-image keys to pre-image offsets to pre-image parts.
    mapping(bytes32 => mapping(uint256 => bytes32)) public preimageParts;
    /// @notice Mapping of pre-image keys to pre-image part offsets to preimage preparedness.
    mapping(bytes32 => mapping(uint256 => bool)) public preimagePartOk;`);

    c.addVariable(`////////////////////////////////////////////////////////////////
    //                  Large Preimage Proposals                  //
    ////////////////////////////////////////////////////////////////

    /// @notice A raw leaf of the large preimage proposal merkle tree.
    struct Leaf {
        /// @notice The input absorbed for the block, exactly 136 bytes.
        bytes input;
        /// @notice The index of the block in the absorption process.
        uint256 index;
        /// @notice The hash of the internal state after absorbing the input.
        bytes32 stateCommitment;
    }

    /// @notice Unpacked keys for large preimage proposals.
    struct LargePreimageProposalKeys {
        /// @notice The claimant of the large preimage proposal.
        address claimant;
        /// @notice The UUID of the large preimage proposal.
        uint256 uuid;
    }

    /// @notice Static padding hashes. These values are persisted in storage, but are entirely immutable
    ///         after the constructor's execution.
    bytes32[KECCAK_TREE_DEPTH] public zeroHashes;
    /// @notice Append-only array of large preimage proposals for off-chain reference.
    LargePreimageProposalKeys[] public proposals;
    /// @notice Mapping of claimants to proposal UUIDs to the current branch path of the merkleization process.
    mapping(address => mapping(uint256 => bytes32[KECCAK_TREE_DEPTH])) public proposalBranches;
    /// @notice Mapping of claimants to proposal UUIDs to the timestamp of creation of the proposal as well as the
    /// challenged status.
    mapping(address => mapping(uint256 => LPPMetaData)) public proposalMetadata;
    /// @notice Mapping of claimants to proposal UUIDs to bond amounts.
    mapping(address => mapping(uint256 => uint256)) public proposalBonds;
    /// @notice Mapping of claimants to proposal UUIDs to the preimage part picked up during the absorbtion process.
    mapping(address => mapping(uint256 => bytes32)) public proposalParts;
    /// @notice Mapping of claimants to proposal UUIDs to blocks which leaves were added to the merkle tree.
    mapping(address => mapping(uint256 => uint64[])) public proposalBlocks;`);

    c.addConstructorArgument({
        type: 'uint256',
        name: '_minProposalSize'
    });
    c.addConstructorArgument({
        type: 'uint256',
        name: '_challengePeriod'
    });
    c.addConstructorCode(`MIN_LPP_SIZE_BYTES = _minProposalSize;
        CHALLENGE_PERIOD = _challengePeriod;

        // Make sure challenge period fits within uint64 so that it can safely be used within the
        // FaultDisputeGame contract to compute clock extensions. Adding this check is simpler than
        // changing the existing contract ABI.
        require(_challengePeriod <= type(uint64).max, "PreimageOracle: challenge period too large");

        // Compute hashes in empty sparse Merkle tree. The first hash is not set, and kept as zero as the identity.
        for (uint256 height = 0; height < KECCAK_TREE_DEPTH - 1; height++) {
            zeroHashes[height + 1] = keccak256(abi.encodePacked(zeroHashes[height], zeroHashes[height]));
        }`);

    // readPreimage
    c.addFunctionCode(`require(preimagePartOk[_key][_offset], "pre-image must exist");

        // Calculate the length of the pre-image data
        // Add 8 for the length-prefix part
        datLen_ = 32;
        uint256 length = preimageLengths[_key];
        if (_offset + 32 >= length + 8) {
            datLen_ = length + 8 - _offset;
        }

        // Retrieve the pre-image data
        dat_ = preimageParts[_key][_offset];`, functions.readPreimage);

    // loadLocalData
    c.addFunctionCode(`// Compute the localized key from the given local identifier.
        key_ = PreimageKeyLib.localizeIdent(_ident, _localContext);

        // Revert if the given part offset is not within bounds.
        if (_partOffset >= _size + 8 || _size > 32) {
            revert PartOffsetOOB();
        }

        // Prepare the local data part at the given offset
        bytes32 part;
        assembly {
            // Clean the memory in [0x20, 0x40)
            mstore(0x20, 0x00)

            // Store the full local data in scratch space.
            mstore(0x00, shl(192, _size))
            mstore(0x08, _word)

            // Prepare the local data part at the requested offset.
            part := mload(_partOffset)
        }

        // Store the first part with '_partOffset'.
        preimagePartOk[key_][_partOffset] = true;
        preimageParts[key_][_partOffset] = part;
        // Assign the length of the preimage at the localized key.
        preimageLengths[key_] = _size;`, functions.loadLocalData);


    // loadKeccak256PreimagePart
    c.addFunctionCode(`uint256 size;
        bytes32 key;
        bytes32 part;
        assembly {
            // len(sig) + len(partOffset) + len(preimage offset) = 4 + 32 + 32 = 0x44
            size := calldataload(0x44)

            // revert if part offset >= size+8 (i.e. parts must be within bounds)
            if iszero(lt(_partOffset, add(size, 8))) {
                // Store "PartOffsetOOB()"
                mstore(0x00, 0xfe254987)
                // Revert with "PartOffsetOOB()"
                revert(0x1c, 0x04)
            }
            // we leave solidity slots 0x40 and 0x60 untouched, and everything after as scratch-memory.
            let ptr := 0x80
            // put size as big-endian uint64 at start of pre-image
            mstore(ptr, shl(192, size))
            ptr := add(ptr, 0x08)
            // copy preimage payload into memory so we can hash and read it.
            calldatacopy(ptr, _preimage.offset, size)
            // Note that it includes the 8-byte big-endian uint64 length prefix.
            // this will be zero-padded at the end, since memory at end is clean.
            part := mload(add(sub(ptr, 0x08), _partOffset))
            let h := keccak256(ptr, size) // compute preimage keccak256 hash
            // mask out prefix byte, replace with type 2 byte
            key := or(and(h, not(shl(248, 0xFF))), shl(248, 0x02))
        }
        preimagePartOk[key][_partOffset] = true;
        preimageParts[key][_partOffset] = part;
        preimageLengths[key] = size;`, functions.loadKeccak256PreimagePart);

    // loadSha256PreimagePart
    c.addFunctionCode(`uint256 size;
        bytes32 key;
        bytes32 part;
        assembly {
            // len(sig) + len(partOffset) + len(preimage offset) = 4 + 32 + 32 = 0x44
            size := calldataload(0x44)

            // revert if part offset >= size+8 (i.e. parts must be within bounds)
            if iszero(lt(_partOffset, add(size, 8))) {
                // Store "PartOffsetOOB()"
                mstore(0, 0xfe254987)
                // Revert with "PartOffsetOOB()"
                revert(0x1c, 4)
            }
            // we leave solidity slots 0x40 and 0x60 untouched,
            // and everything after as scratch-memory.
            let ptr := 0x80
            // put size as big-endian uint64 at start of pre-image
            mstore(ptr, shl(192, size))
            ptr := add(ptr, 8)
            // copy preimage payload into memory so we can hash and read it.
            calldatacopy(ptr, _preimage.offset, size)
            // Note that it includes the 8-byte big-endian uint64 length prefix.
            // this will be zero-padded at the end, since memory at end is clean.
            part := mload(add(sub(ptr, 8), _partOffset))

            // compute SHA2-256 hash with pre-compile
            let success :=
                staticcall(
                    gas(), // Forward all available gas
                    0x02, // Address of SHA-256 precompile
                    ptr, // Start of input data in memory
                    size, // Size of input data
                    0, // Store output in scratch memory
                    0x20 // Output is always 32 bytes
                )
            // Check if the staticcall succeeded
            if iszero(success) { revert(0, 0) }
            let h := mload(0) // get return data
            // mask out prefix byte, replace with type 4 byte
            key := or(and(h, not(shl(248, 0xFF))), shl(248, 4))
        }
        preimagePartOk[key][_partOffset] = true;
        preimageParts[key][_partOffset] = part;
        preimageLengths[key] = size;`, functions.loadSha256PreimagePart);

    // loadBlobPreimagePart
    c.addFunctionCode(`bytes32 key;
        bytes32 part;
        assembly {
            // Compute the versioned hash. The SHA2 hash of the 48 byte commitment is masked with the version byte,
            // which is currently 1. https://eips.ethereum.org/EIPS/eip-4844#parameters
            // SAFETY: We're only reading 48 bytes from '_commitment' into scratch space, so we're not reading into the
            //         free memory ptr region. Since the exact number of btyes that is copied into scratch space is
            //         the same size as the hash input, there's no concern of dirty memory being read into the hash
            //         input.
            calldatacopy(0x00, _commitment.offset, 0x30)
            let success := staticcall(gas(), 0x02, 0x00, 0x30, 0x00, 0x20)
            if iszero(success) {
                // Store the "ShaFailed()" error selector.
                mstore(0x00, 0xf9112969)
                // revert with "ShaFailed()"
                revert(0x1C, 0x04)
            }
            // Set the 'VERSIONED_HASH_VERSION_KZG' byte = 1 in the high-order byte of the hash.
            let versionedHash := or(and(mload(0x00), not(shl(248, 0xFF))), shl(248, 0x01))

            // we leave solidity slots 0x40 and 0x60 untouched, and everything after as scratch-memory.
            let ptr := 0x80

            // Load the inputs for the point evaluation precompile into memory. The inputs to the point evaluation
            // precompile are packed, and not supposed to be ABI-encoded.
            mstore(ptr, versionedHash)
            mstore(add(ptr, 0x20), _z)
            mstore(add(ptr, 0x40), _y)
            calldatacopy(add(ptr, 0x60), _commitment.offset, 0x30)
            calldatacopy(add(ptr, 0x90), _proof.offset, 0x30)

            // Verify the KZG proof by calling the point evaluation precompile. If the proof is invalid, the precompile
            // will revert.
            success :=
                staticcall(
                    gas(), // forward all gas
                    0x0A, // point evaluation precompile address
                    ptr, // input ptr
                    0xC0, // input size = 192 bytes
                    0x00, // output ptr
                    0x00 // output size
                )
            if iszero(success) {
                // Store the "InvalidProof()" error selector.
                mstore(0x00, 0x09bde339)
                // revert with "InvalidProof()"
                revert(0x1C, 0x04)
            }

            // revert if part offset >= 32+8 (i.e. parts must be within bounds)
            if iszero(lt(_partOffset, 0x28)) {
                // Store "PartOffsetOOB()"
                mstore(0x00, 0xfe254987)
                // Revert with "PartOffsetOOB()"
                revert(0x1C, 0x04)
            }
            // Clean the word at 'ptr + 0x28' to ensure that data out of bounds of the preimage is zero, if the part
            // offset requires a partial read.
            mstore(add(ptr, 0x28), 0x00)
            // put size (32) as a big-endian uint64 at start of pre-image
            mstore(ptr, shl(192, 0x20))
            // copy preimage payload into memory so we can hash and read it.
            mstore(add(ptr, 0x08), _y)
            // Note that it includes the 8-byte big-endian uint64 length prefix. This will be zero-padded at the end,
            // since memory at end is guaranteed to be clean.
            part := mload(add(ptr, _partOffset))

            // Compute the key: 'keccak256(commitment ++ z)'. Since the exact number of btyes that is copied into
            // scratch space is the same size as the hash input, there's no concern of dirty memory being read into
            // the hash input.
            calldatacopy(ptr, _commitment.offset, 0x30)
            mstore(add(ptr, 0x30), _z)
            let h := keccak256(ptr, 0x50)
            // mask out prefix byte, replace with type 5 byte
            key := or(and(h, not(shl(248, 0xFF))), shl(248, 0x05))
        }
        preimagePartOk[key][_partOffset] = true;
        preimageParts[key][_partOffset] = part;
        preimageLengths[key] = 32;`, functions.loadBlobPreimagePart);


    // loadPrecompilePreimagePart
    c.addFunctionCode(`bytes32 res;
        bytes32 key;
        bytes32 part;
        uint256 size;
        assembly {
            // we leave solidity slots 0x40 and 0x60 untouched, and everything after as scratch-memory.
            let ptr := 0x80

            // copy precompile address, requiredGas, and input into memory to compute the key
            mstore(ptr, shl(96, _precompile))
            mstore(add(ptr, 20), shl(192, _requiredGas))
            calldatacopy(add(28, ptr), _input.offset, _input.length)
            // compute the hash
            let h := keccak256(ptr, add(28, _input.length))
            // mask out prefix byte, replace with type 6 byte
            key := or(and(h, not(shl(248, 0xFF))), shl(248, 0x06))

            // Check if the precompile call has at least the required gas.
            // This assumes there are no further memory expansion costs until after the staticall on the precompile
            // Also assumes that the gas expended in setting up the staticcall is less than PRECOMPILE_CALL_RESERVED_GAS
            // require(gas() >= (requiredGas * 64 / 63) + reservedGas)
            if lt(mul(gas(), 63), add(mul(_requiredGas, 64), mul(PRECOMPILE_CALL_RESERVED_GAS, 63))) {
                // Store "NotEnoughGas()"
                mstore(0, 0xdd629f86)
                revert(0x1c, 4)
            }

            // Call the precompile to get the result.
            // SAFETY: Given the above gas check, the staticall cannot fail due to insufficient gas.
            res :=
                staticcall(
                    gas(), // forward all gas
                    _precompile,
                    add(28, ptr), // input ptr
                    _input.length,
                    0x0, // Unused as we don't copy anything
                    0x00 // don't copy anything
                )

            size := add(1, returndatasize())
            // revert if part offset >= size+8 (i.e. parts must be within bounds)
            if iszero(lt(_partOffset, add(size, 8))) {
                // Store "PartOffsetOOB()"
                mstore(0, 0xfe254987)
                // Revert with "PartOffsetOOB()"
                revert(0x1c, 4)
            }

            // Reuse the 'ptr' to store the preimage part: <sizePrefix ++ precompileStatus ++ returrnData>
            // put size as big-endian uint64 at start of pre-image
            mstore(ptr, shl(192, size))
            ptr := add(ptr, 0x08)

            // write precompile result status to the first byte of 'ptr'
            mstore8(ptr, res)
            // write precompile return data to the rest of 'ptr'
            returndatacopy(add(ptr, 0x01), 0x0, returndatasize())

            // compute part given ofset
            part := mload(add(sub(ptr, 0x08), _partOffset))
        }
        preimagePartOk[key][_partOffset] = true;
        preimageParts[key][_partOffset] = part;
        preimageLengths[key] = size;`, functions.loadPrecompilePreimagePart);

    // proposalCount
    c.addFunctionCode(`count_ = proposals.length;`, functions.proposalCount);

    // proposalBlocksLength
    c.addFunctionCode(`len_ = proposalBlocks[_claimant][_uuid].length;`, functions.proposalBlocksLen);

    // challengePeriod
    c.addFunctionCode(`challengePeriod_ = CHALLENGE_PERIOD;`, functions.challengePeriod);

    // minProposalSize
    c.addFunctionCode(`minProposalSize_ = MIN_LPP_SIZE_BYTES;`, functions.minProposalSize);

    // initLPP
    c.addFunctionCode(`// The bond provided must be at least 'MIN_BOND_SIZE'.
        if (msg.value < MIN_BOND_SIZE) revert InsufficientBond();

        // The caller of 'addLeavesLPP' must be an EOA, so that the call inputs are always available in block bodies.
        if (msg.sender != tx.origin) revert NotEOA();

        // The part offset must be within the bounds of the claimed size + 8.
        if (_partOffset >= _claimedSize + 8) revert PartOffsetOOB();

        // The claimed size must be at least 'MIN_LPP_SIZE_BYTES'.
        if (_claimedSize < MIN_LPP_SIZE_BYTES) revert InvalidInputSize();

        // Initialize the proposal metadata.
        LPPMetaData metaData = proposalMetadata[msg.sender][_uuid];

        // Revert if the proposal has already been initialized. 0-size preimages are *not* allowed.
        if (metaData.claimedSize() != 0) revert AlreadyInitialized();

        proposalMetadata[msg.sender][_uuid] = metaData.setPartOffset(_partOffset).setClaimedSize(_claimedSize);
        proposals.push(LargePreimageProposalKeys(msg.sender, _uuid));

        // Assign the bond to the proposal.
        proposalBonds[msg.sender][_uuid] = msg.value;`, functions.initLPP);

    // addLeavesLPP
    c.addFunctionCode(`// If we're finalizing, pad the input for the submitter. If not, copy the input into memory verbatim.
        bytes memory input;
        if (_finalize) {
            input = LibKeccak.pad(_input);
        } else {
            input = _input;
        }

        // Pull storage variables onto the stack / into memory for operations.
        bytes32[KECCAK_TREE_DEPTH] memory branch = proposalBranches[msg.sender][_uuid];
        LPPMetaData metaData = proposalMetadata[msg.sender][_uuid];
        uint256 blocksProcessed = metaData.blocksProcessed();

        // The caller of 'addLeavesLPP' must be an EOA.
        // Note: This check may break if EIPs like EIP-3074 are introduced. We may query the data in the logs if this
        // is the case.
        if (msg.sender != tx.origin) revert NotEOA();

        // Revert if the proposal has not been initialized. 0-size preimages are *not* allowed.
        if (metaData.claimedSize() == 0) revert NotInitialized();

        // Revert if the proposal has already been finalized. No leaves can be added after this point.
        if (metaData.timestamp() != 0) revert AlreadyFinalized();

        // Revert if the starting block is not the next block to be added. This is to aid submitters in ensuring that
        // they don't corrupt an in-progress proposal by submitting input out of order.
        if (blocksProcessed != _inputStartBlock) revert WrongStartingBlock();

        // Attempt to extract the preimage part from the input data, if the part offset is present in the current
        // chunk of input. This function has side effects, and will persist the preimage part to the caller's large
        // preimage proposal storage if the part offset is present in the input data.
        _extractPreimagePart(_input, _uuid, _finalize, metaData);

        assembly {
            let inputLen := mload(input)
            let inputPtr := add(input, 0x20)

            // The input length must be a multiple of 136 bytes
            // The input length / 136 must be equal to the number of state commitments.
            if or(mod(inputLen, 136), iszero(eq(_stateCommitments.length, div(inputLen, 136)))) {
                // Store "InvalidInputSize()" error selector
                mstore(0x00, 0x7b1daf1)
                revert(0x1C, 0x04)
            }

            // Allocate a hashing buffer the size of the leaf preimage.
            let hashBuf := mload(0x40)
            mstore(0x40, add(hashBuf, 0xC8))

            for { let i := 0 } lt(i, inputLen) { i := add(i, 136) } {
                // Copy the leaf preimage into the hashing buffer.
                let inputStartPtr := add(inputPtr, i)
                mstore(hashBuf, mload(inputStartPtr))
                mstore(add(hashBuf, 0x20), mload(add(inputStartPtr, 0x20)))
                mstore(add(hashBuf, 0x40), mload(add(inputStartPtr, 0x40)))
                mstore(add(hashBuf, 0x60), mload(add(inputStartPtr, 0x60)))
                mstore(add(hashBuf, 0x80), mload(add(inputStartPtr, 0x80)))
                mstore(add(hashBuf, 136), blocksProcessed)
                mstore(add(hashBuf, 168), calldataload(add(_stateCommitments.offset, shl(0x05, div(i, 136)))))

                // Hash the leaf preimage to get the node to add.
                let node := keccak256(hashBuf, 0xC8)

                // Increment the number of blocks processed.
                blocksProcessed := add(blocksProcessed, 0x01)

                // Add the node to the tree.
                let size := blocksProcessed
                for { let height := 0x00 } lt(height, shl(0x05, KECCAK_TREE_DEPTH)) { height := add(height, 0x20) } {
                    if and(size, 0x01) {
                        mstore(add(branch, height), node)
                        break
                    }

                    // Hash the node at 'height' in the branch and the node together.
                    mstore(0x00, mload(add(branch, height)))
                    mstore(0x20, node)
                    node := keccak256(0x00, 0x40)
                    size := shr(0x01, size)
                }
            }
        }

        // Do not allow for posting preimages larger than the merkle tree can support. The incremental merkle tree
        // algorithm only supports 2**height - 1 leaves, the right most leaf must always be kept empty.
        // Reference: https://daejunpark.github.io/papers/deposit.pdf - Page 10, Section 5.1.
        if (blocksProcessed > MAX_LEAF_COUNT) revert TreeSizeOverflow();

        // Update the proposal metadata to include the number of blocks processed and total bytes processed.
        metaData = metaData.setBlocksProcessed(uint32(blocksProcessed)).setBytesProcessed(
            uint32(_input.length + metaData.bytesProcessed())
        );
        // If the proposal is being finalized, set the timestamp to the current block timestamp. This begins the
        // challenge period, which must be waited out before the proposal can be finalized.
        if (_finalize) {
            metaData = metaData.setTimestamp(uint64(block.timestamp));

            // If the number of bytes processed is not equal to the claimed size, the proposal cannot be finalized.
            if (metaData.bytesProcessed() != metaData.claimedSize()) revert InvalidInputSize();
        }

        // Perist the latest branch to storage.
        proposalBranches[msg.sender][_uuid] = branch;
        // Persist the block number that these leaves were added in. This assists off-chain observers in reconstructing
        // the proposal merkle tree by querying block bodies.
        proposalBlocks[msg.sender][_uuid].push(uint64(block.number));
        // Persist the updated metadata to storage.
        proposalMetadata[msg.sender][_uuid] = metaData;

        // Clobber memory and 'log0' all calldata. This is safe because there is no execution afterwards within
        // this callframe.
        assembly {
            mstore(0x00, shl(96, caller()))
            calldatacopy(0x14, 0x00, calldatasize())
            log0(0x00, add(0x14, calldatasize()))
        }`, functions.addLeavesLPP);

    // challengeLPP
    c.addFunctionCode(`// Verify that both leaves are present in the merkle tree.
        bytes32 root = getTreeRootLPP(_claimant, _uuid);
        if (
            !(
                _verify(_preStateProof, root, _preState.index, _hashLeaf(_preState))
                    && _verify(_postStateProof, root, _postState.index, _hashLeaf(_postState))
            )
        ) revert InvalidProof();

        // Verify that the prestate passed matches the intermediate state claimed in the leaf.
        if (keccak256(abi.encode(_stateMatrix)) != _preState.stateCommitment) revert InvalidPreimage();

        // Verify that the pre/post state are contiguous.
        if (_preState.index + 1 != _postState.index) revert StatesNotContiguous();

        // Absorb and permute the input bytes.
        LibKeccak.absorb(_stateMatrix, _postState.input);
        LibKeccak.permutation(_stateMatrix);

        // Verify that the post state hash doesn't match the expected hash.
        if (keccak256(abi.encode(_stateMatrix)) == _postState.stateCommitment) revert PostStateMatches();

        // Mark the keccak claim as countered.
        proposalMetadata[_claimant][_uuid] = proposalMetadata[_claimant][_uuid].setCountered(true);

        // Pay out the bond to the challenger.
        _payoutBond(_claimant, _uuid, msg.sender);`, functions.challengeLPP);

    // squeezeLPP
    c.addFunctionCode(`LPPMetaData metaData = proposalMetadata[_claimant][_uuid];

        // Check if the proposal was countered.
        if (metaData.countered()) revert BadProposal();

        // Check if the proposal has been finalized at all.
        if (metaData.timestamp() == 0) revert ActiveProposal();

        // Check if the challenge period has passed since the proposal was finalized.
        if (block.timestamp - metaData.timestamp() <= CHALLENGE_PERIOD) revert ActiveProposal();

        // Verify that both leaves are present in the merkle tree.
        bytes32 root = getTreeRootLPP(_claimant, _uuid);
        if (
            !(
                _verify(_preStateProof, root, _preState.index, _hashLeaf(_preState))
                    && _verify(_postStateProof, root, _postState.index, _hashLeaf(_postState))
            )
        ) revert InvalidProof();

        // Verify that the prestate passed matches the intermediate state claimed in the leaf.
        if (keccak256(abi.encode(_stateMatrix)) != _preState.stateCommitment) revert InvalidPreimage();

        // Verify that the pre/post state are contiguous.
        if (_preState.index + 1 != _postState.index || _postState.index != metaData.blocksProcessed() - 1) {
            revert StatesNotContiguous();
        }

        // Absorb and permute the input bytes. We perform no final verification on the state matrix here, since the
        // proposal has passed the challenge period and is considered valid.
        LibKeccak.absorb(_stateMatrix, _postState.input);
        LibKeccak.permutation(_stateMatrix);
        bytes32 finalDigest = LibKeccak.squeeze(_stateMatrix);
        assembly {
            finalDigest := or(and(finalDigest, not(shl(248, 0xFF))), shl(248, 0x02))
        }

        // Write the preimage part to the authorized preimage parts mapping.
        uint256 partOffset = metaData.partOffset();
        preimagePartOk[finalDigest][partOffset] = true;
        preimageParts[finalDigest][partOffset] = proposalParts[_claimant][_uuid];
        preimageLengths[finalDigest] = metaData.claimedSize();

        // Pay out the bond to the claimant.
        _payoutBond(_claimant, _uuid, _claimant);`, functions.squeezeLPP);

    // getTreeRootLPP
    c.addFunctionCode(`uint256 size = proposalMetadata[_owner][_uuid].blocksProcessed();
        for (uint256 height = 0; height < KECCAK_TREE_DEPTH; height++) {
            if ((size & 1) == 1) {
                treeRoot_ = keccak256(abi.encode(proposalBranches[_owner][_uuid][height], treeRoot_));
            } else {
                treeRoot_ = keccak256(abi.encode(treeRoot_, zeroHashes[height]));
            }
            size >>= 1;
        }`, functions.getTreeRootLPP);

    // _extractPreimagePart
    c.addFunctionCode(`uint256 offset = _metaData.partOffset();
        uint256 claimedSize = _metaData.claimedSize();
        uint256 currentSize = _metaData.bytesProcessed();

        // Check if the part offset is present in the input data being posted. If it is, assign the part to the mapping.
        if (offset < 8 && currentSize == 0) {
            bytes32 preimagePart;
            assembly {
                mstore(0x00, shl(192, claimedSize))
                mstore(0x08, calldataload(_input.offset))
                preimagePart := mload(offset)
            }
            proposalParts[msg.sender][_uuid] = preimagePart;
        } else if (offset >= 8 && (offset = offset - 8) >= currentSize && offset < currentSize + _input.length) {
            uint256 relativeOffset = offset - currentSize;

            // Revert if the full preimage part is not available in the data we're absorbing. The submitter must
            // supply data that contains the full preimage part so that no partial preimage parts are stored in the
            // oracle. Partial parts are *only* allowed at the tail end of the preimage, where no more data is available
            // to be absorbed.
            if (relativeOffset + 32 >= _input.length && !_finalize) revert PartOffsetOOB();

            // If the preimage part is in the data we're about to absorb, persist the part to the caller's large
            // preimaage metadata.
            bytes32 preimagePart;
            assembly {
                preimagePart := calldataload(add(_input.offset, relativeOffset))
            }
            proposalParts[msg.sender][_uuid] = preimagePart;
        }`, functions._extractPreimagePart);

    // _verify
    c.addFunctionCode(`/// @solidity memory-safe-assembly
        assembly {
            function hashTwo(a, b) -> hash {
                mstore(0x00, a)
                mstore(0x20, b)
                hash := keccak256(0x00, 0x40)
            }

            let value := _leaf
            for { let i := 0x00 } lt(i, KECCAK_TREE_DEPTH) { i := add(i, 0x01) } {
                let branchValue := calldataload(add(_proof.offset, shl(0x05, i)))

                switch and(shr(i, _index), 0x01)
                case 1 { value := hashTwo(branchValue, value) }
                default { value := hashTwo(value, branchValue) }
            }

            isValid_ := eq(value, _root)
        }`, functions._verify);

    // _payoutBond
    c.addFunctionCode(`// Pay out the bond to the claimant.
        uint256 bond = proposalBonds[_claimant][_uuid];
        proposalBonds[_claimant][_uuid] = 0;
        (bool success,) = _to.call{ value: bond }("");
        if (!success) revert BondTransferFailed();`, functions._payoutBond);

    // _hashLeaf
    c.addFunctionCode(`leaf_ = keccak256(abi.encodePacked(_leaf.input, _leaf.index, _leaf.stateCommitment));`, functions._hashLeaf);



    setInfo(c, allOpts.contractInfo);
    return c;
}
  

const functions = defineFunctions({
    readPreimage: {
      kind: 'external' as const,
      args: [
          { name: '_key', type: 'bytes32' },
          { name: '_offset', type: 'uint256' },
        ],
      returns: ['bytes32 dat_', 'uint256 datLen_'],
      mutability: 'view',
    },

    loadLocalData: {
        kind: 'external' as const,
        args: [
            { name: '_ident', type: 'uint256' },
            { name: '_localContext', type: 'bytes32' },
            { name: '_word', type: 'bytes32' },
            { name: '_size', type: 'uint256' },
            { name: '_partOffset', type: 'uint256' },
        ],
        returns: ['bytes32 key_'],
    },

    loadKeccak256PreimagePart: {
        kind: 'external' as const,
        args: [
            { name: '_partOffset', type: 'uint256' },
            { name: '_preimage', type: 'bytes calldata' },
        ],
    },

    loadSha256PreimagePart: {
        kind: 'external' as const,
        args: [
            { name: '_partOffset', type: 'uint256' },
            { name: '_preimage', type: 'bytes calldata' },
        ],
    },


    loadBlobPreimagePart: {
        kind: 'external' as const,
        args: [
            { name: '_z', type: 'uint256' },
            { name: '_y', type: 'uint256' },
            { name: '_commitment', type: 'bytes calldata' },
            { name: '_proof', type: 'bytes calldata' },
            { name: '_partOffset', type: 'uint256' },
        ],
    },


    loadPrecompilePreimagePart: {
        kind: 'external' as const,
        args: [
            { name: '_partOffset', type: 'uint256' },
            { name: '_precompile', type: 'address' },
            { name: '_requiredGas', type: 'uint64' },
            { name: '_input', type: 'bytes calldata' },
        ],
    },

    proposalCount: {
        kind: 'external' as const,
        args: [],
        returns: ['uint256 count_'],
        mutability: 'view',
    },

    proposalBlocksLen: {
        kind: 'external' as const,
        args: [
            { name: '_claimant', type: 'address' },
            { name: '_uuid', type: 'uint256' },
        ],
        returns: ['uint256 len_'],
        mutability: 'view',
    },

    challengePeriod: {
        kind: 'external' as const,
        args: [],
        returns: ['uint256 challengePeriod_'],
        mutability: 'view',
    },

    minProposalSize: {
        kind: 'external' as const,
        args: [],
        returns: ['uint256 minProposalSize_'],
        mutability: 'view',
    },

    initLPP: {
        kind: 'external payable' as const,
        args: [
            { name: '_uuid', type: 'uint256' },
            { name: '_partOffset', type: 'uint32' },
            { name: '_claimedSize', type: 'uint32' },
        ],
    },

    addLeavesLPP: {
        kind: 'external' as const,
        args: [
            { name: '_uuid', type: 'uint256' },
            { name: '_inputStartBlock', type: 'uint256' },
            { name: '_input', type: 'bytes calldata' },
            { name: '_stateCommitments', type: 'bytes32[] calldata' },
            { name: '_finalize', type: 'bool' },
        ],
    },

    challengeLPP: {
        kind: 'external' as const,
        args: [
            { name: '_claimant', type: 'address' },
            { name: '_uuid', type: 'uint256' },
            { name: '_stateMatrix', type: 'LibKeccak.StateMatrix memory' },
            { name: '_preState', type: 'Leaf calldata' },
            { name: '_preStateProof', type: 'bytes32[] calldata' },
            { name: '_postState', type: 'Leaf calldata' },
            { name: '_postStateProof', type: 'bytes32[] calldata' },
        ],
    },

    squeezeLPP: {
        kind: 'external' as const,
        args: [
            { name: '_claimant', type: 'address' },
            { name: '_uuid', type: 'uint256' },
            { name: '_stateMatrix', type: 'LibKeccak.StateMatrix memory' },
            { name: '_preState', type: 'Leaf calldata' },
            { name: '_preStateProof', type: 'bytes32[] calldata' },
            { name: '_postState', type: 'Leaf calldata' },
            { name: '_postStateProof', type: 'bytes32[] calldata' },
        ],
    },

    getTreeRootLPP: {
        kind: 'public' as const,
        args: [
            { name: '_owner', type: 'address' },
            { name: '_uuid', type: 'uint256' },
        ],
        returns: ['bytes32 treeRoot_'],
        mutability: 'view',
    },

    _extractPreimagePart: {
        kind: 'internal' as const,
        args: [
            { name: '_input', type: 'bytes calldata' },
             { name: '_uuid', type: 'uint256' },
             { name: '_finalize', type: 'bool' },
            { name: '_metaData', type: 'LPPMetaData' },
        ],
    },

    _verify: {
        kind: 'internal' as const,
        args: [
            { name: '_proof', type: 'bytes32[] calldata' },
            { name: '_root', type: 'bytes32' },
            { name: '_index', type: 'uint256' },
            { name: '_leaf', type: 'bytes32' },
        ],
        returns: ['bool isValid_'],
        mutability: 'pure',
    },

    _payoutBond: {
        kind: 'internal' as const,
        args: [
            { name: '_claimant', type: 'address' },
            { name: '_uuid', type: 'uint256' },
            { name: '_to', type: 'address' },
        ],
    },

    _hashLeaf: {
        kind: 'internal' as const,
        args: [
            { name: '_leaf', type: 'Leaf calldata' },
        ],
        returns: ['bytes32 leaf_'],
        mutability: 'pure',
    },

});
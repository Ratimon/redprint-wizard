import type { BaseModifier, Contract} from './contract';
import {  ContractBuilder } from './contract';

import { withCommonDefaults, defaults as commonDefaults } from "../shared/2-superchain/3B-option-versions";
import type { SharedProtocolVersionsOptions } from '../shared/2-superchain/3B-option-versions';

import { printContract } from "./print";
import { setInfo  } from "./set-info";

import { defineFunctions } from '../utils/define-functions';

function withDefaults(opts: SharedProtocolVersionsOptions): Required<SharedProtocolVersionsOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printProtocolVersions(opts: SharedProtocolVersionsOptions = commonDefaults): string {
  return printContract(buildProtocolVersions(opts));
}

export function buildProtocolVersions(opts: SharedProtocolVersionsOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    c.addType(`ProtocolVersion`, `uint256`);

    const OwnableUpgradeable = {
        name: 'OwnableUpgradeable',
        path: '@redprint-openzeppelin-upgradable/access/OwnableUpgradeable.sol',
    };
    c.addParent(OwnableUpgradeable, []);

    const ISemver = {
      name: 'ISemver',
      path: '@redprint-core/universal/ISemver.sol',
    };
    c.addParent(ISemver);

    const Storage = {
        name: 'Storage',
        path: '@redprint-core/libraries/Storage.sol',
    };
    c.addModule(Storage);

    const Constants = {
        name: 'Constants',
        path: '@redprint-core/libraries/Constants.sol',
    };
    c.addModule(Constants);

    c.addVariable(`/// @notice Enum representing different types of updates.
    /// @custom:value REQUIRED_PROTOCOL_VERSION              Represents an update to the required protocol version.
    /// @custom:value RECOMMENDED_PROTOCOL_VERSION           Represents an update to the recommended protocol version.
    enum UpdateType {
        REQUIRED_PROTOCOL_VERSION,
        RECOMMENDED_PROTOCOL_VERSION
    }`);
    
    c.addVariable(` /// @notice Version identifier, used for upgrades.
    uint256 public constant VERSION = 0;`);

    c.addVariable(`/// @notice Storage slot that the required protocol version is stored at.
    bytes32 public constant REQUIRED_SLOT = bytes32(uint256(keccak256("protocolversion.required")) - 1);`);

    c.addVariable(`/// @notice Storage slot that the recommended protocol version is stored at.
    bytes32 public constant RECOMMENDED_SLOT = bytes32(uint256(keccak256("protocolversion.recommended")) - 1);`);

    c.addVariable(`/// @notice Emitted when configuration is updated.
    /// @param version    ProtocolVersion version.
    /// @param updateType Type of update.
    /// @param data       Encoded update data.
    event ConfigUpdate(uint256 indexed version, UpdateType indexed updateType, bytes data);`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 1.0.0
    string public constant version = "1.0.0";`);

    
    c.addConstructorCode(`initialize({
            _owner: address(0xdEaD),
            _required: ProtocolVersion.wrap(uint256(0)),
            _recommended: ProtocolVersion.wrap(uint256(0))
        });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`__Ownable_init();
        transferOwnership(_owner);
        _setRequired(_required);
        _setRecommended(_recommended);`, functions.initialize);

    // required
    c.addFunctionCode(`out_ = ProtocolVersion.wrap(Storage.getUint(REQUIRED_SLOT));`, functions.required);

    // setRequired
    c.addModifier('onlyOwner', functions.setRequired);
    c.addFunctionCode(`_setRequired(_required);`, functions.setRequired);

    // _setRequired
    c.addFunctionCode(`Storage.setUint(REQUIRED_SLOT, ProtocolVersion.unwrap(_required));
        bytes memory data = abi.encode(_required);
        emit ConfigUpdate(VERSION, UpdateType.REQUIRED_PROTOCOL_VERSION, data);`, functions._setRequired);

    // recommended
    c.addFunctionCode(`out_ = ProtocolVersion.wrap(Storage.getUint(RECOMMENDED_SLOT));`, functions.recommended);

    // setRecommended
    c.addModifier('onlyOwner', functions.setRecommended);
    c.addFunctionCode(`_setRecommended(_recommended);`, functions.setRecommended);

    // _setRecommended
    c.addFunctionCode(`Storage.setUint(RECOMMENDED_SLOT, ProtocolVersion.unwrap(_recommended));

        bytes memory data = abi.encode(_recommended);
        emit ConfigUpdate(VERSION, UpdateType.RECOMMENDED_PROTOCOL_VERSION, data);`, functions._setRecommended);


    setInfo(c, allOpts.contractInfo);
    return c;
}


const functions = defineFunctions({

    initialize: {
      kind: 'public' as const,
      args: [
          { name: '_owner', type: 'address' },
          { name: '_required', type: 'ProtocolVersion' },
          { name: '_recommended', type: 'ProtocolVersion' },
      ],
    },
  
    required: {
      kind: 'external' as const,
      args: [
      ],
      returns: ['ProtocolVersion out_'],
      mutability: 'view',
    },

    setRequired: {
      kind: 'external' as const,
      args: [
        { name: '_required', type: 'ProtocolVersion' },
      ],
    },
  
    _setRequired: {
      kind: 'internal' as const,
      args: [
        { name: '_required', type: 'ProtocolVersion' },
      ],
    },

    recommended: {
        kind: 'external' as const,
        args: [
        ],
        returns: ['ProtocolVersion out_'],
        mutability: 'view',
    },

    setRecommended: {
        kind: 'external' as const,
        args: [
            { name: '_recommended', type: 'ProtocolVersion' },
        ],
    },

    _setRecommended: {
        kind: 'internal' as const,
        args: [
            { name: '_recommended', type: 'ProtocolVersion' },
        ],
    },
  
 
  
  });
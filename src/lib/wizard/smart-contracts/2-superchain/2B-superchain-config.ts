import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/2-superchain/2B-option-superchain-config";
import type { SharedSuperchainConfigOptions } from '../../shared/2-superchain/2B-option-superchain-config';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedSuperchainConfigOptions): Required<SharedSuperchainConfigOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printSuperchainConfig(opts: SharedSuperchainConfigOptions = commonDefaults): string {
  return printContract(buildSuperchainConfig(opts));
}

export function buildSuperchainConfig(opts: SharedSuperchainConfigOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const Initializable = {
        name: 'Initializable',
        path: '@redprint-openzeppelin/proxy/utils/Initializable.sol',
    };
    c.addParent(Initializable, []);

    const ISemver = {
        name: 'ISemver',
        path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver, []);

    const Storage = {
        name: 'Storage',
        path: '@redprint-core/libraries/Storage.sol',
      };
    c.addImportOnly(Storage);

    c.addVariable(`/// @notice Enum representing different types of updates.
    /// @custom:value GUARDIAN            Represents an update to the guardian.
    enum UpdateType {
        GUARDIAN
    }`);
    
    c.addVariable(`/// @notice Whether or not the Superchain is paused.
    bytes32 public constant PAUSED_SLOT = bytes32(uint256(keccak256("superchainConfig.paused")) - 1);`);

    c.addVariable(`/// @notice The address of the guardian, which can pause withdrawals from the System.
    ///         It can only be modified by an upgrade.
    bytes32 public constant GUARDIAN_SLOT = bytes32(uint256(keccak256("superchainConfig.guardian")) - 1);`);

    c.addVariable(`/// @notice Emitted when the pause is triggered.
    /// @param identifier A string helping to identify provenance of the pause transaction.
    event Paused(string identifier);`);

    c.addVariable(`/// @notice Emitted when the pause is lifted.
    event Unpaused();`);

    c.addVariable(`event ConfigUpdate(UpdateType indexed updateType, bytes data);`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 1.1.1-beta.1
    string public constant version = "1.1.1-beta.1";`);

    c.addConstructorCode(`initialize({ _guardian: address(0), _paused: false });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`_setGuardian(_guardian);
        if (_paused) {
            _pause("Initializer paused");
        }`, functions.initialize);

    // guardian
    c.addFunctionCode(`guardian_ = Storage.getAddress(GUARDIAN_SLOT);`, functions.guardian);

    // paused
    c.addFunctionCode(`paused_ = Storage.getBool(PAUSED_SLOT);`, functions.paused);

    // pause
    c.addFunctionCode(`require(msg.sender == guardian(), "SuperchainConfig: only guardian can pause");
        _pause(_identifier);`, functions.pause);

    // _pause
    c.addFunctionCode(`Storage.setBool(PAUSED_SLOT, true);
        emit Paused(_identifier);`, functions._pause);


    // unpause
    c.addFunctionCode(`require(msg.sender == guardian(), "SuperchainConfig: only guardian can unpause");
        Storage.setBool(PAUSED_SLOT, false);
        emit Unpaused();`, functions.unpause);

    // _setGuardian
    c.addFunctionCode(`Storage.setAddress(GUARDIAN_SLOT, _guardian);
        emit ConfigUpdate(UpdateType.GUARDIAN, abi.encode(_guardian));`, functions._setGuardian);

    setInfo(c, allOpts.contractInfo);
    return c;
}


const functions = defineFunctions({

  initialize: {
    kind: 'public' as const,
    args: [
        { name: '_guardian', type: 'address' },
        { name: '_paused', type: 'bool' },
    ],
  },

  guardian: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['address guardian_'],
    mutability: 'view',
  },

  paused: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['bool paused_'],
    mutability: 'view',
  },

  pause: {
    kind: 'external' as const,
    args: [
        { name: '_identifier', type: 'string memory' },
    ],
  },

  _pause: {
    kind: 'internal' as const,
    args: [
        { name: '_identifier', type: 'string memory' },
    ],
    returns: ['address']
  },

  unpause: {
    kind: 'external' as const,
    args: [
    ],
  },

  _setGuardian: {
    kind: 'internal' as const,
    args: [
      { name: '_guardian', type: 'address' },
      ],
  },

});
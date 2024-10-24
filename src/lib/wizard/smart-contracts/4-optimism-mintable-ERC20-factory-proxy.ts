import type { BaseModifier, Contract} from './contract';
import {  ContractBuilder } from './contract';

import { withCommonDefaults, defaults as commonDefaults } from '../shared/4-opchain/1E-option-optimism-mintable-ERC20-factory-proxy';
import type { SharedOptimismMintableERC20FactoryProxyOptions } from '../shared/4-opchain/1E-option-optimism-mintable-ERC20-factory-proxy';

import { printContract } from "./print";
import { setInfo  } from "./set-info";

import { defineFunctions } from '../utils/define-functions';

function withDefaults(opts: SharedOptimismMintableERC20FactoryProxyOptions): Required<SharedOptimismMintableERC20FactoryProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printOptimismMintableERC20FactoryProxy(opts: SharedOptimismMintableERC20FactoryProxyOptions = commonDefaults): string {
  return printContract(buildOptimismMintableERC20FactoryProxy(opts));
}

export function buildOptimismMintableERC20FactoryProxy(opts: SharedOptimismMintableERC20FactoryProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);


    c.addVariable(`/**
     * @notice The storage slot that holds the address of the implementation.
     *         bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
     */
    bytes32 internal constant IMPLEMENTATION_KEY = 0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc;}`);
    
    c.addVariable(`/**
     * @notice The storage slot that holds the address of the owner.
     *         bytes32(uint256(keccak256('eip1967.proxy.admin')) - 1)
     */
    bytes32 internal constant OWNER_KEY = 0xb53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103;`);

    c.addVariable(`/**
     * @notice An event that is emitted each time the implementation is changed. This event is part
     *         of the EIP-1967 specification.
     *
     * @param implementation The address of the implementation contract
     */
    event Upgraded(address indexed implementation);`);

    c.addVariable(`/**
     * @notice An event that is emitted each time the owner is upgraded. This event is part of the
     *         EIP-1967 specification.
     *
     * @param previousAdmin The previous owner of the contract
     * @param newAdmin      The new owner of the contract
     */
    event AdminChanged(address previousAdmin, address newAdmin);`);

    const mod : BaseModifier = getProxyCallIfNotAdminModifier();

    c.addModiferCode(`if (msg.sender == _getAdmin() || msg.sender == address(0)) {
            _;
        } else {
            // This WILL halt the call frame on completion.
            _doProxyCall();
        }`, mod)

    c.addConstructorArgument({
      type: 'address',
      name: '_admin'
    });
    c.addConstructorCode('_changeAdmin(_admin);');

    c.addReceiveCode(`// Proxy call by default.
        _doProxyCall();`)

    c.addFallbackCode(`// Proxy call by default.
        _doProxyCall();`)

    // upgradeTo
    c.addModifier('virtual', functions.upgradeTo);
    c.addFunctionCode(`_setImplementation(_implementation);`, functions.upgradeTo);

    // upgradeToAndCall
    c.addModifier('payable virtual proxyCallIfNotAdmin', functions.upgradeToAndCall);
    c.addFunctionCode(`_setImplementation(_implementation);
        (bool success, bytes memory returndata) = _implementation.delegatecall(_data);
        require(success, "Proxy: delegatecall to new implementation contract failed");
        return returndata;`, functions.upgradeToAndCall);

    // changeAdmin
    c.addModifier('virtual proxyCallIfNotAdmin', functions.changeAdmin);
    c.addFunctionCode(`_changeAdmin(_admin);`, functions.changeAdmin);

    // admin
    c.addModifier('virtual proxyCallIfNotAdmin', functions.admin);
    c.addFunctionCode(`return _getAdmin();`, functions.admin);

    // implementation
    c.addModifier('virtual proxyCallIfNotAdmin', functions.implementation);
    c.addFunctionCode(`return _getImplementation();`, functions.implementation);


    // _setImplementation
    c.addFunctionCode(`assembly {
            sstore(IMPLEMENTATION_KEY, _implementation)
        }
        emit Upgraded(_implementation);`, functions._setImplementation);

    // _changeAdmin
    c.addFunctionCode(`address previous = _getAdmin();
        assembly {
            sstore(OWNER_KEY, _admin)
        }
        emit AdminChanged(previous, _admin);`, functions._changeAdmin);

    // _doProxyCall
    c.addFunctionCode(`address impl = _getImplementation();
        require(impl != address(0), "Proxy: implementation not initialized");

        assembly {
            // Copy calldata into memory at 0x0....calldatasize.
            calldatacopy(0x0, 0x0, calldatasize())

            // Perform the delegatecall, make sure to pass all available gas.
            let success := delegatecall(gas(), impl, 0x0, calldatasize(), 0x0, 0x0)

            // Copy returndata into memory at 0x0....returndatasize. Note that this *will*
            // overwrite the calldata that we just copied into memory but that doesn't really
            // matter because we'll be returning in a second anyway.
            returndatacopy(0x0, 0x0, returndatasize())

            // Success == 0 means a revert. We'll revert too and pass the data up.
            if iszero(success) { revert(0x0, returndatasize()) }

            // Otherwise we'll just return and pass the data up.
            return(0x0, returndatasize())
        }`, functions._doProxyCall);

    // _getImplementation
    c.addFunctionCode(`address impl;
        assembly {
            impl := sload(IMPLEMENTATION_KEY)
        }
        return impl;`, functions._getImplementation);

    // _getAdmin
    c.addFunctionCode(`address owner;
        assembly {
            owner := sload(OWNER_KEY)
        }
        return owner;`, functions._getAdmin);

    setInfo(c, allOpts.contractInfo);
    return c;
}

function getProxyCallIfNotAdminModifier() {
    const mod = {
      name: 'proxyCallIfNotAdmin',
      args: [],
    };
  
    return mod;
  }

const functions = defineFunctions({

  upgradeTo: {
    kind: 'public' as const,
    args: [
          { name: '_implementation', type: 'address' },
        ],
    returns: ['proxyCallIfNotAdmin']
  },

  upgradeToAndCall: {
    kind: 'public' as const,
    args: [
      { name: '_implementation', type: 'address' },
      { name: '_data', type: 'bytes calldata' },
    ],
    returns: ['bytes memory'],
  },

  changeAdmin: {
    kind: 'public' as const,
    args: [
      { name: '_admin', type: 'address' },
      ],
  },

  admin: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['address']
  },

  implementation: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['address']
  },

  _setImplementation: {
    kind: 'internal' as const,
    args: [
      { name: '_implementation', type: 'address' },
      ],
  },

  _changeAdmin: {
    kind: 'internal' as const,
    args: [
      { name: '_admin', type: 'address' },
      ],
  },

  _doProxyCall: {
    kind: 'internal' as const,
    args: [
      ],
  },

  _getImplementation: {
    kind: 'internal' as const,
    args: [
    ],
    returns: ['address'],
    mutability: 'view',
  },

  _getAdmin: {
    kind: 'internal' as const,
    args: [
    ],
    returns: ['address'],
    mutability: 'view',
  },

});
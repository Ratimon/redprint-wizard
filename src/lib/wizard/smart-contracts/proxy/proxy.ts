import type { ContractBuilder } from '../contract';
import type { BaseModifier} from '../contract';

import { defineFunctions } from '../../utils/define-functions';

export function buildProxy(c: ContractBuilder): void {

    const Constants = {
      name: 'Constants',
      path: '@redprint-core/libraries/Constants.sol',
    };
    c.addImportOnly(Constants);
  
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
    c.addFunctionCode(`bytes32 proxyImplementation = Constants.PROXY_IMPLEMENTATION_ADDRESS;
        assembly {
            sstore(proxyImplementation, _implementation)
        }
        emit Upgraded(_implementation);`, functions._setImplementation);
  
    // _changeAdmin
    c.addFunctionCode(`address previous = _getAdmin();
        bytes32 proxyOwner = Constants.PROXY_OWNER_ADDRESS;
        assembly {
            sstore(proxyOwner, _admin)
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
        bytes32 proxyImplementation = Constants.PROXY_IMPLEMENTATION_ADDRESS;
        assembly {
            impl := sload(proxyImplementation)
        }
        return impl;`, functions._getImplementation);
  
    // _getAdmin
    c.addFunctionCode(`address owner;
        bytes32 proxyOwner = Constants.PROXY_OWNER_ADDRESS;
        assembly {
            owner := sload(proxyOwner)
        }
        return owner;`, functions._getAdmin);
  
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
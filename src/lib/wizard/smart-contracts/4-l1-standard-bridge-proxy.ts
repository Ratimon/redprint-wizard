import type { BaseModifier, Contract} from './contract';
import {  ContractBuilder } from './contract';

import { withCommonDefaults, defaults as commonDefaults } from '../shared/4-opchain/option-l1-standard-bridge-proxy';
import type { SharedL1StandardBridgeProxyOptions } from '../shared/4-opchain/option-l1-standard-bridge-proxy';

import { printContract } from "./print";
import { setInfo  } from "./set-info";

import { defineFunctions } from '../utils/define-functions';

function withDefaults(opts: SharedL1StandardBridgeProxyOptions): Required<SharedL1StandardBridgeProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}


export function printL1StandardBridgeProxy(opts: SharedL1StandardBridgeProxyOptions = commonDefaults): string {
  return printContract(buildL1StandardBridgeProxy(opts));
}

export function buildL1StandardBridgeProxy(opts: SharedL1StandardBridgeProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const Constants = {
        name: 'Constants',
        path: '@redprint-core/libraries/Constants.sol',
      };
    c.addModule(Constants);

    const IL1ChugSplashDeployer = {
        name: 'IL1ChugSplashDeployer',
        path: '@redprint-core/legacy/L1ChugSplashProxy.sol',
      };
    c.addModule(IL1ChugSplashDeployer);
   
    c.addVariable(`/// @notice "Magic" prefix. When prepended to some arbitrary bytecode and used to create a
    ///         contract, the appended bytecode will be deployed as given.
    bytes13 internal constant DEPLOY_CODE_PREFIX = 0x600D380380600D6000396000f3;
    `);

    const onlyWhenNotPaused : BaseModifier = getonlyWhenNotPausedModifier();
    c.addModiferCode(`address owner = _getOwner();

        // We do a low-level call because there's no guarantee that the owner actually *is* an
        // L1ChugSplashDeployer contract and Solidity will throw errors if we do a normal call and
        // it turns out that it isn't the right type of contract.
        (bool success, bytes memory returndata) =
            owner.staticcall(abi.encodeWithSelector(IL1ChugSplashDeployer.isUpgrading.selector));

        // If the call was unsuccessful then we assume that there's no "isUpgrading" method and we
        // can just continue as normal. We also expect that the return value is exactly 32 bytes
        // long. If this isn't the case then we can safely ignore the result.
        if (success && returndata.length == 32) {
            // Although the expected value is a *boolean*, it's safer to decode as a uint256 in the
            // case that the isUpgrading function returned something other than 0 or 1. But we only
            // really care about the case where this value is 0 (= false).
            uint256 ret = abi.decode(returndata, (uint256));
            require(ret == 0, "L1ChugSplashProxy: system is currently being upgraded");
        }

        _;`, onlyWhenNotPaused)

    const proxyCallIfNotOwner : BaseModifier = getproxyCallIfNotOwnerModifier();
    c.addModiferCode(`if (msg.sender == _getOwner() || msg.sender == address(0)) {
            _;
        } else {
            // This WILL halt the call frame on completion.
            _doProxyCall();
        }`, proxyCallIfNotOwner)
    

    c.addConstructorArgument({
      type: 'address',
      name: '_owner'
    });
    c.addConstructorCode('_setOwner(_owner);');

    c.addReceiveCode(`// Proxy call by default.
        _doProxyCall();`)

    c.addFallbackCode(`// Proxy call by default.
        _doProxyCall();`)

    // setCode
    c.addModifier('proxyCallIfNotOwner', functions.setCode);
    c.addFunctionCode(`// Get the code hash of the current implementation.
        address implementation = _getImplementation();

        // If the code hash matches the new implementation then we return early.
        if (keccak256(_code) == _getAccountCodeHash(implementation)) {
            return;
        }

        // Create the deploycode by appending the magic prefix.
        bytes memory deploycode = abi.encodePacked(DEPLOY_CODE_PREFIX, _code);

        // Deploy the code and set the new implementation address.
        address newImplementation;
        assembly {
            newImplementation := create(0x0, add(deploycode, 0x20), mload(deploycode))
        }

        // Check that the code was actually deployed correctly. I'm not sure if you can ever
        // actually fail this check. Should only happen if the contract creation from above runs
        // out of gas but this parent execution thread does NOT run out of gas. Seems like we
        // should be doing this check anyway though.
        require(
            _getAccountCodeHash(newImplementation) == keccak256(_code),
            "L1ChugSplashProxy: code was not correctly deployed"
        );

        _setImplementation(newImplementation);`, functions.setCode);

    // setStorage
    c.addModifier('proxyCallIfNotOwner', functions.setStorage);
    c.addFunctionCode(`assembly {
            sstore(_key, _value)
        }`, functions.setStorage);


    // getOwner
    c.addModifier('proxyCallIfNotOwner', functions.getOwner);
    c.addFunctionCode(`return _getOwner();`, functions.getOwner);

    // getImplementation
    c.addModifier('proxyCallIfNotOwner', functions.getImplementation);
    c.addFunctionCode(`return _getImplementation();`, functions.getImplementation);


    // _setImplementation
    c.addFunctionCode(`bytes32 proxyImplementation = Constants.PROXY_IMPLEMENTATION_ADDRESS;
        assembly {
            sstore(proxyImplementation, _implementation)
        }`, functions._setImplementation);

    // _setOwner
    c.addFunctionCode(`bytes32 proxyOwner = Constants.PROXY_OWNER_ADDRESS;
        assembly {
            sstore(proxyOwner, _owner)
        }`, functions._setOwner);

    // _doProxyCall
    c.addModifier('onlyWhenNotPaused', functions._doProxyCall);
    c.addFunctionCode(`address implementation = _getImplementation();

        require(implementation != address(0), "L1ChugSplashProxy: implementation is not set yet");

        assembly {
            // Copy calldata into memory at 0x0....calldatasize.
            calldatacopy(0x0, 0x0, calldatasize())

            // Perform the delegatecall, make sure to pass all available gas.
            let success := delegatecall(gas(), implementation, 0x0, calldatasize(), 0x0, 0x0)

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
    c.addFunctionCode(`address implementation;
        bytes32 proxyImplementation = Constants.PROXY_IMPLEMENTATION_ADDRESS;
        assembly {
            implementation := sload(proxyImplementation)
        }
        return implementation;`, functions._getImplementation);

    // _getOwner
    c.addFunctionCode(`address owner;
        bytes32 proxyOwner = Constants.PROXY_OWNER_ADDRESS;
        assembly {
            owner := sload(proxyOwner)
        }
        return owner;`, functions._getOwner);

    // _getAccountCodeHash
    c.addFunctionCode(`bytes32 codeHash;
        assembly {
            codeHash := extcodehash(_account)
        }
        return codeHash;`, functions._getAccountCodeHash);
        

    setInfo(c, allOpts.contractInfo);
    return c;
}

function getonlyWhenNotPausedModifier() {
    const mod = {
      name: 'onlyWhenNotPaused',
      args: [],
    };
  
    return mod;
}

function getproxyCallIfNotOwnerModifier() {
    const mod = {
      name: 'proxyCallIfNotOwner',
      args: [],
    };
  
    return mod;
}

const functions = defineFunctions({

    setCode: {
    kind: 'external' as const,
    args: [
          { name: '_code', type: 'bytes memory' },
        ],
  },

  setStorage: {
    kind: 'external' as const,
    args: [
      { name: '_key', type: 'bytes32' },
      { name: '_value', type: 'bytes32' },
    ],
  },
  
  getOwner: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['address']
  },


  getImplementation: {
    kind: 'external' as const,
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

  _setOwner: {
    kind: 'internal' as const,
    args: [
      { name: '_owner', type: 'address' },
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

  _getOwner: {
    kind: 'internal' as const,
    args: [
    ],
    returns: ['address'],
    mutability: 'view',
  },

  _getAccountCodeHash: {
    kind: 'internal' as const,
    args: [
      { name: '_account', type: 'address' },
    ],
    returns: ['bytes32'],
    mutability: 'view',
  },

});
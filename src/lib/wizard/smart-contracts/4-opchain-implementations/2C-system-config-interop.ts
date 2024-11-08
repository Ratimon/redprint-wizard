import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2C-option-system-config-interop';
import type { SharedSystemConfigInteropOptions } from '../../shared/4-opchain-implementations/2C-option-system-config-interop';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';

function withDefaults(opts: SharedSystemConfigInteropOptions): Required<SharedSystemConfigInteropOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printSystemConfigInterop(opts: SharedSystemConfigInteropOptions = commonDefaults): string {
  return printContract(buildSystemConfigInterop(opts));
}

export function buildSystemConfigInterop(opts: SharedSystemConfigInteropOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);


    const ERC20 = {
      name: 'ERC20',
      path: '@redprint-openzeppelin/token/ERC20/ERC20.sol',
    };
    c.addModule(ERC20);


    const IOptimismPortalInterop = {
      name: 'IOptimismPortalInterop as IOptimismPortal',
      path: '@redprint-core/L1/interfaces/IOptimismPortalInterop.sol',
    };
    c.addModule(IOptimismPortalInterop);

    const SystemConfig = {
      name: 'SystemConfig',
      path: '@redprint-core/L1/SystemConfig.sol',
    };
    c.addParent(SystemConfig);
    c.addOverride(SystemConfig, functions._setGasPayingToken);

    const ConfigType = {
      name: 'ConfigType',
      path: '@redprint-core/L2/L1BlockInterop.sol',
    };
    c.addModule(ConfigType);

    const Constants = {
      name: 'Constants',
      path: '@redprint-core/libraries/Constants.sol',
    };
    c.addModule(Constants);

    const GasPayingToken = {
        name: 'GasPayingToken',
        path: '@redprint-core/libraries/GasPayingToken.sol',
    };
    c.addModule(GasPayingToken);

    const StaticConfig = {
      name: 'StaticConfig',
      path: '@redprint-core/libraries/StaticConfig.sol',
    };
    c.addModule(StaticConfig);

    const Storage = {
        name: 'Storage',
        path: '@redprint-core/libraries/Storage.sol',
    };
    c.addModule(Storage);

    const IResourceMetering = {
        name: 'IResourceMetering',
        path: '@redprint-core/L1/interfaces/IResourceMetering.sol',
    };
    c.addModule(IResourceMetering);


    c.addVariable(`/// @notice Storage slot where the dependency manager address is stored
    /// @dev    Equal to bytes32(uint256(keccak256("systemconfig.dependencymanager")) - 1)
    bytes32 internal constant DEPENDENCY_MANAGER_SLOT =
        0x1708e077affb93e89be2665fb0fb72581be66f84dc00d25fed755ae911905b1c;`);
    

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`// This method has an initializer modifier, and will revert if already initialized.
        initialize({
            _owner: _owner,
            _basefeeScalar: _basefeeScalar,
            _blobbasefeeScalar: _blobbasefeeScalar,
            _batcherHash: _batcherHash,
            _gasLimit: _gasLimit,
            _unsafeBlockSigner: _unsafeBlockSigner,
            _config: _config,
            _batchInbox: _batchInbox,
            _addresses: _addresses
        });
        Storage.setAddress(DEPENDENCY_MANAGER_SLOT, _dependencyManager);`, functions.initialize);

    // version
    c.addModifier('override', functions.version);
    c.addFunctionCode(`return string.concat(super.version(), "+interop-beta.3");`, functions.version);

    // _setGasPayingToken
    c.addFunctionCode(`if (_token != address(0) && _token != Constants.ETHER && !isCustomGasToken()) {
        require(
            ERC20(_token).decimals() == GAS_PAYING_TOKEN_DECIMALS, "SystemConfig: bad decimals of gas paying token"
        );
        bytes32 name = GasPayingToken.sanitize(ERC20(_token).name());
        bytes32 symbol = GasPayingToken.sanitize(ERC20(_token).symbol());

        // Set the gas paying token in storage and in the OptimismPortal.
        GasPayingToken.set({ _token: _token, _decimals: GAS_PAYING_TOKEN_DECIMALS, _name: name, _symbol: symbol });
        IOptimismPortal(payable(optimismPortal())).setConfig(
            ConfigType.SET_GAS_PAYING_TOKEN,
            StaticConfig.encodeSetGasPayingToken({
                _token: _token,
                _decimals: GAS_PAYING_TOKEN_DECIMALS,
                _name: name,
                _symbol: symbol
            })
        );
    }`, functions._setGasPayingToken);

    // addDependency
    c.addFunctionCode(`require(msg.sender == dependencyManager(), "SystemConfig: caller is not the dependency manager");
        IOptimismPortal(payable(optimismPortal())).setConfig(
            ConfigType.ADD_DEPENDENCY, StaticConfig.encodeAddDependency(_chainId)
        );`, functions.addDependency);

    // removeDependency
    c.addFunctionCode(`require(msg.sender == dependencyManager(), "SystemConfig: caller is not the dependency manager");
        require(msg.sender == dependencyManager(), "SystemConfig: caller is not the dependency manager");
        IOptimismPortal(payable(optimismPortal())).setConfig(
            ConfigType.REMOVE_DEPENDENCY, StaticConfig.encodeRemoveDependency(_chainId)
        );`, functions.removeDependency);

    // dependencyManager
    c.addFunctionCode(`return Storage.getAddress(DEPENDENCY_MANAGER_SLOT);`, functions.dependencyManager);


    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({

  initialize: {
    kind: 'external' as const,
    args: [
          { name: '_owner', type: 'address' },
          { name: '_basefeeScalar', type: 'uint32' },
          { name: '_blobbasefeeScalar', type: 'uint32' },
          { name: '_batcherHash', type: 'bytes32' },
          { name: '_gasLimit', type: 'uint64' },
          { name: '_unsafeBlockSigner', type: 'address' },
          { name: '_config', type: 'IResourceMetering.ResourceConfig memory' },
          { name: '_batchInbox', type: 'address' },
          { name: '_addresses', type: 'SystemConfig.Addresses memory' },
          { name: '_dependencyManager', type: 'address' },
        ],
  },

  version: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['string memory'],
    mutability: 'pure',
  },

  _setGasPayingToken: {
    kind: 'internal' as const,
    args: [
      { name: '_token', type: 'address' },
    ],
  },

  addDependency: {
    kind: 'external' as const,
    args: [
      { name: '_chainId', type: 'uint256' },
    ],
  },

  removeDependency: {
    kind: 'external' as const,
    args: [
        { name: '_chainId', type: 'uint256' },
    ],
  },

  dependencyManager: {
    kind: 'public' as const,
    args: [
    ],
    returns: ['address'],
    mutability: 'view',
  },

});
import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';
import type { SharedL1CrossDomainMessengerOptions } from '../../shared//4-opchain-implementations/2A-option-l1-crossdomain-messenger';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';


function withDefaults(opts: SharedL1CrossDomainMessengerOptions): Required<SharedL1CrossDomainMessengerOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}


export function printL1CrossDomainMessenger(opts: SharedL1CrossDomainMessengerOptions = commonDefaults): string {
  return printContract(buildL1CrossDomainMessenger(opts));
}

export function buildL1CrossDomainMessenger(opts: SharedL1CrossDomainMessengerOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const CrossDomainMessenger = {
        name: 'CrossDomainMessenger',
        path: '@redprint-core/universal/CrossDomainMessenger.sol',
    };
    c.addParent(CrossDomainMessenger, [{ lit: '' }]);

    const Predeploys = {
        name: 'Predeploys',
        path: '@redprint-core/libraries/Predeploys.sol',
    };
    c.addModule(Predeploys);

    const ISemver = {
      name: 'ISemver',
      path: '@redprint-core/universal/interfaces/ISemver.sol',
    };
    c.addParent(ISemver);

    const ISuperchainConfig = {
      name: 'ISuperchainConfig',
      path: '@redprint-core/L1/interfaces/ISuperchainConfig.sol',
    };
    c.addModule(ISuperchainConfig);

    const ISystemConfig = {
      name: 'ISystemConfig',
      path: '@redprint-core/L1/interfaces/ISystemConfig.sol',
    };
    c.addModule(ISystemConfig);

    const IOptimismPortal = {
      name: 'IOptimismPortal',
      path: '@redprint-core/L1/interfaces/IOptimismPortal.sol',
    };
    c.addModule(IOptimismPortal);


    c.addVariable(`/// @notice Contract of the SuperchainConfig.
    ISuperchainConfig public superchainConfig;`);

    c.addVariable(`/// @notice Contract of the OptimismPortal.
    /// @custom:network-specific
    IOptimismPortal public portal;`);

    c.addVariable(`/// @notice Address of the SystemConfig contract.
    ISystemConfig public systemConfig;`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 2.4.1-beta.2
    string public constant version = "2.4.1-beta.2";`);

    c.addConstructorCode(`initialize({
            _superchainConfig: ISuperchainConfig(address(0)),
            _portal: IOptimismPortal(payable(address(0))),
            _systemConfig: ISystemConfig(address(0))
        });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`superchainConfig = _superchainConfig;
        portal = _portal;
        systemConfig = _systemConfig;
        __CrossDomainMessenger_init({ _otherMessenger: CrossDomainMessenger(Predeploys.L2_CROSS_DOMAIN_MESSENGER) });`, functions.initialize);


    // gasPayingToken()
    c.addModifier('override', functions.gasPayingToken);
    c.addFunctionCode(`(addr_, decimals_) = systemConfig.gasPayingToken();`, functions.gasPayingToken);


    // PORTAL()
    c.addFunctionCode(`return portal;`, functions.PORTAL);

    // _sendMessage()
    c.addModifier('override', functions._sendMessage);
    c.addFunctionCode(`portal.depositTransaction{ value: _value }({
        _to: _to,
        _value: _value,
        _gasLimit: _gasLimit,
        _isCreation: false,
        _data: _data
    });`, functions._sendMessage);

    // _isOtherMessenger()
    c.addModifier('override', functions._isOtherMessenger);
    c.addFunctionCode(`return msg.sender == address(portal) && portal.l2Sender() == address(otherMessenger);`, functions._isOtherMessenger);


    // _isUnsafeTarget()
    c.addModifier('override', functions._isUnsafeTarget);
    c.addFunctionCode(`return _target == address(this) || _target == address(portal);`, functions._isUnsafeTarget);


    // paused()
    c.addModifier('override', functions.paused);
    c.addFunctionCode(`return superchainConfig.paused();`, functions.paused);



    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({

    initialize: {
      kind: 'public' as const,
      args: [
        { name: '_superchainConfig', type: 'ISuperchainConfig' },
        { name: '_portal', type: 'IOptimismPortal' },
        { name: '_systemConfig', type: 'ISystemConfig' },
      ],
    },

    gasPayingToken : {
        kind: 'internal' as const,
        args: [],
        returns: ['address addr_', 'uint8 decimals_'],
        mutability: 'view',
      },
      
      PORTAL : {
        kind: 'external' as const,
        args: [],
        returns: ['IOptimismPortal'],
        mutability: 'view',
      },

      _sendMessage : {
        kind: 'internal' as const,
        args: [
            { name: '_to', type: 'address' },
            { name: '_gasLimit', type: 'uint64' },
            { name: '_value', type: 'uint256' },
            { name: '_data', type: 'bytes memory' },
        ],
        returns: [],
      },

      _isOtherMessenger : {
        kind: 'internal' as const,
        args: [],
        returns: ['bool'],
        mutability: 'view',
      },

      _isUnsafeTarget : {
        kind: 'internal' as const,
        args: [
            { name: '_target', type: 'address' },
        ],
        returns: ['bool'],
        mutability: 'view',
      },

      paused : {
        kind: 'public' as const,
        args: [],
        returns: ['bool'],
        mutability: 'view',
      },
    
  });
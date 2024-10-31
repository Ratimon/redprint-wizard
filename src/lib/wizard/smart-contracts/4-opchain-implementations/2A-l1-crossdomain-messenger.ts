import type { BaseModifier, Contract} from '../contract';
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

    const Predeploys = {
        name: 'Predeploys',
        path: '@redprint-core/libraries/Predeploys.sol',
    };
    c.addModule(Predeploys);

    const OptimismPortal = {
      name: 'OptimismPortal',
      path: '@redprint-core/L1/OptimismPortal.sol',
    };
    c.addModule(OptimismPortal);

    const CrossDomainMessenger = {
        name: 'CrossDomainMessenger',
        path: '@redprint-core/L1/CrossDomainMessenger.sol',
    };
    c.addParent(CrossDomainMessenger, [{ lit: '' }]);
    c.addOverride(CrossDomainMessenger, functions.gasPayingToken);
    c.addOverride(CrossDomainMessenger, functions.PORTAL);
    c.addOverride(CrossDomainMessenger, functions._sendMessage);
    c.addOverride(CrossDomainMessenger, functions._isOtherMessenger);
    c.addOverride(CrossDomainMessenger, functions._isUnsafeTarget);
    c.addOverride(CrossDomainMessenger, functions.paused);

    const ISemver = {
      name: 'ISemver',
      path: '@redprint-core/universal/ISemver.sol',
    };
    c.addParent(ISemver);

    const SuperchainConfig = {
      name: 'SuperchainConfig',
      path: '@redprint-core/L1/SuperchainConfig.sol',
    };
    c.addModule(SuperchainConfig);

    const SystemConfig = {
      name: 'SystemConfig',
      path: '@redprint-core/L1/SystemConfig.sol',
    };
    c.addModule(SystemConfig);

    c.addVariable(`//// @notice Contract of the SuperchainConfig.
    SuperchainConfig public superchainConfig;`);

    c.addVariable(`/// @notice Contract of the OptimismPortal.
    /// @custom:network-specific
    OptimismPortal public portal;`);

    c.addVariable(`/// @notice Address of the SystemConfig contract.
    SystemConfig public systemConfig;`);

    c.addVariable(`/// @notice Semantic version.
    /// @custom:semver 2.4.0
    string public constant version = "2.4.0";`);

    c.addConstructorCode(`initialize({
            _superchainConfig: SuperchainConfig(address(0)),
            _portal: OptimismPortal(payable(address(0))),
            _systemConfig: SystemConfig(address(0))
        });`);

    // initialize
    c.addModifier('initializer', functions.initialize);
    c.addFunctionCode(`superchainConfig = _superchainConfig;
        portal = _portal;
        systemConfig = _systemConfig;
        __CrossDomainMessenger_init({ _otherMessenger: CrossDomainMessenger(Predeploys.L2_CROSS_DOMAIN_MESSENGER) });`, functions.initialize);


    // gasPayingToken()
    c.addFunctionCode(`(_addr, _decimals) = systemConfig.gasPayingToken();`, functions.gasPayingToken);


    // PORTAL()
    c.addFunctionCode(`return portal;`, functions.PORTAL);

    // _sendMessage()
    c.addFunctionCode(`portal.depositTransaction{ value: _value }({
        _to: _to,
        _value: _value,
        _gasLimit: _gasLimit,
        _isCreation: false,
        _data: _data
    });`, functions._sendMessage);

    // _isOtherMessenger()
    c.addFunctionCode(`return msg.sender == address(portal) && portal.l2Sender() == address(otherMessenger);`, functions._isOtherMessenger);


    // _isUnsafeTarget()
    c.addFunctionCode(`return _target == address(this) || _target == address(portal);`, functions._isUnsafeTarget);


    // paused()
    c.addFunctionCode(`return superchainConfig.paused();`, functions.paused);



    setInfo(c, allOpts.contractInfo);
    return c;
}

const functions = defineFunctions({

    initialize: {
      kind: 'public' as const,
      args: [],
    },

    gasPayingToken : {
        kind: 'internal' as const,
        args: [],
        returns: ['address _addr', 'uint8 _decimals'],
        mutability: 'view',
      },
      
      PORTAL : {
        kind: 'external' as const,
        args: [],
        returns: ['OptimismPortal'],
        mutability: 'view',
      },

      _sendMessage : {
        kind: 'internal' as const,
        args: [
            { name: '_to', type: 'address' },
            { name: '_gasLimit', type: 'uint64' },
            { name: '_value', type: 'uint256' },
            { name: 'bytes memory', type: 'bytes memory' },
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
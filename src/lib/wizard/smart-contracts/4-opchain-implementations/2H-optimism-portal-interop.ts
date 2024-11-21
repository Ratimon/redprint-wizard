import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-implementations/2H-option-optimism-portal-interop'
import type { SharedOptimismPortalInteropOptions } from '../../shared//4-opchain-implementations/2H-option-optimism-portal-interop';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { defineFunctions } from '../../utils/define-functions';


function withDefaults(opts: SharedOptimismPortalInteropOptions): Required<SharedOptimismPortalInteropOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}


export function printOptimismPortalInterop(opts: SharedOptimismPortalInteropOptions = commonDefaults): string {
  return printContract(buildOptimismPortalInterop(opts));
}

export function buildOptimismPortalInterop(opts: SharedOptimismPortalInteropOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    const OptimismPortal2 = {
        name: 'OptimismPortal2',
        path: '@redprint-core/L1/OptimismPortal2.sol',
    };
    c.addParent(OptimismPortal2, [{ lit: '_proofMaturityDelaySeconds' }, { lit: '_disputeGameFinalityDelaySeconds' }]);

    const L1BlockInterop = {
        name: 'L1BlockInterop',
        path: '@redprint-core/L2/L1BlockInterop.sol',
    };
    c.addModule(L1BlockInterop);

    const ConfigType = {
        name: 'ConfigType',
        path: '@redprint-core/L2/L1BlockInterop.sol',
    };
    c.addModule(ConfigType);

    const Predeploys = {
        name: 'Predeploys',
        path: '@redprint-core/libraries/Predeploys.sol',
    };
    c.addModule(Predeploys);

    const Constants = {
        name: 'Constants',
        path: '@redprint-core/libraries/Constants.sol',
    };
    c.addModule(Constants);

    const PortalErrors = {
        name: '',
        path: '@redprint-core/libraries/PortalErrors.sol'
    };
    c.addModule(PortalErrors);

    // version
    c.addModifier('override', functions.version);
    c.addFunctionCode(`return string.concat(super.version(), "+interop-beta.1");`, functions.version);


    c.addConstructorArgument({
        type: 'uint256',
        name: '_proofMaturityDelaySeconds'
    });
    c.addConstructorArgument({
        type: 'uint256',
        name: '_disputeGameFinalityDelaySeconds'
    });
        
    // setConfig
    c.addFunctionCode(`if (msg.sender != address(systemConfig)) revert Unauthorized();

        // Set L2 deposit gas as used without paying burning gas. Ensures that deposits cannot use too much L2 gas.
        // This value must be large enough to cover the cost of calling L1Block.setConfig.
        useGas(SYSTEM_DEPOSIT_GAS_LIMIT);

        // Emit the special deposit transaction directly that sets the config in the L1Block predeploy contract.
        emit TransactionDeposited(
            Constants.DEPOSITOR_ACCOUNT,
            Predeploys.L1_BLOCK_ATTRIBUTES,
            DEPOSIT_VERSION,
            abi.encodePacked(
                uint256(0), // mint
                uint256(0), // value
                uint64(SYSTEM_DEPOSIT_GAS_LIMIT), // gasLimit
                false, // isCreation,
                abi.encodeCall(L1BlockInterop.setConfig, (_type, _value))
            )
        );`, functions.setConfig);



    setInfo(c, allOpts.contractInfo);
    return c;
}


const functions = defineFunctions({

    version: {
        kind: 'public' as const,
        args: [
        ],
        returns: ['string memory'],
        mutability: 'pure',
    },

    setConfig: {
      kind: 'external' as const,
      args: [
        { name: '_type', type: 'ConfigType' },
        { name: '_value', type: 'bytes memory' },
      ],
    },

});
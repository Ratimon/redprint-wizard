import type { Contract} from './contract';
import {  ContractBuilder } from './contract';

import { withCommonDefaults, defaults as commonDefaults } from "../shared/1-governance/option-safe";

import { printContract } from "./print";
import { setInfo  } from "./set-info";

import type { SharedSafeOptions} from '../shared/1-governance/option-safe';

function withDefaults(opts: SharedSafeOptions): Required<SharedSafeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    chain: opts.chain ?? commonDefaults.chain
  };
}

export const chainOptions = ['ethereum'] as const;
export type ChainsOptions = typeof chainOptions[number];

export function printSafe(opts: SharedSafeOptions = commonDefaults): string {
  return printContract(buildSafe(opts));
}

export function buildSafe(opts: SharedSafeOptions): Contract {
  const allOpts = withDefaults(opts);

  // to do add interface
  const c = new ContractBuilder(allOpts.contractName);

  const IProxy = {
    name: 'IProxy',
    path: '@redprint-safe-contracts/contracts/proxies/SafeProxy.sol',
  };
  c.addModule(IProxy);

  c.addVariable(`address internal singleton;`);
  c.addConstructorArgument({
    type: 'address',
    name: '_singleton'
  });

  c.addConstructorCode(`require(_singleton != address(0), "Invalid singleton address provided");
        singleton = _singleton;`);

  c.addFallbackCode(`// solhint-disable-next-line no-inline-assembly
        assembly {
          let _singleton := sload(0)
          // 0xa619486e == keccak("masterCopy()"). The value is right padded to 32-bytes with 0s
          if eq(calldataload(0), 0xa619486e00000000000000000000000000000000000000000000000000000000) {
              mstore(0, shr(12, shl(12, _singleton)))
              return(0, 0x20)
          }
          calldatacopy(0, 0, calldatasize())
          let success := delegatecall(gas(), _singleton, 0, calldatasize(), 0, 0)
          returndatacopy(0, 0, returndatasize())
          if eq(success, 0) {
              revert(0, returndatasize())
          }
          return(0, returndatasize())
        }`);

  setInfo(c, allOpts.contractInfo);

  return c;
}

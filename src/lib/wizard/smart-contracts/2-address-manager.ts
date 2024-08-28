import type { Contract} from './contract';
import {  ContractBuilder } from './contract';

import { withCommonDefaults, defaults as commonDefaults } from "../shared/1-shared-safe-option";

import { printContract } from "./print";
import { setInfo  } from "./set-info";

import type { SharedAddressManagerOptions } from '../shared/2-shared-address-manager-option';

function withDefaults(opts: SharedAddressManagerOptions): Required<SharedAddressManagerOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printAddressManager(opts: SharedAddressManagerOptions = commonDefaults): string {
  return printContract(buildAddressManager(opts));
}

export function buildAddressManager(opts: SharedAddressManagerOptions): Contract {
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
  c.addConstructorCode('require(_singleton != address(0), "Invalid singleton address provided");');
  c.addConstructorCode('singleton = _singleton;');

  c.addFallbackCode('// solhint-disable-next-line no-inline-assembly');
  c.addFallbackCode('assembly {');
  c.addFallbackCode('  let _singleton := sload(0)');
  c.addFallbackCode('  // 0xa619486e == keccak("masterCopy()"). The value is right padded to 32-bytes with 0s');
  c.addFallbackCode('  if eq(calldataload(0), 0xa619486e00000000000000000000000000000000000000000000000000000000) {');
  c.addFallbackCode('      mstore(0, shr(12, shl(12, _singleton)))');
  c.addFallbackCode('      return(0, 0x20)');
  c.addFallbackCode('  }');
  c.addFallbackCode('  calldatacopy(0, 0, calldatasize())');
  c.addFallbackCode('  let success := delegatecall(gas(), _singleton, 0, calldatasize(), 0, 0)');
  c.addFallbackCode('  returndatacopy(0, 0, returndatasize())');
  c.addFallbackCode('  if eq(success, 0) {');
  c.addFallbackCode('      revert(0, returndatasize())');
  c.addFallbackCode('  }');
  c.addFallbackCode('  return(0, returndatasize())');
  c.addFallbackCode('}');

  setInfo(c, allOpts.contractInfo);

  return c;
}

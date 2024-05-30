
import type { Contract} from './contract';
import {  ContractBuilder } from './contract';
import type { CommonOptions} from './common-options';
import { withCommonDefaults, defaults as commonDefaults } from './common-options';

import { printContract } from "./print";

import type { Info  } from "./set-info";
import { setInfo  } from "./set-info";
import { setAccessControl } from './set-access-control';
import { setUpgradeable } from './set-upgradeable';


// import { printNote } from "./print";

// export function printSafe(): string {
//     return printNote("www");
// }

export interface SafeOptions extends CommonOptions {
  name: string;
  chain: ChainsOptions;
  // pausable?: boolean;
}

export const defaults: Required<SafeOptions> = {
  name: 'SafeProxy',
  chain: 'ethereum',
  // pausable: false,
  access: commonDefaults.access,

  //todo remove it
  upgradeable: commonDefaults.upgradeable,
  // info:  { securityContact: 'Consult full contract at https://github.com/safe-global/safe-smart-account/blob/main/contracts/proxies/SafeProxy.sol', license: 'MIT' }, // create new object since Info is nested,
  info: commonDefaults.info
} as const;

function withDefaults(opts: SafeOptions): Required<SafeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    chain: opts.chain ?? defaults.chain
  };
}

export const chainOptions = ['ethereum'] as const;
export type ChainsOptions = typeof chainOptions[number];



export function printSafe(opts: SafeOptions = defaults): string {
  return printContract(buildSafe(opts));
}

export function buildSafe(opts: SafeOptions): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.name);


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
  // assembly {
  //   let _singleton := sload(0)
  //   // 0xa619486e == keccak("masterCopy()"). The value is right padded to 32-bytes with 0s
  //   if eq(calldataload(0), 0xa619486e00000000000000000000000000000000000000000000000000000000) {
  //       mstore(0, shr(12, shl(12, _singleton)))
  //       return(0, 0x20)
  //   }
  //   calldatacopy(0, 0, calldatasize())
  //   let success := delegatecall(gas(), _singleton, 0, calldatasize(), 0, 0)
  //   returndatacopy(0, 0, returndatasize())
  //   if eq(success, 0) {
  //       revert(0, returndatasize())
  //   }
  //   return(0, returndatasize())



  setInfo(c, allOpts.info);

  return c;
}

// export const TAG_SECURITY_CONTACT = `@custom:security-contact`;

// export const infoOptions = [{}, { securityContact: 'security@example.com', license: 'WTFPL' }] as const;

// export const defaults: Info = { license: 'MIT' };

// export type Info = {
//   securityContact?: string;
//   license?: string;
// }

// export function setInfo(c: ContractBuilder, info: Info) {
//   const { securityContact, license } = info;
  
//   if (securityContact) {
//     c.addNatspecTag(`@custom: security-contact`, '@custom: Consult full contract at https://github.com/safe-global/safe-smart-account/blob/main/contracts/proxies/SafeProxy.sol');
//   }

//   if (license) {
//     c.license = license;
//   }
// }


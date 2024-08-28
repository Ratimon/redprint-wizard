import type {  SharedSafeOptions } from '../shared/1-shared-safe-option';
import {  defaults as safeDefaults } from '../shared/1-shared-safe-option';

import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';
import {  defaults as governorDefaults } from '../shared/1-shared-governor-option';

import type { SharedAddressManagerOptions } from '../shared/2-shared-address-manager-option';
import {  defaults as addressManagerDefaults } from '../shared/2-shared-address-manager-option';

import { printGovernor, isAccessControlRequired as governorIsAccessControlRequired } from './1-governor';
import { printSafe } from './1-safe';
import { printAddressManager } from './2-address-manager';

import type { CommonOptions } from '../shared/common-options';

export interface WizardContractAPI<Options extends CommonOptions> {
  /**
   * Returns a string representation of a contract generated using the provided options. If opts is not provided, uses `defaults`.
   */
  print: (opts?: Options) => string,
  
  /**
   * The default options that are used for `print`.
   */
  defaults: Required<Options>;

  /**
   * Whether any of the provided options require access control to be enabled. If this returns `true`, then calling `print` with the 
   * same options would cause the `access` option to default to `'ownable'` if it was `undefined` or `false`. 
   */
  isAccessControlRequired?: (opts: Partial<Options>) => boolean,
}

export type Governor = WizardContractAPI<SharedGovernerOptions>;
export type Safe = WizardContractAPI<SharedSafeOptions>;
export type AddressManager = WizardContractAPI<SharedAddressManagerOptions>;

export const governor: Governor = {
  print: printGovernor,
  defaults: governorDefaults,
  isAccessControlRequired: governorIsAccessControlRequired
}

export const safe: Safe = {
  print: printSafe,
  defaults: safeDefaults
}

export const addressManager: AddressManager = {
  print: printAddressManager,
  defaults: addressManagerDefaults
}
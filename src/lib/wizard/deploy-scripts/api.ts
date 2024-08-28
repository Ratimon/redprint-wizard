import type { CommonOptions } from '../shared/common-options';

import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';
import { defaults as governorDefaults } from '../shared/1-shared-governor-option';
import { printDeployGovernor} from './1-governor';

import type {  SharedSafeOptions } from '../shared/1-shared-safe-option';
import {  defaults as safeDefaults } from '../shared/1-shared-safe-option';
import { printDeploySafe } from './1-safe';

import type {  SharedAllOptions } from '../shared/1-all-option';
import {  defaults as allDefaults } from '../shared/1-all-option';
import { printDeployAllStepOne } from './1-all';

import type { SharedAddressManagerOptions } from '../shared/2-shared-address-manager-option';
import {  defaults as addressManagerDefaults } from '../shared/2-shared-address-manager-option';
import { printDeployAddressManager } from './2-address-manager';

export interface WizardContractAPI<Options extends CommonOptions> {
  /**
   * Returns a string representation of a contract generated using the provided options. If opts is not provided, uses `defaults`.
   */
  print: (opts?: Options) => string,
  /**
   * The default options that are used for `print`.
   */
  defaults: Required<Options>;

}

export interface WizardAllAPI<Options> {
  print: (opts?: Options) => string,
  defaults: Required<Options>;
}

export type DeploySafe = WizardContractAPI<SharedSafeOptions>;
export const deploySafe: DeploySafe = {
  print: printDeploySafe,
  defaults: safeDefaults,
}

export type DeployGovernor = WizardContractAPI<SharedGovernerOptions>;
export const deployGovernor: DeployGovernor = {
  print: printDeployGovernor,
  defaults: governorDefaults,
}

export type DeployAll = WizardAllAPI<SharedAllOptions>;
export const deployStepOneAll: DeployAll = {
  print: printDeployAllStepOne,
  defaults: allDefaults,
}

export type DeployAddressManager = WizardAllAPI<SharedAddressManagerOptions>;
export const deployAddressManager: DeployAddressManager = {
  print: printDeployAddressManager,
  defaults: addressManagerDefaults,
}
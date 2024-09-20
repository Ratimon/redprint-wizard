import type {  SharedSafeOptions } from '../shared/1-option-safe';
import {  defaults as safeDefaults } from '../shared/1-option-safe';
import { printSafe } from './1-safe';

import type { SharedGovernerOptions} from '../shared/1-option-governor';
import {  defaults as governorDefaults } from '../shared/1-option-governor';
import { printGovernor, isAccessControlRequired as governorIsAccessControlRequired } from './1-governor';

import type { SharedAddressManagerOptions } from '../shared/2-option-address-manager';
import {  defaults as addressManagerDefaults } from '../shared/2-option-address-manager';
import { printAddressManager } from './2-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-option-proxy-admin';
import {  defaults as proxyAdminDefaults } from '../shared/2-option-proxy-admin';
import { printProxyAdmin } from './2-proxy-admin';

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-option-superchain-config-proxy';
import {  defaults as superchainConfigProxyDefaults } from '../shared/2-option-superchain-config-proxy';
import { printSuperchainConfigProxy } from './2-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-option-superchain-config';
import {  defaults as superchainConfigDefaults } from '../shared/2-option-superchain-config';
import { printSuperchainConfig } from './2-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-option-versions-proxy';
import {  defaults as protocolVersionsProxyDefaults } from '../shared/2-option-versions-proxy';
import { printProtocolVersionsProxy } from './2-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-option-versions';
import {  defaults as protocolVersionsDefaults } from '../shared/2-option-versions';
import { printProtocolVersions } from './2-versions';

import type { SharedOptimismPortalProxyOptions } from '../shared/4-option-optimism-portal-proxy';
import {  defaults as optimismPortalProxyDefaults } from '../shared/4-option-optimism-portal-proxy';
import { printOptimismPortalProxy } from './4-optimism-portal-proxy';

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
export const governor: Governor = {
  print: printGovernor,
  defaults: governorDefaults,
  isAccessControlRequired: governorIsAccessControlRequired
}

export type Safe = WizardContractAPI<SharedSafeOptions>;
export const safe: Safe = {
  print: printSafe,
  defaults: safeDefaults
}

export type AddressManager = WizardContractAPI<SharedAddressManagerOptions>;
export const addressManager: AddressManager = {
  print: printAddressManager,
  defaults: addressManagerDefaults
}

export type ProxyAdmin = WizardContractAPI<SharedProxyAdminOptions>;
export const proxyAdmin: ProxyAdmin = {
  print: printProxyAdmin,
  defaults: proxyAdminDefaults
}

export type SuperchainConfigProxy = WizardContractAPI<SharedSuperchainConfigProxyOptions>;
export const superchainConfigProxy: SuperchainConfigProxy = {
  print: printSuperchainConfigProxy,
  defaults: superchainConfigProxyDefaults
}

export type SuperchainConfig = WizardContractAPI<SharedSuperchainConfigOptions>;
export const superchainConfig: SuperchainConfig = {
  print: printSuperchainConfig,
  defaults: superchainConfigDefaults
}

export type ProtocolVersionsProxy = WizardContractAPI<SharedProtocolVersionsProxyOptions>;
export const protocolVersionsProxy: ProtocolVersionsProxy = {
  print: printProtocolVersionsProxy,
  defaults: protocolVersionsProxyDefaults
}

export type ProtocolVersions = WizardContractAPI<SharedProtocolVersionsOptions>;
export const protocolVersions: ProtocolVersions = {
  print: printProtocolVersions,
  defaults: protocolVersionsDefaults
}

export type OptimismPortalProxy = WizardContractAPI<SharedOptimismPortalProxyOptions>;
export const optimismPortalProxy: OptimismPortalProxy = {
  print: printOptimismPortalProxy,
  defaults: optimismPortalProxyDefaults
}
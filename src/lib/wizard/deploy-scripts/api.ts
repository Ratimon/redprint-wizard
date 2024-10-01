import type { CommonOptions } from '../shared/common-options';

import type { SharedGovernerOptions} from '../shared/1-option-governor';
import { defaults as governorDefaults } from '../shared/1-option-governor';
import { printDeployGovernor} from './1-governor';

import type {  SharedSafeOptions } from '../shared/1-option-safe';
import {  defaults as safeDefaults } from '../shared/1-option-safe';
import { printDeploySafe } from './1-safe';

import type {  SharedStepOneAllOptions } from '../shared/1-option-all';
import {  defaults as allStepOneDefaults } from '../shared/1-option-all';
import { printDeployAllStepOne } from './1-all';

import type { SharedAddressManagerOptions } from '../shared/2-option-address-manager';
import {  defaults as addressManagerDefaults } from '../shared/2-option-address-manager';
import { printDeployAddressManager } from './2-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-option-proxy-admin';
import {  defaults as proxyAdminDefaults } from '../shared/2-option-proxy-admin';
import { printDeployProxyAdmin } from './2-proxy-admin';

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-option-superchain-config-proxy';
import {  defaults as superchainConfigProxyDefaults } from '../shared/2-option-superchain-config-proxy';
import { printDeploySuperchainConfigProxy } from './2-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-option-superchain-config';
import {  defaults as superchainConfigDefaults } from '../shared/2-option-superchain-config';
import { printDeploySuperchainConfig } from './2-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-option-versions-proxy';
import {  defaults as protocolVersionsProxyDefaults } from '../shared/2-option-versions-proxy';
import { printDeployProtocolVersionsProxy } from './2-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-option-versions';
import {  defaults as protocolVersionsDefaults } from '../shared/2-option-versions';
import { printDeployProtocolVersions } from './2-versions';

import type {  SharedStepTwoAllOptions } from '../shared/2-option-all';
import {  defaults as allStepTwoDefaults } from '../shared/2-option-all';
import { printDeployAllStepTwo } from './2-all';

import type {  SharedOptimismPortalProxyOptions } from '../shared/4-option-optimism-portal-proxy';
import {  defaults as optimismPortalProxyDefaults } from '../shared/4-option-optimism-portal-proxy';
import { printDeployOptimismPortalProxy } from './4-optimism-portal-proxy';

import type {  SharedSystemConfigProxyOptions } from '../shared/4-option-system-config-proxy';
import {  defaults as systemConfigProxyDefaults } from '../shared/4-option-system-config-proxy';
import { printDeploySystemConfigProxy } from './4-system-config-proxy';

import type {  SharedL1StandardBridgeProxyOptions } from '../shared/4-option-l1-standard-bridge-proxy';
import {  defaults as l1StandardBridgeProxyDefaults } from '../shared/4-option-l1-standard-bridge-proxy';
import { printDeployL1StandardBridgeProxy } from './4-l1-standard-bridge-proxy';

import type {  SharedL1CrossDomainMessengerProxyOptions } from '../shared/4-option-l1-crossdomain-messenger-proxy';
import {  defaults as l1CrossDomainMessengerProxyDefaults } from '../shared/4-option-l1-crossdomain-messenger-proxy';
import { printDeployL1CrossDomainMessengerProxy } from './4-l1-crossdomain-messenger-proxy';


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

export type DeployStepOneAll = WizardAllAPI<SharedStepOneAllOptions>;
export const deployStepOneAll: DeployStepOneAll = {
  print: printDeployAllStepOne,
  defaults: allStepOneDefaults,
}

export type DeployAddressManager = WizardAllAPI<SharedAddressManagerOptions>;
export const deployAddressManager: DeployAddressManager = {
  print: printDeployAddressManager,
  defaults: addressManagerDefaults,
}

export type DeployProxyAdmin = WizardAllAPI<SharedProxyAdminOptions>;
export const deployProxyAdmin: DeployProxyAdmin = {
  print: printDeployProxyAdmin,
  defaults: proxyAdminDefaults,
}

export type DeploySuperchainConfigProxy = WizardAllAPI<SharedSuperchainConfigProxyOptions>;
export const deploySuperchainConfigProxy: DeploySuperchainConfigProxy = {
  print: printDeploySuperchainConfigProxy,
  defaults: superchainConfigProxyDefaults,
}

export type DeploySuperchainConfig = WizardAllAPI<SharedSuperchainConfigOptions>;
export const deploySuperchainConfig: DeploySuperchainConfig = {
  print: printDeploySuperchainConfig,
  defaults: superchainConfigDefaults,
}

export type DeployProtocolVersionsProxy = WizardAllAPI<SharedProtocolVersionsProxyOptions>;
export const deployProtocolVersionsProxy: DeployProtocolVersionsProxy = {
  print: printDeployProtocolVersionsProxy,
  defaults: protocolVersionsProxyDefaults,
}

export type DeployProtocolVersions = WizardAllAPI<SharedProtocolVersionsOptions>;
export const deployProtocolVersions: DeployProtocolVersions = {
  print: printDeployProtocolVersions,
  defaults: protocolVersionsDefaults,
}

export type DeployStepTwoAll = WizardAllAPI<SharedStepTwoAllOptions>;
export const deployStepTwoAll: DeployStepTwoAll = {
  print: printDeployAllStepTwo,
  defaults: allStepTwoDefaults,
}

export type DeployOptimismPortalProxy = WizardAllAPI<SharedOptimismPortalProxyOptions>;
export const deployOptimismPortalProxy: DeployOptimismPortalProxy = {
  print: printDeployOptimismPortalProxy,
  defaults: optimismPortalProxyDefaults,
}

export type DeploySystemConfigProxy = WizardAllAPI<SharedSystemConfigProxyOptions>;
export const deploySystemConfigProxy: DeploySystemConfigProxy = {
  print: printDeploySystemConfigProxy,
  defaults: systemConfigProxyDefaults,
}

export type DeployL1StandardBridgeProxy = WizardAllAPI<SharedL1StandardBridgeProxyOptions>;
export const deployL1StandardBridgeProxy: DeployL1StandardBridgeProxy = {
  print: printDeployL1StandardBridgeProxy,
  defaults: l1StandardBridgeProxyDefaults,
}

export type DeployL1CrossDomainMessengerProxy = WizardAllAPI<SharedL1CrossDomainMessengerProxyOptions>;
export const deployL1CrossDomainMessengerProxy: DeployL1CrossDomainMessengerProxy = {
  print: printDeployL1CrossDomainMessengerProxy,
  defaults: l1CrossDomainMessengerProxyDefaults,
}

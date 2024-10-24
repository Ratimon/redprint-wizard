import type {  SharedSafeOptions } from '../shared/1-governance/option-safe';
import {  defaults as safeDefaults } from '../shared/1-governance/option-safe';
import { printSafe } from './1-safe';

import type { SharedGovernerOptions} from '../shared/1-governance/option-governor';
import {  defaults as governorDefaults } from '../shared/1-governance/option-governor';
import { printGovernor, isAccessControlRequired as governorIsAccessControlRequired } from './1-governor';

import type { SharedAddressManagerOptions } from '../shared/2-superchain/option-address-manager';
import {  defaults as addressManagerDefaults } from '../shared/2-superchain/option-address-manager';
import { printAddressManager } from './2-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-superchain/option-proxy-admin';
import {  defaults as proxyAdminDefaults } from '../shared/2-superchain/option-proxy-admin';
import { printProxyAdmin } from './2-proxy-admin';

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-superchain/option-superchain-config-proxy';
import {  defaults as superchainConfigProxyDefaults } from '../shared/2-superchain/option-superchain-config-proxy';
import { printSuperchainConfigProxy } from './2-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-superchain/option-superchain-config';
import {  defaults as superchainConfigDefaults } from '../shared/2-superchain/option-superchain-config';
import { printSuperchainConfig } from './2-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-superchain/option-versions-proxy';
import {  defaults as protocolVersionsProxyDefaults } from '../shared/2-superchain/option-versions-proxy';
import { printProtocolVersionsProxy } from './2-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-superchain/option-versions';
import {  defaults as protocolVersionsDefaults } from '../shared/2-superchain/option-versions';
import { printProtocolVersions } from './2-versions';

import type { SharedOptimismPortalProxyOptions } from '../shared/4-option-optimism-portal-proxy';
import {  defaults as optimismPortalProxyDefaults } from '../shared/4-option-optimism-portal-proxy';
import { printOptimismPortalProxy } from './4-optimism-portal-proxy';

import type { SharedSystemConfigProxyOptions } from '../shared/4-option-system-config-proxy';
import {  defaults as systemConfigProxyDefaults } from '../shared/4-option-system-config-proxy';
import { printSystemConfigProxy } from './4-system-config-proxy';

import type { SharedL1StandardBridgeProxyOptions } from '../shared/4-option-l1-standard-bridge-proxy';
import {  defaults as l1StandardBridgeProxyDefaults } from '../shared/4-option-l1-standard-bridge-proxy';
import { printL1StandardBridgeProxy } from './4-l1-standard-bridge-proxy';

import type { SharedL1CrossDomainMessengerProxyOptions } from '../shared/4-option-l1-crossdomain-messenger-proxy';
import {  defaults as l1CrossDomainMessengerProxyDefaults } from '../shared/4-option-l1-crossdomain-messenger-proxy';
import { printL1CrossDomainMessengerProxy } from './4-l1-crossdomain-messenger-proxy';

import type { SharedOptimismMintableERC20FactoryProxyOptions } from '../shared/4-option-optimism-mintable-ERC20-factory-proxy';
import {  defaults as optimismMintableERC20FactoryProxyDefaults } from '../shared/4-option-optimism-mintable-ERC20-factory-proxy';
import { printOptimismMintableERC20FactoryProxy } from './4-optimism-mintable-ERC20-factory-proxy';

import type { SharedL1ERC721BridgeProxyOptions } from '../shared/4-option-l1-ERC721-bridge-proxy';
import {  defaults as l1ERC721BridgeProxyDefaults } from '../shared/4-option-l1-ERC721-bridge-proxy';
import { printL1ERC721BridgeProxy } from './4-l1-ERC721-bridge-proxy';

import type { SharedDisputeGameFactoryProxyOptions } from '../shared/4-option-dispute-game-factory-proxy';
import {  defaults as disputeGameFactoryProxyDefaults } from '../shared/4-option-dispute-game-factory-proxy';
import { printDisputeGameFactoryProxy } from './4-dispute-game-factory-proxy';

import type { SharedL2OutputOracleProxyOptions } from '../shared/4-option-l2-output-oracle-proxy';
import {  defaults as l2OutputOracleProxyDefaults } from '../shared/4-option-l2-output-oracle-proxy';
import { printL2OutputOracleProxy } from './4-l2-output-oracle-proxy';

import type { SharedDelayedWETHProxyOptions } from '../shared/4-option-delayed-WETH-proxy';
import {  defaults as delayedWETHProxyDefaults } from '../shared/4-option-delayed-WETH-proxy';
import { printDelayedWETHProxy } from './4-delayed-WETH-proxy';

import type { SharedPermissionedDelayedWETHProxyOptions } from '../shared/4-option-permissioned-delayed-WETH-proxy';
import {  defaults as permissionedDelayedWETHProxyDefaults } from '../shared/4-option-permissioned-delayed-WETH-proxy';
import { printPermissionedDelayedWETHProxy } from './4-permissioned-delayed-WETH-proxy';

import type { SharedAnchorStateRegistryProxyOptions } from '../shared/4-option-anchor-state-registry-proxy';
import {  defaults as anchorStateRegistryProxyDefaults } from '../shared/4-option-anchor-state-registry-proxy';
import { printAnchorStateRegistryProxy } from './4-anchor-state-registry-proxy';

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

export type SystemConfigProxy = WizardContractAPI<SharedSystemConfigProxyOptions>;
export const systemConfigProxy: SystemConfigProxy = {
  print: printSystemConfigProxy,
  defaults: systemConfigProxyDefaults
}

export type L1StandardBridgeProxy = WizardContractAPI<SharedL1StandardBridgeProxyOptions>;
export const l1StandardBridgeProxy: L1StandardBridgeProxy = {
  print: printL1StandardBridgeProxy,
  defaults: l1StandardBridgeProxyDefaults
}

export type L1CrossDomainMessengerProxy = WizardContractAPI<SharedL1CrossDomainMessengerProxyOptions>;
export const l1CrossDomainMessengerProxy: L1CrossDomainMessengerProxy = {
  print: printL1CrossDomainMessengerProxy,
  defaults: l1CrossDomainMessengerProxyDefaults
}

export type OptimismMintableERC20FactoryProxy = WizardContractAPI<SharedOptimismMintableERC20FactoryProxyOptions>;
export const optimismMintableERC20FactoryProxy: OptimismMintableERC20FactoryProxy = {
  print: printOptimismMintableERC20FactoryProxy,
  defaults: optimismMintableERC20FactoryProxyDefaults
}

export type L1ERC721BridgeProxy = WizardContractAPI<SharedL1ERC721BridgeProxyOptions>;
export const l1ERC721BridgeProxy: L1ERC721BridgeProxy = {
  print: printL1ERC721BridgeProxy,
  defaults: l1ERC721BridgeProxyDefaults
}

export type DisputeGameFactoryProxy = WizardContractAPI<SharedDisputeGameFactoryProxyOptions>;
export const disputeGameFactoryProxy: DisputeGameFactoryProxy = {
  print: printDisputeGameFactoryProxy,
  defaults: disputeGameFactoryProxyDefaults
}

export type L2OutputOracleProxy = WizardContractAPI<SharedL2OutputOracleProxyOptions>;
export const l2OutputOracleProxy: L2OutputOracleProxy = {
  print: printL2OutputOracleProxy,
  defaults: l2OutputOracleProxyDefaults
}

export type DelayedWETHProxy = WizardContractAPI<SharedDelayedWETHProxyOptions>;
export const delayedWETHProxy: DelayedWETHProxy = {
  print: printDelayedWETHProxy,
  defaults: delayedWETHProxyDefaults
}

export type PermissionedDelayedWETHProxy = WizardContractAPI<SharedPermissionedDelayedWETHProxyOptions>;
export const permissionedDelayedWETHProxy: PermissionedDelayedWETHProxy = {
  print: printPermissionedDelayedWETHProxy,
  defaults: permissionedDelayedWETHProxyDefaults
}

export type AnchorStateRegistryProxy = WizardContractAPI<SharedAnchorStateRegistryProxyOptions>;
export const anchorStateRegistryProxy: AnchorStateRegistryProxy = {
  print: printAnchorStateRegistryProxy,
  defaults: anchorStateRegistryProxyDefaults
}
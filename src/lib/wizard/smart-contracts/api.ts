import type {  SharedSafeOptions } from '../shared/1-governance/1-option-safe';
import {  defaults as safeDefaults } from '../shared/1-governance/1-option-safe';
import { printSafe } from './1-governance/1-safe';

import type { SharedGovernerOptions} from '../shared/1-governance/1-option-governor';
import {  defaults as governorDefaults } from '../shared/1-governance/1-option-governor';
import { printGovernor, isAccessControlRequired as governorIsAccessControlRequired } from './1-governance/1-governor';

import type { SharedAddressManagerOptions } from '../shared/2-superchain/1A-option-address-manager';
import {  defaults as addressManagerDefaults } from '../shared/2-superchain/1A-option-address-manager';
import { printAddressManager } from './2-superchain/1A-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-superchain/1B-option-proxy-admin';
import {  defaults as proxyAdminDefaults } from '../shared/2-superchain/1B-option-proxy-admin';
import { printProxyAdmin } from './2-superchain/1B-proxy-admin';

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-superchain/2A-option-superchain-config-proxy';
import {  defaults as superchainConfigProxyDefaults } from '../shared/2-superchain/2A-option-superchain-config-proxy';
import { printSuperchainConfigProxy } from './2-superchain/2A-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-superchain/2B-option-superchain-config';
import {  defaults as superchainConfigDefaults } from '../shared/2-superchain/2B-option-superchain-config';
import { printSuperchainConfig } from './2-superchain/2B-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-superchain/3A-option-versions-proxy';
import {  defaults as protocolVersionsProxyDefaults } from '../shared/2-superchain/3A-option-versions-proxy';
import { printProtocolVersionsProxy } from './2-superchain/3A-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-superchain/3B-option-versions';
import {  defaults as protocolVersionsDefaults } from '../shared/2-superchain/3B-option-versions';
import { printProtocolVersions } from './2-superchain/3C-versions';

import type { SharedOptimismPortalProxyOptions } from '../shared/4-opchain-proxies/1A-option-optimism-portal-proxy';
import {  defaults as optimismPortalProxyDefaults } from '../shared/4-opchain-proxies/1A-option-optimism-portal-proxy';
import { printOptimismPortalProxy } from './4-opchain-proxies/1A-optimism-portal-proxy';

import type { SharedSystemConfigProxyOptions } from '../shared/4-opchain-proxies/1B-option-system-config-proxy';
import {  defaults as systemConfigProxyDefaults } from '../shared/4-opchain-proxies/1B-option-system-config-proxy';
import { printSystemConfigProxy } from './4-opchain-proxies/1B-system-config-proxy';

import type { SharedL1StandardBridgeProxyOptions } from '../shared/4-opchain-proxies/1C-option-l1-standard-bridge-proxy';
import {  defaults as l1StandardBridgeProxyDefaults } from '../shared/4-opchain-proxies/1C-option-l1-standard-bridge-proxy';
import { printL1StandardBridgeProxy } from './4-opchain-proxies/1C-l1-standard-bridge-proxy';

import type { SharedL1CrossDomainMessengerProxyOptions } from '../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';
import {  defaults as l1CrossDomainMessengerProxyDefaults } from '../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';
import { printL1CrossDomainMessengerProxy } from './4-opchain-proxies/1D-l1-crossdomain-messenger-proxy';

import type { SharedOptimismMintableERC20FactoryProxyOptions } from '../shared/4-opchain-proxies/1E-option-optimism-mintable-ERC20-factory-proxy';
import {  defaults as optimismMintableERC20FactoryProxyDefaults } from '../shared/4-opchain-proxies/1E-option-optimism-mintable-ERC20-factory-proxy';
import { printOptimismMintableERC20FactoryProxy } from './4-opchain-proxies/1E-optimism-mintable-ERC20-factory-proxy';

import type { SharedL1ERC721BridgeProxyOptions } from '../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';
import {  defaults as l1ERC721BridgeProxyDefaults } from '../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';
import { printL1ERC721BridgeProxy } from './4-opchain-proxies/1F-l1-ERC721-bridge-proxy';

import type { SharedDisputeGameFactoryProxyOptions } from '../shared/4-opchain-proxies/1G-option-dispute-game-factory-proxy';
import {  defaults as disputeGameFactoryProxyDefaults } from '../shared/4-opchain-proxies/1G-option-dispute-game-factory-proxy';
import { printDisputeGameFactoryProxy } from './4-opchain-proxies/1G-dispute-game-factory-proxy';

import type { SharedL2OutputOracleProxyOptions } from '../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';
import {  defaults as l2OutputOracleProxyDefaults } from '../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';
import { printL2OutputOracleProxy } from './4-opchain-proxies/1H-l2-output-oracle-proxy';

import type { SharedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1I-option-delayed-WETH-proxy';
import {  defaults as delayedWETHProxyDefaults } from '../shared/4-opchain-proxies/1I-option-delayed-WETH-proxy';
import { printDelayedWETHProxy } from './4-opchain-proxies/1I-delayed-WETH-proxy';

import type { SharedPermissionedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1J-option-permissioned-delayed-WETH-proxy';
import {  defaults as permissionedDelayedWETHProxyDefaults } from '../shared/4-opchain-proxies/1J-option-permissioned-delayed-WETH-proxy';
import { printPermissionedDelayedWETHProxy } from './4-opchain-proxies/1J-permissioned-delayed-WETH-proxy';

import type { SharedAnchorStateRegistryProxyOptions } from '../shared/4-opchain-proxies/1K-option-anchor-state-registry-proxy';
import {  defaults as anchorStateRegistryProxyDefaults } from '../shared/4-opchain-proxies/1K-option-anchor-state-registry-proxy';
import { printAnchorStateRegistryProxy } from './4-opchain-proxies/1K-anchor-state-registry-proxy';

import type { SharedL1CrossDomainMessengerOptions } from '../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';
import {  defaults as l1CrossDomainMessengerDefaults } from '../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';
import { printL1CrossDomainMessenger } from './4-opchain-implementations/2A-l1-crossdomain-messenger';

import type { SharedOptimismMintableERC20FactoryOptions } from '../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';
import {  defaults as optimismMintableERC20FactoryDefaults } from '../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';
import { printOptimismMintableERC20Factory } from './4-opchain-implementations/2B-optimism-mintable-ERC20-factory';

import type { SharedSystemConfigOptions } from '../shared/4-opchain-implementations/2C-option-system-config';
import {  defaults as systemConfigDefaults } from '../shared/4-opchain-implementations/2C-option-system-config';
import { printSystemConfig } from './4-opchain-implementations/2C-system-config';

import type { SharedSystemConfigInteropOptions } from '../shared/4-opchain-implementations/2C-option-system-config-interop';
import {  defaults as systemConfigInteropDefaults } from '../shared/4-opchain-implementations/2C-option-system-config-interop';
import { printSystemConfigInterop } from './4-opchain-implementations/2C-system-config-interop';

import type { SharedL1StandardBridgeOptions } from '../shared/4-opchain-implementations/2D-option-l1-standard-bridge';
import {  defaults as l1StandardBridgeDefaults } from '../shared/4-opchain-implementations/2D-option-l1-standard-bridge';
import { printL1StandardBridge } from './4-opchain-implementations/2D-l1-standard-bridge';

import type { SharedL1ERC721BridgeOptions } from '../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';
import {  defaults as l1ERC721BridgeDefaults } from '../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';
import { printL1ERC721Bridge } from './4-opchain-implementations/2E-l1-ERC721-bridge';

import type { SharedOptimismPortalOptions } from '../shared/4-opchain-implementations/2F-option-optimism-portal';
import {  defaults as optimismPortalDefaults } from '../shared/4-opchain-implementations/2F-option-optimism-portal';
import { printOptimismPortal } from './4-opchain-implementations/2F-optimism-portal';

import type { SharedL2OutputOracleOptions } from '../shared/4-opchain-implementations/2G-option-l2-output-oracle';
import {  defaults as l2OutputOracleDefaults } from '../shared/4-opchain-implementations/2G-option-l2-output-oracle';
import { printL2OutputOracle } from './4-opchain-implementations/2G-l2-output-oracle';

import type { SharedOptimismPortal2Options } from '../shared/4-opchain-implementations/2H-option-optimism-portal2';
import {  defaults as optimismPortal2Defaults } from '../shared/4-opchain-implementations/2H-option-optimism-portal2';
import { printOptimismPortal2 } from './4-opchain-implementations/2H-optimism-portal2';

import type { SharedOptimismPortalInteropOptions } from '../shared/4-opchain-implementations/2H-option-optimism-portal-interop';
import {  defaults as optimismPortalInteropDefaults } from '../shared/4-opchain-implementations/2H-option-optimism-portal-interop';
import { printOptimismPortalInterop } from './4-opchain-implementations/2H-optimism-portal-interop';

import type { SharedDisputeGameFactoryOptions } from '../shared/4-opchain-implementations/2I-option-dispute-game-factory';
import {  defaults as disputeGameFactoryDefaults } from '../shared/4-opchain-implementations/2I-option-dispute-game-factory';
import { printDisputeGameFactory } from './4-opchain-implementations/2I-dispute-game-factory';

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

export type L1CrossDomainMessenger = WizardContractAPI<SharedL1CrossDomainMessengerOptions>;
export const l1CrossDomainMessenger: L1CrossDomainMessenger = {
  print: printL1CrossDomainMessenger,
  defaults: l1CrossDomainMessengerDefaults
}

export type OptimismMintableERC20Factory = WizardContractAPI<SharedOptimismMintableERC20FactoryOptions>;
export const optimismMintableERC20Factory: OptimismMintableERC20Factory = {
  print: printOptimismMintableERC20Factory,
  defaults: optimismMintableERC20FactoryDefaults
}

export type SystemConfig = WizardContractAPI<SharedSystemConfigOptions>;
export const systemConfig: SystemConfig = {
  print: printSystemConfig,
  defaults: systemConfigDefaults
}

export type SystemConfigInterop = WizardContractAPI<SharedSystemConfigInteropOptions>;
export const systemConfigInterop: SystemConfigInterop = {
  print: printSystemConfigInterop,
  defaults: systemConfigInteropDefaults
}

export type L1StandardBridge = WizardContractAPI<SharedL1StandardBridgeOptions>;
export const l1StandardBridge: L1StandardBridge = {
  print: printL1StandardBridge,
  defaults: l1StandardBridgeDefaults
}

export type L1ERC721Bridge = WizardContractAPI<SharedL1ERC721BridgeOptions>;
export const l1ERC721Bridge: L1ERC721Bridge = {
  print: printL1ERC721Bridge,
  defaults: l1ERC721BridgeDefaults
}

export type OptimismPortal = WizardContractAPI<SharedOptimismPortalOptions>;
export const optimismPortal: OptimismPortal = {
  print: printOptimismPortal,
  defaults: optimismPortalDefaults
}

export type L2OutputOracle = WizardContractAPI<SharedL2OutputOracleOptions>;
export const l2OutputOracle: L2OutputOracle = {
  print: printL2OutputOracle,
  defaults: l2OutputOracleDefaults
}

export type OptimismPortal2 = WizardContractAPI<SharedOptimismPortal2Options>;
export const optimismPortal2: OptimismPortal2 = {
  print: printOptimismPortal2,
  defaults: optimismPortal2Defaults
}

export type OptimismPortalInterop = WizardContractAPI<SharedOptimismPortalInteropOptions>;
export const optimismPortalInterop: OptimismPortalInterop = {
  print: printOptimismPortalInterop,
  defaults: optimismPortalInteropDefaults
}

export type DisputeGameFactory = WizardContractAPI<SharedDisputeGameFactoryOptions>;
export const disputeGameFactory: DisputeGameFactory = {
  print: printDisputeGameFactory,
  defaults: disputeGameFactoryDefaults
}
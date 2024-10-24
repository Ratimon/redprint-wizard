
import type { SharedSafeOptions} from './1-governance/option-safe';
import type { SharedGovernerOptions} from './1-governance/option-governor';
import type { SharedStepOneAllOptions} from './1-governance/option-all';

import type { SharedAddressManagerOptions } from './2-option-address-manager';
import type { SharedProxyAdminOptions } from './2-option-proxy-admin';
import type { SharedSuperchainConfigProxyOptions } from './2-option-superchain-config-proxy';
import type { SharedSuperchainConfigOptions } from './2-option-superchain-config';
import type { SharedProtocolVersionsProxyOptions } from './2-option-versions-proxy';
import type { SharedProtocolVersionsOptions } from './2-option-versions';
import type { SharedStepTwoAllSubOptions } from './2-option-all-sub';
import type { SharedStepTwoAllOptions} from './2-option-all';

import type { SharedOptimismPortalProxyOptions} from './4-option-optimism-portal-proxy';
import type { SharedSystemConfigProxyOptions} from './4-option-system-config-proxy';
import type { SharedL1StandardBridgeProxyOptions} from './4-option-l1-standard-bridge-proxy';
import type { SharedL1CrossDomainMessengerProxyOptions } from './4-option-l1-crossdomain-messenger-proxy';
import type { SharedOptimismMintableERC20FactoryProxyOptions } from './4-option-optimism-mintable-ERC20-factory-proxy';
import type { SharedL1ERC721BridgeProxyOptions } from './4-option-l1-ERC721-bridge-proxy';
import type { SharedDisputeGameFactoryProxyOptions } from './4-option-dispute-game-factory-proxy';
import type { SharedL2OutputOracleProxyOptions } from './4-option-l2-output-oracle-proxy';
import type { SharedDelayedWETHProxyOptions } from './4-option-delayed-WETH-proxy';
import type { SharedPermissionedDelayedWETHProxyOptions } from './4-option-permissioned-delayed-WETH-proxy';
import type { SharedAnchorStateRegistryProxyOptions } from './4-option-anchor-state-registry-proxy';
import type { SharedStepFourAllSubOptions } from './4-option-all-sub';
import type { SharedStepFourAllOptions } from './4-option-all'

export interface KindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  StepOneAll: { kind: 'StepOneAll' } & SharedStepOneAllOptions;
  
  AddressManager: { kind: 'AddressManager' } & SharedAddressManagerOptions;
  ProxyAdmin: { kind: 'ProxyAdmin' } & SharedProxyAdminOptions;
  SuperchainConfigProxy : { kind: 'SuperchainConfigProxy' } & SharedSuperchainConfigProxyOptions;
  SuperchainConfig : { kind: 'SuperchainConfig' } & SharedSuperchainConfigOptions;
  ProtocolVersionsProxy : { kind: 'ProtocolVersionsProxy' } & SharedProtocolVersionsProxyOptions;
  ProtocolVersions : { kind: 'ProtocolVersions' } & SharedProtocolVersionsOptions;
  StepTwoAllSub: { kind: 'StepTwoAllSub' } & SharedStepTwoAllSubOptions;
  StepTwoAll: { kind: 'StepTwoAll' } & SharedStepTwoAllOptions;

  OptimismPortalProxy: { kind: 'OptimismPortalProxy' } & SharedOptimismPortalProxyOptions;
  SystemConfigProxy: { kind: 'SystemConfigProxy' } & SharedSystemConfigProxyOptions;
  L1StandardBridgeProxy: { kind: 'L1StandardBridgeProxy' } & SharedL1StandardBridgeProxyOptions;
  L1CrossDomainMessengerProxy: { kind: 'L1CrossDomainMessengerProxy' } & SharedL1CrossDomainMessengerProxyOptions;
  OptimismMintableERC20FactoryProxy: { kind: 'OptimismMintableERC20FactoryProxy' } & SharedOptimismMintableERC20FactoryProxyOptions;
  L1ERC721BridgeProxy: { kind: 'L1ERC721BridgeProxy' } & SharedL1ERC721BridgeProxyOptions;
  DisputeGameFactoryProxy: { kind: 'DisputeGameFactoryProxy' } & SharedDisputeGameFactoryProxyOptions;
  L2OutputOracleProxy: { kind: 'L2OutputOracleProxy' } & SharedL2OutputOracleProxyOptions;
  DelayedWETHProxy: { kind: 'DelayedWETHProxy' } & SharedDelayedWETHProxyOptions;
  PermissionedDelayedWETHProxy: { kind: 'PermissionedDelayedWETHProxy' } & SharedPermissionedDelayedWETHProxyOptions;
  AnchorStateRegistryProxy: { kind: 'AnchorStateRegistryProxy' } & SharedAnchorStateRegistryProxyOptions;
  StepFourAllSub: { kind: 'StepFourAllSub' } & SharedStepFourAllSubOptions;
  StepFourAll: { kind: 'StepFourAll' } & SharedStepFourAllOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];


export interface KindedGovernanceOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
}
export type GenericGovernanceOptions = KindedGovernanceOptions[keyof KindedGovernanceOptions];


export interface KindedStepOneAllOptions {
  StepOneAll: { kind: 'StepOneAll' } & SharedStepOneAllOptions;
}
export type GenericStepOneAllOptions = KindedStepOneAllOptions[keyof KindedStepOneAllOptions];


export interface KindedAddressManagerOptions {
  AddressManager: { kind: 'AddressManager' } & SharedAddressManagerOptions;
}
export type GenericAddressManagerOptions = KindedAddressManagerOptions[keyof KindedAddressManagerOptions];


export interface KindedProxyAdminOptions {
  ProxyAdmin: { kind: 'ProxyAdmin' } & SharedProxyAdminOptions;
}
export type GenericProxyAdminOptions = KindedProxyAdminOptions[keyof KindedProxyAdminOptions];


export interface KindedSuperchainConfigProxyOptions {
  SuperchainConfigProxy: { kind: 'SuperchainConfigProxy' } & SharedSuperchainConfigProxyOptions;
}
export type GenericSuperchainConfigProxyOptions = KindedSuperchainConfigProxyOptions[keyof KindedSuperchainConfigProxyOptions];


export interface KindedSuperchainConfigOptions {
  SuperchainConfig: { kind: 'SuperchainConfig' } & SharedSuperchainConfigOptions;
}
export type GenericSuperchainConfigOptions = KindedSuperchainConfigOptions[keyof KindedSuperchainConfigOptions];


export interface KindedProtocolVersionsProxyOptions {
  ProtocolVersionsProxy: { kind: 'ProtocolVersionsProxy' } & SharedProtocolVersionsProxyOptions;
}
export type GenericProtocolVersionsProxyOptions = KindedProtocolVersionsProxyOptions[keyof KindedProtocolVersionsProxyOptions];


export interface KindedProtocolVersionsOptions {
  ProtocolVersions: { kind: 'ProtocolVersions' } & SharedProtocolVersionsOptions;
}
export type GenericProtocolVersionsOptions = KindedProtocolVersionsOptions[keyof KindedProtocolVersionsOptions];

export interface KindedStepTwoAllSubOptions {
  StepTwoAllSub: { kind: 'StepTwoAllSub' } & SharedStepTwoAllSubOptions;
}
export type GenericStepTwoAllSubOptions = KindedStepTwoAllSubOptions[keyof KindedStepTwoAllSubOptions];

export interface KindedStepTwoAllOptions {
  StepTwoAll: { kind: 'StepTwoAll' } & SharedStepTwoAllOptions;
}
export type GenericStepTwoAllOptions = KindedStepTwoAllOptions[keyof KindedStepTwoAllOptions];


export interface KindedOptimismPortalProxyOptions {
  OptimismPortalProxy: { kind: 'OptimismPortalProxy' } & SharedOptimismPortalProxyOptions;
}
export type GenericOptimismPortalProxyOptions = KindedOptimismPortalProxyOptions[keyof KindedOptimismPortalProxyOptions];


export interface KindedSystemConfigProxyOptions {
  SystemConfigProxy: { kind: 'SystemConfigProxy' } & SharedSystemConfigProxyOptions;
}
export type GenericSystemConfigProxyOptions = KindedSystemConfigProxyOptions[keyof KindedSystemConfigProxyOptions];


export interface KindedL1StandardBridgeProxyOptions {
  L1StandardBridgeProxy: { kind: 'L1StandardBridgeProxy' } & SharedL1StandardBridgeProxyOptions;
}
export type GenericL1StandardBridgeProxyOptions = KindedL1StandardBridgeProxyOptions[keyof KindedL1StandardBridgeProxyOptions];


export interface KindedL1CrossDomainMessengerProxyOptions {
  L1CrossDomainMessengerProxy: { kind: 'L1CrossDomainMessengerProxy' } & SharedL1CrossDomainMessengerProxyOptions;
}
export type GenericL1CrossDomainMessengerProxyOptions = KindedL1CrossDomainMessengerProxyOptions[keyof KindedL1CrossDomainMessengerProxyOptions];


export interface KindedOptimismMintableERC20FactoryProxyOptions {
  OptimismMintableERC20FactoryProxy: { kind: 'OptimismMintableERC20FactoryProxy' } & SharedOptimismMintableERC20FactoryProxyOptions;
}
export type GenericOptimismMintableERC20FactoryProxyOptions = KindedOptimismMintableERC20FactoryProxyOptions[keyof KindedOptimismMintableERC20FactoryProxyOptions];


export interface KindedL1ERC721BridgeProxyOptions {
  L1ERC721BridgeProxy: { kind: 'L1ERC721BridgeProxy' } & SharedL1ERC721BridgeProxyOptions;
}
export type GenericL1ERC721BridgeProxyOptions = KindedL1ERC721BridgeProxyOptions[keyof KindedL1ERC721BridgeProxyOptions];


export interface KindedDisputeGameFactoryProxyOptions {
  DisputeGameFactoryProxy: { kind: 'DisputeGameFactoryProxy' } & SharedDisputeGameFactoryProxyOptions;
}
export type GenericDisputeGameFactoryProxyOptions = KindedDisputeGameFactoryProxyOptions[keyof KindedDisputeGameFactoryProxyOptions];


export interface KindedL2OutputOracleProxyOptions {
  L2OutputOracleProxy: { kind: 'L2OutputOracleProxy' } & SharedL2OutputOracleProxyOptions;
}
export type GenericL2OutputOracleProxyOptions = KindedL2OutputOracleProxyOptions[keyof KindedL2OutputOracleProxyOptions];


export interface KindedDelayedWETHProxyOptions {
  DelayedWETHProxy: { kind: 'DelayedWETHProxy' } & SharedDelayedWETHProxyOptions;
}
export type GenericDelayedWETHProxyOptions = KindedDelayedWETHProxyOptions[keyof KindedDelayedWETHProxyOptions];


export interface KindedPermissionedDelayedWETHProxyOptions {
  PermissionedDelayedWETHProxy: { kind: 'PermissionedDelayedWETHProxy' } & SharedPermissionedDelayedWETHProxyOptions;
}
export type GenericPermissionedDelayedWETHProxyOptions = KindedPermissionedDelayedWETHProxyOptions[keyof KindedPermissionedDelayedWETHProxyOptions];


export interface KindedAnchorStateRegistryProxyOptions {
  AnchorStateRegistryProxy: { kind: 'AnchorStateRegistryProxy' } & SharedAnchorStateRegistryProxyOptions;
}
export type GenericAnchorStateRegistryProxyOptions = KindedAnchorStateRegistryProxyOptions[keyof KindedAnchorStateRegistryProxyOptions];


export interface KindedStepFourAllSubOptions {
  StepFourAllSub: { kind: 'StepFourAllSub' } & SharedStepFourAllSubOptions;
}
export type GenericStepFourAllSubOptions = KindedStepFourAllSubOptions[keyof KindedStepFourAllSubOptions];

export interface KindedStepFourAllOptions {
  StepFourAll: { kind: 'StepFourAll' } & SharedStepFourAllOptions;
}
export type GenericStepFourAllOptions = KindedStepFourAllOptions[keyof KindedStepFourAllOptions];

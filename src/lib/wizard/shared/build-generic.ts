
import type { SharedSafeOptions} from './1-option-safe';
import type { SharedGovernerOptions} from './1-option-governor';
import type { SharedAllOptions} from './1-option-all';

import type { SharedAddressManagerOptions } from './2-option-address-manager';
import type { SharedProxyAdminOptions } from './2-option-proxy-admin';
import type { SharedSuperchainConfigProxyOptions } from './2-option-superchain-config-proxy';
import type { SharedSuperchainConfigOptions } from './2-option-superchain-config';
import type { SharedProtocolVersionsProxyOptions } from './2-option-versions-proxy';
import type { SharedProtocolVersionsOptions } from './2-option-versions';


export interface KindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  AllStepOne: { kind: 'AllStepOne' } & SharedAllOptions;
  AddressManager: { kind: 'AddressManager' } & SharedAddressManagerOptions;
  ProxyAdmin: { kind: 'ProxyAdmin' } & SharedProxyAdminOptions;
  SuperchainConfigProxy : { kind: 'SuperchainConfigProxy' } & SharedSuperchainConfigProxyOptions;
  SuperchainConfig : { kind: 'SuperchainConfig' } & SharedSuperchainConfigOptions;
  ProtocolVersionsProxy : { kind: 'ProtocolVersionsProxy' } & SharedProtocolVersionsProxyOptions;
  ProtocolVersions : { kind: 'ProtocolVersions' } & SharedProtocolVersionsOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];


export interface KindedGovernanceOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
}
export type GenericGovernanceOptions = KindedGovernanceOptions[keyof KindedGovernanceOptions];


export interface KindedAllStepOneOptions {
  AllStepOne: { kind: 'AllStepOne' } & SharedAllOptions;
}
export type GenericAllStepOneOptions = KindedAllStepOneOptions[keyof KindedAllStepOneOptions];


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
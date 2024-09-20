
import type { SharedSafeOptions} from '../shared/1-option-safe';
import { buildSafe } from './1-safe';

import type { SharedGovernerOptions} from '../shared/1-option-governor';
import { buildGovernor } from './1-governor';

import type { SharedAddressManagerOptions } from '../shared/2-option-address-manager';
import { buildAddressManager } from './2-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-option-proxy-admin';
import { buildProxyAdmin } from './2-proxy-admin'

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-option-superchain-config-proxy';
import { buildSuperchainConfigProxy } from './2-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-option-superchain-config';
import { buildSuperchainConfig } from './2-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-option-versions-proxy';
import { buildProtocolVersionsProxy } from './2-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-option-versions';
import { buildProtocolVersions } from './2-versions';

import type { SharedOptimismPortalProxyOptions } from '../shared/4-option-optimism-portal-proxy';
import { buildOptimismPortalProxy } from './4-optimism-portal-proxy';

import type { SharedSystemConfigProxyOptions } from '../shared/4-option-system-config-proxy';
import { buildSystemConfigProxy } from './4-system-config-proxy';

export interface KindedOptions {
  Safe:  { kind: 'Safe' }  & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  AddressManager : { kind: 'AddressManager' } & SharedAddressManagerOptions;
  ProxyAdmin : { kind: 'ProxyAdmin' } & SharedProxyAdminOptions;
  SuperchainConfigProxy : { kind: 'SuperchainConfigProxy'} & SharedSuperchainConfigProxyOptions;
  SuperchainConfig : { kind: 'SuperchainConfig'} & SharedSuperchainConfigOptions;
  ProtocolVersionsProxy : {kind: 'ProtocolVersionsProxy' } & SharedProtocolVersionsProxyOptions;
  ProtocolVersions : {kind: 'ProtocolVersions' } & SharedProtocolVersionsOptions;
  OptimismPortalProxy : {kind: 'OptimismPortalProxy' } & SharedOptimismPortalProxyOptions;
  SystemConfigProxy : {kind: 'SystemConfigProxy' } & SharedSystemConfigProxyOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];

export function buildContractGeneric(opts: GenericOptions) {
  switch (opts.kind) {

    case 'Safe':
      return buildSafe(opts);

    case 'Governor':
      return buildGovernor(opts);

    case 'AddressManager':
      return  buildAddressManager(opts);

    case 'ProxyAdmin':
        return  buildProxyAdmin(opts);

    case 'SuperchainConfigProxy':
        return buildSuperchainConfigProxy(opts);
    
    case 'SuperchainConfig':
        return buildSuperchainConfig(opts);

    case 'ProtocolVersionsProxy':
      return buildProtocolVersionsProxy(opts);

    case 'ProtocolVersions':
      return buildProtocolVersions(opts);

    case 'OptimismPortalProxy':
      return buildOptimismPortalProxy(opts);

    case 'SystemConfigProxy':
      return buildSystemConfigProxy(opts);
  
    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

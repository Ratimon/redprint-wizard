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

import type { SharedL1StandardBridgeProxyOptions } from '../shared/4-option-l1-standard-bridge-proxy';
import { buildL1StandardBridgeProxy } from './4-l1-standard-bridge-proxy';

import type { SharedL1CrossDomainMessengerProxyOptions } from '../shared/4-option-l1-crossdomain-messenger-proxy';
import { buildL1CrossDomainMessengerProxy } from './4-l1-crossdomain-messenger-proxy';

import type { SharedOptimismMintableERC20FactoryProxyOptions } from '../shared/4-option-optimism-mintable-ERC20-factory-proxy';
import { buildOptimismMintableERC20FactoryProxy } from './4-optimism-mintable-ERC20-factory-proxy';

import type { SharedL1ERC721BridgeProxyOptions } from '../shared/4-option-l1-ERC721-bridge-proxy';
import { buildL1ERC721BridgeProxy } from './4-l1-ERC721-bridge-proxy';

import type { SharedDisputeGameFactoryProxyOptions } from '../shared/4-option-dispute-game-factory-proxy';
import { buildDisputeGameFactoryProxy } from './4-dispute-game-factory-proxy';

import type { SharedL2OutputOracleProxyOptions } from '../shared/4-option-l2-output-oracle-proxy';
import { buildL2OutputOracleProxy } from './4-l2-output-oracle-proxy';

import type { SharedDelayedWETHProxyOptions } from '../shared/4-option-delayed-WETH-proxy';
import { buildDelayedWETHProxy } from './4-delayed-WETH-proxy';

import type { SharedPermissionedDelayedWETHProxyOptions } from '../shared/4-option-permissioned-delayed-WETH-proxy';
import { buildPermissionedDelayedWETHProxy } from './4-permissioned-delayed-WETH-proxy';

import type { SharedAnchorStateRegistryProxyOptions } from '../shared/4-option-anchor-state-registry-proxy';
import { buildAnchorStateRegistryProxy } from './4-anchor-state-registry-proxy';

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
  L1StandardBridgeProxy : {kind: 'L1StandardBridgeProxy' } & SharedL1StandardBridgeProxyOptions;
  L1CrossDomainMessengerProxy : {kind: 'L1CrossDomainMessengerProxy' } & SharedL1CrossDomainMessengerProxyOptions;
  OptimismMintableERC20FactoryProxy : {kind: 'OptimismMintableERC20FactoryProxy' } & SharedOptimismMintableERC20FactoryProxyOptions;
  L1ERC721BridgeProxy : {kind: 'L1ERC721BridgeProxy' } & SharedL1ERC721BridgeProxyOptions;
  DisputeGameFactoryProxy : {kind: 'DisputeGameFactoryProxy' } & SharedDisputeGameFactoryProxyOptions;
  L2OutputOracleProxy : {kind: 'L2OutputOracleProxy' } & SharedL2OutputOracleProxyOptions;
  DelayedWETHProxy : {kind: 'DelayedWETHProxy' } & SharedDelayedWETHProxyOptions;
  PermissionedDelayedWETHProxy : {kind: 'PermissionedDelayedWETHProxy' } & SharedPermissionedDelayedWETHProxyOptions;
  AnchorStateRegistryProxy : {kind: 'AnchorStateRegistryProxy' } & SharedAnchorStateRegistryProxyOptions;
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
    
    case 'L1StandardBridgeProxy':
      return buildL1StandardBridgeProxy(opts);
    
    case 'L1CrossDomainMessengerProxy':
      return buildL1CrossDomainMessengerProxy(opts);
    
    case 'OptimismMintableERC20FactoryProxy':
      return buildOptimismMintableERC20FactoryProxy(opts);
    
    case 'L1ERC721BridgeProxy':
      return buildL1ERC721BridgeProxy(opts);

    case 'DisputeGameFactoryProxy':
      return buildDisputeGameFactoryProxy(opts);

    case 'L2OutputOracleProxy':
      return buildL2OutputOracleProxy(opts);

    case 'DelayedWETHProxy':
      return buildDelayedWETHProxy(opts);
    
    case 'PermissionedDelayedWETHProxy':
      return buildPermissionedDelayedWETHProxy(opts);

    case 'AnchorStateRegistryProxy':
      return buildAnchorStateRegistryProxy(opts);
      
    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

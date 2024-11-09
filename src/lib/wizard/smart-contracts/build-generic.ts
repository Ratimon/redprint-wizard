import type { SharedSafeOptions} from '../shared/1-governance/1-option-safe';
import { buildSafe } from './1-governance/1-safe';

import type { SharedGovernerOptions} from '../shared/1-governance/1-option-governor';
import { buildGovernor } from './1-governance/1-governor';

import type { SharedAddressManagerOptions } from '../shared/2-superchain/1A-option-address-manager';
import { buildAddressManager } from './2-superchain/1A-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-superchain/1B-option-proxy-admin';
import { buildProxyAdmin } from './2-superchain/1B-proxy-admin'

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-superchain/2A-option-superchain-config-proxy';
import { buildSuperchainConfigProxy } from './2-superchain/2A-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-superchain/2B-option-superchain-config';
import { buildSuperchainConfig } from './2-superchain/2B-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-superchain/3A-option-versions-proxy';
import { buildProtocolVersionsProxy } from './2-superchain/3A-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-superchain/3B-option-versions';
import { buildProtocolVersions } from './2-superchain/3C-versions';

import type { SharedOptimismPortalProxyOptions } from '../shared/4-opchain-proxies/1A-option-optimism-portal-proxy';
import { buildOptimismPortalProxy } from './4-opchain-proxies/1A-optimism-portal-proxy';

import type { SharedSystemConfigProxyOptions } from '../shared/4-opchain-proxies/1B-option-system-config-proxy';
import { buildSystemConfigProxy } from './4-opchain-proxies/1B-system-config-proxy';

import type { SharedL1StandardBridgeProxyOptions } from '../shared/4-opchain-proxies/1C-option-l1-standard-bridge-proxy';
import { buildL1StandardBridgeProxy } from './4-opchain-proxies/1C-l1-standard-bridge-proxy';

import type { SharedL1CrossDomainMessengerProxyOptions } from '../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';
import { buildL1CrossDomainMessengerProxy } from './4-opchain-proxies/1D-l1-crossdomain-messenger-proxy';

import type { SharedOptimismMintableERC20FactoryProxyOptions } from '../shared/4-opchain-proxies/1E-option-optimism-mintable-ERC20-factory-proxy';
import { buildOptimismMintableERC20FactoryProxy } from './4-opchain-proxies/1E-optimism-mintable-ERC20-factory-proxy';

import type { SharedL1ERC721BridgeProxyOptions } from '../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';
import { buildL1ERC721BridgeProxy } from './4-opchain-proxies/1F-l1-ERC721-bridge-proxy';

import type { SharedDisputeGameFactoryProxyOptions } from '../shared/4-opchain-proxies/1G-option-dispute-game-factory-proxy';
import { buildDisputeGameFactoryProxy } from './4-opchain-proxies/1G-dispute-game-factory-proxy';

import type { SharedL2OutputOracleProxyOptions } from '../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';
import { buildL2OutputOracleProxy } from './4-opchain-proxies/1H-l2-output-oracle-proxy';

import type { SharedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1I-option-delayed-WETH-proxy';
import { buildDelayedWETHProxy } from './4-opchain-proxies/1I-delayed-WETH-proxy';

import type { SharedPermissionedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1J-option-permissioned-delayed-WETH-proxy';
import { buildPermissionedDelayedWETHProxy } from './4-opchain-proxies/1J-permissioned-delayed-WETH-proxy';

import type { SharedAnchorStateRegistryProxyOptions } from '../shared/4-opchain-proxies/1K-option-anchor-state-registry-proxy';
import { buildAnchorStateRegistryProxy } from './4-opchain-proxies/1K-anchor-state-registry-proxy';

import type { SharedL1CrossDomainMessengerOptions } from '../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';
import { buildL1CrossDomainMessenger } from './4-opchain-implementations/2A-l1-crossdomain-messenger';

import type { SharedOptimismMintableERC20FactoryOptions } from '../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';
import { buildOptimismMintableERC20Factory } from './4-opchain-implementations/2B-optimism-mintable-ERC20-factory';

import type { SharedSystemConfigOptions } from '../shared/4-opchain-implementations/2C-option-system-config';
import { buildSystemConfig } from './4-opchain-implementations/2C-system-config';

import type { SharedSystemConfigInteropOptions } from '../shared/4-opchain-implementations/2C-option-system-config-interop';
import { buildSystemConfigInterop } from './4-opchain-implementations/2C-system-config-interop';

import type { SharedL1StandardBridgeOptions } from '../shared/4-opchain-implementations/2D-option-l1-standard-bridge';
import { buildL1StandardBridge } from './4-opchain-implementations/2D-l1-standard-bridge';

import type { SharedL1ERC721BridgeOptions } from '../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';
import { buildL1ERC721Bridge } from './4-opchain-implementations/2E-l1-ERC721-bridge';

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
  L1CrossDomainMessenger : {kind: 'L1CrossDomainMessenger' } & SharedL1CrossDomainMessengerOptions;
  OptimismMintableERC20Factory : {kind: 'OptimismMintableERC20Factory' } & SharedOptimismMintableERC20FactoryOptions;
  SystemConfig : {kind: 'SystemConfig' } & SharedSystemConfigOptions;
  SystemConfigInterop : {kind: 'SystemConfigInterop' } & SharedSystemConfigInteropOptions;
  L1StandardBridge : {kind: 'L1StandardBridge' } & SharedL1StandardBridgeOptions;
  L1ERC721Bridge : {kind: 'L1ERC721Bridge' } & SharedL1ERC721BridgeOptions;
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

    case 'L1CrossDomainMessenger':
      return buildL1CrossDomainMessenger(opts);

    case 'OptimismMintableERC20Factory':
      return buildOptimismMintableERC20Factory(opts);

    case 'SystemConfig':
      return buildSystemConfig(opts);

    case 'SystemConfigInterop':
      return buildSystemConfigInterop(opts);

    case 'L1StandardBridge':
      return buildL1StandardBridge(opts);

    case 'L1ERC721Bridge':
      return buildL1ERC721Bridge(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

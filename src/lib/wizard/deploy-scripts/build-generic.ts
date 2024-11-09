import type { SharedSafeOptions} from '../shared/1-governance/1-option-safe';
import { buildDeploySafe } from './1-governance/1-safe';

import type { SharedGovernerOptions} from '../shared/1-governance/1-option-governor';
import { buildDeployGoverner } from './1-governance/1-governor';

import type { SharedStepOneAllOptions} from '../shared/1-governance/option-all';
import { buildDeployStepOneAll } from './1-governance/all';

import type { SharedAddressManagerOptions } from '../shared/2-superchain/1A-option-address-manager';
import { buildDeployAddressManager } from './2-superchain/1A-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-superchain/1B-option-proxy-admin';
import { buildDeployProxyAdmin } from './2-superchain/1B-proxy-admin'

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-superchain/2A-option-superchain-config-proxy';
import { buildDeploySuperchainConfigProxy } from './2-superchain/2A-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-superchain/2B-option-superchain-config';
import { buildDeploySuperchainConfig } from './2-superchain/2B-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-superchain/3A-option-versions-proxy';
import { buildDeployProtocolVersionsProxy } from './2-superchain/3A-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-superchain/3B-option-versions';
import { buildDeployProtocolVersions } from './2-superchain/3B-versions';

import type { SharedStepTwoAllSubOptions } from '../shared/2-superchain/option-all-sub';
import { buildDeployStepTwoAllSub } from './2-superchain/all-sub';

import type { SharedStepTwoAllOptions} from '../shared/2-superchain/option-all';
import { buildDeployStepTwoAll } from './2-superchain/all';

import type { SharedOptimismPortalProxyOptions} from '../shared/4-opchain-proxies/1A-option-optimism-portal-proxy';
import { buildDeployOptimismPortalProxy } from './4-opchain-proxies/1A-optimism-portal-proxy';

import type { SharedSystemConfigProxyOptions} from '../shared/4-opchain-proxies/1B-option-system-config-proxy';
import { buildDeploySystemConfigProxy } from './4-opchain-proxies/1B-system-config-proxy';

import type { SharedL1StandardBridgeProxyOptions } from '../shared/4-opchain-proxies/1C-option-l1-standard-bridge-proxy';
import { buildDeployL1StandardBridgeProxy } from './4-opchain-proxies/1C-l1-standard-bridge-proxy';

import type { SharedL1CrossDomainMessengerProxyOptions } from '../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';
import { buildDeployL1CrossDomainMessengerProxy } from './4-opchain-proxies/1D-l1-crossdomain-messenger-proxy';

import type { SharedOptimismMintableERC20FactoryProxyOptions } from '../shared/4-opchain-proxies/1E-option-optimism-mintable-ERC20-factory-proxy';
import { buildDeployOptimismMintableERC20FactoryProxy } from './4-opchain-proxies/1E-optimism-mintable-ERC20-factory-proxy';

import type { SharedL1ERC721BridgeProxyOptions } from '../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';
import { buildDeployL1ERC721BridgeProxy } from './4-opchain-proxies/1F-l1-ERC721-bridge-proxy';

import type { SharedDisputeGameFactoryProxyOptions } from '../shared/4-opchain-proxies/1G-option-dispute-game-factory-proxy';
import { buildDeployDisputeGameFactoryProxy } from './4-opchain-proxies/1G-dispute-game-factory-proxy';

import type { SharedL2OutputOracleProxyOptions } from '../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';
import { buildDeployL2OutputOracleProxy } from './4-opchain-proxies/1H-l2-output-oracle-proxy';

import type { SharedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1I-option-delayed-WETH-proxy';
import { buildDeployDelayedWETHProxy } from './4-opchain-proxies/1I-delayed-WETH-proxy';

import type { SharedPermissionedDelayedWETHProxyOptions } from '../shared/4-opchain-proxies/1J-option-permissioned-delayed-WETH-proxy';
import { buildDeployPermissionedDelayedWETHProxy } from './4-opchain-proxies/1J-permissioned-delayed-WETH-proxy';

import type { SharedAnchorStateRegistryProxyOptions } from '../shared/4-opchain-proxies/1K-option-anchor-state-registry-proxy';
import { buildDeployAnchorStateRegistryProxy } from './4-opchain-proxies/1K-anchor-state-registry-proxy';

import type { SharedStepFourPointOneAllSubOptions } from '../shared/4-opchain-proxies/option-all-sub';
import { buildDeployStepFourPointOneAllSub } from './4-opchain-proxies/all-sub';

import type { SharedStepFourPointOneAllOptions } from '../shared/4-opchain-proxies/option-all';
import { buildDeployStepFourPointOneAll } from './4-opchain-proxies/all';

import type { SharedL1CrossDomainMessengerOptions } from '../shared/4-opchain-implementations/2A-option-l1-crossdomain-messenger';
import { buildDeployL1CrossDomainMessenger } from './4-opchain-implementations/2A-l1-crossdomain-messenger';

import type { SharedOptimismMintableERC20FactoryOptions } from '../shared/4-opchain-implementations/2B-option-optimism-mintable-ERC20-factory';
import { buildDeployOptimismMintableERC20Factory } from './4-opchain-implementations/2B-optimism-mintable-ERC20-factory';

import type { SharedSystemConfigOptions } from '../shared/4-opchain-implementations/2C-option-system-config';
import { buildDeploySystemConfig } from './4-opchain-implementations/2C-system-config';

import type { SharedSystemConfigInteropOptions } from '../shared/4-opchain-implementations/2C-option-system-config-interop';
import { buildDeploySystemConfigInterop } from './4-opchain-implementations/2C-system-config-interop';

import type { SharedL1StandardBridgeOptions } from '../shared/4-opchain-implementations/2D-option-l1-standard-bridge';
import { buildDeployL1StandardBridge } from './4-opchain-implementations/2D-l1-standard-bridge';

import type { SharedL1ERC721BridgeOptions } from '../shared/4-opchain-implementations/2E-option-l1-ERC721-bridge';
import { buildDeployL1ERC721Bridge } from './4-opchain-implementations/2E-l1-ERC721-bridge';

import type { SharedStepFourPointTwoAllSubOptions } from '../shared/4-opchain-implementations/option-all-sub';
import { buildDeployStepFourPointTwoAllSub } from './4-opchain-implementations/all-sub';

import type { SharedStepFourPointTwoAllOptions } from '../shared/4-opchain-implementations/option-all';
import { buildDeployStepFourPointTwoAll } from './4-opchain-implementations/all';

export interface DeployKindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  StepOneAll: {kind: 'StepOneAll'} & SharedStepOneAllOptions;

  AddressManager: {kind: 'AddressManager'} & SharedAddressManagerOptions;
  ProxyAdmin: {kind: 'ProxyAdmin'} & SharedProxyAdminOptions;
  SuperchainConfigProxy: {kind: 'SuperchainConfigProxy'} & SharedSuperchainConfigProxyOptions;
  SuperchainConfig: {kind: 'SuperchainConfig'} & SharedSuperchainConfigOptions;
  ProtocolVersionsProxy : {kind: 'ProtocolVersionsProxy'} & SharedProtocolVersionsProxyOptions;
  ProtocolVersions : {kind: 'ProtocolVersions'} & SharedProtocolVersionsOptions;
  StepTwoAllSub: {kind: 'StepTwoAllSub'} & SharedStepTwoAllSubOptions;
  StepTwoAll: {kind: 'StepTwoAll'} & SharedStepTwoAllOptions;

  OptimismPortalProxy: {kind: 'OptimismPortalProxy'} & SharedOptimismPortalProxyOptions;
  SystemConfigProxy : {kind: 'SystemConfigProxy'} & SharedSystemConfigProxyOptions;
  L1StandardBridgeProxy: {kind: 'L1StandardBridgeProxy'} & SharedL1StandardBridgeProxyOptions;
  L1CrossDomainMessengerProxy: {kind: 'L1CrossDomainMessengerProxy'} & SharedL1CrossDomainMessengerProxyOptions;
  OptimismMintableERC20FactoryProxy: {kind: 'OptimismMintableERC20FactoryProxy'} & SharedOptimismMintableERC20FactoryProxyOptions;
  L1ERC721BridgeProxy: {kind: 'L1ERC721BridgeProxy'} & SharedL1ERC721BridgeProxyOptions;
  DisputeGameFactoryProxy: {kind: 'DisputeGameFactoryProxy'} & SharedDisputeGameFactoryProxyOptions;
  L2OutputOracleProxy: {kind: 'L2OutputOracleProxy'} & SharedL2OutputOracleProxyOptions;
  DelayedWETHProxy: {kind: 'DelayedWETHProxy'} & SharedDelayedWETHProxyOptions;
  PermissionedDelayedWETHProxy: {kind: 'PermissionedDelayedWETHProxy'} & SharedPermissionedDelayedWETHProxyOptions;
  AnchorStateRegistryProxy: {kind: 'AnchorStateRegistryProxy'} & SharedAnchorStateRegistryProxyOptions;
  StepFourPointOneAllSub: {kind: 'StepFourPointOneAllSub'} & SharedStepFourPointOneAllSubOptions;
  StepFourPointOneAll: {kind: 'StepFourPointOneAll'} & SharedStepFourPointOneAllOptions;

  L1CrossDomainMessenger: {kind: 'L1CrossDomainMessenger'} & SharedL1CrossDomainMessengerOptions;
  OptimismMintableERC20Factory: {kind: 'OptimismMintableERC20Factory'} & SharedOptimismMintableERC20FactoryOptions;
  SystemConfig: {kind: 'SystemConfig'} & SharedSystemConfigOptions;
  SystemConfigInterop: {kind: 'SystemConfigInterop'} & SharedSystemConfigInteropOptions;
  L1StandardBridge: {kind: 'L1StandardBridge'} & SharedL1StandardBridgeOptions;
  L1ERC721Bridge: {kind: 'L1ERC721Bridge'} & SharedL1ERC721BridgeOptions;
  StepFourPointTwoAllSub: {kind: 'StepFourPointTwoAllSub'} & SharedStepFourPointTwoAllSubOptions;
  StepFourPointTwoAll: {kind: 'StepFourPointTwoAll'} & SharedStepFourPointTwoAllOptions;
}

export type DeployGenericOptions = DeployKindedOptions[keyof DeployKindedOptions];

export function buildDeployGeneric(opts: DeployGenericOptions) {
  switch (opts.kind) {

    case 'Safe':
      return buildDeploySafe(opts);

    case 'Governor':
      return buildDeployGoverner(opts);

    case 'StepOneAll':
      return buildDeployStepOneAll(opts);

    case 'AddressManager':
      return  buildDeployAddressManager(opts);

    case 'ProxyAdmin':
      return  buildDeployProxyAdmin(opts);

    case 'SuperchainConfigProxy':
      return  buildDeploySuperchainConfigProxy(opts);

    case 'SuperchainConfig':
      return  buildDeploySuperchainConfig(opts);

    case 'ProtocolVersionsProxy':
      return  buildDeployProtocolVersionsProxy(opts);

    case 'ProtocolVersions':
      return  buildDeployProtocolVersions(opts);

    case 'StepTwoAllSub':
      return  buildDeployStepTwoAllSub(opts);

    case 'StepTwoAll':
      return  buildDeployStepTwoAll(opts);
   
    case 'OptimismPortalProxy':
      return  buildDeployOptimismPortalProxy(opts);

    case 'SystemConfigProxy':
      return  buildDeploySystemConfigProxy(opts);
    
    case 'L1StandardBridgeProxy':
      return  buildDeployL1StandardBridgeProxy(opts);

    case 'L1CrossDomainMessengerProxy':
      return  buildDeployL1CrossDomainMessengerProxy(opts);

    case 'OptimismMintableERC20FactoryProxy':
      return  buildDeployOptimismMintableERC20FactoryProxy(opts);

    case 'L1ERC721BridgeProxy':
      return  buildDeployL1ERC721BridgeProxy(opts);

    case 'DisputeGameFactoryProxy':
      return  buildDeployDisputeGameFactoryProxy(opts);
    
    case 'L2OutputOracleProxy':
      return  buildDeployL2OutputOracleProxy(opts);

    case 'DelayedWETHProxy':
      return  buildDeployDelayedWETHProxy(opts);

    case 'PermissionedDelayedWETHProxy':
      return  buildDeployPermissionedDelayedWETHProxy(opts);

    case 'AnchorStateRegistryProxy':
      return  buildDeployAnchorStateRegistryProxy(opts);

    case 'StepFourPointOneAllSub':
      return  buildDeployStepFourPointOneAllSub(opts);

    case 'StepFourPointOneAll':
      return  buildDeployStepFourPointOneAll(opts);

    case 'L1CrossDomainMessenger':
      return  buildDeployL1CrossDomainMessenger(opts);

    case 'OptimismMintableERC20Factory':
      return  buildDeployOptimismMintableERC20Factory(opts);
    
    case 'SystemConfig':
      return  buildDeploySystemConfig(opts);

    case 'SystemConfigInterop':
      return  buildDeploySystemConfigInterop(opts);

    case 'L1StandardBridge':
      return  buildDeployL1StandardBridge(opts);

    case 'L1ERC721Bridge':
      return  buildDeployL1ERC721Bridge(opts);

    case 'StepFourPointTwoAllSub':
      return  buildDeployStepFourPointTwoAllSub(opts);

    case 'StepFourPointTwoAll':
      return  buildDeployStepFourPointTwoAll(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

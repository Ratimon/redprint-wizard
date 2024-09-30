import type { SharedSafeOptions} from '../shared/1-option-safe';
import { buildDeploySafe } from './1-safe';

import type { SharedGovernerOptions} from '../shared/1-option-governor';
import { buildDeployGoverner } from './1-governor';

import type { SharedStepOneAllOptions} from '../shared/1-option-all';
import { buildDeployAllStepOne } from './1-all';

import type { SharedAddressManagerOptions } from '../shared/2-option-address-manager';
import { buildDeployAddressManager } from './2-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-option-proxy-admin';
import { buildDeployProxyAdmin } from './2-proxy-admin'

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-option-superchain-config-proxy';
import { buildDeploySuperchainConfigProxy } from './2-superchain-config-proxy';

import type { SharedSuperchainConfigOptions } from '../shared/2-option-superchain-config';
import { buildDeploySuperchainConfig } from './2-superchain-config';

import type { SharedProtocolVersionsProxyOptions } from '../shared/2-option-versions-proxy';
import { buildDeployProtocolVersionsProxy } from './2-versions-proxy';

import type { SharedProtocolVersionsOptions } from '../shared/2-option-versions';
import { buildDeployProtocolVersions } from './2-versions';

import type { SharedStepTwoAllOptions} from '../shared/2-option-all';
import { buildDeployAllStepTwo } from './2-all';

import type { SharedOptimismPortalProxyOptions} from '../shared/4-option-optimism-portal-proxy';
import { buildDeployOptimismPortalProxy } from './4-optimism-portal-proxy';

import type { SharedSystemConfigProxyOptions} from '../shared/4-option-system-config-proxy';
import { buildDeploySystemConfigProxy } from './4-system-config-proxy';

import type { SharedL1StandardBridgeProxyOptions } from '../shared/4-option-l1-standard-bridge-proxy';
import { buildDeployL1StandardBridgeProxy } from './4-l1-standard-bridge-proxy';

export interface DeployKindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  AllStepOne: {kind: 'AllStepOne'} & SharedStepOneAllOptions;
  AddressManager: {kind: 'AddressManager'} & SharedAddressManagerOptions;
  ProxyAdmin: {kind: 'ProxyAdmin'} & SharedProxyAdminOptions;
  SuperchainConfigProxy: {kind: 'SuperchainConfigProxy'} & SharedSuperchainConfigProxyOptions;
  SuperchainConfig: {kind: 'SuperchainConfig'} & SharedSuperchainConfigOptions;
  ProtocolVersionsProxy : {kind: 'ProtocolVersionsProxy'} & SharedProtocolVersionsProxyOptions;
  ProtocolVersions : {kind: 'ProtocolVersions'} & SharedProtocolVersionsOptions;
  AllStepTwo: {kind: 'AllStepTwo'} & SharedStepTwoAllOptions;
  OptimismPortalProxy: {kind: 'OptimismPortalProxy'} & SharedOptimismPortalProxyOptions;
  SystemConfigProxy : {kind: 'SystemConfigProxy'} & SharedSystemConfigProxyOptions;
  L1StandardBridgeProxy: {kind: 'L1StandardBridgeProxy'} & SharedL1StandardBridgeProxyOptions;
}

export type DeployGenericOptions = DeployKindedOptions[keyof DeployKindedOptions];

export function buildDeployGeneric(opts: DeployGenericOptions) {
  switch (opts.kind) {

    case 'Safe':
      return buildDeploySafe(opts);

    case 'Governor':
      return buildDeployGoverner(opts);

    case 'AllStepOne':
      return buildDeployAllStepOne(opts);

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

    case 'AllStepTwo':
      return  buildDeployAllStepTwo(opts);
   
    case 'OptimismPortalProxy':
      return  buildDeployOptimismPortalProxy(opts);

    case 'SystemConfigProxy':
      return  buildDeploySystemConfigProxy(opts);
    
    case 'L1StandardBridgeProxy':
      return  buildDeployL1StandardBridgeProxy(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

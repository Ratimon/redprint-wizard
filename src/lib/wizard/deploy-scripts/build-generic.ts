import type { SharedSafeOptions} from '../shared/1-option-safe';
import { buildDeploySafe } from './1-safe';

import type { SharedGovernerOptions} from '../shared/1-option-governor';
import { buildDeployGoverner } from './1-governor';

import type { SharedAllOptions} from '../shared/1-option-all';
import { buildDeployAllStepOne } from './1-all';

import type { SharedAddressManagerOptions } from '../shared/2-option-address-manager';
import { buildDeployAddressManager } from './2-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-option-proxy-admin';
import { buildDeployProxyAdmin } from './2-proxy-admin'

import type { SharedSuperchainConfigProxyOptions } from '../shared/2-option-superchain-config-proxy';
import { buildDeploySuperchainConfigProxy } from './2-superchain-config-proxy';

export interface DeployKindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  AllStepOne: {kind: 'AllStepOne'} & SharedAllOptions;
  AddressManager: {kind: 'AddressManager'} & SharedAddressManagerOptions;
  ProxyAdmin: {kind: 'ProxyAdmin'} & SharedProxyAdminOptions;
  SuperchainConfigProxy: {kind: 'SuperchainConfigProxy'} & SharedSuperchainConfigProxyOptions;
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

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}


import type { SharedSafeOptions} from '../shared/1-option-safe';
import { buildSafe } from './1-safe';

import type { SharedGovernerOptions} from '../shared/1-option-governor';
import { buildGovernor } from './1-governor';

import type { SharedAddressManagerOptions } from '../shared/2-option-address-manager';
import { buildAddressManager } from './2-address-manager';

import type { SharedProxyAdminOptions } from '../shared/2-option-proxy-admin';
import { buildProxyAdmin } from './2-proxy-admin'

export interface KindedOptions {
  Safe:  { kind: 'Safe' }  & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  AddressManager : { kind: 'AddressManager' } & SharedAddressManagerOptions;
  ProxyAdmin : { kind: 'ProxyAdmin' } & SharedProxyAdminOptions;
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

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

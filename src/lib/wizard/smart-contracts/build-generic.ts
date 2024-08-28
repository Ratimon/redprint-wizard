
import type { SharedSafeOptions} from '../shared/1-shared-safe-option';
import { buildSafe } from './1-safe';

import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';
import { buildGovernor } from './1-governor';

import type { SharedAddressManagerOptions } from '../shared/2-shared-address-manager-option';
import { buildAddressManager } from './2-address-manager';


export interface KindedOptions {
  Safe:  { kind: 'Safe' }  & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  AddressManager : { kind: 'AddressManager' } & SharedAddressManagerOptions;
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

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

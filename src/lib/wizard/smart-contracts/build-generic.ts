
import type { SharedSafeOptions} from '../shared/1-shared-safe-option';
import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';

import { buildSafe } from './1-safe';
import { buildGovernor } from './1-governor';


export interface KindedOptions {
  Safe:  { kind: 'Safe' }  & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];

export function buildContractGeneric(opts: GenericOptions) {
  switch (opts.kind) {

    case 'Safe':
      return buildSafe(opts);

    case 'Governor':
      return buildGovernor(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

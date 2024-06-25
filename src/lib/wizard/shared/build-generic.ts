
import type { SharedSafeOptions} from '../shared/1-shared-safe-option';
import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';

export interface KindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];
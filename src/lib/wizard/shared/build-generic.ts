
import type { SharedSafeOptions} from '../shared/1-shared-safe-option';
import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';
import type { SharedAllOptions} from '../shared/1-all-option';

export interface KindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  AllStepOne: { kind: 'AllStepOne' } & SharedAllOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];

export interface KindedGovernanceOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
}

export type GenericGovernanceOptions = KindedGovernanceOptions[keyof KindedGovernanceOptions];

export interface KindedAllStepOneOptions {
  AllStepOne: { kind: 'AllStepOne' } & SharedAllOptions;
}

export type GenericAllStepOneOptions = KindedAllStepOneOptions[keyof KindedAllStepOneOptions];
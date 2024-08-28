// to do : separate to 1- , 2-
export type {
    KindedGovernanceOptions, GenericGovernanceOptions,
    KindedAllStepOneOptions, GenericAllStepOneOptions,
    KindedAddressManagerOptions, GenericAddressManagerOptions
} from './build-generic';

export type { CommonOptions } from './common-options';

export type { Info } from './set-info';
export { defaults as InfoDefaults } from './set-info';

export type {OptionsErrorMessages } from './error';
export { OptionsError } from './error';

// to do : separate to 1- , 2-
export type { Kind, KindGovernance, KindAllStepOne, KindAddressManager } from './kind';
export { sanitizeKind, sanitizeKindGovernance, sanitizeKindAllStepOne, sanitizeKindAddressManager } from './kind';
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

export type { Kind} from './0-all-kind';
export { sanitizeKind} from './0-all-kind';

export type { KindGovernance, KindAllStepOne } from './1-kind';
export {  sanitizeKindGovernance, sanitizeKindAllStepOne } from './1-kind';

export type { KindAddressManager} from './2-kind';
export { sanitizeKindAddressManager} from './2-kind';
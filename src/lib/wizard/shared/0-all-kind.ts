import type { GenericOptions, GenericGovernanceOptions, GenericAllStepOneOptions, GenericAddressManagerOptions } from './build-generic';

export type Kind = GenericOptions['kind'];

export function sanitizeKind(kind: unknown): Kind {
  if (typeof kind === 'string') {
    if (isKind(kind)) {
      return kind;
    }
  }
  return 'Safe';
}

function isKind<T>(value: Kind | T): value is Kind {
  switch (value) {
    case 'Safe':
      return true;
    case 'Governor':
      return true;
    case 'AllStepOne':
        return true;
    case 'AddressManager':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
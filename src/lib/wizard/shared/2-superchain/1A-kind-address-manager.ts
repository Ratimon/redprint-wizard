import type { GenericAddressManagerOptions } from '../build-generic';

export type KindAddressManager = GenericAddressManagerOptions['kind'];

export function sanitizeKindAddressManager(kind: unknown): KindAddressManager {
  if (typeof kind === 'string') {
    if (isKindAddressManager(kind)) {
      return kind;
    }
  }
  return 'AddressManager';
}

function isKindAddressManager<T>(value: KindAddressManager | T): value is KindAddressManager {
  switch (value) {
    case 'AddressManager':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
import type { GenericSuperchainConfigProxyOptions } from './build-generic';

export type KindSuperchainConfigProxy = GenericSuperchainConfigProxyOptions['kind'];

export function sanitizeKindSuperchainConfigProxy(kind: unknown): KindSuperchainConfigProxy {
  if (typeof kind === 'string') {
    if (isKindSuperchainConfigProxy(kind)) {
      return kind;
    }
  }
  return 'SuperchainConfigProxy';
}

function isKindSuperchainConfigProxy<T>(value: KindSuperchainConfigProxy | T): value is KindSuperchainConfigProxy {
  switch (value) {
    case 'SuperchainConfigProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
import type { GenericSuperchainConfigOptions } from '../build-generic';

export type KindSuperchainConfig = GenericSuperchainConfigOptions['kind'];

export function sanitizeKindSuperchainConfig(kind: unknown): KindSuperchainConfig {
  if (typeof kind === 'string') {
    if (isKindSuperchainConfig(kind)) {
      return kind;
    }
  }
  return 'SuperchainConfig';
}

function isKindSuperchainConfig<T>(value: KindSuperchainConfig | T): value is KindSuperchainConfig {
  switch (value) {
    case 'SuperchainConfig':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
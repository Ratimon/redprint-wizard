import type { GenericInitializeImplementationsOptions } from '../build-generic';

export type KindInitializeImplementations = GenericInitializeImplementationsOptions['kind'];

export function sanitizeKindInitializeImplementations(kind: unknown): KindInitializeImplementations {
  if (typeof kind === 'string') {
    if (isKindInitializeImplementations(kind)) {
      return kind;
    }
  }
  return 'InitializeImplementations';
}

function isKindInitializeImplementations<T>(value: KindInitializeImplementations | T): value is KindInitializeImplementations {
  switch (value) {
    case 'InitializeImplementations':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
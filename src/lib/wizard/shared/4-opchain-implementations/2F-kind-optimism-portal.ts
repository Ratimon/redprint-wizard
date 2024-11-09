import type { GenericOptimismPortalOptions } from '../build-generic';

export type KindOptimismPortal = GenericOptimismPortalOptions['kind'];

export function sanitizeKindOptimismPortal(kind: unknown): KindOptimismPortal {
  if (typeof kind === 'string') {
    if (isKindOptimismPortal(kind)) {
      return kind;
    }
  }
  return 'OptimismPortal';
}

function isKindOptimismPortal<T>(value: KindOptimismPortal | T): value is KindOptimismPortal {
  switch (value) {
    case 'OptimismPortal':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
import type { GenericOptimismPortal2Options } from '../build-generic';

export type KindOptimismPortal2 = GenericOptimismPortal2Options['kind'];

export function sanitizeKindOptimismPortal2(kind: unknown): KindOptimismPortal2 {
  if (typeof kind === 'string') {
    if (isKindOptimismPortal2(kind)) {
      return kind;
    }
  }
  return 'OptimismPortal2';
}

function isKindOptimismPortal2<T>(value: KindOptimismPortal2 | T): value is KindOptimismPortal2 {
  switch (value) {
    case 'OptimismPortal2':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
import type { GenericOptimismPortalProxyOptions } from '../build-generic';

export type KindOptimismPortalProxy = GenericOptimismPortalProxyOptions['kind'];

export function sanitizeKindOptimismPortalProxy(kind: unknown): KindOptimismPortalProxy {
  if (typeof kind === 'string') {
    if (isKindOptimismPortalProxy(kind)) {
      return kind;
    }
  }
  return 'OptimismPortalProxy';
}

function isKindOptimismPortalProxy<T>(value: KindOptimismPortalProxy | T): value is KindOptimismPortalProxy {
  switch (value) {
    case 'OptimismPortalProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
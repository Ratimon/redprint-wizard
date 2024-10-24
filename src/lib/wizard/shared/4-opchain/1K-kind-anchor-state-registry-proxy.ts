import type { GenericAnchorStateRegistryProxyOptions } from '../build-generic';

export type KindAnchorStateRegistryProxy = GenericAnchorStateRegistryProxyOptions['kind'];

export function sanitizeKindAnchorStateRegistryProxy(kind: unknown): KindAnchorStateRegistryProxy {
  if (typeof kind === 'string') {
    if (isKindAnchorStateRegistryProxy(kind)) {
      return kind;
    }
  }
  return 'AnchorStateRegistryProxy';
}

function isKindAnchorStateRegistryProxy<T>(value: KindAnchorStateRegistryProxy | T): value is KindAnchorStateRegistryProxy {
  switch (value) {
    case 'AnchorStateRegistryProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
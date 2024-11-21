import type { GenericAnchorStateRegistryOptions } from '../build-generic';

export type KindAnchorStateRegistry = GenericAnchorStateRegistryOptions['kind'];

export function sanitizeKindAnchorStateRegistry(kind: unknown): KindAnchorStateRegistry {
  if (typeof kind === 'string') {
    if (isKindAnchorStateRegistry(kind)) {
      return kind;
    }
  }
  return 'AnchorStateRegistry';
}

function isKindAnchorStateRegistry<T>(value: KindAnchorStateRegistry | T): value is KindAnchorStateRegistry {
  switch (value) {
    case 'AnchorStateRegistry':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
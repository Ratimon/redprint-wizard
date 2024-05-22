import type { GenericOptions } from './build-generic';

export type Kind = GenericOptions['kind'];

export function sanitizeKind(kind: unknown): Kind {
  if (typeof kind === 'string') {
    if (isKind(kind)) {
      return kind;
    }
  }
  return 'Custom';
}

function isKind<T>(value: Kind | T): value is Kind {
  switch (value) {
    case 'Governor':
    case 'Custom':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}


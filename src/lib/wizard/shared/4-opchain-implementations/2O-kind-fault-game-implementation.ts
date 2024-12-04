import type { GenericSetFaultGameImplementationOptions } from '../build-generic';

export type KindSetFaultGameImplementation = GenericSetFaultGameImplementationOptions['kind'];

export function sanitizeKindSetFaultGameImplementation(kind: unknown): KindSetFaultGameImplementation {
  if (typeof kind === 'string') {
    if (isKindSetFaultGameImplementation(kind)) {
      return kind;
    }
  }
  return 'SetFaultGameImplementation';
}

function isKindSetFaultGameImplementation<T>(value: KindSetFaultGameImplementation | T): value is KindSetFaultGameImplementation {
  switch (value) {
    case 'SetFaultGameImplementation':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
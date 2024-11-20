import type { GenericMIPSOptions } from '../build-generic';

export type KindMIPS = GenericMIPSOptions['kind'];

export function sanitizeKindMIPS(kind: unknown): KindMIPS {
  if (typeof kind === 'string') {
    if (isKindMIPS(kind)) {
      return kind;
    }
  }
  return 'MIPS';
}

function isKindMIPS<T>(value: KindMIPS | T): value is KindMIPS {
  switch (value) {
    case 'MIPS':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
import type { GenericL2OutputOracleOptions } from '../build-generic';

export type KindL2OutputOracle = GenericL2OutputOracleOptions['kind'];

export function sanitizeKindL2OutputOracle(kind: unknown): KindL2OutputOracle {
  if (typeof kind === 'string') {
    if (isKindL2OutputOracle(kind)) {
      return kind;
    }
  }
  return 'L2OutputOracle';
}

function isKindL2OutputOracle<T>(value: KindL2OutputOracle | T): value is KindL2OutputOracle {
  switch (value) {
    case 'L2OutputOracle':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
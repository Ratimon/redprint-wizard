import type { GenericPreimageOracleOptions } from '../build-generic';

export type KindPreimageOracle = GenericPreimageOracleOptions['kind'];

export function sanitizeKindPreimageOracle(kind: unknown): KindPreimageOracle {
  if (typeof kind === 'string') {
    if (isKindPreimageOracle(kind)) {
      return kind;
    }
  }
  return 'PreimageOracle';
}

function isKindPreimageOracle<T>(value: KindPreimageOracle | T): value is KindPreimageOracle {
  switch (value) {
    case 'PreimageOracle':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
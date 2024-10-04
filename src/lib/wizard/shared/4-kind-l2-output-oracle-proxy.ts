import type { GenericL2OutputOracleProxyOptions } from './build-generic';

export type KindL2OutputOracleProxy = GenericL2OutputOracleProxyOptions['kind'];

export function sanitizeKindL2OutputOracleProxy(kind: unknown): KindL2OutputOracleProxy {
  if (typeof kind === 'string') {
    if (isKindL2OutputOracleProxy(kind)) {
      return kind;
    }
  }
  return 'L2OutputOracleProxy';
}

function isKindL2OutputOracleProxy<T>(value: KindL2OutputOracleProxy | T): value is KindL2OutputOracleProxy {
  switch (value) {
    case 'L2OutputOracleProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
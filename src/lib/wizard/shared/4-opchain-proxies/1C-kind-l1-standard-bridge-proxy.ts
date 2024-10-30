import type { GenericL1StandardBridgeProxyOptions } from '../build-generic';

export type KindL1StandardBridgeProxy = GenericL1StandardBridgeProxyOptions['kind'];

export function sanitizeKindL1StandardBridgeProxy(kind: unknown): KindL1StandardBridgeProxy {
  if (typeof kind === 'string') {
    if (isKindL1StandardBridgeProxy(kind)) {
      return kind;
    }
  }
  return 'L1StandardBridgeProxy';
}

function isKindL1StandardBridgeProxy<T>(value: KindL1StandardBridgeProxy | T): value is KindL1StandardBridgeProxy {
  switch (value) {
    case 'L1StandardBridgeProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
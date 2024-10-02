import type { GenericL1ERC721BridgeProxyOptions } from './build-generic';

export type KindL1ERC721BridgeProxy = GenericL1ERC721BridgeProxyOptions['kind'];

export function sanitizeKindL1ERC721BridgeProxy(kind: unknown): KindL1ERC721BridgeProxy {
  if (typeof kind === 'string') {
    if (isKindL1ERC721BridgeProxy(kind)) {
      return kind;
    }
  }
  return 'L1ERC721BridgeProxy';
}

function isKindL1ERC721BridgeProxy<T>(value: KindL1ERC721BridgeProxy | T): value is KindL1ERC721BridgeProxy {
  switch (value) {
    case 'L1ERC721BridgeProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
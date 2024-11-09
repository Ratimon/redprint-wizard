import type { GenericL1ERC721BridgeOptions } from '../build-generic';

export type KindL1ERC721Bridge = GenericL1ERC721BridgeOptions['kind'];

export function sanitizeKindL1ERC721Bridge(kind: unknown): KindL1ERC721Bridge {
  if (typeof kind === 'string') {
    if (isKindL1ERC721Bridge(kind)) {
      return kind;
    }
  }
  return 'L1ERC721Bridge';
}

function isKindL1ERC721Bridge<T>(value: KindL1ERC721Bridge | T): value is KindL1ERC721Bridge {
  switch (value) {
    case 'L1ERC721Bridge':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
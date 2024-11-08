import type { GenericL1StandardBridgeOptions } from '../build-generic';

export type KindL1StandardBridge = GenericL1StandardBridgeOptions['kind'];

export function sanitizeKindL1StandardBridge(kind: unknown): KindL1StandardBridge {
  if (typeof kind === 'string') {
    if (isKindL1StandardBridge(kind)) {
      return kind;
    }
  }
  return 'L1StandardBridge';
}

function isKindL1StandardBridge<T>(value: KindL1StandardBridge | T): value is KindL1StandardBridge {
  switch (value) {
    case 'L1StandardBridge':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
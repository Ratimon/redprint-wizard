import type { GenericDelayedWETHOptions } from '../build-generic';

export type KindDelayedWETH = GenericDelayedWETHOptions['kind'];

export function sanitizeKindDelayedWETH(kind: unknown): KindDelayedWETH {
  if (typeof kind === 'string') {
    if (isKindDelayedWETH(kind)) {
      return kind;
    }
  }
  return 'DelayedWETH';
}

function isKindDelayedWETH<T>(value: KindDelayedWETH | T): value is KindDelayedWETH {
  switch (value) {
    case 'DelayedWETH':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
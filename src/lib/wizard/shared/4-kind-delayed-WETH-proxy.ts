import type { GenericDelayedWETHProxyOptions } from './build-generic';

export type KindDelayedWETHProxy = GenericDelayedWETHProxyOptions['kind'];

export function sanitizeKindDelayedWETHProxy(kind: unknown): KindDelayedWETHProxy {
  if (typeof kind === 'string') {
    if (isKindDelayedWETHProxy(kind)) {
      return kind;
    }
  }
  return 'DelayedWETHProxy';
}

function isKindDelayedWETHProxy<T>(value: KindDelayedWETHProxy | T): value is KindDelayedWETHProxy {
  switch (value) {
    case 'DelayedWETHProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
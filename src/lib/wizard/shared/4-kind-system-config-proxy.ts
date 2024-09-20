import type { GenericSystemConfigProxyOptions } from './build-generic';

export type KindSystemConfigProxy = GenericSystemConfigProxyOptions['kind'];

export function sanitizeKindSystemConfigProxy(kind: unknown): KindSystemConfigProxy {
  if (typeof kind === 'string') {
    if (isKindSystemConfigProxy(kind)) {
      return kind;
    }
  }
  return 'SystemConfigProxy';
}

function isKindSystemConfigProxy<T>(value: KindSystemConfigProxy | T): value is KindSystemConfigProxy {
  switch (value) {
    case 'SystemConfigProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
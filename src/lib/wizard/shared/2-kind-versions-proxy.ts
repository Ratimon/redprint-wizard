import type { GenericProtocolVersionsProxyOptions } from './build-generic';

export type KindProtocolVersionsProxy = GenericProtocolVersionsProxyOptions['kind'];

export function sanitizeKindProtocolVersionsProxy(kind: unknown): KindProtocolVersionsProxy {
  if (typeof kind === 'string') {
    if (isKindProtocolVersionsProxy(kind)) {
      return kind;
    }
  }
  return 'ProtocolVersionsProxy';
}

function isKindProtocolVersionsProxy<T>(value: KindProtocolVersionsProxy | T): value is KindProtocolVersionsProxy {
  switch (value) {
    case 'ProtocolVersionsProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
import type { GenericL1CrossDomainMessengerProxyOptions } from './build-generic';

export type KindL1CrossDomainMessengerProxy = GenericL1CrossDomainMessengerProxyOptions['kind'];

export function sanitizeKindL1CrossDomainMessengerProxy(kind: unknown): KindL1CrossDomainMessengerProxy {
  if (typeof kind === 'string') {
    if (isKindL1CrossDomainMessengerProxy(kind)) {
      return kind;
    }
  }
  return 'L1CrossDomainMessengerProxy';
}

function isKindL1CrossDomainMessengerProxy<T>(value: KindL1CrossDomainMessengerProxy | T): value is KindL1CrossDomainMessengerProxy {
  switch (value) {
    case 'L1CrossDomainMessengerProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
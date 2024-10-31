import type { GenericL1CrossDomainMessengerOptions } from '../build-generic';

export type KindL1CrossDomainMessenger = GenericL1CrossDomainMessengerOptions['kind'];

export function sanitizeKindL1CrossDomainMessenger(kind: unknown): KindL1CrossDomainMessenger {
  if (typeof kind === 'string') {
    if (isKindL1CrossDomainMessenger(kind)) {
      return kind;
    }
  }
  return 'L1CrossDomainMessenger';
}

function isKindL1CrossDomainMessenger<T>(value: KindL1CrossDomainMessenger | T): value is KindL1CrossDomainMessenger {
  switch (value) {
    case 'L1CrossDomainMessenger':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
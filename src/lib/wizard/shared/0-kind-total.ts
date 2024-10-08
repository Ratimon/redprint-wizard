import type { GenericOptions} from './build-generic';

export type Kind = GenericOptions['kind'];

export function sanitizeKind(kind: unknown): Kind {
  if (typeof kind === 'string') {
    if (isKind(kind)) {
      return kind;
    }
  }
  return 'Safe';
}

function isKind<T>(value: Kind | T): value is Kind {
  switch (value) {
    case 'Safe':
      return true;
    case 'Governor':
      return true;
    case 'AllStepOne':
        return true;
    case 'AddressManager':
      return true;
    case 'ProxyAdmin':
        return true;
    case 'SuperchainConfigProxy':
      return true;
    case 'SuperchainConfig':
      return true;
    case 'ProtocolVersionsProxy':
      return true;
    case 'ProtocolVersions':
      return true;
    case 'AllStepTwo':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
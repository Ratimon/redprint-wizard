import type { GenericDataAvailabilityChallengeProxyOptions } from '../build-generic';

export type KindDataAvailabilityChallengeProxy = GenericDataAvailabilityChallengeProxyOptions['kind'];

export function sanitizeKindDataAvailabilityChallengeProxy(kind: unknown): KindDataAvailabilityChallengeProxy {
  if (typeof kind === 'string') {
    if (isKindDataAvailabilityChallengeProxy(kind)) {
      return kind;
    }
  }
  return 'DataAvailabilityChallengeProxy';
}

function isKindDataAvailabilityChallengeProxy<T>(value: KindDataAvailabilityChallengeProxy | T): value is KindDataAvailabilityChallengeProxy {
  switch (value) {
    case 'DataAvailabilityChallengeProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
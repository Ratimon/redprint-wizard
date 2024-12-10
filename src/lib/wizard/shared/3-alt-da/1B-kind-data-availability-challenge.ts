import type { GenericDataAvailabilityChallengeOptions } from '../build-generic';

export type KindDataAvailabilityChallenge = GenericDataAvailabilityChallengeOptions['kind'];

export function sanitizeKindDataAvailabilityChallenge(kind: unknown): KindDataAvailabilityChallenge {
  if (typeof kind === 'string') {
    if (isKindDataAvailabilityChallenge(kind)) {
      return kind;
    }
  }
  return 'DataAvailabilityChallenge';
}

function isKindDataAvailabilityChallenge<T>(value: KindDataAvailabilityChallenge | T): value is KindDataAvailabilityChallenge {
  switch (value) {
    case 'DataAvailabilityChallenge':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
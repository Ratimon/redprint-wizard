import type { GenericStepFourPointTwoAllSubOptions } from '../build-generic';

export type KindStepFourPointTwoAllSub = GenericStepFourPointTwoAllSubOptions['kind'];

export function sanitizeKindStepFourPointTwoAllSub(kind: unknown): KindStepFourPointTwoAllSub {
  if (typeof kind === 'string') {
    if (isKindStepFourPointTwoAllSub(kind)) {
      return kind;
    }
  }
  return 'StepFourPointTwoAllSub';
}

function isKindStepFourPointTwoAllSub<T>(value: KindStepFourPointTwoAllSub | T): value is KindStepFourPointTwoAllSub {
  switch (value) {
    case 'StepFourPointTwoAllSub':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
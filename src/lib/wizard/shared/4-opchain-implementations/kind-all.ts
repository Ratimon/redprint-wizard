import type { GenericStepFourPointTwoAllOptions } from '../build-generic';

export type KindStepFourPointTwoAll = GenericStepFourPointTwoAllOptions['kind'];

export function sanitizeKindStepFourPointTwoAll(kind: unknown): KindStepFourPointTwoAll {
  if (typeof kind === 'string') {
    if (isKindStepFourPointTwoAll(kind)) {
      return kind;
    }
  }
  return 'StepFourPointTwoAll';
}

function isKindStepFourPointTwoAll<T>(value: KindStepFourPointTwoAll | T): value is KindStepFourPointTwoAll {
  switch (value) {
    case 'StepFourPointTwoAll':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
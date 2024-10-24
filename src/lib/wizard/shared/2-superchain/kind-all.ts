import type { GenericStepTwoAllOptions } from '../build-generic';

export type KindStepTwoAll = GenericStepTwoAllOptions['kind'];

export function sanitizeKindStepTwoAll(kind: unknown): KindStepTwoAll {
  if (typeof kind === 'string') {
    if (isKindAllStepTwo(kind)) {
      return kind;
    }
  }
  return 'StepTwoAll';
}

function isKindAllStepTwo<T>(value: KindStepTwoAll | T): value is KindStepTwoAll {
  switch (value) {
    case 'StepTwoAll':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
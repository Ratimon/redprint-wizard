import type { GenericAllStepTwoOptions } from './build-generic';

export type KindAllStepTwo = GenericAllStepTwoOptions['kind'];

export function sanitizeKindAllStepTwo(kind: unknown): KindAllStepTwo {
  if (typeof kind === 'string') {
    if (isKindAllStepTwo(kind)) {
      return kind;
    }
  }
  return 'AllStepTwo';
}

function isKindAllStepTwo<T>(value: KindAllStepTwo | T): value is KindAllStepTwo {
  switch (value) {
    case 'AllStepTwo':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
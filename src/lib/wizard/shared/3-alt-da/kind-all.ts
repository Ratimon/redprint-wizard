import type { GenericStepThreeAllOptions } from '../build-generic';

export type KindStepThreeAll = GenericStepThreeAllOptions['kind'];

export function sanitizeKindStepThreeAll(kind: unknown): KindStepThreeAll {
  if (typeof kind === 'string') {
    if (isKindStepThreeAll(kind)) {
      return kind;
    }
  }
  return 'StepThreeAll';
}

function isKindStepThreeAll<T>(value: KindStepThreeAll | T): value is KindStepThreeAll {
  switch (value) {
    case 'StepThreeAll':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
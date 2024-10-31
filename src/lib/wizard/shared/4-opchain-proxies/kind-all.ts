import type { GenericStepFourPointOneAllOptions } from '../build-generic';

export type KindStepFourPointOneAll = GenericStepFourPointOneAllOptions['kind'];

export function sanitizeKindStepFourPointOneAll(kind: unknown): KindStepFourPointOneAll {
  if (typeof kind === 'string') {
    if (isKindStepFourPointOneAll(kind)) {
      return kind;
    }
  }
  return 'StepFourPointOneAll';
}

function isKindStepFourPointOneAll<T>(value: KindStepFourPointOneAll | T): value is KindStepFourPointOneAll {
  switch (value) {
    case 'StepFourPointOneAll':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
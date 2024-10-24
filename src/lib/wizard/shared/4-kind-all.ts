import type { GenericStepFourAllOptions } from './build-generic';

export type KindStepFourAll = GenericStepFourAllOptions['kind'];

export function sanitizeKindStepFourAll(kind: unknown): KindStepFourAll {
  if (typeof kind === 'string') {
    if (isKindStepFourAll(kind)) {
      return kind;
    }
  }
  return 'StepFourAll';
}

function isKindStepFourAll<T>(value: KindStepFourAll | T): value is KindStepFourAll {
  switch (value) {
    case 'StepFourAll':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
import type { GenericStepFourPointOneAllSubOptions } from '../build-generic';

export type KindStepFourPointOneAllSub = GenericStepFourPointOneAllSubOptions['kind'];

export function sanitizeKindStepFourPointOneAllSub(kind: unknown): KindStepFourPointOneAllSub {
  if (typeof kind === 'string') {
    if (isKindStepFourPointOneAllSub(kind)) {
      return kind;
    }
  }
  return 'StepFourPointOneAllSub';
}

function isKindStepFourPointOneAllSub<T>(value: KindStepFourPointOneAllSub | T): value is KindStepFourPointOneAllSub {
  switch (value) {
    case 'StepFourPointOneAllSub':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
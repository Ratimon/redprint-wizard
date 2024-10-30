import type { GenericStepFourAllSubOptions } from '../build-generic';

export type KindStepFourAllSub = GenericStepFourAllSubOptions['kind'];

export function sanitizeKindStepFourAllSub(kind: unknown): KindStepFourAllSub {
  if (typeof kind === 'string') {
    if (isKindStepFourAllSub(kind)) {
      return kind;
    }
  }
  return 'StepFourAllSub';
}

function isKindStepFourAllSub<T>(value: KindStepFourAllSub | T): value is KindStepFourAllSub {
  switch (value) {
    case 'StepFourAllSub':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
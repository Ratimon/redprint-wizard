import type { GenericStepThreeAllSubOptions } from '../build-generic';

export type KindStepThreeAllSub = GenericStepThreeAllSubOptions['kind'];

export function sanitizeKindStepThreeAllSub(kind: unknown): KindStepThreeAllSub {
  if (typeof kind === 'string') {
    if (isKindStepThreeAllSub(kind)) {
      return kind;
    }
  }
  return 'StepThreeAllSub';
}

function isKindStepThreeAllSub<T>(value: KindStepThreeAllSub | T): value is KindStepThreeAllSub {
  switch (value) {
    case 'StepThreeAllSub':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
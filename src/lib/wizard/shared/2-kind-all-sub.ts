import type { GenericStepTwoAllSubOptions } from './build-generic';

export type KindStepTwoAllSub = GenericStepTwoAllSubOptions['kind'];

export function sanitizeKindStepTwoAllSub(kind: unknown): KindStepTwoAllSub {
  if (typeof kind === 'string') {
    if (isKindStepTwoAllSub(kind)) {
      return kind;
    }
  }
  return 'StepTwoAllSub';
}

function isKindStepTwoAllSub<T>(value: KindStepTwoAllSub | T): value is KindStepTwoAllSub {
  switch (value) {
    case 'StepTwoAllSub':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
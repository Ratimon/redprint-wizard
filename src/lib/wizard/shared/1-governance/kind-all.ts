import type { GenericStepOneAllOptions } from '../build-generic';

export type KindStepOneAll = GenericStepOneAllOptions['kind'];

export function sanitizeKindStepOneAll(kind: unknown): KindStepOneAll {
  if (typeof kind === 'string') {
    if (isKindStepOneAll(kind)) {
      return kind;
    }
  }
  return 'StepOneAll';
}

function isKindStepOneAll<T>(value: KindStepOneAll | T): value is KindStepOneAll {
  switch (value) {
    case 'StepOneAll':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
import type { GenericAllStepOneOptions } from './build-generic';

export type KindAllStepOne = GenericAllStepOneOptions['kind'];

export function sanitizeKindAllStepOne(kind: unknown): KindAllStepOne {
  if (typeof kind === 'string') {
    if (isKindAllStepOne(kind)) {
      return kind;
    }
  }
  return 'AllStepOne';
}

function isKindAllStepOne<T>(value: KindAllStepOne | T): value is KindAllStepOne {
  switch (value) {
    case 'AllStepOne':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
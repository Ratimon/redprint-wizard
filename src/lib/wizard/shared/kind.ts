import type { GenericOptions, GenericGovernanceOptions, GenericAllStepOneOptions } from './build-generic';

export type Kind = GenericOptions['kind'];

export function sanitizeKind(kind: unknown): Kind {
  if (typeof kind === 'string') {
    if (isKind(kind)) {
      return kind;
    }
  }
  return 'Safe';
}

function isKind<T>(value: Kind | T): value is Kind {
  switch (value) {
    case 'Safe':
      return true;
    case 'Governor':
      return true;
    case 'AllStepOne':
        return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}

export type KindGovernance = GenericGovernanceOptions['kind'];

export function sanitizeKindGovernance(kind: unknown): KindGovernance {
  if (typeof kind === 'string') {
    if (isKindGovernance(kind)) {
      return kind;
    }
  }
  return 'Safe';
}

function isKindGovernance<T>(value: KindGovernance | T): value is KindGovernance {
  switch (value) {
    case 'Safe':
      return true;
    case 'Governor':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}

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
    // case 'StepOne':
    //   return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}


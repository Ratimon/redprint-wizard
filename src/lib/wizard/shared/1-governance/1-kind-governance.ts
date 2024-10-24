import type { GenericGovernanceOptions } from '../build-generic';

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
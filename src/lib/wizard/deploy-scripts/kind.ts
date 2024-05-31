import type { DeployGenericOptions } from './build-generic';

export type DeployKind = DeployGenericOptions['kind'];

export function sanitizeDeployKind(kind: unknown): DeployKind {
  if (typeof kind === 'string') {
    if (isDeployKind(kind)) {
      return kind;
    }
  }
  return 'Safe';
}

function isDeployKind<T>(value: DeployKind | T): value is DeployKind {
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


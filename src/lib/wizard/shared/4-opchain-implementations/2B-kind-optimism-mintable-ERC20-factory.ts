import type { GenericOptimismMintableERC20FactoryOptions } from '../build-generic';

export type KindOptimismMintableERC20Factory = GenericOptimismMintableERC20FactoryOptions['kind'];

export function sanitizeKindOptimismMintableERC20Factory(kind: unknown): KindOptimismMintableERC20Factory {
  if (typeof kind === 'string') {
    if (isKindOptimismMintableERC20Factory(kind)) {
      return kind;
    }
  }
  return 'OptimismMintableERC20Factory';
}

function isKindOptimismMintableERC20Factory<T>(value: KindOptimismMintableERC20Factory | T): value is KindOptimismMintableERC20Factory {
  switch (value) {
    case 'OptimismMintableERC20Factory':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
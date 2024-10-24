import type { GenericOptimismMintableERC20FactoryProxyOptions } from '../build-generic';

export type KindOptimismMintableERC20FactoryProxy = GenericOptimismMintableERC20FactoryProxyOptions['kind'];

export function sanitizeKindOptimismMintableERC20FactoryProxy(kind: unknown): KindOptimismMintableERC20FactoryProxy {
  if (typeof kind === 'string') {
    if (isKindOptimismMintableERC20FactoryProxy(kind)) {
      return kind;
    }
  }
  return 'OptimismMintableERC20FactoryProxy';
}

function isKindOptimismMintableERC20FactoryProxy<T>(value: KindOptimismMintableERC20FactoryProxy | T): value is KindOptimismMintableERC20FactoryProxy {
  switch (value) {
    case 'OptimismMintableERC20FactoryProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
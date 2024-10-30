import type { GenericDisputeGameFactoryProxyOptions } from '../build-generic';

export type KindDisputeGameFactoryProxy = GenericDisputeGameFactoryProxyOptions['kind'];

export function sanitizeKindDisputeGameFactoryProxy(kind: unknown): KindDisputeGameFactoryProxy {
  if (typeof kind === 'string') {
    if (isKindDisputeGameFactoryProxy(kind)) {
      return kind;
    }
  }
  return 'DisputeGameFactoryProxy';
}

function isKindDisputeGameFactoryProxy<T>(value: KindDisputeGameFactoryProxy | T): value is KindDisputeGameFactoryProxy {
  switch (value) {
    case 'DisputeGameFactoryProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
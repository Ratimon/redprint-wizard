import type { GenericDisputeGameFactoryOptions } from '../build-generic';

export type KindDisputeGameFactory = GenericDisputeGameFactoryOptions['kind'];

export function sanitizeKindDisputeGameFactory(kind: unknown): KindDisputeGameFactory {
  if (typeof kind === 'string') {
    if (isKindDisputeGameFactory(kind)) {
      return kind;
    }
  }
  return 'DisputeGameFactory';
}

function isKindDisputeGameFactory<T>(value: KindDisputeGameFactory | T): value is KindDisputeGameFactory {
  switch (value) {
    case 'DisputeGameFactory':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
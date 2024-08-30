import type { GenericProxyAdminOptions } from './build-generic';

export type KindProxyAdmin = GenericProxyAdminOptions['kind'];

export function sanitizeKindProxyAdmin(kind: unknown): KindProxyAdmin {
  if (typeof kind === 'string') {
    if (isKindProxyAdmin(kind)) {
      return kind;
    }
  }
  return 'ProxyAdmin';
}

function isKindProxyAdmin<T>(value: KindProxyAdmin | T): value is KindProxyAdmin {
  switch (value) {
    case 'ProxyAdmin':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
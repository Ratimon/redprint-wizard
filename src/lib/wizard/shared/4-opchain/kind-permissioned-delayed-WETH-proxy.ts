import type { GenericPermissionedDelayedWETHProxyOptions } from '../build-generic';

export type KindPermissionedDelayedWETHProxy = GenericPermissionedDelayedWETHProxyOptions['kind'];

export function sanitizeKindPermissionedDelayedWETHProxy(kind: unknown): KindPermissionedDelayedWETHProxy {
  if (typeof kind === 'string') {
    if (isKindPermissionedDelayedWETHProxy(kind)) {
      return kind;
    }
  }
  return 'PermissionedDelayedWETHProxy';
}

function isKindPermissionedDelayedWETHProxy<T>(value: KindPermissionedDelayedWETHProxy | T): value is KindPermissionedDelayedWETHProxy {
  switch (value) {
    case 'PermissionedDelayedWETHProxy':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
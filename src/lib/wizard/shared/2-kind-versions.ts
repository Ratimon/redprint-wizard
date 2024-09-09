import type { GenericProtocolVersionsOptions } from './build-generic';

export type KindProtocolVersions = GenericProtocolVersionsOptions['kind'];

export function sanitizeKindProtocolVersions(kind: unknown): KindProtocolVersions {
  if (typeof kind === 'string') {
    if (isKindProtocolVersions(kind)) {
      return kind;
    }
  }
  return 'ProtocolVersions';
}

function isKindProtocolVersions<T>(value: KindProtocolVersions | T): value is KindProtocolVersions {
  switch (value) {
    case 'ProtocolVersions':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
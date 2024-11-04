import type { GenericSystemConfigOptions } from '../build-generic';

export type KindSystemConfig = GenericSystemConfigOptions['kind'];

export function sanitizeKindSystemConfig(kind: unknown): KindSystemConfig {
  if (typeof kind === 'string') {
    if (isKindSystemConfig(kind)) {
      return kind;
    }
  }
  return 'SystemConfig';
}

function isKindSystemConfig<T>(value: KindSystemConfig | T): value is KindSystemConfig {
  switch (value) {
    case 'SystemConfig':
      return true;

    default: {
      // Static assert that we've checked all kinds.
      const _: T = value;
      return false;
    }
  }
}
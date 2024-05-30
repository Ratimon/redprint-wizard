
import type { CustomOptions} from './custom';
import { buildCustom } from './custom';
import type { GovernorOptions} from './1-governor';
import { buildGovernor } from './1-governor';
import type { SafeOptions} from './1-safe';
import { buildSafe } from './1-safe';

export interface KindedOptions {
  Safe:  { kind: 'Safe' }  & SafeOptions;
  Governor: { kind: 'Governor' } & GovernorOptions;
  Custom:  { kind: 'Custom' }  & CustomOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];

export function buildContractGeneric(opts: GenericOptions) {
  switch (opts.kind) {

    case 'Safe':
      return buildSafe(opts);

    case 'Governor':
      return buildGovernor(opts);

    case 'Custom':
      return buildCustom(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

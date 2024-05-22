
import type { CustomOptions} from './custom';
import { buildCustom } from './custom';
import type { GovernorOptions} from './governor';
import { buildGovernor } from './governor';

export interface KindedOptions {
  Governor: { kind: 'Governor' } & GovernorOptions;
  Custom:  { kind: 'Custom' }  & CustomOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];

export function buildGeneric(opts: GenericOptions) {
  switch (opts.kind) {

    case 'Governor':
      return buildGovernor(opts);

    case 'Custom':
      return buildCustom(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}


import type { CustomOptions} from './custom';
import { buildCustom } from './custom';
import type { DeployGovernerOptions} from './governor';
import { buildDeployGoverner } from './governor';

export interface KindedOptions {
  Safe: { kind: 'Safe' } & CustomOptions;
  Governor: { kind: 'Governor' } & DeployGovernerOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];

export function buildDeployGeneric(opts: GenericOptions) {
  switch (opts.kind) {

    case 'Safe':
      return buildCustom(opts);

    case 'Governor':
      return buildDeployGoverner(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

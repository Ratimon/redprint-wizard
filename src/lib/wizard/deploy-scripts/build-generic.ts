
import type { DeploySafeOptions} from './1-safe';
import { buildDeploySafe } from './1-safe';
import type { DeployGovernerOptions} from './1-governor';
import { buildDeployGoverner } from './1-governor';

export interface DeployKindedOptions {
  Safe: { kind: 'Safe' } & DeploySafeOptions;
  Governor: { kind: 'Governor' } & DeployGovernerOptions;
}

export type DeployGenericOptions = DeployKindedOptions[keyof DeployKindedOptions];

export function buildDeployGeneric(opts: DeployGenericOptions) {
  switch (opts.kind) {

    case 'Safe':
      return buildDeploySafe(opts);

    case 'Governor':
      return buildDeployGoverner(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

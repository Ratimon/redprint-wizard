import type { SharedSafeOptions} from '../shared/1-shared-safe-option';

import { buildDeploySafe } from './1-safe';
import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';
import { buildDeployGoverner } from './1-governor';


export interface DeployKindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
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

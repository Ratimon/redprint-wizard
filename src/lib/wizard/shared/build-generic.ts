
// import type { DeploySafeOptions} from './1-safe';
import type { SharedSafeOptions} from '../shared/1-shared-safe-option';
import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';


// import { buildDeploySafe } from './1-shared-safe-option';

// import type { DeployGovernerOptions} from '../deploy-scripts/1-governor';
// import { buildDeployGoverner } from '../deploy-scripts/1-governor';

export interface KindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
}

export type GenericOptions = KindedOptions[keyof KindedOptions];

// export function buildDeployGeneric(opts: DeployGenericOptions) {
//   switch (opts.kind) {

//     case 'Safe':
//       return buildDeploySafe(opts);

//     case 'Governor':
//       return buildDeployGoverner(opts);

//     default:
//       const _: never = opts;
//       throw new Error('Unknown Contract');
//   }
// }

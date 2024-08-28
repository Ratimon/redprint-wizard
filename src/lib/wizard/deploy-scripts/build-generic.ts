import type { SharedSafeOptions} from '../shared/1-shared-safe-option';
import { buildDeploySafe } from './1-safe';

import type { SharedGovernerOptions} from '../shared/1-shared-governor-option';
import { buildDeployGoverner } from './1-governor';

import type { SharedAllOptions} from '../shared/1-all-option';
import { buildDeployAllStepOne } from './1-all';

import type { SharedAddressManagerOptions } from '../shared/2-shared-address-manager-option';
import { buildDeployAddressManager } from './2-address-manager';

export interface DeployKindedOptions {
  Safe: { kind: 'Safe' } & SharedSafeOptions;
  Governor: { kind: 'Governor' } & SharedGovernerOptions;
  AllStepOne: {kind: 'AllStepOne'} & SharedAllOptions;
  AddressManager: {kind: 'AddressManager'} & SharedAddressManagerOptions;
}

export type DeployGenericOptions = DeployKindedOptions[keyof DeployKindedOptions];

export function buildDeployGeneric(opts: DeployGenericOptions) {
  switch (opts.kind) {

    case 'Safe':
      return buildDeploySafe(opts);

    case 'Governor':
      return buildDeployGoverner(opts);

    case 'AllStepOne':
      return buildDeployAllStepOne(opts);

    case 'AddressManager':
        return  buildDeployAddressManager(opts);

    default:
      const _: never = opts;
      throw new Error('Unknown Contract');
  }
}

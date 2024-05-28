import type { DeployContract} from './contract';
import {  DeployBuilder } from './contract';
import type { CommonOptions} from './common-options';
import { withCommonDefaults, defaults as commonDefaults } from './common-options';
// import { setUpgradeable } from './set-upgradeable';
import { setInfo } from './set-info';
// import { setAccessControl } from './set-access-control';
// import { addPausable } from './add-pausable';
import { printDeployContract } from './print';

export interface CustomOptions extends CommonOptions {
  name: string;
  pausable?: boolean;
}

export const defaults: Required<CustomOptions> = {
  name: 'MyContract',
  pausable: false,
  // access: commonDefaults.access,
  // upgradeable: commonDefaults.upgradeable,
  info: commonDefaults.info,
} as const;

function withDefaults(opts: CustomOptions): Required<CustomOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    pausable: opts.pausable ?? defaults.pausable,
  };
}

export function printCustom(opts: CustomOptions = defaults): string {
  return printDeployContract(buildCustom(opts));
}

// export function isAccessControlRequired(opts: Partial<CustomOptions>): boolean {
//   return opts.pausable || opts.upgradeable === 'uups';
// }

export function buildCustom(opts: CustomOptions): DeployContract {
  const allOpts = withDefaults(opts);

  const c = new DeployBuilder(allOpts.name);

  const { info } = allOpts;

  // if (allOpts.pausable) {
  //   addPausable(c, access, []);
  // }

  // setAccessControl(c, access);
  // setUpgradeable(c, upgradeable, access);
  setInfo(c, info);

  return c;
}


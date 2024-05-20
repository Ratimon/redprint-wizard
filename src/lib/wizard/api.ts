import type { CommonOptions } from './common-options';
import { printGovernor, defaults as governorDefaults, isAccessControlRequired as governorIsAccessControlRequired, type GovernorOptions } from './governor';
import { printCustom, defaults as customDefaults, isAccessControlRequired as customIsAccessControlRequired, type CustomOptions } from './custom';

export interface WizardContractAPI<Options extends CommonOptions> {
  /**
   * Returns a string representation of a contract generated using the provided options. If opts is not provided, uses `defaults`.
   */
  print: (opts?: Options) => string,
  
  /**
   * The default options that are used for `print`.
   */
  defaults: Required<Options>;

  /**
   * Whether any of the provided options require access control to be enabled. If this returns `true`, then calling `print` with the 
   * same options would cause the `access` option to default to `'ownable'` if it was `undefined` or `false`. 
   */
  isAccessControlRequired: (opts: Partial<Options>) => boolean,
}

export type Governor = WizardContractAPI<GovernorOptions>;
export type Custom = WizardContractAPI<CustomOptions>;


export const governor: Governor = {
  print: printGovernor,
  defaults: governorDefaults,
  isAccessControlRequired: governorIsAccessControlRequired
}
export const custom: Custom = {
  print: printCustom,
  defaults: customDefaults,
  isAccessControlRequired: customIsAccessControlRequired
}
import type { CommonOptions } from './common-options';
import { printDeployGovernor, defaults as governorDefaults, type DeployGovernerOptions } from './governor';
import { printCustom, defaults as customDefaults, type CustomOptions } from './custom';

export interface WizardContractAPI<Options extends CommonOptions> {
  /**
   * Returns a string representation of a contract generated using the provided options. If opts is not provided, uses `defaults`.
   */
  print: (opts?: Options) => string,
  
  /**
   * The default options that are used for `print`.
   */
  defaults: Required<Options>;

}

export type Governor = WizardContractAPI<DeployGovernerOptions>;
export type Custom = WizardContractAPI<CustomOptions>;


export const governor: Governor = {
  print: printDeployGovernor,
  defaults: governorDefaults,
}
export const custom: Custom = {
  print: printCustom,
  defaults: customDefaults,
}
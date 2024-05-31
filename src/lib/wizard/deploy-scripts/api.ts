import type { CommonOptions } from './common-options';
import { printDeployGovernor, defaults as governorDefaults, type DeployGovernerOptions } from './1-governor';
import { printDeploySafe, defaults as safeDefaults, type DeploySafeOptions } from './1-safe';


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
export type Safe = WizardContractAPI<DeploySafeOptions>;


export const governor: Governor = {
  print: printDeployGovernor,
  defaults: governorDefaults,
}

export const safe: Safe = {
  print: printDeploySafe,
  defaults: safeDefaults,
}
import type { CommonOptions} from './common-options';
import { withCommonDefaults, defaults as commonDefaults } from "./common-options";

import type { DeployContract} from './contract';
import { DeployBuilder } from "./contract";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

export const defaults: Required<DeployGovernerOptions> = {
  deployName: 'DeployGovernerScript',

  deployInfo: commonDefaults.deployInfo
} as const;

export function printDeployGovernor(opts: DeployGovernerOptions = defaults): string {
  return printDeployContract(buildDeployGoverner(opts));
}

export interface DeployGovernerOptions extends CommonOptions {
  deployName: string;
  }

export function buildDeployGoverner(opts: DeployGovernerOptions): DeployContract {
    const allOpts = withDeloyDefaults(opts);
  
    const c = new DeployBuilder(allOpts.deployName);
    
    addBase(c);
    setInfo(c, allOpts.deployInfo);
  
    return c;
  }

  function withDeloyDefaults(opts: DeployGovernerOptions): Required<DeployGovernerOptions> {
    return {
      ...opts,
      ...withCommonDefaults(opts),
    };
  }

  function addBase(c: DeployBuilder) {

    const DeployFunctions = {
      name: 'DeployerFunctions',
      path: '@script-5_0_2/deployer/DeployerFunctions.sol',
    };

    c.addLibrary(DeployFunctions, `IDeployer`);

    const DeployScript = {
      name: 'DeployScript',
      path: '@redprint-core/deployer/DeployScript.sol',
    };

    c.addParent(DeployScript, []);

  }

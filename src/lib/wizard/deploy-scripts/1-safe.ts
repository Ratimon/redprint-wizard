

import type { DeployContract} from './contract';
import { DeployBuilder } from "./contract";
import type { CommonOptions} from './common-options';
import { withCommonDefaults, defaults as commonDefaults } from "./common-options";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";


export interface DeploySafeOptions extends CommonOptions {
    deployName: string;
  }

export const defaults: Required<DeploySafeOptions> = {
  deployName: 'DeploySafeProxy',

  info: commonDefaults.info
} as const;

function withDeployDefaults(opts: DeploySafeOptions): Required<DeploySafeOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts)
  };
}

export function printDeploySafe(opts: DeploySafeOptions = defaults): string {
  return printDeployContract(buildDeploySafe(opts));
}

export function buildDeploySafe(opts: DeploySafeOptions): DeployContract {
    const allOpts = withDeployDefaults(opts);
  
    const c = new DeployBuilder(allOpts.deployName);
    
    addBase(c, allOpts);
    setInfo(c, allOpts.info);
  
    return c;
  }


  function addBase(c: DeployBuilder, { deployName }: DeploySafeOptions) {
    // import {DeployerFunctions} from "@script-5_0_2/deployer/DeployerFunctions.sol";

    const DeployFunctions = {
      name: 'DeployerFunctions',
      path: '@script-5_0_2/deployer/DeployerFunctions.sol',
    };
    c.addLibrary(DeployFunctions, `IDeployer`);

    const DeployScript = {
      name: 'DeployScript',
      path: '@redprint-core/deployer/DeployScript.sol',
    };
    c.addParent(DeployScript, [deployName]);
  }
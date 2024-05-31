

import type { DeployContract} from './contract';
import { DeployBuilder } from "./contract";
import type { CommonOptions} from './common-options';
import { withCommonDefaults, defaults as commonDefaults } from "./common-options";

import { printDeployContract } from "./print";
import { setInfo } from "./set-info";


export interface DeploySafeOptions extends CommonOptions {
    name: string;
  }

export const defaults: Required<DeploySafeOptions> = {
  name: 'DeploySafeProxy',

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
  
    const c = new DeployBuilder(allOpts.name);
  
    // validateDecimals(allOpts.decimals);
  
    addBase(c, allOpts);
    // addSettings(c, allOpts);
    // addCounting(c);
    // addStorage(c, allOpts);
    // addVotes(c);
    // addQuorum(c, allOpts);
    // addTimelock(c, allOpts);
  
    // setAccessControl(c, allOpts.access);
    // setUpgradeable(c, allOpts.upgradeable, allOpts.access);
    setInfo(c, allOpts.info);
  
    return c;
  }


  function addBase(c: DeployBuilder, { name }: DeploySafeOptions) {
    const DeployScript = {
      name: 'DeployScript',
      path: '@redprint-core/deployer/DeployScript.sol',
    };


    c.addParent(DeployScript, [name]);
    // c.addOverride(Governor, functions.votingDelay);
    // c.addOverride(Governor, functions.votingPeriod);
    // c.addOverride(Governor, functions.quorum);
    // c.addOverride(Governor, functions.state);
    // c.addOverride(Governor, functions.propose);
    // c.addOverride(Governor, functions.proposalNeedsQueuing);
    // c.addOverride(Governor, functions.proposalThreshold);
    // c.addOverride(Governor, functions._propose);
    // c.addOverride(Governor, functions._queueOperations);
    // c.addOverride(Governor, functions._executeOperations);
    // c.addOverride(Governor, functions._cancel);
    // c.addOverride(Governor, functions._executor);
    // c.addOverride(Governor, supportsInterface);
  }

import type { CommonOptions} from './common-options';

import type { DeployContract} from './contract';
import { withCommonDefaults, defaults as commonDefaults } from "./common-options";

import { DeployBuilder } from "./contract";
import { printDeployContract } from "./print";
import { setInfo } from "./set-info";

export const defaults: Required<DeployGovernerOptions> = {
  deployName: 'DeployGovernerScript',

  info: commonDefaults.info
} as const;

export function printDeployGovernor(opts: DeployGovernerOptions = defaults): string {
  return printDeployContract(buildDeployGoverner(opts));
}



export interface DeployGovernerOptions extends CommonOptions {
  deployName: string;
    // delay: string;
    // period: string;
    // blockTime?: number;
    // proposalThreshold?: string;
    // decimals?: number;
    // quorumMode?: 'percent' | 'absolute';
    // quorumPercent?: number;
    // quorumAbsolute?: string;
    // storage?: boolean;
    // settings?: boolean;
  }

export function buildDeployGoverner(opts: DeployGovernerOptions): DeployContract {
    const allOpts = withDeloyDefaults(opts);
  
    const c = new DeployBuilder(allOpts.deployName);
  
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

  function withDeloyDefaults(opts: DeployGovernerOptions): Required<DeployGovernerOptions> {
    return {
      ...opts,
      ...withCommonDefaults(opts),
      // decimals: opts.decimals ?? defaults.decimals,
      // blockTime: opts.blockTime || defaults.blockTime,
      // quorumPercent: opts.quorumPercent ?? defaults.quorumPercent,
      // quorumAbsolute: opts.quorumAbsolute ?? defaults.quorumAbsolute,
      // proposalThreshold: opts.proposalThreshold || defaults.proposalThreshold,
      // settings: opts.settings ?? defaults.settings,
      // storage: opts.storage ?? defaults.storage,
      // quorumMode: opts.quorumMode ?? defaults.quorumMode,
      // votes: opts.votes ?? defaults.votes,
      // timelock: opts.timelock ?? defaults.timelock
    };
  }

  function addBase(c: DeployBuilder, { deployName }: DeployGovernerOptions) {
    const DeployScript = {
      name: 'DeployScript',
      path: '@redprint-core/deployer/DeployScript.sol',
    };


    c.addLibrary(DeployScript, `IDeployer`);

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

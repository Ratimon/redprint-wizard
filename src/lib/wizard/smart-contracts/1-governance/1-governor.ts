import { supportsInterface } from "../common-functions";

import type { SharedGovernerOptions} from '../../shared/1-governance/1-option-governor';
import { withCommonDefaults, defaults as commonDefaults } from "../../shared/1-governance/1-option-governor";

import type { Contract} from '../contract';
import { ContractBuilder } from "../contract";
import { OptionsError } from "../../shared/error";
import { setAccessControl } from "../set-access-control";
import { printContract } from "../print";
import { setInfo } from "../set-info";
import { setUpgradeable } from "../set-upgradeable";
import { defineFunctions } from '../../utils/define-functions';
import { durationToBlocks } from "../../utils/duration";

export const votesOptions = ['erc20votes', 'erc721votes'] as const;
export type VotesOptions = typeof votesOptions[number];

export const timelockOptions = [false, 'openzeppelin', 'compound'] as const;
export type TimelockOptions = typeof timelockOptions[number];

export function printGovernor(opts: SharedGovernerOptions = commonDefaults): string {
  return printContract(buildGovernor(opts));
}

export function isAccessControlRequired(opts: Partial<SharedGovernerOptions>): boolean {
  return opts.upgradeable === 'uups';
}

function withDefaults(opts: SharedGovernerOptions): Required<SharedGovernerOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
    decimals: opts.decimals ?? commonDefaults.decimals,
    blockTime: opts.blockTime || commonDefaults.blockTime,
    quorumPercent: opts.quorumPercent ?? commonDefaults.quorumPercent,
    quorumAbsolute: opts.quorumAbsolute ?? commonDefaults.quorumAbsolute,
    proposalThreshold: opts.proposalThreshold || commonDefaults.proposalThreshold,
    settings: opts.settings ?? commonDefaults.settings,
    storage: opts.storage ?? commonDefaults.storage,
    quorumMode: opts.quorumMode ?? commonDefaults.quorumMode,
    votes: opts.votes ?? commonDefaults.votes,
    timelock: opts.timelock ?? commonDefaults.timelock
  };
}

export function buildGovernor(opts: SharedGovernerOptions): Contract {
  const allOpts = withDefaults(opts);

  const c = new ContractBuilder(allOpts.contractName);

  validateDecimals(allOpts.decimals);

  addBase(c, allOpts);
  addSettings(c, allOpts);
  addCounting(c);
  addStorage(c, allOpts);
  addVotes(c);
  addQuorum(c, allOpts);
  addTimelock(c, allOpts);

  setAccessControl(c, allOpts.access);
  
  setUpgradeable(c, allOpts.upgradeable, allOpts.access);

  setInfo(c, allOpts.contractInfo);

  return c;
}

function addBase(c: ContractBuilder, { contractName }: SharedGovernerOptions) {
  const Governor = {
    name: 'Governor',
    path: '@openzeppelin/contracts/governance/Governor.sol',
  };
  c.addParent(Governor, [contractName]);

  c.addOverride(Governor, functions.votingDelay);
  c.addOverride(Governor, functions.votingPeriod);
  c.addOverride(Governor, functions.quorum);
  c.addOverride(Governor, functions.state);
  c.addOverride(Governor, functions.propose);
  c.addOverride(Governor, functions.proposalNeedsQueuing);
  c.addOverride(Governor, functions.proposalThreshold);
  c.addOverride(Governor, functions._propose);
  c.addOverride(Governor, functions._queueOperations);
  c.addOverride(Governor, functions._executeOperations);
  c.addOverride(Governor, functions._cancel);
  c.addOverride(Governor, functions._executor);
  c.addOverride(Governor, supportsInterface);
}

function addSettings(c: ContractBuilder, allOpts: Required<SharedGovernerOptions>) {
  if (allOpts.settings) {
    const GovernorSettings = {
      name: 'GovernorSettings',
      path: '@openzeppelin/contracts/governance/extensions/GovernorSettings.sol',
    };
    c.addParent(
      GovernorSettings,
      [
        getVotingDelay(allOpts) ,
        getVotingPeriod(allOpts) ,
        { lit: getProposalThreshold(allOpts) },
      ],
    );
    c.addOverride(GovernorSettings, functions.votingDelay, 'view');
    c.addOverride(GovernorSettings, functions.votingPeriod, 'view');
    c.addOverride(GovernorSettings, functions.proposalThreshold, 'view');
  } else {
    setVotingParameters(c, allOpts);
    setProposalThreshold(c, allOpts);
  }
}

function getVotingDelay(opts: Required<SharedGovernerOptions>): number {
  try {
    return durationToBlocks(opts.delay, opts.blockTime);
  } catch (e) {
    if (e instanceof Error) {
      throw new OptionsError({
        delay: e.message,
      });
    } else {
      throw e;
    }
  }
}

function getVotingPeriod(opts: Required<SharedGovernerOptions>): number {
  try {
    return durationToBlocks(opts.period, opts.blockTime);
  } catch (e) {
    if (e instanceof Error) {
      throw new OptionsError({
        period: e.message,
      });
    } else {
      throw e;
    }
  }
}

function validateDecimals(decimals: number) {
  if (!/^\d+$/.test(decimals.toString())) {
    throw new OptionsError({
      decimals: 'Not a valid number',
    });
  }
}

function getProposalThreshold({ proposalThreshold, decimals, votes }: Required<SharedGovernerOptions>): string {
  if (!/^\d+$/.test(proposalThreshold)) {
    throw new OptionsError({
      proposalThreshold: 'Not a valid number',
    });
  }

  if (/^0+$/.test(proposalThreshold) || decimals === 0 || votes === 'erc721votes') {
    return proposalThreshold;
  } else {
    return `${proposalThreshold}e${decimals}`;
  }
}

function setVotingParameters(c: ContractBuilder, opts: Required<SharedGovernerOptions>) {
  const delayBlocks = getVotingDelay(opts);
  c.setFunctionBody([`return ${delayBlocks}; // ${opts.delay}`], functions.votingDelay);

  const periodBlocks = getVotingPeriod(opts);
  c.setFunctionBody([`return ${periodBlocks}; // ${opts.period}`], functions.votingPeriod);
}

function setProposalThreshold(c: ContractBuilder, opts: Required<SharedGovernerOptions>) {
  const threshold = getProposalThreshold(opts);
  const nonZeroThreshold = parseInt(threshold) !== 0;

  if (nonZeroThreshold) {
    c.setFunctionBody([`return ${threshold};`], functions.proposalThreshold);
  }
}

function addCounting(c: ContractBuilder) {
  c.addParent({
    name: 'GovernorCountingSimple',
    path: '@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol',
  });
}

function addVotes(c: ContractBuilder) {
  const tokenArg = '_token';

  c.addConstructorArgument({
    type: {
      name: 'IVotes',
      transpiled: false,
    },
    name: tokenArg,
  });

  c.addParent({
    name: 'GovernorVotes',
    path: `@openzeppelin/contracts/governance/extensions/GovernorVotes.sol`,
  }, [{ lit: tokenArg }]);

  const IVotes = {
    name: 'IVotes',
    path: '@openzeppelin/contracts/governance/extensions/GovernorVotes.sol',
  };

  c.addImportOnly(IVotes);
  
}

export const numberPattern = /^(?!$)(\d*)(?:\.(\d+))?(?:e(\d+))?$/;

function addQuorum(c: ContractBuilder, opts: Required<SharedGovernerOptions>) {
  if (opts.quorumMode === 'percent') {
    if (opts.quorumPercent > 100) {
      throw new OptionsError({
        quorumPercent: 'Invalid percentage',
      });
    }

    let { quorumFractionNumerator, quorumFractionDenominator } = getQuorumFractionComponents(opts.quorumPercent);

    const GovernorVotesQuorumFraction = {
      name: 'GovernorVotesQuorumFraction',
      path: '@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol',
    };

    if (quorumFractionDenominator !== undefined) {
      c.addOverride(GovernorVotesQuorumFraction, functions.quorumDenominator);
      c.setFunctionBody([
        `return ${quorumFractionDenominator};`
      ], functions.quorumDenominator, 'pure');
    }

    c.addParent(GovernorVotesQuorumFraction, [quorumFractionNumerator]);
    c.addOverride(GovernorVotesQuorumFraction, functions.quorum);
  }

  else if (opts.quorumMode === 'absolute') {
    if (!numberPattern.test(opts.quorumAbsolute)) {
      throw new OptionsError({
        quorumAbsolute: 'Not a valid number',
      });
    }

    let returnStatement = (opts.decimals === 0 || opts.votes === 'erc721votes') ? 
      `return ${opts.quorumAbsolute};` :
      `return ${opts.quorumAbsolute}e${opts.decimals};`;

    c.setFunctionBody([
      returnStatement,
    ], functions.quorum, 'pure');
  }
}

const timelockModules = {
  openzeppelin: {
    timelockType: {
      name: 'TimelockController',
    },
    timelockParent: {
      name: 'GovernorTimelockControl',
      path: `@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol`,
    }
  },
  compound: {
    timelockType: {
      name: 'ICompoundTimelock',
      transpiled: false,
    },
    timelockParent: {
      name: 'GovernorTimelockCompound',
      path: `@openzeppelin/contracts/governance/extensions/GovernorTimelockCompound.sol`,
    }
  },
} as const;

function getQuorumFractionComponents(quorumPercent: number): {quorumFractionNumerator: number, quorumFractionDenominator: string | undefined} {
  let quorumFractionNumerator = quorumPercent;
  let quorumFractionDenominator = undefined;

  const quorumPercentSegments = quorumPercent.toString().split(".");
  if (quorumPercentSegments.length > 2) {
    throw new OptionsError({
      quorumPercent: 'Invalid percentage',
    });
  } else if (quorumPercentSegments.length == 2 && quorumPercentSegments[0] !== undefined && quorumPercentSegments[1] !== undefined) {
    quorumFractionNumerator = parseInt(quorumPercentSegments[0].concat(quorumPercentSegments[1]));
    const decimals = quorumPercentSegments[1].length;
    quorumFractionDenominator = '100';
    while (quorumFractionDenominator.length < decimals + 3) {
      quorumFractionDenominator += '0';
    }
  }
  return { quorumFractionNumerator, quorumFractionDenominator };
}

function addTimelock(c: ContractBuilder, { timelock }: Required<SharedGovernerOptions>) {
  if (timelock === false) {
    return;
  }

  const timelockArg = '_timelock';
  const { timelockType, timelockParent } = timelockModules[timelock];

  c.addConstructorArgument({
    type: timelockType,
    name: timelockArg,
  });

  c.addParent(timelockParent, [{ lit: timelockArg }]);
  c.addOverride(timelockParent, functions._queueOperations);
  c.addOverride(timelockParent, functions._executeOperations);
  c.addOverride(timelockParent, functions._cancel);
  c.addOverride(timelockParent, functions._executor);
  c.addOverride(timelockParent, functions.state);
  c.addOverride(timelockParent, functions.proposalNeedsQueuing);


  const TimelockController = {
    name: timelockType.name,
    path: timelockParent.path,
  };

  c.addImportOnly(TimelockController);
}

function addStorage(c: ContractBuilder, { storage }: SharedGovernerOptions) {
  if (storage) {
    const GovernorStorage = {
      name: 'GovernorStorage',
      path: '@openzeppelin/contracts/governance/extensions/GovernorStorage.sol',
    };
    c.addParent(GovernorStorage);
    c.addOverride(GovernorStorage, functions._propose);
  }
}

const functions = defineFunctions({
  votingDelay: {
    args: [],
    returns: ['uint256'],
    kind: 'public',
    mutability: 'pure',
  },
  votingPeriod: {
    args: [],
    returns: ['uint256'],
    kind: 'public',
    mutability: 'pure',
  },
  proposalThreshold: {
    args: [],
    returns: ['uint256'],
    kind: 'public',
    mutability: 'pure',
  },
  proposalNeedsQueuing: {
    args: [
      { name: 'proposalId', type: 'uint256' },
    ],
    returns: ['bool'],
    kind: 'public',
    mutability: 'view',
  },
  quorum: {
    args: [
      { name: 'blockNumber', type: 'uint256' },
    ],
    returns: ['uint256'],
    kind: 'public',
    mutability: 'view',
  },
  quorumDenominator: {
    args: [],
    returns: ['uint256'],
    kind: 'public',
    mutability: 'view',
  },
  propose: {
    args: [
      { name: 'targets', type: 'address[] memory' },
      { name: 'values', type: 'uint256[] memory' },
      { name: 'calldatas', type: 'bytes[] memory' },
      { name: 'description', type: 'string memory' },
    ],
    returns: ['uint256'],
    kind: 'public',
  },
  _propose: {
    args: [
      { name: 'targets', type: 'address[] memory' },
      { name: 'values', type: 'uint256[] memory' },
      { name: 'calldatas', type: 'bytes[] memory' },
      { name: 'description', type: 'string memory' },
      { name: 'proposer', type: 'address' },
    ],
    returns: ['uint256'],
    kind: 'internal',
  },
  _queueOperations: {
    args: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'targets', type: 'address[] memory' },
      { name: 'values', type: 'uint256[] memory' },
      { name: 'calldatas', type: 'bytes[] memory' },
      { name: 'descriptionHash', type: 'bytes32' },
    ],
    kind: 'internal',
    returns: ['uint48'],
  },
  _executeOperations: {
    args: [
      { name: 'proposalId', type: 'uint256' },
      { name: 'targets', type: 'address[] memory' },
      { name: 'values', type: 'uint256[] memory' },
      { name: 'calldatas', type: 'bytes[] memory' },
      { name: 'descriptionHash', type: 'bytes32' },
    ],
    kind: 'internal',
  },
  _cancel: {
    args: [
      { name: 'targets', type: 'address[] memory' },
      { name: 'values', type: 'uint256[] memory' },
      { name: 'calldatas', type: 'bytes[] memory' },
      { name: 'descriptionHash', type: 'bytes32' },
    ],
    returns: ['uint256'],
    kind: 'internal',
  },
  state: {
    args: [
      { name: 'proposalId', type: 'uint256' },
    ],
    returns: ['ProposalState'],
    kind: 'public',
    mutability: 'view',
  },
  _executor: {
    args: [],
    returns: ['address'],
    kind: 'internal',
    mutability: 'view',
  },
});

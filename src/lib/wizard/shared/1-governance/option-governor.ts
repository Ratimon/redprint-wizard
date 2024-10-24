import type { CommonOptions} from '../common-options';
import { defaults as infoDefaults } from "../set-info";

export const votesOptions = ['erc20votes', 'erc721votes'] as const;
export type VotesOptions = typeof votesOptions[number];

export const timelockOptions = [false, 'openzeppelin', 'compound'] as const;
export type TimelockOptions = typeof timelockOptions[number];

export const commonDefaults: Required<CommonOptions> = {
  access: false,
  upgradeable: false,
  contractInfo: infoDefaults,

  deployInfo: infoDefaults,
} as const;

export function withCommonDefaults(opts: SharedGovernerOptions): Required<SharedGovernerOptions> {
  return {
    access: opts.access ?? false,
    upgradeable: opts.upgradeable ?? false,
    contractInfo: opts.contractInfo ?? {},

    deployInfo: opts.deployInfo ?? {},

    ...opts,
    // ...withCommonDefaults(opts),

    decimals: opts.decimals ?? defaults.decimals,
    blockTime: opts.blockTime || defaults.blockTime,
    quorumPercent: opts.quorumPercent ?? defaults.quorumPercent,
    quorumAbsolute: opts.quorumAbsolute ?? defaults.quorumAbsolute,
    proposalThreshold: opts.proposalThreshold || defaults.proposalThreshold,
    settings: opts.settings ?? defaults.settings,
    storage: opts.storage ?? defaults.storage,
    quorumMode: opts.quorumMode ?? defaults.quorumMode,
    votes: opts.votes ?? defaults.votes,
    timelock: opts.timelock ?? defaults.timelock

  };
}

export const defaults: Required<SharedGovernerOptions> = {
  //contract
  contractName: 'MyGovernor',
  delay: '1 day',
  period: '1 week',

  votes: 'erc20votes',
  timelock: 'openzeppelin',
  blockTime: 12,
  decimals: 18,
  proposalThreshold: '0',
  quorumMode: 'percent',
  quorumPercent: 4,
  quorumAbsolute: '',
  storage: false,
  settings: true,

  access: commonDefaults.access,
  upgradeable: commonDefaults.upgradeable,
  contractInfo: commonDefaults.contractInfo,
  
  //deploy
  deployName: 'DeployGovernerScript',

  deployInfo: commonDefaults.deployInfo
} as const;


export interface SharedGovernerOptions extends CommonOptions {

  contractName: string;
  delay: string;
  period: string;
  blockTime?: number;
  proposalThreshold?: string;
  decimals?: number;
  quorumMode?: 'percent' | 'absolute';
  quorumPercent?: number;
  quorumAbsolute?: string;
  votes?: VotesOptions;
  timelock?: TimelockOptions;
  storage?: boolean;
  settings?: boolean;

  deployName: string;
}
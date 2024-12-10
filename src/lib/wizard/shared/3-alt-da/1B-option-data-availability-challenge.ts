import type { CommonOptions} from '../common-options';
import { defaults as infoDefaults } from "../set-info";

export const opSecOptions = [false, 'address', 'key', 'mnemonic'] as const;
export type OpSec = typeof opSecOptions[number];

export const commonDefaults: Required<CommonOptions> = {
  //contract
  access: false,
  upgradeable: false,
  contractInfo: infoDefaults,

  //deploy
  deployInfo: infoDefaults,
} as const;


export function withCommonDefaults(opts: CommonOptions): Required<CommonOptions> {
  return {
    access: opts.access ?? false,
    upgradeable: opts.upgradeable ?? false,
    contractInfo: opts.contractInfo ?? {},
    
    deployInfo: opts.deployInfo ?? {},
  };
}

export const defaults: Required<SharedDataAvailabilityChallengeOptions> = {
  //contract
  contractName: 'DataAvailabilityChallenge',
  
  access: commonDefaults.access,
  upgradeable: commonDefaults.upgradeable,
  contractInfo: commonDefaults.contractInfo,

  //deploy
  deployName: 'DeployAndInitializeDataAvailabilityChallengeScript',
  deployInfo: commonDefaults.deployInfo,
  opSec: 'mnemonic',

} as const;


export interface SharedDataAvailabilityChallengeOptions extends CommonOptions {
  contractName: string;

  deployName: string;
  opSec: OpSec;
}
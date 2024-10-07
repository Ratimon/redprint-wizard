import type { CommonOptions} from './common-options';
import { defaults as infoDefaults } from "./set-info";

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

export const defaults: Required<SharedPermissionedDelayedWETHProxyOptions> = {
  //contract
  contractName: 'Proxy',
  
  access: commonDefaults.access,
  upgradeable: commonDefaults.upgradeable,
  contractInfo: commonDefaults.contractInfo,

  //deploy
  deployName: 'DeployPermissionedDelayedWETHProxy',

  deployInfo: commonDefaults.deployInfo,
} as const;


export interface SharedPermissionedDelayedWETHProxyOptions extends CommonOptions {
  contractName: string;

  deployName: string;
}
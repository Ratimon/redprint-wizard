import type { BaseModifier, Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1C-option-l1-standard-bridge-proxy';
import type { SharedL1StandardBridgeProxyOptions } from '../../shared/4-opchain-proxies/1C-option-l1-standard-bridge-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildL1ChugSplashProxy } from './proxy/l1-chug-splash-proxy';

function withDefaults(opts: SharedL1StandardBridgeProxyOptions): Required<SharedL1StandardBridgeProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}


export function printL1StandardBridgeProxy(opts: SharedL1StandardBridgeProxyOptions = commonDefaults): string {
  return printContract(buildL1StandardBridgeProxy(opts));
}

export function buildL1StandardBridgeProxy(opts: SharedL1StandardBridgeProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildL1ChugSplashProxy(c);
        
    setInfo(c, allOpts.contractInfo);
    return c;
}
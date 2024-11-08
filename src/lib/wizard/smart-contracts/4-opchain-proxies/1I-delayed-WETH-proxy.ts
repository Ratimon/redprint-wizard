import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1I-option-delayed-WETH-proxy';
import type { SharedDelayedWETHProxyOptions } from '../../shared/4-opchain-proxies/1I-option-delayed-WETH-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';

function withDefaults(opts: SharedDelayedWETHProxyOptions): Required<SharedDelayedWETHProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printDelayedWETHProxy(opts: SharedDelayedWETHProxyOptions = commonDefaults): string {
  return printContract(buildDelayedWETHProxy(opts));
}

export function buildDelayedWETHProxy(opts: SharedDelayedWETHProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}

function getProxyCallIfNotAdminModifier() {
    const mod = {
      name: 'proxyCallIfNotAdmin',
      args: [],
    };
  
    return mod;
  }
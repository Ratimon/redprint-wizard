import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1G-option-dispute-game-factory-proxy';
import type { SharedDisputeGameFactoryProxyOptions } from '../../shared/4-opchain-proxies/1G-option-dispute-game-factory-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';

function withDefaults(opts: SharedDisputeGameFactoryProxyOptions): Required<SharedDisputeGameFactoryProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printDisputeGameFactoryProxy(opts: SharedDisputeGameFactoryProxyOptions = commonDefaults): string {
  return printContract(buildDisputeGameFactoryProxy(opts));
}

export function buildDisputeGameFactoryProxy(opts: SharedDisputeGameFactoryProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1K-option-anchor-state-registry-proxy';
import type { SharedAnchorStateRegistryProxyOptions } from '../../shared/4-opchain-proxies/1K-option-anchor-state-registry-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';

function withDefaults(opts: SharedAnchorStateRegistryProxyOptions): Required<SharedAnchorStateRegistryProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printAnchorStateRegistryProxy(opts: SharedAnchorStateRegistryProxyOptions = commonDefaults): string {
  return printContract(buildAnchorStateRegistryProxy(opts));
}

export function buildAnchorStateRegistryProxy(opts: SharedAnchorStateRegistryProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
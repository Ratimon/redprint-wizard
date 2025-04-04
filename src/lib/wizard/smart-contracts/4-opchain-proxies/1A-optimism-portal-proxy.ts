import type { Contract } from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1A-option-optimism-portal-proxy';
import type { SharedOptimismPortalProxyOptions } from '../../shared/4-opchain-proxies/1A-option-optimism-portal-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';

function withDefaults(opts: SharedOptimismPortalProxyOptions): Required<SharedOptimismPortalProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printOptimismPortalProxy(opts: SharedOptimismPortalProxyOptions = commonDefaults): string {
  return printContract(buildOptimismPortalProxy(opts));
}

export function buildOptimismPortalProxy(opts: SharedOptimismPortalProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
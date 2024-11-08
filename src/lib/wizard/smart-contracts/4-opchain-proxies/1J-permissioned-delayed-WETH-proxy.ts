import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1J-option-permissioned-delayed-WETH-proxy';
import type { SharedPermissionedDelayedWETHProxyOptions } from '../../shared/4-opchain-proxies/1J-option-permissioned-delayed-WETH-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';

function withDefaults(opts: SharedPermissionedDelayedWETHProxyOptions): Required<SharedPermissionedDelayedWETHProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printPermissionedDelayedWETHProxy(opts: SharedPermissionedDelayedWETHProxyOptions = commonDefaults): string {
  return printContract(buildPermissionedDelayedWETHProxy(opts));
}

export function buildPermissionedDelayedWETHProxy(opts: SharedPermissionedDelayedWETHProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
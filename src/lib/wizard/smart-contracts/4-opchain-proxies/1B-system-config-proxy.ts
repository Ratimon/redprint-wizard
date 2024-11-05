import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1B-option-system-config-proxy';
import type { SharedSystemConfigProxyOptions } from '../../shared/4-opchain-proxies/1B-option-system-config-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from './proxy/proxy';

function withDefaults(opts: SharedSystemConfigProxyOptions): Required<SharedSystemConfigProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printSystemConfigProxy(opts: SharedSystemConfigProxyOptions = commonDefaults): string {
  return printContract(buildSystemConfigProxy(opts));
}

export function buildSystemConfigProxy(opts: SharedSystemConfigProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
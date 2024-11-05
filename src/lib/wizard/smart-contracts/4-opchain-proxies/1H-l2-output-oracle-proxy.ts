import type {  Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';
import type { SharedL2OutputOracleProxyOptions } from '../../shared/4-opchain-proxies/1H-option-l2-output-oracle-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from './proxy/proxy';

function withDefaults(opts: SharedL2OutputOracleProxyOptions): Required<SharedL2OutputOracleProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printL2OutputOracleProxy(opts: SharedL2OutputOracleProxyOptions = commonDefaults): string {
  return printContract(buildL2OutputOracleProxy(opts));
}

export function buildL2OutputOracleProxy(opts: SharedL2OutputOracleProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
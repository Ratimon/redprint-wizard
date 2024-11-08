import type { BaseModifier, Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/2-superchain/3A-option-versions-proxy";
import type { SharedProtocolVersionsProxyOptions } from '../../shared/2-superchain/3A-option-versions-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';

function withDefaults(opts: SharedProtocolVersionsProxyOptions): Required<SharedProtocolVersionsProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printProtocolVersionsProxy(opts: SharedProtocolVersionsProxyOptions = commonDefaults): string {
  return printContract(buildProtocolVersionsProxy(opts));
}

export function buildProtocolVersionsProxy(opts: SharedProtocolVersionsProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
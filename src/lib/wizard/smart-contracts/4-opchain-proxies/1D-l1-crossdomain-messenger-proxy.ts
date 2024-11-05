import type { BaseModifier, Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';
import type { SharedL1CrossDomainMessengerProxyOptions } from '../../shared/4-opchain-proxies/1D-option-l1-crossdomain-messenger-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildResolvedDelegateProxy } from './proxy/resolved-delegate-proxy';

function withDefaults(opts: SharedL1CrossDomainMessengerProxyOptions): Required<SharedL1CrossDomainMessengerProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}


export function printL1CrossDomainMessengerProxy(opts: SharedL1CrossDomainMessengerProxyOptions = commonDefaults): string {
  return printContract(buildL1CrossDomainMessengerProxy(opts));
}

export function buildL1CrossDomainMessengerProxy(opts: SharedL1CrossDomainMessengerProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildResolvedDelegateProxy(c);
    
    setInfo(c, allOpts.contractInfo);
    return c;
}
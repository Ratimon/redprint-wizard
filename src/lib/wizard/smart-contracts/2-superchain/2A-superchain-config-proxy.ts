import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/2-superchain/2A-option-superchain-config-proxy";
import type { SharedSuperchainConfigProxyOptions } from '../../shared/2-superchain/2A-option-superchain-config-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';


function withDefaults(opts: SharedSuperchainConfigProxyOptions): Required<SharedSuperchainConfigProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printSuperchainConfigProxy(opts: SharedSuperchainConfigProxyOptions = commonDefaults): string {
  return printContract(buildSuperchainConfigProxy(opts));
}

export function buildSuperchainConfigProxy(opts: SharedSuperchainConfigProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
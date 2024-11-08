import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';
import type { SharedL1ERC721BridgeProxyOptions } from '../../shared/4-opchain-proxies/1F-option-l1-ERC721-bridge-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';

function withDefaults(opts: SharedL1ERC721BridgeProxyOptions): Required<SharedL1ERC721BridgeProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printL1ERC721BridgeProxy(opts: SharedL1ERC721BridgeProxyOptions = commonDefaults): string {
  return printContract(buildL1ERC721BridgeProxy(opts));
}

export function buildL1ERC721BridgeProxy(opts: SharedL1ERC721BridgeProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
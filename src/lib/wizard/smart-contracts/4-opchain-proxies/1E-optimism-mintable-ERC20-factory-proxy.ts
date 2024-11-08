import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from '../../shared/4-opchain-proxies/1E-option-optimism-mintable-ERC20-factory-proxy';
import type { SharedOptimismMintableERC20FactoryProxyOptions } from '../../shared/4-opchain-proxies/1E-option-optimism-mintable-ERC20-factory-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';

function withDefaults(opts: SharedOptimismMintableERC20FactoryProxyOptions): Required<SharedOptimismMintableERC20FactoryProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printOptimismMintableERC20FactoryProxy(opts: SharedOptimismMintableERC20FactoryProxyOptions = commonDefaults): string {
  return printContract(buildOptimismMintableERC20FactoryProxy(opts));
}

export function buildOptimismMintableERC20FactoryProxy(opts: SharedOptimismMintableERC20FactoryProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}

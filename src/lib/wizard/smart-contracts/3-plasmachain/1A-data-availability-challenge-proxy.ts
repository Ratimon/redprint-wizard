import type { Contract} from '../contract';
import {  ContractBuilder } from '../contract';

import { withCommonDefaults, defaults as commonDefaults } from "../../shared/3-plasmachain/1A-option-data-availability-challenge-proxy";
import type { SharedDataAvailabilityChallengeProxyOptions } from '../../shared/3-plasmachain/1A-option-data-availability-challenge-proxy';

import { printContract } from "../print";
import { setInfo  } from "../set-info";

import { buildProxy } from '../proxy/proxy';


function withDefaults(opts: SharedDataAvailabilityChallengeProxyOptions): Required<SharedDataAvailabilityChallengeProxyOptions> {
  return {
    ...opts,
    ...withCommonDefaults(opts),
  };
}

export function printDataAvailabilityChallengeProxy(opts: SharedDataAvailabilityChallengeProxyOptions = commonDefaults): string {
  return printContract(buildDataAvailabilityChallengeProxy(opts));
}

export function buildDataAvailabilityChallengeProxy(opts: SharedDataAvailabilityChallengeProxyOptions): Contract {
    const allOpts = withDefaults(opts);
    // to do add interface
    // to do add note to highlight diff in op mono repo
    const c = new ContractBuilder(allOpts.contractName);

    buildProxy(c);

    setInfo(c, allOpts.contractInfo);
    return c;
}
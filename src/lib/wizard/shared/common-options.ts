import type { Info } from "./set-info";
import { defaults as infoDefaults } from "./set-info";

import type { Access } from "../smart-contracts/set-access-control";
import type { Upgradeable } from "../smart-contracts/set-upgradeable";


export interface CommonOptions {
  access?: Access;
  upgradeable?: Upgradeable;
  contractInfo?: Info;

  deployInfo?: Info;
}

export const defaults: Required<CommonOptions> = {
  access: false,
  upgradeable: false,
  contractInfo: infoDefaults,

  deployInfo: infoDefaults,
} as const;


export interface CommonOptions {
  access?: Access;
  upgradeable?: Upgradeable;
  contractInfo?: Info;

  deployInfo?: Info;

}

export function withCommonDefaults(opts: CommonOptions): Required<CommonOptions> {
  return {
    access: opts.access ?? false,
    upgradeable: opts.upgradeable ?? false,
    contractInfo: opts.contractInfo ?? {},

    deployInfo: opts.deployInfo ?? {},
  };
}

import type { Info } from "./set-info";
import { defaults as infoDefaults } from "./set-info";

export const defaults: Required<CommonOptions> = {
  deployInfo: infoDefaults,
} as const;

export interface CommonOptions {
  deployInfo?: Info;
}

export function withCommonDefaults(opts: CommonOptions): Required<CommonOptions> {
  return {
    deployInfo: opts.deployInfo ?? {},
  };
}

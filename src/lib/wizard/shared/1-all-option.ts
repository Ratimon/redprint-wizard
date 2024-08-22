import type { Info } from "./set-info";
import { defaults as infoDefaults } from "./set-info";

// to do : remove redundant
export const governanceOptions = [false, 'safe-multisig', 'governor'] as const;
export type Governance = typeof governanceOptions[number];

export const defaults: Required<SharedAllOptions> = {
  deployName: 'DeployAllScript',
  deployInfo: infoDefaults,

  governance: 'safe-multisig',
} as const;

export interface SharedAllOptions  {
  deployName: string;
  deployInfo?: Info;

  governance: Governance;
}
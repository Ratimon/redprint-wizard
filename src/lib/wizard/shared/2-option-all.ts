import type { Info } from "./set-info";
import { defaults as infoDefaults } from "./set-info";

export const governanceOptions = [false, 'safe-multisig', 'governor'] as const;
export type Governance = typeof governanceOptions[number];

export const defaults: Required<SharedAllStepTwoOptions> = {
  deployName: 'DeployAllScript',
  deployInfo: infoDefaults,

  governance: 'safe-multisig',
} as const;

export interface SharedAllStepTwoOptions  {
  deployName: string;
  deployInfo?: Info;

  governance: Governance;
}

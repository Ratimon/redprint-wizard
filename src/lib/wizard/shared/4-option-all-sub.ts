import type { Info } from "./set-info";
import { defaults as infoDefaults } from "./set-info";


export const defaults: Required<SharedStepFourAllSubOptions> = {
  deployName: 'SetupOpchainScript',
  deployInfo: infoDefaults,

} as const;

export interface SharedStepFourAllSubOptions  {
  deployName: string;
  deployInfo?: Info;

}

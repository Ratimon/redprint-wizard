import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";


export const defaults: Required<SharedStepFourPointOneAllSubOptions> = {
  deployName: 'SetupOpchainScript',
  deployInfo: infoDefaults,

} as const;

export interface SharedStepFourPointOneAllSubOptions  {
  deployName: string;
  deployInfo?: Info;

}

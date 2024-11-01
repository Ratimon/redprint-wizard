import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";


export const defaults: Required<SharedStepFourPointTwoAllSubOptions> = {
  deployName: 'SetupOpchainScript',
  deployInfo: infoDefaults,

} as const;

export interface SharedStepFourPointTwoAllSubOptions  {
  deployName: string;
  deployInfo?: Info;

}

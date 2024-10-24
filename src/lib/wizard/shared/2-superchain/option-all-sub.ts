import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";


export const defaults: Required<SharedStepTwoAllSubOptions> = {
  deployName: 'SetupSuperchainScript',
  deployInfo: infoDefaults,

} as const;

export interface SharedStepTwoAllSubOptions  {
  deployName: string;
  deployInfo?: Info;

}

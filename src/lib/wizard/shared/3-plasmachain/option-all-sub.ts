import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";


export const defaults: Required<SharedStepThreeAllSubOptions> = {
  deployName: 'SetupPlasmachainScript',
  deployInfo: infoDefaults,

} as const;

export interface SharedStepThreeAllSubOptions  {
  deployName: string;
  deployInfo?: Info;

}

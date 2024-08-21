import type { Info } from "./set-info";
import { defaults as infoDefaults } from "./set-info";


export const defaults: Required<SharedAllOptions> = {

  //deploy
  deployName: 'DeployAllScript',
  deployInfo: infoDefaults,

} as const;


export interface SharedAllOptions  {

  deployName: string;
  deployInfo?: Info;
}
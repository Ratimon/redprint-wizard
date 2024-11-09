import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";

export const systemConfigOptions = ['system-config', 'system-config-interop'] as const;
export type SystemConfig = typeof systemConfigOptions[number];

export const defaults: Required<SharedStepFourPointTwoAllSubOptions> = {
  deployName: 'SetupOpchainScript',
  deployInfo: infoDefaults,

  systemConfig: 'system-config',
} as const;

export interface SharedStepFourPointTwoAllSubOptions  {
  deployName: string;
  deployInfo?: Info;
  systemConfig: SystemConfig;
}

import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";

export const systemConfigOptions = ['system-config', 'system-config-interop'] as const;
export type SystemConfig = typeof systemConfigOptions[number];

export const optimismPortalOptions = ['optimism-portal', 'optimism-portal-interop'] as const;
export type OptimismPortal = typeof optimismPortalOptions[number];

export const defaults: Required<SharedStepFourPointTwoAllSubOptions> = {
  deployName: 'SetupOpchainScript',
  deployInfo: infoDefaults,

  systemConfig: 'system-config',
  optimismPortal: 'optimism-portal',  
} as const;

export interface SharedStepFourPointTwoAllSubOptions  {
  deployName: string;
  deployInfo?: Info;
  systemConfig: SystemConfig;
  optimismPortal: OptimismPortal;
}

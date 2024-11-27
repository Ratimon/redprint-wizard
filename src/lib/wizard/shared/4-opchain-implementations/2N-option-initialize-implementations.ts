import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";

export const opSecOptions = [false, 'address', 'key', 'mnemonic'] as const;
export type OpSec = typeof opSecOptions[number];

export const useFaultProofs = ['yes-optimism-portal-2', 'no-optimism-portal'] as const;
export type UseFaultProofs = typeof useFaultProofs[number];


export const defaults: Required<SharedInitializeImplementationsOptions> = {
    deployName: 'InitializeImplementationsScript',
    deployInfo: infoDefaults,
    opSec: 'mnemonic',
    useFaultProofs: 'yes-optimism-portal-2',
} as const;


export interface SharedInitializeImplementationsOptions  {
    deployName: string;
    deployInfo?: Info;
    opSec: OpSec;
    useFaultProofs: UseFaultProofs;
}

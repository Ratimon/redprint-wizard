import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";

export const useFaultProofs = ['yes-optimism-portal-2', 'no-optimism-portal'] as const;
export type UseFaultProofs = typeof useFaultProofs[number];

export const useCustomToken = ['yes-custom-token', 'no-custom-token'] as const;
export type UseCustomToken = typeof useCustomToken[number];

export const opSecOptions = [false, 'address', 'key', 'mnemonic'] as const;
export type OpSec = typeof opSecOptions[number];


export const defaults: Required<SharedInitializeImplementationsOptions> = {
    deployName: 'InitializeImplementationsScript',
    deployInfo: infoDefaults,
    useFaultProofs: 'no-optimism-portal',
    customGasTokenaddress: '0x0000000000000000000000000000000000000000',
    useCustomToken: 'no-custom-token',
    opSec: 'mnemonic',
} as const;


export interface SharedInitializeImplementationsOptions  {
    deployName: string;
    deployInfo?: Info;
    
    useFaultProofs: UseFaultProofs;

    customGasTokenaddress: string;
    useCustomToken: UseCustomToken;

    opSec: OpSec;
}

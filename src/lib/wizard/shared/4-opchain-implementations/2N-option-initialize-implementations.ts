import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";

export const opSecOptions = [false, 'address', 'key', 'mnemonic'] as const;
export type OpSec = typeof opSecOptions[number];


export const defaults: Required<SharedInitializeImplementationsOptions> = {
    deployName: 'InitializeImplementationsScript',
    deployInfo: infoDefaults,
    opSec: 'mnemonic',
} as const;


export interface SharedInitializeImplementationsOptions  {
    deployName: string;
    deployInfo?: Info;
    opSec: OpSec;
}
import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";

export const opSecOptions = [false, 'address', 'key', 'mnemonic'] as const;
export type OpSec = typeof opSecOptions[number];


export const defaults: Required<SharedSetFaultGameImplementationOptions> = {
    deployName: 'SetFaultGameImplementationScript',
    deployInfo: infoDefaults,
    opSec: 'mnemonic',
} as const;


export interface SharedSetFaultGameImplementationOptions  {
    deployName: string;
    deployInfo?: Info;
    opSec: OpSec;    
}

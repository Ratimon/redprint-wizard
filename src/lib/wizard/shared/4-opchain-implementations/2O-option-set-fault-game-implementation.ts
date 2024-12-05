import type { Info } from "../set-info";
import { defaults as infoDefaults } from "../set-info";

export const opSecOptions = [false, 'address', 'key', 'mnemonic'] as const;
export type OpSec = typeof opSecOptions[number];


export const defaults: Required<SharedSetFaultGameImplementationOptions> = {
    deployName: 'SetFaultGameImplementationScript',
    deployInfo: infoDefaults,
    prestateProofMtPath: '/../op-program/bin/prestate-proof-mt.json',
    prestateProofStPath: '/../op-program/bin/prestate-proof.json',
    opSec: 'mnemonic',
} as const;


export interface SharedSetFaultGameImplementationOptions  {
    deployName: string;
    deployInfo?: Info;
    prestateProofMtPath: string;
    prestateProofStPath: string;
    opSec: OpSec;    
}

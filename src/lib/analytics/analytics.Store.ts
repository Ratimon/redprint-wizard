
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export type Action =
                    'copy-contract-Safe'| 'copy-script-Safe' | 'download-contract-Safe' | 'download-script-Safe' |
                    'copy-contract-Governor'| 'copy-script-Governor' | 'download-contract-Governor' | 'download-script-Governor' |
                    'copy-contract-AllStepOne'| 'copy-script-AllStepOne' | 'download-contract-AllStepOne' | 'download-script-AllStepOne' |
                    'copy-contract-AddressManager'| 'copy-script-AddressManager' | 'download-contract-AddressManager' | 'download-script-AddressManager' |
                    'copy-contract-ProxyAdmin'| 'copy-script-ProxyAdmin' | 'download-contract-ProxyAdmin' | 'download-script-ProxyAdmin' |
                    'copy-contract-SuperchainConfigProxy'| 'copy-script-SuperchainConfigProxy' | 'download-contract-SuperchainConfigProxy' | 'download-script-SuperchainConfigProxy' |
                    'copy-contract-SuperchainConfig'| 'copy-script-SuperchainConfig' | 'download-contract-SuperchainConfig' | 'download-script-SuperchainConfig'
                    

export type GaEvent = {
    id: string;
    data: any;
    event: Action;
    type: string;
};

let initialAnalytics: GaEvent[] = [];

export const analyticsStore : Writable<GaEvent[]>  = writable(initialAnalytics);
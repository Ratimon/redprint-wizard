
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export type Action =
                    'copy-contract-Safe'| 'copy-script-Safe' | 'download-contract-Safe' | 'download-script-Safe' |
                    'copy-contract-Governor'| 'copy-script-Governor' | 'download-contract-Governor' | 'download-script-Governor' |
                    'copy-contract-AllStepOne'| 'copy-script-AllStepOne' | 'download-contract-AllStepOne' | 'download-script-AllStepOne';

export type GaEvent = {
    id: string;
    data: any;
    event: Action;
    type: string;
};

let initialAnalytics: GaEvent[] = [];

export const analyticsStore : Writable<GaEvent[]>  = writable(initialAnalytics);
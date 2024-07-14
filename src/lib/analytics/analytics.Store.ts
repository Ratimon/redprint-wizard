
import type { Writable } from 'svelte/store';
import { writable } from 'svelte/store';

export type GaEvent = {
    id: string;
    data: any;
    event: string;
    type: string;
};

let initialAnalytics: GaEvent[] = [];

export const analyticsStore : Writable<GaEvent[]>  = writable(initialAnalytics);
import {readable} from 'svelte/store';
import {version} from '$app/environment';

import {getParamsFromLocation, getHashParamsFromLocation} from '$lib/utils/url';

export const globalQueryParams = ['debug', 'log', 'ethnode', '_d_eruda'];

export const hashParams = getHashParamsFromLocation();
export const {params} = getParamsFromLocation();

console.log(`VERSION: ${version}`);

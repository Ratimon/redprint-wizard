import type { GenericOptions } from '$lib/wizard/build-generic';
import { v4 as uuid } from 'uuid';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}
const instance = uuid();

export type Action = 'copy' | 'download-foundry';
export type Language = 'solidity';

export async function postConfig(opts: Required<GenericOptions> , action: Action, language: Language) {
  window.gtag?.('event', 'wizard_action', { ...opts, action, wizard_lang: language });
}
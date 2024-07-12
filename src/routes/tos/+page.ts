import type { MetaTagsProps } from 'svelte-meta-tags';
import {appName} from 'web-config';

export function load() {

    const title = "Terms and Conditions";
    const description = "Terms and Conditions for Redprint Wizard";

    const pageMetaTags = Object.freeze({
        title: title,
        titleTemplate: `%s | ${appName}`,
        description: description,
        openGraph: {
            title: title,
            description: description,
        },
    }) satisfies MetaTagsProps;

	return {
        pageMetaTags: pageMetaTags,
	};
}
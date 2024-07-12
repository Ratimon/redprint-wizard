import type { MetaTagsProps } from 'svelte-meta-tags';
import {appName} from 'web-config';

export function load() {

    const title = "Privacy Policy";
    const description = "Privacy Policy for Redprint Wizard";

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
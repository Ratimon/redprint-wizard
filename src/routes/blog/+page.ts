import type { MetaTagsProps } from 'svelte-meta-tags';

export function load() {

    const title = "Redprint Wizard Blog";
    const description = "Updates, stories, and announcements from the Redprint Wizard team";

    const pageMetaTags = Object.freeze({
        title: title,
        titleTemplate: `%s | Blog}`,
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
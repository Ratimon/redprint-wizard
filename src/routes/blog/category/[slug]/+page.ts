import type { MetaTagsProps } from 'svelte-meta-tags';

import { error } from '@sveltejs/kit'
import { categories } from '../../Blog.data';

export async function load({ fetch, params }) {
	try {

		const category = categories.find((category) => category.slug == params.slug)!;
		const title = category?.title;
		const description = category?.description

		const pageMetaTags = Object.freeze({
			title: title,
			titleTemplate: `%s | Blog`,
			description: description,
			openGraph: {
				title: title,
				description: description,
			},
		}) satisfies MetaTagsProps;

		return {
			pageMetaTags: pageMetaTags,
            slug: params.slug
		}
		
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
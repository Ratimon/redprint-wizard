import type { MetaTagsProps } from 'svelte-meta-tags';

import { error } from '@sveltejs/kit'
import { authors } from '../../Blog.data';

export async function load({ fetch, params }) {
	try {

		const author = authors.find((author) => author.slug == params.slug)
		const title = author?.name;
		const description = author?.description
	
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
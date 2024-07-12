import type { MetaTagsProps } from 'svelte-meta-tags';
import type { PostData } from '../Blog.model';

import {appName} from 'web-config';
import { error } from '@sveltejs/kit'

export async function load({ params, fetch }) {
	try {
		const post = await import(`../_assets/posts/${params.post}.md`)
        const response = await fetch('/blog/api/posts')
        const posts: PostData[] = await response.json()

		const title = post.metadata.title;
		const description = post.metadata.description;
	
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
			content: post.default,
			meta: post.metadata,
            posts: posts,
            slug: params.post
		}
	} catch (e) {
		error(404, `Could not find ${params.post}`)
	}
}
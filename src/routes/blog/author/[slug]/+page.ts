import type { PostData } from '../../Blog.model';
import { error } from '@sveltejs/kit'

export async function load({ fetch, params }) {
	try {
        const response = await fetch('/blog/api/posts')
        const posts: PostData[] = await response.json()

		return {
			posts: posts,
            slug: params.slug
		}
		
	} catch (e) {
		error(404, `Could not find ${params.slug}`)
	}
}
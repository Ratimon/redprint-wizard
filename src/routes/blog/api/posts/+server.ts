import type { MetaTagsProps } from 'svelte-meta-tags';
import type { PostData } from '../../Blog.model';

import { json } from '@sveltejs/kit'

async function getPosts() {
	let posts: PostData[] = []

	const paths = import.meta.glob('/src/routes/blog/_assets/posts/*.md', { eager: true })

	for (const path in paths) {
		const file = paths[path]
		const slug = path.split('/').at(-1)?.replace('.md', '')

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<PostData, 'slug'>
			const post = { ...metadata, slug } satisfies PostData
			post.published && posts.push(post)
		}
	}

	posts = posts.sort((first, second) =>
    	new Date(second.date).getTime() - new Date(first.date).getTime()
	)

	return posts
}

// Handle GET Request to blog/api/posts
export async function GET() {
	const posts = await getPosts()
	return json(posts)
}

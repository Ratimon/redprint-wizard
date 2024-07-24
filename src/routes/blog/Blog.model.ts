
export type CategoriesSlug = 'announcements' | 'products' | 'tutorials' | 'reports' | 'events';
// 'research'|
export type AuthorSlug = 'Rati';
export type SocialSlug = 'Twitter' | 'LinkedIn' | 'Github' | 'Blog';

export type PostData = {
	title: string
	slug: string
	description: string
	date: string
	categories: CategoriesSlug[] 
	author: AuthorSlug
	published: boolean
	imgSrc: string
	imgAlt: string
}
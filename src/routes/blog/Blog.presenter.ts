import type { CategoriesSlug } from './Blog.model';

export type CategoryPresenter = {
	slug: CategoriesSlug;
	title: string;
	titleShort?: string;
	description: string;
	descriptionShort?: string;
};

export type AuthorPresenter = {
	slug: string;
	name: string;
	job: string;
	description: string;
	avatarSrc:  string;
	socials?: {
	  name: string;
	  icon: string;
	  url: string;
	}[];
};

export type PostPresenter = {
	title: string
	slug: string
	description: string
	date: string
	categories: CategoryPresenter[]
	author: AuthorPresenter
	published: boolean
	imgSrc: string
	imgAlt: string
}
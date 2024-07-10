<script lang="ts">
    import '../../app.postcss';
	import type { AuthorPresenter, CategoryPresenter, PostPresenter } from './Blog.presenter'
	import {categories, authors} from './Blog.data'
	import CardArticle from '$lib/ui/blog/CardArticle.svelte';
	import CardCategory from '$lib/ui/blog/CardCategory.svelte';
	import {appName} from 'web-config';

	export let data;

	let allPosts : PostPresenter[];
	$: allPosts = data.posts.map( post => {

		const cachedCategories : CategoryPresenter[] = post.categories.map( categoryString => {
			return categories.find((category) => category.slug === categoryString)!;
		} );

		const cachedAuthor : AuthorPresenter = authors.find((author) => author.slug == post.author)!;

		return {
            ...post,
            categories: cachedCategories,
			author: cachedAuthor
        };
	});

	let postsSortedByLatest : PostPresenter[];
	$: postsSortedByLatest = allPosts.sort(
        (a, b) =>
          new Date(b.date).valueOf() - new Date(a.date).valueOf()
      )
      .slice(0, 6);
</script>

<!-- SEO -->
<!-- <svelte:head>
	<title>The {appName}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content="Blog" />
</svelte:head> -->

<section class="text-center max-w-xl mx-auto mt-12 mb-24 md:mb-32">
	<h1 class="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6">
	  The {appName} Blog
	</h1>
	<p class="text-lg opacity-80 leading-relaxed">
		Updates, stories, and announcements from the {appName} Labs team.
	</p>
</section>


<section class="grid lg:grid-cols-2 mb-24 md:mb-32 gap-8">
	{#each postsSortedByLatest as post, i}
		<CardArticle
			post={post}
			showCategory={true}
		></CardArticle>
	{/each}
</section>

<section>
	<p class="font-bold text-2xl lg:text-4xl tracking-tight text-center mb-8 md:mb-12">
		Browse articles by category
	</p>

	<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
		{#each categories as category, i}
			<CardCategory
				category={ category}
			></CardCategory>
		{/each}
	</div>
</section>
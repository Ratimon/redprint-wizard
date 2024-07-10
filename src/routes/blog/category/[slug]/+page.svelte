<script lang="ts">
	import type { AuthorPresenter, CategoryPresenter, PostPresenter } from '../../Blog.presenter'
	import { authors, categories} from '../../Blog.data';
    import CardArticle from '$lib/ui/blog/CardArticle.svelte';
    import CardCategory from '$lib/ui/blog/CardCategory.svelte';

	export let data

    let categoryToDisplay: CategoryPresenter;
	$: categoryToDisplay = categories.find((category) => category.slug == data.slug)!;

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

	let postsByCategory : PostPresenter[];
	$: postsByCategory = allPosts.filter((post) => post.categories.includes( categoryToDisplay ) )

    let postsRecentByCategory : PostPresenter[];
    $: postsRecentByCategory = postsByCategory.sort(
      (a, b) =>
        new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );

    let otherCategories : CategoryPresenter[];
    $: otherCategories = categories.filter((category) => category.slug !== data.slug)!;

</script>

<section class="mt-12 mb-24 md:mb-32 max-w-3xl mx-auto text-center">
    <h1 class="font-extrabold text-3xl lg:text-5xl tracking-tight mb-6 md:mb-12">
        {categoryToDisplay.title}
      </h1>
      <p class="md:text-lg opacity-80 max-w-xl mx-auto">
        {categoryToDisplay.description}
      </p>
</section>

<section class="mb-24">
    <h2 class="font-bold text-2xl lg:text-4xl tracking-tight text-center mb-8 md:mb-12">
        Most recent articles in {categoryToDisplay.title}
    </h2>
    <div class="grid lg:grid-cols-2 gap-8">
        {#each postsRecentByCategory as post, i}
            <CardArticle
                post={post}
                showCategory={false}
            ></CardArticle>
        {/each}
    </div>
</section>

<section>
    <h2 class="font-bold text-2xl lg:text-4xl tracking-tight text-center mb-8 md:mb-12">
        Other categories you might like
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {#each otherCategories as category, i}
            <CardCategory
                category={ category}
            ></CardCategory>
        {/each}
    </div>

</section>
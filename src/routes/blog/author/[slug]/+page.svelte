<script lang="ts">
	import type { AuthorPresenter, CategoryPresenter, PostPresenter } from '../../Blog.presenter'
	import { authors, categories} from '../../Blog.data'
    import CardArticle from '$lib/ui/blog/CardArticle.svelte';

	export let data

    let authorToDisplay: AuthorPresenter;
	$: authorToDisplay = authors.find((author) => author.slug == data.slug)!;

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

	let postsByAuthor : PostPresenter[];
	$: postsByAuthor = allPosts.filter((post) => post.author.slug === data.slug)

    let postsRecentByAuthor : PostPresenter[];

    $: postsRecentByAuthor = postsByAuthor.sort(
      (a, b) =>
        new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );

</script>

<section class="max-w-3xl mx-auto flex flex-col md:flex-row gap-8 mt-12 mb-24 md:mb-32">

    <div>
        <p class="text-xs uppercase tracking-wide text-base-content/80 mb-2">
          Authors
        </p>
        <h1 class="font-extrabold text-3xl lg:text-5xl tracking-tight mb-2">
          {authorToDisplay.name}
        </h1>
        <p class="md:text-lg mb-6 md:mb-10 font-medium">{authorToDisplay.job}</p>
        <p class="md:text-lg text-base-content/80">
          {authorToDisplay.description}
        </p>
    </div>

    <div class="max-md:order-first flex md:flex-col gap-4 shrink-0">
        <img
            src={authorToDisplay.avatarSrc}
            width={256}
            height={256}
            alt={authorToDisplay.name}
            class="rounded-box w-[12rem] md:w-[16rem] "
        />

        {#if authorToDisplay.socials}
            <div class="flex gap-4">

                {#each authorToDisplay.socials as social}
                    <div class="flex flex-col md:flex-row gap-4">
                        <a
                            href={social.url}
                            class="btn btn-square"
                            title={`Go to ${authorToDisplay.name} profile on ${social.name}`}
                            target="_blank"
                        >
                            {social.icon}
                        </a>

                    </div>
                {/each}
            </div>

        {/if}
    </div>

</section>
<section>
    <h2 class="font-bold text-2xl lg:text-4xl tracking-tight text-center mb-8 md:mb-12">
        Most recent posts by {authorToDisplay.name}
    </h2>

    <div class="grid lg:grid-cols-2 gap-8">
        {#each postsRecentByAuthor as post, i}
            <CardArticle
                post={post}
                showCategory={true}
            ></CardArticle>
        {/each}
    </div>


</section>

<script lang="ts">
	import type { CategoryPresenter } from '../../../routes/blog/Blog.presenter'

    export let category: CategoryPresenter;
</script>


<a
    href={`/blog/category/${category.slug}`}
    class={`p-4 text-base-content rounded-box duration-200 hover:bg-neutral hover:text-neutral-content`}
    title={`Posts in ${category.title}`}
    rel="tag"
>
        <h2 class="md:text-lg font-medium">
            {category?.titleShort || category.title}
        </h2>
</a>



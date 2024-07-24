<script lang="ts">
    import type {Link } from '$lib/model/Link';

	import ScrollLink from '$lib/ui/header/ScrollLink.svelte';
    import PageLink from '$lib/ui/header/PageLink.svelte';


	let className = '';
	export {className as class};
	export let tabClass: string = '';
	export let whenSelected: string = '';
	export let whenUnselected: string = '';

	export let pages: Link[];


</script>

<div class={`tabs ${className}`}>
	{#each pages as page}

        {#if page.navType == 'scroll'}
            <svelte:component this={ScrollLink} class={tabClass} {whenUnselected} {whenSelected} href={page.pathname}>
                {page.title}
            </svelte:component>
        {:else}
            <svelte:component this={PageLink} class={tabClass} {whenUnselected} {whenSelected} href={page.pathname}>
                {page.title}
            </svelte:component>
        {/if}


	{/each}
</div>

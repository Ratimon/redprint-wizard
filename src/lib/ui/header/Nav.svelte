<script lang="ts">
	import ScrollLink from '$lib/ui/header/ScrollLink.svelte';
    import PageLink from '$lib/ui/header/PageLink.svelte';


	let className = '';
	export {className as class};
	export let tabClass: string = '';
	export let whenSelected: string = '';
	export let whenUnselected: string = '';

    // to do type
	export let pages: {pathname: string; title: string; navType: string}[];


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

        <!-- <svelte:component this={PageLink} class={tabClass} {whenUnselected} {whenSelected} href={page.pathname}>
            {page.title}
        </svelte:component> -->

	{/each}
</div>

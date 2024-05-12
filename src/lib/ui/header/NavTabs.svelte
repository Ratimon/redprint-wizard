<script lang="ts">
	import PageLink from '$lib/ui/header/PageLink.svelte';

	let className = '';
	export {className as class};
	export let tabClass: string = '';
	export let whenSelected: string = '';
	export let whenUnselected: string = '';

	export let pages: {pathname: string; title: string}[];
</script>

<div class={`tabs ${className}`}>
	{#each pages as page}
		<PageLink class={tabClass} {whenUnselected} {whenSelected} href={page.pathname}>
			{page.title}
		</PageLink>
	{/each}
</div>

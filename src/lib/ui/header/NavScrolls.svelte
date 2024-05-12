<script lang="ts">
	import ScrollLink from '$lib/ui/header/ScrollLink.svelte';

	let className = '';
	export {className as class};
	export let tabClass: string = '';
	export let whenSelected: string = '';
	export let whenUnselected: string = '';

	export let pages: {pathname: string; title: string}[];
</script>

<div class={`tabs ${className}`}>
	{#each pages as page}
		<ScrollLink class={tabClass} {whenUnselected} {whenSelected} href={page.pathname}>
			{page.title}
		</ScrollLink>
	{/each}
</div>

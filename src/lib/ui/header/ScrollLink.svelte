<script lang="ts">

	import {page} from '$app/stores';
	import {isParentRoute, isSameRoute} from '$lib/utils/path';

	export let href: string;
	let className = '';
	export {className as class};
	export let whenSelected: string = '';
	export let whenUnselected: string = '';

    const handleAnchorClick =  (event: Event | undefined) => {
        if (!event) return;
		const target = event.currentTarget as HTMLTextAreaElement;
        // const anchorId = target.getAttribute("href")?.replace('#', '');
		const anchorId = target.getAttribute("href");
		const anchor = document.getElementById(anchorId!)
		window.scrollTo({
			top: anchor?.offsetTop,
			behavior: 'smooth'
		})
	}

</script>

<a
	href={href}
    on:click|preventDefault={ event => handleAnchorClick(event)}
	class={`${className} ${
		(href === '/' ? isSameRoute($page.url.pathname, href) : isParentRoute($page.url.pathname, href))
			? whenSelected
			: whenUnselected
	}`}><slot /></a
>

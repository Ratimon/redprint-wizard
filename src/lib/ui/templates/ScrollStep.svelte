<script lang="ts">
    import ScrollLink from '$lib/ui/header/ScrollLink.svelte';
    import type {Link } from '$lib/model/Link';
  
    export let links: Link[] = [];
    export let titleHighlighted: string = '';

</script>


<nav class="flex justify-center my-2">
    <ul class="steps steps-vertical lg:steps-horizontal">

        {#each links as link}
            <ScrollLink
                class={`${link.title === titleHighlighted ? 'step step-accent' : 'step'}`}
                href={link.pathname}
            >
                {link.title}
            </ScrollLink>
        {/each}
  
    </ul>
  </nav>
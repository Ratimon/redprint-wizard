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
  
      <!-- <ScrollLink
          class='step step-accent'
          href={data.dropDownLinks[2].pathname}
        >
        {data.dropDownLinks[2].title}
      </ScrollLink>
  
      <ScrollLink
          class='step'
          href={data.dropDownLinks[3].pathname}
        >
        {data.dropDownLinks[3].title}
      </ScrollLink>
  
      <ScrollLink
          class='step'
          href={data.dropDownLinks[4].pathname}
        >
        {data.dropDownLinks[4].title}
      </ScrollLink>
  
      <ScrollLink
          class='step'
          href={data.dropDownLinks[5].pathname}
        >
        {data.dropDownLinks[5].title}
      </ScrollLink>
  
      <ScrollLink
          class='step'
          href={data.dropDownLinks[6].pathname}
        >
        {data.dropDownLinks[6].title}
      </ScrollLink>
  
      <ScrollLink
          class='step'
          href={data.dropDownLinks[7].pathname}
        >
        {data.dropDownLinks[7].title}
      </ScrollLink> -->
  
    </ul>
  </nav>
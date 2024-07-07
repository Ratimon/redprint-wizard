<script  lang="ts">
    // import type { PageData } from "./$types";
    // import { page } from '$app/stores';

    import Hero from '$lib/ui/templates/Hero.svelte';
    import Problem from '$lib/ui/templates/Problem.svelte';
    import FeaturesListicle from '$lib/ui/templates/FeaturesListicle.svelte';
    import WithWithout from '$lib/ui/templates/WithWithout.svelte';
    import FeaturesGrid from '$lib/ui/templates/FeaturesGrid.svelte';

    // to do : seo
    // import { MetaTags } from 'svelte-meta-tags';
    // import extend from 'just-extend'; // Please provide functions that allow deep merging of objects, such as lodash.merge, deepmerge, just-extend.
    // export let data;

    // to do : add blog
    // to do : add Plausible

</script>

<Hero></Hero>
<Problem></Problem>
<FeaturesListicle ></FeaturesListicle>
<WithWithout></WithWithout>
<FeaturesGrid></FeaturesGrid>

<!-- refactor : FeaturesGrid  -->
 <!-- refactor : sub-variable for all templates  -->

Find Us
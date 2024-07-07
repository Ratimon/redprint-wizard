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

    interface FeatureGridElement {
        title: string;
        description? : string;
        path?: string;
        iconName?: string;
    }

    let resourceTitle: string = "Everything you need to craft your own OPStack chain."
    let resourceSubtitle: string = "RESOURCES"
    let resourceDescription: string = "Discover more about the open source libraly driven by & on Optimism"
    let resourceMaximiumColumn: Number= 3;

    let resources : FeatureGridElement[] = [
    {
        title: "SOURCECODE",
        path: "https://github.com/Ratimon/redprint-wizard",
        iconName: "carbon:repo-source-code",
    },
    {
        title: "DOCUMENTATION",
        path: "https://github.com/Ratimon/redprint-wizard/blob/main/README.md",
        iconName: "oui:documentation",
    },
    {
        title: "STATUS",
        path: "https://github.com/Ratimon/redprint-wizard",
        iconName: "pajamas:status-health",
    },
    {
        title: "CHANGELOG",
        path: "https://github.com/Ratimon/redprint-wizard",
        iconName: "hugeicons:git-merge",
    },
    {
        title: "CONTRIBUTE",
        path: "https://github.com/Ratimon/redprint-wizard",
        iconName: "ion:git-commit-sharp",
    },
    {
        title: "ROADMAP",
        path: "https://github.com/Ratimon/redprint-wizard",
        iconName: "streamline:arrow-roadmap",
    },
    ] as FeatureGridElement[];


</script>

<Hero></Hero>
<Problem></Problem>
<FeaturesListicle ></FeaturesListicle>
<WithWithout></WithWithout>
<FeaturesGrid
    landingTitle={resourceTitle}
    landingSubtitle={resourceSubtitle}
    landingDescription={resourceDescription}
    maximiumColumn={resourceMaximiumColumn}
    featureGridElements={resources}
></FeaturesGrid>

<!-- <FeaturesGrid featureGridElements={resources} ></FeaturesGrid> -->


<!-- refactor : FeaturesGrid  -->
<!-- refactor : sub-variable for all templates  -->

Find Us
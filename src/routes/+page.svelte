<script  lang="ts">
    import type {FeatureGridItem } from '$lib/model/Feature';

    import Hero from '$lib/ui/templates/Hero.svelte';
    import Problem from '$lib/ui/templates/Problem.svelte';
    import FeaturesListicle from '$lib/ui/templates/FeaturesListicle.svelte';
    import WithWithout from '$lib/ui/templates/WithWithout.svelte';
    import FeaturesGrid from '$lib/ui/templates/FeaturesGrid.svelte';

    // to do : add Plausible

    let resourceTitle: string = "Everything you need to craft your own OPStack chain."
    let resourceSubtitle: string = "RESOURCES"
    let resourceDescription: string = "Discover more about the open source libraly driven by & on Optimism"

    // to do : fix link && add github stars add support button
    let resources : FeatureGridItem[] = [
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
    ] as FeatureGridItem[];

    let contactTitle: string = "Find Us !!"
    let contactSubtitle: string = "CONTACT"
    let contactDescription: string = "Discover more, and join our community."

    let contacts : FeatureGridItem[] = [
    {
        title: "BLOG",
        path: "/blog",
        iconName: "quill:inbox-newsletter",
    },
    {
        title: "TWITTER",
        path: "https://x.com/",
        iconName: "line-md:twitter-x",
    },
    {
        title: "REACH OUT",
        path: "/about",
        iconName: "pajamas:status-health",
    },
    ] as FeatureGridItem[];


</script>

<Hero></Hero>
<Problem></Problem>
<FeaturesListicle keyToNav={'#solution'} ></FeaturesListicle>
<WithWithout></WithWithout>
<FeaturesGrid
    keyToNav={'#resource'}
    landingTitle={resourceTitle}
    landingSubtitle={resourceSubtitle}
    landingDescription={resourceDescription}
    featureGridElements={resources}
></FeaturesGrid>
<FeaturesGrid
    keyToNav={'#contact'}
    landingTitle={contactTitle}
    landingSubtitle={contactSubtitle}
    landingDescription={contactDescription}
    featureGridElements={contacts}
></FeaturesGrid>

<!-- refactor : type  -->
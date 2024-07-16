<script  lang="ts">
    import type {GithubRepo } from '$lib/model/GithubRepo';
    import type {FeatureGridItem } from '$lib/model/Feature';

    import Hero from '$lib/ui/templates/Hero.svelte';
    import Problem from '$lib/ui/templates/Problem.svelte';
    import FeaturesListicle from '$lib/ui/templates/FeaturesListicle.svelte';
    import WithWithout from '$lib/ui/templates/WithWithout.svelte';
    import FeaturesGrid from '$lib/ui/templates/FeaturesGrid.svelte';

    const repositories : GithubRepo[]  = [
        {title: 'Wizard', owner : 'Ratimon', name: 'redprint-wizard' },
        {title: 'redprint-forge', owner : 'Ratimon', name: 'redprint-forge' },
    ];

    let resourceTitle: string = "Everything you need to craft your own OPStack chain."
    let resourceSubtitle: string = "RESOURCES"
    let resourceDescription: string = "Discover more about the open source libraly driven by & on Optimism"

    // to do: Add support button && prerender && email handle && add report && add package for redprint wizard
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
    // to do : add notion
    // {
    //     title: "STATUS",
    //     path: "https://github.com/Ratimon/redprint-wizard",
    //     iconName: "pajamas:status-health",
    // },
    // to do : add github release ?
    {
        title: "CHANGELOG",
        path: "https://github.com/Ratimon/redprint-wizard",
        iconName: "hugeicons:git-merge",
    },
    // to do : improve github 's markdown section
    {
        title: "CONTRIBUTE",
        path: "https://github.com/Ratimon/redprint-wizard/blob/main/CONTRIBUTING.md",
        iconName: "ion:git-commit-sharp",
    },
    // to do : add github 's project
    // {
    //     title: "ROADMAP",
    //     path: "https://github.com/Ratimon/redprint-wizard",
    //     iconName: "streamline:arrow-roadmap",
    // },
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
    // {
    //     title: "TWITTER",
    //     path: "https://x.com/",
    //     iconName: "line-md:twitter-x",
    // },
    {
        title: "NEWSLETTER",
        path: "https://www.beehiiv.com/",
        iconName: "mdi:email-newsletter",
    },
    // to do : reach out , email?
    {
        title: "ABOUT US",
        path: "/about",
        iconName: "pajamas:status-health",
    },
    ] as FeatureGridItem[];


</script>

<Hero {repositories}></Hero>
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
<script  lang="ts">
    import type {FeatureGridItem } from '$lib/model/Feature';

    import Hero from '$lib/ui/templates/Hero.svelte';
    import Problem from '$lib/ui/templates/Problem.svelte';
    import FeaturesListicle from '$lib/ui/templates/FeaturesListicle.svelte';

    import  WallOfLove from "$lib/ui/templates/WallOfLove.svelte";
    import WithWithout from '$lib/ui/templates/WithWithout.svelte';
    import FeaturesGrid from '$lib/ui/templates/FeaturesGrid.svelte';

    let testimonialTitle: string = "Our growing wall of love ❤️"
    let testimonialSubtitle: string = "TESTIMONIALS"
    let testimonialDescription: string = "Join 30+ builders who use Redprint"

    let resourceTitle: string = "Everything you need to craft your own OPStack chain."
    let resourceSubtitle: string = "RESOURCES"
    let resourceDescription: string = "Discover more about the open source library"

    // to do: Add support button && email handle && add report && add overflowMenu
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
    {
        title: "CHANGELOG",
        path: "https://github.com/Ratimon/redprint-wizard/releases",
        iconName: "hugeicons:git-merge",
    },
    // to do : improve github 's markdown section
    {
        title: "CONTRIBUTE",
        path: "https://github.com/Ratimon/redprint-wizard/blob/main/CONTRIBUTING.md",
        iconName: "ion:git-commit-sharp",
    },
    {
        title: "ROADMAP",
        path: "https://github.com/Ratimon/redprint-wizard/milestones",
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
    // {
    //     title: "TWITTER",
    //     path: "https://x.com/",
    //     iconName: "line-md:twitter-x",
    // },
    {
        title: "AUTHOR's NEWSLETTER",
        path: "https://rati-eth-newsletter.beehiiv.com/",
        iconName: "mdi:email-newsletter",
    },
    // to do : reach out , email?
    {
        title: "METRIC HUB",
        path: "/blog/3-retro-pgf-5",
        iconName: "oui:app-metricbeat",
    },
    {
        title: "ABOUT US",
        path: "/about",
        iconName: "pajamas:status-health",
    },
    ] as FeatureGridItem[];


</script>

<Hero></Hero>
<Problem></Problem>
<FeaturesListicle keyToNav={'#solution'} ></FeaturesListicle>
<WithWithout></WithWithout>
<WallOfLove
    keyToNav={'#testimonial'}
    landingTitle={testimonialTitle}
    landingSubtitle={testimonialSubtitle}
    landingDescription={testimonialDescription}
>
</WallOfLove>
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
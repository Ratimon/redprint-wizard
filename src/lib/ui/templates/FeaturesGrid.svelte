<script lang="ts">
    
    import LandingSection from '$lib/ui/layouts/LandingSection.svelte';
    import FeatureGridElement from '$lib/ui/feature/FeatureGridElement.svelte';

    export let landingTitle: string = "Everything you need to craft your own OPStack chain."
    export let landingSubtitle: string = "RESOURCES"
    export let landingDescription: string = "Discover more about the open source libraly driven by & on Optimism"

    export let maximiumColumn: Number= 3;

    interface FeatureGridElement {
        title: string;
        description? : string;
        path?: string;
        iconName?: string;
    }

    const featureGridElements = [
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

<LandingSection
    title={landingTitle}
    subtitle={landingSubtitle}
    description={landingDescription}
    yPadding="py-24"
>
    
    <div class={`grid grid-cols-1 gap-x-6 gap-y-24 sm:grid-cols-2 md:grid-cols-${maximiumColumn}`}>

        {#each featureGridElements as feature}
            
                <FeatureGridElement
                    title={feature.title}
                    path={feature.path}
                    iconName={feature.iconName}
                >
                    {#if feature.description }
                        {feature.description}
                    {/if}
                </FeatureGridElement>

	    {/each}
    </div>

</LandingSection>
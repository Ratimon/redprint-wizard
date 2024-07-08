<script lang="ts">
    
    import LandingSection from '$lib/ui/layouts/LandingSection.svelte';
    import FeatureGridElement from '$lib/ui/feature/FeatureGridElement.svelte';

    export let landingTitle: string = "Everything you need to craft your own OPStack chain."
    export let landingSubtitle: string = "RESOURCES"
    export let landingDescription: string = "Discover more about the open source libraly driven by & on Optimism"

    interface FeatureGridElement {
        title: string;
        description? : string;
        path?: string;
        iconName?: string;
    }

    export let featureGridElements = [] as FeatureGridElement[];

</script>

<LandingSection
    title={landingTitle}
    subtitle={landingSubtitle}
    description={landingDescription}
    yPadding="py-24"
>
    
    <div class={`grid grid-cols-1 gap-x-4 gap-y-24 sm:grid-cols-2 md:grid-cols-4`}>

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
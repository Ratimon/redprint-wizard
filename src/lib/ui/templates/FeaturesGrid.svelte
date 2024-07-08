<script lang="ts">
    
    import LandingSection from '$lib/ui/layouts/LandingSection.svelte';
    import FeatureGridElement from '$lib/ui/feature/FeatureGridElement.svelte';

    export let keyToNav: string = '#feature';

    export let landingTitle: string = ""
    export let landingSubtitle: string = ""
    export let landingDescription: string = ""

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
    
    <div id={keyToNav} class={`grid grid-cols-1 gap-x-4 gap-y-24 sm:grid-cols-2 md:grid-cols-4`}>

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
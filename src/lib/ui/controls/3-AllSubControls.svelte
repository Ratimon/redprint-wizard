<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedStepThreeAllSubOptions } from '$lib/wizard/shared';
  
    import { deployStepThreeAllSub } from '$lib/wizard/deploy-scripts';
  
    const deployStepThreeAllSubDefaults = deployStepThreeAllSub.defaults;
  
    export let opts: Required<KindedStepThreeAllSubOptions['StepThreeAllSub'] > = {
      kind: 'StepThreeAllSub',
      ...deployStepThreeAllSubDefaults,
      deployInfo: {  securityContact: 'Consult full internal deploy script at https://github.com/Ratimon/redprint-forge', license: 'MIT'  },
    };
    
</script>
    
<section class="controls-section">
<Background color="bg-neutral-content">
    <h1 >Contract Settings</h1>
</Background>

<label class="labeled-input">
    <span>Name</span>
    <input bind:value={opts.deployName}>
</label>

</section>

<InfoSection bind:info={opts.deployInfo} />

<section class="controls-section">
    <h1>Step 3</h1>
    <span>Data Availability Challenge Proxy</span>
    <span>Data AvailabilityChallenge</span>
</section>
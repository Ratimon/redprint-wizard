<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedStepTwoAllSubOptions } from '$lib/wizard/shared';
  
    import { deployStepTwoAllSub } from '$lib/wizard/deploy-scripts';
  
    const deployStepTwoAllSubDefaults = deployStepTwoAllSub.defaults;
  
    export let opts: Required<KindedStepTwoAllSubOptions['StepTwoAllSub'] > = {
      kind: 'StepTwoAllSub',
      ...deployStepTwoAllSubDefaults,
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
    <h1>Step 2</h1>
    <span>AddressManager</span>
    <span>ProxyAdmin</span>
    <span>SuperchainConfigProxy</span>
    <span>SuperchainConfig</span>
    <span>ProtocolVersionsProxy</span>
    <span>ProtocolVersions</span>
</section>
<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedStepFourPointTwoAllSubOptions } from '$lib/wizard/shared';
  
    import { deployStepFourPointTwoAllSub } from '$lib/wizard/deploy-scripts';
  
    const deployStepFourPointTwoAllSubDefaults = deployStepFourPointTwoAllSub.defaults;
  
    export let opts: Required<KindedStepFourPointTwoAllSubOptions['StepFourPointTwoAllSub'] > = {
      kind: 'StepFourPointTwoAllSub',
      ...deployStepFourPointTwoAllSubDefaults,
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
    <h1>Step 4</h1>
    <span>L1CrossDomainMessenger</span>
    <span>OptimismMintableERC20Factory</span>
    <span>SystemConfig</span>
    <span>L1StandardBridge</span>
    <span>L1ERC721Bridge</span>
    <span>OptimismPortal</span>
    <span>deployL2OutputOracle</span>
</section>
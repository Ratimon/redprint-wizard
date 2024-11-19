<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedStepFourPointOneAllSubOptions } from '$lib/wizard/shared';
  
    import { deployStepFourPointOneAllSub } from '$lib/wizard/deploy-scripts';
  
    const deployStepFourPointOneAllSubDefaults = deployStepFourPointOneAllSub.defaults;
  
    export let opts: Required<KindedStepFourPointOneAllSubOptions['StepFourPointOneAllSub'] > = {
      kind: 'StepFourPointOneAllSub',
      ...deployStepFourPointOneAllSubDefaults,
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
    <span>OptimismPortalProxy</span>
    <span>SystemConfigProxy</span>
    <span>L1StandardBridgeProxy</span>
    <span>L1CrossDomainMessengerProxy</span>
    <span>OptimismMintableERC20FactoryProxy</span>
    <span>L1ERC721BridgeProxy</span>
    <span>DisputeGameFactoryProxy</span>
    <span>L2OutputOracleProxy</span>
    <span>DelayedWETHProxy</span>
    <span>PermissionedDelayedWETHProxy</span>
    <span>AnchorStateRegistryProxy</span>
</section>
<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import HelpTooltip from '$lib/ui/controls/HelpTooltip.svelte';
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedAllStepTwoOptions } from '$lib/wizard/shared';
  
    import { deployStepTwoAll } from '$lib/wizard/deploy-scripts';
  
    const deployStepTwoAllDefaults = deployStepTwoAll.defaults;
  
    export let opts: Required<KindedAllStepTwoOptions['AllStepTwo'] > = {
      kind: 'AllStepTwo',
      ...deployStepTwoAllDefaults,
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
  <h1>Step 1</h1>
  <div class="checkbox-group">
    <span>Owner </span>
    <label class:checked={opts.governance === 'safe-multisig'}>
      <input type="radio" bind:group={opts.governance} value='safe-multisig'>
      safe-multisig
      <HelpTooltip>
        Choose Safe MultiSig Option
      </HelpTooltip>
    </label>

    <label class:checked={opts.governance === 'governor'}>
      <input type="radio" bind:group={opts.governance} value='governor'>
      governor
      <HelpTooltip>
          Choose Governor Option
      </HelpTooltip>
    </label>
  </div>
</section>

<section class="controls-section">
    <h1>Step 2</h1>
    <span>AddressManager</span>
    <span>ProxyAdmin</span>
    <span>SuperchainConfigProxy</span>
    <span>SuperchainConfig</span>
    <span>ProtocolVersionsProxy</span>
    <span>ProtocolVersions</span>
</section>
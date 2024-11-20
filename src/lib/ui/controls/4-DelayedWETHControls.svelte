<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedDelayedWETHOptions } from '$lib/wizard/shared';
  
    import { delayedWETH } from '$lib/wizard/smart-contracts';
    import { deployDelayedWETH } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = delayedWETH.defaults;
    const deployDefaults = deployDelayedWETH.defaults;
  
    export let opts: Required<KindedDelayedWETHOptions['DelayedWETH'] > = {
      kind: 'DelayedWETH',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code athttps://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/src/dispute/DelayedWETH.sol', license: 'MIT'  },
      deployInfo: {  securityContact: 'Consult full internal deploy script at https://github.com/Ratimon/redprint-forge', license: 'MIT'  },
    };
  
  </script>
    
  <section class="controls-section">
    <Background color="bg-neutral-content">
      <h1 >Contract Settings</h1>
    </Background>
    
    <label class="labeled-input">
      <span>Name</span>
      <input bind:value={opts.contractName}>
    </label>

  </section>
  
  <InfoSection bind:info={opts.contractInfo} />
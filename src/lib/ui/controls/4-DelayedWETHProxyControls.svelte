<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedDelayedWETHProxyOptions } from '$lib/wizard/shared';
  
    import { delayedWETHProxy } from '$lib/wizard/smart-contracts';
    import { deployDelayedWETHProxy } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = delayedWETHProxy.defaults;
    const deployDefaults = deployDelayedWETHProxy.defaults;
  
    export let opts: Required<KindedDelayedWETHProxyOptions['DelayedWETHProxy'] > = {
      kind: 'DelayedWETHProxy',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code at https://github.com/ethereum-optimism/optimism/blob/4/packages/contracts-bedrock/src/universal/Proxy.sol', license: 'MIT'  },
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
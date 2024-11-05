<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedL1StandardBridgeProxyOptions } from '$lib/wizard/shared';
  
    import { l1StandardBridgeProxy } from '$lib/wizard/smart-contracts';
    import { deployL1StandardBridgeProxy } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = l1StandardBridgeProxy.defaults;
    const deployDefaults = deployL1StandardBridgeProxy.defaults;
  
    export let opts: Required<KindedL1StandardBridgeProxyOptions['L1StandardBridgeProxy'] > = {
      kind: 'L1StandardBridgeProxy',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code at https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/src/legacy/L1ChugSplashProxy.sol', license: 'MIT'  },
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
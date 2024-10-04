<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedL2OutputOracleProxyOptions } from '$lib/wizard/shared';
  
    import { l2OutputOracleProxy } from '$lib/wizard/smart-contracts';
    import { deployL2OutputOracleProxy } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = l2OutputOracleProxy.defaults;
    const deployDefaults = deployL2OutputOracleProxy.defaults;
  
    export let opts: Required<KindedL2OutputOracleProxyOptions['L2OutputOracleProxy'] > = {
      kind: 'L2OutputOracleProxy',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code at https://github.com/ethereum-optimism/optimism/blob/v1.9.1/packages/contracts-bedrock/src/legacy/L1ChugSplashProxy.sol', license: 'MIT'  },
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
<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedDataAvailabilityChallengeProxyOptions } from '$lib/wizard/shared';
  
    import { dataAvailabilityChallengeProxy } from '$lib/wizard/smart-contracts';
    import { deployDataAvailabilityChallengeProxy } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = dataAvailabilityChallengeProxy.defaults;
    const deployDefaults = deployDataAvailabilityChallengeProxy.defaults;
  
    export let opts: Required<KindedDataAvailabilityChallengeProxyOptions['DataAvailabilityChallengeProxy'] > = {
      kind: 'DataAvailabilityChallengeProxy',
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
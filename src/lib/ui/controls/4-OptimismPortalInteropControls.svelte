<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedOptimismPortal2Options } from '$lib/wizard/shared';
  
    import { optimismPortalInterop } from '$lib/wizard/smart-contracts';
    import { deployOptimismPortalInterop } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = optimismPortalInterop.defaults;
    const deployDefaults = deployOptimismPortalInterop.defaults;
  
    export let opts: Required<KindedOptimismPortal2Options['OptimismPortalInterop'] > = {
      kind: 'OptimismPortalInterop',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code at https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/src/L1/OptimismPortalInterop.sol', license: 'MIT'  },
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
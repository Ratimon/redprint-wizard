<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedSuperchainConfigOptions } from '$lib/wizard/shared';
  
    import { superchainConfig } from '$lib/wizard/smart-contracts';
    import { deploySuperchainConfig } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = superchainConfig.defaults;
    const deployDefaults = deploySuperchainConfig.defaults;
  
    export let opts: Required<KindedSuperchainConfigOptions['SuperchainConfig'] > = {
      kind: 'SuperchainConfig',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code at https://github.com/Ratimon/redprint-optimism-contracts-examples/blob/main/src/L1/SuperchainConfig.sol', license: 'MIT'  },
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
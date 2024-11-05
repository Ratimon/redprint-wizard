<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedL1CrossDomainMessengerOptions } from '$lib/wizard/shared';
  
    import { l1CrossDomainMessenger } from '$lib/wizard/smart-contracts';
    import { deployL1CrossDomainMessenger } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = l1CrossDomainMessenger.defaults;
    const deployDefaults = deployL1CrossDomainMessenger.defaults;
  
    export let opts: Required<KindedL1CrossDomainMessengerOptions['L1CrossDomainMessenger'] > = {
      kind: 'L1CrossDomainMessenger',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code at https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/src/L1/L1CrossDomainMessenger.sol', license: 'MIT'  },
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
  
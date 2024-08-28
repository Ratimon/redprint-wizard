<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import HelpTooltip from '$lib/ui/controls/HelpTooltip.svelte';
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedAddressManagerOptions } from '$lib/wizard/shared';
  
    import { safe } from '$lib/wizard/smart-contracts';
    import { deploySafe } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = safe.defaults;
    const deployDefaults = deploySafe.defaults;
  
    export let opts: Required<KindedAddressManagerOptions['AddressManager'] > = {
      kind: 'AddressManager',
      ...contractDefaults,
      ...deployDefaults,
      //  to do 
      contractInfo: {  securityContact: 'Consult full code at https://github.com/safe-global/safe-smart-account/blob/a9e3385bb38c29d45b3901ff7180b59fcee86ac9/contracts/proxies/SafeProxy.sol', license: 'MIT'  },
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
  
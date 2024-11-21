<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedTransferAddressManagerOwnershipOptions } from '$lib/wizard/shared';
  
    import { deployTransferAddressManagerOwnership } from '$lib/wizard/deploy-scripts';
  
    const deployTransferAddressManagerOwnershipDefaults = deployTransferAddressManagerOwnership.defaults;
  
    export let opts: Required<KindedTransferAddressManagerOwnershipOptions['TransferAddressManagerOwnership'] > = {
      kind: 'TransferAddressManagerOwnership',
      ...deployTransferAddressManagerOwnershipDefaults,
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
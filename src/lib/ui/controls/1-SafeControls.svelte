<script lang="ts">
  import HelpTooltip from './HelpTooltip.svelte';

  import type { KindedOptions } from '$lib/wizard/smart-contracts';
  import { safe, contractInfoDefaults } from '$lib/wizard/smart-contracts';
  import type { DeployKindedOptions } from '$lib/wizard/deploy-scripts';
  import { deploySafe, deployInfoDefaults } from '$lib/wizard/deploy-scripts';

  import InfoSection from './InfoSection.svelte';

  const contractDefaults = safe.defaults;
  const deployDefaults = deploySafe.defaults;

  // to do : fix shared info
  export let opts: Required<KindedOptions['Safe'] | DeployKindedOptions['Safe'] > = {
    kind: 'Safe',
    ...contractDefaults,
    ...deployDefaults,
    contractInfo: {  securityContact: 'Consult full code at https://github.com/safe-global/safe-smart-account/blob/a9e3385bb38c29d45b3901ff7180b59fcee86ac9/contracts/proxies/SafeProxy.sol', license: 'MIT'  },
    deployInfo: {  securityContact: 'Consult full internal deploy script at https://github.com/Ratimon/redprint-forge', license: 'MIT'  },
  };
  
</script>
  
<section class="controls-section">
  <h1>Settings</h1>

  <label class="labeled-input">
    <span>Name</span>
    <input bind:value={opts.contractName}>
  </label>
</section>

<section class="controls-section">
  <h1>Chains</h1>

  <div class="checkbox-group">

    <label class:checked={opts.chain === 'ethereum'}>
      <input type="radio" bind:group={opts.chain} value='ethereum'>
      Ethereum
      <HelpTooltip link="https://chainlist.org/chain/1">
        Default Chain is Ethereum. Safe's smart contracts should be already deployed, so we can call them to initial our safe wallet 
      </HelpTooltip>
    </label>

  </div>

</section>

<section class="controls-section">
  <h1>OpSec Management</h1>
  <div class="checkbox-group">
      
    <label class:checked={opts.opSec === 'mnemonic'}>
      <input type="radio" bind:group={opts.opSec} value='mnemonic'>
      Mnemonic
      <HelpTooltip>
        Mnemonic
      </HelpTooltip>
    </label>

    <label class:checked={opts.opSec === 'key'}>
      <input type="radio" bind:group={opts.opSec} value='key'>
      Key
      <HelpTooltip>
        Key
      </HelpTooltip>
    </label>

    <label class:checked={opts.opSec === 'address'}>
      <input type="radio" bind:group={opts.opSec} value='address'>
      Address
      <HelpTooltip>
        Address
      </HelpTooltip>
    </label>

  </div>
</section>

<InfoSection bind:info={opts.contractInfo} />
  
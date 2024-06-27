<script lang="ts">
  import HelpTooltip from './HelpTooltip.svelte';

  import type { KindedOptions } from '$lib/wizard/shared';

  import { safe } from '$lib/wizard/smart-contracts';
  import { deploySafe } from '$lib/wizard/deploy-scripts';

  import InfoSection from './InfoSection.svelte';

  const contractDefaults = safe.defaults;
  const deployDefaults = deploySafe.defaults;

  export let opts: Required<KindedOptions['Safe'] > = {
    kind: 'Safe',
    ...contractDefaults,
    ...deployDefaults,
    contractInfo: {  securityContact: 'Consult full code at https://github.com/safe-global/safe-smart-account/blob/a9e3385bb38c29d45b3901ff7180b59fcee86ac9/contracts/proxies/SafeProxy.sol', license: 'MIT'  },
    deployInfo: {  securityContact: 'Consult full internal deploy script at https://github.com/Ratimon/redprint-forge', license: 'MIT'  },
  };

  
</script>
  
<section class="controls-section">
  <h1 class="bg-neutral-content" >Contract Settings</h1>

  <label class="labeled-input">
    <span>Name</span>
    <input bind:value={opts.contractName}>
  </label>
</section>

<InfoSection bind:info={opts.contractInfo} />

<section class="controls-section">
  <h1 class="bg-neutral-content" >Deploy Script Settings</h1>
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
    <span>Owner </span>
    <label class:checked={opts.opSec === 'address'}>
      <input type="radio" bind:group={opts.opSec} value='address'>
      Address
      <HelpTooltip>
        It is noted that this address will be set as owner, not the deployer of the contract.
      </HelpTooltip>
    </label>

    <label class:checked={opts.opSec === 'key'}>
      <input type="radio" bind:group={opts.opSec} value='key'>
      Key
      <HelpTooltip>
        It is not recommended to store your private key in the environment file.
      </HelpTooltip>
    </label>

    <label class:checked={opts.opSec === 'mnemonic'}>
      <input type="radio" bind:group={opts.opSec} value='mnemonic'>
      Mnemonic
      <HelpTooltip>
        It is not recommended to store your mnemonic in the environment file.
      </HelpTooltip>
    </label>
  </div>
</section>
<script lang="ts">
    import HelpTooltip from './HelpTooltip.svelte';
  
    import type { KindedOptions } from '$lib/wizard/smart-contracts';
    import { safe, infoDefaults } from '$lib/wizard/smart-contracts';
    import InfoSection from './InfoSection.svelte';

    const defaults = safe.defaults;
  
    export let opts: Required<KindedOptions['Safe']> = {
      kind: 'Safe',
      ...defaults,
      info: {  securityContact: 'Consult full contract at https://github.com/safe-global/safe-smart-account/blob/main/contracts/proxies/SafeProxy.sol', license: 'MIT'  },
    };
  
  </script>
  
  <section class="controls-section">
    <h1>Settings</h1>
  
    <label class="labeled-input">
      <span>Name</span>
      <input bind:value={opts.name}>
    </label>sanitizeContractKind
  </section>
  
  <section class="controls-section">
    <h1>Chains</h1>
  
    <div class="checkbox-group">
      <label class:checked={opts.chain === 'ethereum'}>
        <input type="radio" bind:group={opts.chain} value="ethereum">
        Ethereum
        <HelpTooltip link="https://chainlist.org/chain/1">
          Default Chain is Ethereum. Safe's smart contracts should be already deployed, so we can call them to initial our safe wallet 
        </HelpTooltip>
      </label>
  

    </div>
  </section>


<InfoSection bind:info={opts.info} />
  
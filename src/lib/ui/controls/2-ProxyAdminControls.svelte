<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import HelpTooltip from '$lib/ui/controls/HelpTooltip.svelte';
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedProxyAdminOptions } from '$lib/wizard/shared';
  
    import { proxyAdmin } from '$lib/wizard/smart-contracts';
    import { deployProxyAdmin } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = proxyAdmin.defaults;
    const deployDefaults = deployProxyAdmin.defaults;
  
    export let opts: Required<KindedProxyAdminOptions['ProxyAdmin'] > = {
      kind: 'ProxyAdmin',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code at https://github.com/ethereum-optimism/optimism/blob/v1.9.0/packages/contracts-bedrock/src/legacy/AddressManager.sol', license: 'MIT'  },
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
  
  <InfoSection bind:info={opts.contractInfo} />
  
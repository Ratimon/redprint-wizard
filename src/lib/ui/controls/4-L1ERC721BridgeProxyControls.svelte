<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedL1ERC721BridgeProxyOptions } from '$lib/wizard/shared';
  
    import { l1ERC721BridgeProxy } from '$lib/wizard/smart-contracts';
    import { deployL1ERC721BridgeProxy } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = l1ERC721BridgeProxy.defaults;
    const deployDefaults = deployL1ERC721BridgeProxy.defaults;
  
    export let opts: Required<KindedL1ERC721BridgeProxyOptions['L1ERC721BridgeProxy'] > = {
      kind: 'L1ERC721BridgeProxy',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code at https://github.com/ethereum-optimism/optimism/blob/v1.9.0/packages/contracts-bedrock/src/universal/Proxy.sol', license: 'MIT'  },
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
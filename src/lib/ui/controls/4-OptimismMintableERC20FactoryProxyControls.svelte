<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedOptimismMintableERC20FactoryProxyOptions } from '$lib/wizard/shared';
  
    import { optimismMintableERC20FactoryProxy } from '$lib/wizard/smart-contracts';
    import { deployOptimismMintableERC20FactoryProxy } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = optimismMintableERC20FactoryProxy.defaults;
    const deployDefaults = deployOptimismMintableERC20FactoryProxy.defaults;
  
    export let opts: Required<KindedOptimismMintableERC20FactoryProxyOptions['OptimismMintableERC20FactoryProxy'] > = {
      kind: 'OptimismMintableERC20FactoryProxy',
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
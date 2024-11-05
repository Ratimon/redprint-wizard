<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedOptimismMintableERC20FactoryOptions } from '$lib/wizard/shared';
  
    import { optimismMintableERC20Factory } from '$lib/wizard/smart-contracts';
    import { deployOptimismMintableERC20Factory } from '$lib/wizard/deploy-scripts';
  
    const contractDefaults = optimismMintableERC20Factory.defaults;
    const deployDefaults = deployOptimismMintableERC20Factory.defaults;
  
    export let opts: Required<KindedOptimismMintableERC20FactoryOptions['OptimismMintableERC20Factory'] > = {
      kind: 'OptimismMintableERC20Factory',
      ...contractDefaults,
      ...deployDefaults,

      contractInfo: {  securityContact: 'Consult full code at https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/src/universal/OptimismMintableERC20Factory.sol', license: 'MIT'  },
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
<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
    import HelpTooltip from '$lib/ui/controls/HelpTooltip.svelte';
  
    import type { KindedInitializeImplementationsOptions } from '$lib/wizard/shared';
  
    import { deployInitializeImplementations } from '$lib/wizard/deploy-scripts';
  
    const deployInitializeImplementationsDefaults = deployInitializeImplementations.defaults;
  
    export let opts: Required<KindedInitializeImplementationsOptions['InitializeImplementations'] > = {
      kind: 'InitializeImplementations',
      ...deployInitializeImplementationsDefaults,
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

<section class="controls-section">
  <h2 class="m-4 font-extrabold">Initialize Implementations</h2>
  <div class="checkbox-group">
    <h1>OptimismPortal</h1>

    <label class:checked={opts.useFaultProofs === 'no-optimism-portal'}>
      <input type="radio" bind:group={opts.useFaultProofs} value='no-optimism-portal'>
      Without Fault Proofs
      <HelpTooltip>
        Set cfg.useFaultProofs==false, OptimismPortal will be initialized without fault proofs.
      </HelpTooltip>
    </label>

    <label class:checked={opts.useFaultProofs === 'yes-optimism-portal-2'}>
      <input type="radio" bind:group={opts.useFaultProofs} value='yes-optimism-portal-2'>
      With Fault Proofs
      <HelpTooltip>
        Set cfg.useFaultProofs==true, OptimismPortal2 will be initialized with fault proofs.
      </HelpTooltip>
    </label>

  </div>
</section>

<section class="controls-section">
  <h1>SystemConfig</h1>
  <div class="checkbox-group">
    
    <label class:checked={opts.useCustomToken === 'no-custom-token'}>
      <input type="radio" bind:group={opts.useCustomToken} value='no-custom-token'>
      Without Custom Token
      <HelpTooltip>
        Set cfg.useCustomGasToken==false, the contract will use the default gas token (Constants.ETHER).
      </HelpTooltip>
    </label>
  
    <label class:checked={opts.useCustomToken === 'yes-custom-token'}>
      <input type="radio" bind:group={opts.useCustomToken} value='yes-custom-token'>
      With Custom Token
      <HelpTooltip>
        Set cfg.useCustomGasToken==true, the contract will use the custom gas token (specified below).
      </HelpTooltip>
    </label>
  
    <label class="labeled-input">

      <span>Custom Gas Token Address</span>
      <input bind:value={opts.customGasTokenaddress}>
    </label>
  </div>
</section>

<section class="controls-section">
  <h1>L1StandardBridge</h1>
</section>

<section class="controls-section">
  <h1>L1ERC721Bridge</h1>
</section>

<section class="controls-section">
  <h1>OptimismMintableERC20Factory</h1>
</section>

<section class="controls-section">
  <h1>L1CrossDomainMessenger</h1>
</section>

<section class="controls-section">
  <h1>L2OutputOracle</h1>
</section>

<section class="controls-section">
  <h1>DisputeGameFactory</h1>
</section>

<section class="controls-section">
  <h1>DelayedWETH</h1>
</section>

<section class="controls-section">
  <h1>PermissionedDelayedWETH</h1>
</section>

<section class="controls-section">
  <h1>AnchorStateRegistry</h1>
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

<InfoSection bind:info={opts.deployInfo} />
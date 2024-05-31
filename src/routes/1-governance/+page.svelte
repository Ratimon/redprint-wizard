<script  lang="ts">
    import { createEventDispatcher } from 'svelte';

    import CopyIcon from '$lib/ui/icons/CopyIcon.svelte';
    import CheckIcon from '$lib/ui/icons/CheckIcon.svelte';

    import GovernorControls from '$lib/ui/controls/1-GovernorControls.svelte';
    import SafeControls from '$lib/ui/controls//1-SafeControls.svelte';

    import { injectHyperlinks } from '$lib/ui/utils/inject-hyperlinks';

    import type { KindedOptions, Kind, Contract, OptionsErrorMessages } from '$lib/wizard/smart-contracts';
    import { ContractBuilder, buildContractGeneric, printContract, sanitizeContractKind, ContractOptionsError } from '$lib/wizard/smart-contracts';

    import type { DeployKindedOptions, DeployKind, DeployContract, DeployOptionsErrorMessages } from '$lib/wizard/deploy-scripts';
    import { DeployBuilder, buildDeployGeneric, printDeployContract, sanitizeDeployKind, DeployOptionsError } from '$lib/wizard/deploy-scripts';

    import hljs from '../highlightjs';
    import { postConfig } from '../post-config';

    const dispatch = createEventDispatcher();

    export let initialContractTab: string | undefined = 'Governor';
    export let contractTab: Kind | DeployKind = sanitizeContractKind(initialContractTab);

    $: {
      contractTab = sanitizeContractKind(contractTab);
      dispatch('contractTab-change', contractTab);
    };

    let allContractsOpts: { [k in Kind]?: Required<KindedOptions[k] | DeployKindedOptions [k]> } = {};
    let errors: { [k in Kind]?: OptionsErrorMessages | DeployOptionsErrorMessages } = {};

    let contract: Contract = new ContractBuilder('SafeProxy');
    let deployContract: DeployContract = new DeployBuilder('DeploySafeScript');

    $: contractOpts = allContractsOpts[contractTab];

    $: {
    if (contractOpts) {
            try {
                contract = buildContractGeneric(contractOpts);
                deployContract = buildDeployGeneric(contractOpts);
                errors[contractTab] = undefined;
            } catch (e: unknown) {
                if (e instanceof ContractOptionsError) {
                errors[contractTab] = e.messages;
                } else {
                throw e;
                }
            }
        }
    }

  $: code = printContract(contract);
  $: deployCode = printDeployContract(deployContract);
  // injected hyper link
  // $: highlightedCode = hljs.highlight(code, {language: 'solidity'} ).value;
  $: highlightedCode = injectHyperlinks(hljs.highlight(code, {language: 'solidity'} ).value);
  $: highlightedDeployCode = injectHyperlinks(hljs.highlight(deployCode, {language: 'solidity'} ).value);

  const language = 'solidity';

  let copied = false;
  const copyHandler = async () => {
    await navigator.clipboard.writeText(code);
    copied = true;
    if (contractOpts) {
        await postConfig(contractOpts, 'copy', language);
    }
    setTimeout(() => {
        copied = false;
    }, 1000);
  };


</script>

<div class="container flex flex-col gap-4 p-8 mx-8">

  <div class="divider divider-primary bg-primary-100">
    <p class="text-2xl">1.1 Contracts</p>
  </div>

  <div class="header flex flex-row justify-between">

    <div class="tab overflow-hidden">
    
        <ul class="menu menu-horizontal bg-base-200">
          <li>
            <button class:selected={contractTab === 'Safe'} on:click={() => contractTab = 'Safe'}>
              Safe MultiSig
            </button>
          </li>
          <li>
            <button class:selected={contractTab === 'Governor'} on:click={() => contractTab = 'Governor'}>
              Governor
            </button>
          </li>
        </ul>
    </div>

    <div class="action flex flex-row gap-2 shrink-0">
        <button class="action-button min-w-[165px]" on:click={copyHandler}>
          <div class="flex justify-between">
            {#if copied}
              <CheckIcon />Copied
            {:else}
              <CopyIcon />Copy to Clipboard
            {/if}
          </div>
        </button>
    </div>

  </div>

  <div class="flex flex-row gap-4 grow">
    <!-- w-64 -->
    <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">

      <div class:hidden={contractTab !== 'Safe'}>
        <SafeControls bind:opts={allContractsOpts.Safe}  />
      </div>

      <div class:hidden={contractTab !== 'Governor'}>
        <GovernorControls bind:opts={allContractsOpts.Governor} errors={errors.Governor} />
      </div>

    </div>

    <div class="output flex flex-col grow overflow-auto h-[calc(150vh-40px)]">

      <div class="badge badge-primary badge-outline badge-lg">
        Smart Contract
      </div>

      <pre class="flex flex-col grow basis-0 overflow-auto">
        <code class="hljs grow overflow-auto p-4">
          {@html highlightedCode}
        </code>
      </pre>
    </div>
    
    <div class="output flex flex-col grow overflow-auto h-[calc(150vh-40px)]">

      <div class="badge badge-primary badge-outline badge-lg">
        Deploy Script
      </div>

      <pre class="flex flex-col grow basis-0 overflow-auto">
        <code class="hljs grow overflow-auto p-4">
          {@html highlightedDeployCode}
        </code>
      </pre>
    </div>
    
  </div>

  <div class="divider divider-primary bg-primary-100">
    <p class="text-2xl">1.1 Contracts</p>
  </div>

</div>

<style lang="postcss">
    .container {
      background-color: var(--gray-1);
      border: 1px solid var(--gray-2);
      border-radius: 10px;
      min-width: 32rem;
    }
  
    /* .header {
      font-size: var(--text-small);
    } */
  
    .tab {
      color: var(--gray-5);
    }
  
    .tab button, .action-button, :global(.overflow-btn) {
      padding: var(--size-1) var(--size-2);
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
    }
  
    .tab button, :global(.overflow-btn) {
      border: 0;
      background-color: transparent;
    }
  
    .tab button:hover, :global(.overflow-btn):hover {
      background-color: var(--gray-2);
    }
  
    .tab button.selected {
      background-color: var(--solidity-blue-2);
      color: white;
      order: -1;
    }
  
    :global(.overflow-menu) button.selected {
      order: unset;
    }
  
    .action-button {
      background-color: var(--gray-1);
      border: 1px solid var(--gray-3);
      color: var(--gray-6);
      cursor: pointer;
  
      &:hover {
        background-color: var(--gray-2);
      }
  
      /* &:active, &.active {
        background-color: var(--gray-2);
      }
      */

      /* &.disabled {
        color: var(--gray-4);
      } */
  
      :global(.icon) {
        margin-right: var(--size-1);
      }
    }
  
    .controls {
      background-color: white;
      padding: var(--size-4);
    }
  
    .controls {
      border-radius: 5px;
      box-shadow: var(--shadow);
    }
  
</style>
  
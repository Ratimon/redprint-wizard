<script  lang="ts">
    import { createEventDispatcher } from 'svelte';

    import CopyIcon from '$lib/ui/icons/CopyIcon.svelte';
    import CheckIcon from '$lib/ui/icons/CheckIcon.svelte';

    import GovernorControls from '$lib/ui/controls/GovernorControls.svelte';

    import { injectHyperlinks } from '$lib/ui/utils/inject-hyperlinks';
    import type { KindedOptions, Kind, Contract, OptionsErrorMessages } from '$lib/wizard';
    import { ContractBuilder, buildGeneric, printContract, sanitizeKind, OptionsError } from '$lib/wizard';
    import hljs from '../highlightjs';
    import { postConfig } from '../post-config';

    const dispatch = createEventDispatcher();

    export let initialTab: string | undefined = 'Governor';
    export let tab: Kind = sanitizeKind(initialTab);

    $: {
        tab = sanitizeKind(tab);
        dispatch('tab-change', tab);
    };

    let allOpts: { [k in Kind]?: Required<KindedOptions[k]> } = {};
    let errors: { [k in Kind]?: OptionsErrorMessages } = {};

    let contract: Contract = new ContractBuilder('MyToken');

    $: opts = allOpts[tab];

    $: {
    if (opts) {
            try {
                contract = buildGeneric(opts);
                errors[tab] = undefined;
            } catch (e: unknown) {
                if (e instanceof OptionsError) {
                errors[tab] = e.messages;
                } else {
                throw e;
                }
            }
        }
    }

  $: code = printContract(contract);
  // injected hyper link
  // $: highlightedCode = hljs.highlight(code, {language: 'solidity'} ).value;
  $: highlightedCode = injectHyperlinks(hljs.highlight(code, {language: 'solidity'} ).value);

  const language = 'solidity';

  let copied = false;
  const copyHandler = async () => {
    await navigator.clipboard.writeText(code);
    copied = true;
    if (opts) {
        await postConfig(opts, 'copy', language);
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
              <button class:selected={tab === 'Governor'} on:click={() => tab = 'Governor'}>
                Governor
              </button>
            </li>
            <li>
              <button class:selected={tab === 'Governor'} on:click={() => tab = 'Governor'}>
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
    <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(210vh-80px)] overflow-auto">
      <div class:hidden={tab !== 'Governor'}>
        <GovernorControls bind:opts={allOpts.Governor} errors={errors.Governor} />
      </div>
    </div>

    

    <div class="output flex flex-col grow overflow-auto h-[calc(210vh-40px)]">

      <div class="badge badge-primary badge-outline badge-lg">
        Smart Contract
      </div>

      <pre class="flex flex-col grow basis-0 overflow-auto">
        <code class="hljs grow overflow-auto p-4">
          {@html highlightedCode}
        </code>
      </pre>
    </div>
    
    <div class="output flex flex-col grow overflow-auto h-[calc(210vh-40px)]">

      <div class="badge badge-primary badge-outline badge-lg">
        Deploy Script
      </div>

      <pre class="flex flex-col grow basis-0 overflow-auto">
        <code class="hljs grow overflow-auto p-4">
          {@html highlightedCode}
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
  
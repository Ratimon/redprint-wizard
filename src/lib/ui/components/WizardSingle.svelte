<script  lang="ts">
  import { createEventDispatcher } from 'svelte';

  import fileSaver from 'file-saver';
  import { v4 as uuid } from 'uuid';

  import CopyBlock from '$lib/ui/components/CopyBlock.svelte';
  import CopyIcon from '$lib/ui/icons/CopyIcon.svelte';
  import CheckIcon from '$lib/ui/icons/CheckIcon.svelte';
  import FileIcon from '$lib/ui/icons/FileIcon.svelte';

  import { injectHyperlinks } from '$lib/ui/utils/inject-hyperlinks';
  import {copyToClipboard} from '$lib/ui/utils/clipboard';
  import hljs  from '$lib/ui/utils/highlightjs';

  import type {  Kind,  } from '$lib/wizard/shared';
  import {  sanitizeKind, } from '$lib/wizard/shared';

  import type {  DeployContract } from '$lib/wizard/deploy-scripts';
  import {  printDeployContract } from '$lib/wizard/deploy-scripts';

  import MarkdownIt from "markdown-it";

  import type { GaEvent } from '$lib/analytics/analytics.Store';
  import { analyticsStore } from '$lib/analytics/analytics.Store';

  export let deployContract: DeployContract;
  export let opts;

  export let isShowingCommand: boolean = true;

  export let conventionNumber: string;
  $: codeCommand = `forge script script/${conventionNumber}_${deployContract.name}.s.sol --trezor --sender <DEPLOYER_ADDRESS> --rpc-url <RPC_URL> --broadcast`
  $: optionCommand = `--mnemonic-derivation-paths \"m/44'/60'/0'/0/0\"`
  
  const dispatch = createEventDispatcher();

  // to do : handling unwanted bug when duplicate contractTab eg duplicate GaEvent counts
  export let initialContractTab: string | undefined ;
  export let contractTab: Kind = sanitizeKind(initialContractTab);

  $: {
    contractTab = sanitizeKind(contractTab);
    dispatch('contractTab-change', contractTab);
  };

  $: deployCode = printDeployContract(deployContract);
  $: highlightedDeployCode = injectHyperlinks(hljs.highlight(deployCode, {language: 'solidity'} ).value);
  
  let isScriptCopied = false;

  const copyScriptHandler = async () => {
    copyToClipboard(deployCode);
    isScriptCopied = true;

    if (opts) {
      const new_event : GaEvent  = {
        id:   uuid(),
        data: {...opts},
        event: `copy-script-${contractTab}`,
        type: "event",
      }
      $analyticsStore = [...$analyticsStore, new_event]
    }

    setTimeout(() => {
      isScriptCopied = false;
    }, 1000);
  };


  const downloadScriptNpmHandler = async () => {
    const blob = new Blob([deployCode], { type: 'text/plain' });
    if (opts) {
      fileSaver.saveAs(blob, opts.deployName + '.sol');
      const new_event : GaEvent  = {
        id:   uuid(),
        data: {...opts},
        event: `download-script-${contractTab}`,
        type: "event",
      }
      $analyticsStore = [...$analyticsStore, new_event]
    }
  };


  // to do : optimize bundler
  const md = MarkdownIt({
    html: true,
    linkify: true,
    highlight: function (str: string, lang: string) {
    // to do : refactor : hljs to specify language
    if (lang && hljs.getLanguage(lang)) {
    try {
        return hljs.highlight(str, { language: lang }).value;
    } catch (err) {
        // Handle error
        }
    }
    return '';
    }
  });

  
</script>

<div class="container flex flex-col gap-4 p-8 mx-8">

  {#if isShowingCommand}

    <div class="pt-3 pb-4 justify-center">
      <h2 class="m-4 font-semibold">In your terminal, copy below contracts' codes and run deployment scripts to your prefered network:</h2>
      <CopyBlock
        boxClass="p-2 rounded-box font-black text-primary max-w-full mx-auto text-center"
        class="mb-5"
        background="bg-primary-content"
        copiedBackground="bg-success"
        copiedColor="text-success-content"
        text={codeCommand}
      />
    </div>

    <div class="pt-3 pb-4 justify-center">
      <h2 class="m-4 font-semibold">(Optional), you can specify your derivation path:</h2>
      <CopyBlock
        boxClass="p-2 rounded-box font-black text-primary max-w-full mx-auto text-center"
        class="mb-5"
        background="bg-primary-content"
        copiedBackground="bg-success"
        copiedColor="text-success-content"
        text={optionCommand}
      />
    </div>
  {/if}

  <div class="pt-3 pb-4 justify-center">
    <slot name="caption" />
  </div>


  <div class="pt-3 pb-4 header flex flex-row justify-between">

    <slot name="menu" />

    <div class="action flex flex-row gap-2 shrink-0">
      <button class="action-button min-w-[165px]" on:click={copyScriptHandler}>
        <div class="flex justify-between">
          {#if isScriptCopied}
            <CheckIcon />Copied
          {:else}
            <CopyIcon />Copy Script Code
          {/if}
        </div>
      </button>

      <button class="action-button min-w-[165px]" on:click={downloadScriptNpmHandler}>
        <div class="flex justify-between">
          <FileIcon /> Download As .sol
        </div>
      </button>

    </div>

  </div>

  <div class="flex flex-row gap-4 grow">

    <slot name="control" />

    <div class="output flex flex-col grow overflow-auto h-[calc(120vh-40px)]">
      <div class="badge badge-primary badge-outline badge-lg">
        Deploy Script:
      </div>
      <div class="badge badge-primary badge-outline badge-lg">
        {conventionNumber}_{deployContract.name}.s.sol
      </div>

      <pre class="flex flex-col grow basis-0 overflow-auto">
        <code class="hljs grow overflow-auto p-4">
          {@html highlightedDeployCode}
        </code>
      </pre>

    </div>
    
  </div>

  <slot name="artifact" />

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

  /* .tab {
      color: var(--gray-5);
  }
  */
  .action-button, :global(.overflow-btn) {
      padding: var(--size-1) var(--size-2);
      border-radius: 6px;
      font-weight: bold;
      cursor: pointer;
  }

  :global(.overflow-btn) {
      border: 0;
      background-color: transparent;
  }

  :global(.overflow-btn):hover {
      background-color: var(--gray-2);
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

</style>
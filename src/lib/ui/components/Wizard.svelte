<script  lang="ts">
  import { createEventDispatcher } from 'svelte';

  import fileSaver from 'file-saver';
  import { v4 as uuid } from 'uuid';

  import Background from '$lib/ui/background/Background.svelte';

  import CopyBlock from '$lib/ui/components/CopyBlock.svelte';
  import CopyIcon from '$lib/ui/icons/CopyIcon.svelte';
  import CheckIcon from '$lib/ui/icons/CheckIcon.svelte';
  import FileIcon from '$lib/ui/icons/FileIcon.svelte';

  import { injectHyperlinks } from '$lib/ui/utils/inject-hyperlinks';
  import {copyToClipboard} from '$lib/ui/utils/clipboard';
  import hljs  from '$lib/ui/utils/highlightjs';

  // to do remove Generic in Smart contract
  import type {  Kind } from '$lib/wizard/shared';
  import {  sanitizeKind } from '$lib/wizard/shared';

  import type {  Contract } from '$lib/wizard/smart-contracts';
  import { printContract } from '$lib/wizard/smart-contracts';

  import type {  DeployContract } from '$lib/wizard/deploy-scripts';
  import {  printDeployContract } from '$lib/wizard/deploy-scripts';

  import type { GaEvent } from '$lib/analytics/analytics.Store';
  import { analyticsStore } from '$lib/analytics/analytics.Store'
  
  $: codeCommand1 = `forge script script/100_${deployContract.name}.s.sol --trezor --sender <DEPLOYER_ADDRESS> --rpc-url <RPC_URL> --broadcast`
  $: codeCommand2 = `--mnemonic-derivation-paths \"m/44'/60'/0'/0/0\"`
  
    const dispatch = createEventDispatcher();

    // to do : handling unwanted bug when duplicate contractTab eg duplicate GaEvent counts
    export let initialContractTab: string | undefined ;
    export let contractTab: Kind = sanitizeKind(initialContractTab);
  
    $: {
      contractTab = sanitizeKind(contractTab);
      dispatch('contractTab-change', contractTab);
    };

    export let contract: Contract ;
    export let deployContract: DeployContract;
    export let opts;
  
    $: code = printContract(contract);
    $: deployCode = printDeployContract(deployContract);

    $: highlightedCode = injectHyperlinks(hljs.highlight(code, {language: 'solidity'} ).value);
    $: highlightedDeployCode = injectHyperlinks(hljs.highlight(deployCode, {language: 'solidity'} ).value);
    
    let isContractCopied = false;

    const copyContractHandler = async () => {
      copyToClipboard(code);
      isContractCopied = true;

      if (opts) {
        const new_event : GaEvent  = {
          id:   uuid(),
          data: {...opts},
          event: `copy-contract-${contractTab}`,
          type: "event",
        }
        $analyticsStore = [...$analyticsStore, new_event]
      }

      setTimeout(() => {
        isContractCopied = false;
      }, 1000);
    };
  
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
  
    const downloadContractNpmHandler = async () => {

      const blob = new Blob([code], { type: 'text/plain' });
      if (opts) {
        fileSaver.saveAs(blob, opts.contractName + '.sol');
      }

      const new_event : GaEvent  = {
        id:   uuid(),
        data: {...opts},
        event: `download-contract-${contractTab}`,
        type: "event",
      }
      $analyticsStore = [...$analyticsStore, new_event]
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
  
  </script>
  
  <div class="container flex flex-col gap-4 p-8 mx-8">
  
    <Background color="bg-base-100">
      <div class="divider divider-primary ">
        <p class="text-2xl">1.1 : Deploy Contracts</p>
      </div>
    </Background>

    <div class="pt-3 pb-4 justify-center">
      <h2 class="m-4 font-semibold">In your terminal, copy below contracts' codes and run deployment scripts to your prefered network:</h2>
      <CopyBlock
        boxClass="p-2 rounded-box font-black text-primary max-w-full mx-auto text-center"
        class="mb-5"
        background="bg-primary-content"
        copiedBackground="bg-success"
        copiedColor="text-success-content"
        text={codeCommand1}
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
        text={codeCommand2}
      />
    </div>

    <div class="pt-3 pb-4 header flex flex-row justify-between">

      <slot name="menu" />
  
      <div class="action flex flex-row gap-2 shrink-0">
        <button class="action-button min-w-[150px]" on:click={copyContractHandler}>
          <div class="flex justify-between">
            {#if isContractCopied}
              <CheckIcon />Copied
            {:else}
              <CopyIcon />Copy Contract Code
            {/if}
          </div>
        </button>
  
        <button class="action-button min-w-[150px]" on:click={downloadContractNpmHandler}>
          <div class="flex justify-between">
            <FileIcon /> Download As .sol
          </div>
        </button>
  
      </div>
  
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

      <div class="output flex flex-col grow overflow-auto h-[calc(165vh-40px)]">
        <div class="badge badge-primary badge-outline badge-lg">
          Smart Contract: {contract.name}.sol
        </div>
  
        <pre class="flex flex-col grow basis-0 overflow-auto">
          <code class="hljs grow overflow-auto p-4">
            {@html highlightedCode}
          </code>
        </pre>
      </div>
      
      <div class="output flex flex-col grow overflow-auto h-[calc(165vh-40px)]">
        <div class="badge badge-primary badge-outline badge-lg">
          Deploy Script: {deployContract.name}.s.sol
        </div>
  
        <pre class="flex flex-col grow basis-0 overflow-auto">
          <code class="hljs grow overflow-auto p-4">
            {@html highlightedDeployCode}
          </code>
        </pre>
      </div>
        
    </div>
  
    <!-- to do : Add menu to scroll to each contract -->
    <!-- to do : eg. 1.2 upgrade contract (coming soon) -->
  
    <Background color="bg-base-100">
      <div class="divider divider-primary">
        <p class="text-2xl">1.1 : Deploy Contracts</p>
      </div>
    </Background>

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
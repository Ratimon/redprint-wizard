<script  lang="ts">
    import { createEventDispatcher } from 'svelte';
    import MarkdownIt from "markdown-it";
  
    import CopyIcon from '$lib/ui/icons/CopyIcon.svelte';
    import CheckIcon from '$lib/ui/icons/CheckIcon.svelte';
    import FileIcon from '$lib/ui/icons/FileIcon.svelte';
  
    import { injectHyperlinks } from '$lib/ui/utils/inject-hyperlinks';

    // to do remove Generic in Smart contract
    import type {  Kind } from '$lib/wizard/shared';
    import {  sanitizeKind } from '$lib/wizard/shared';
  
    import type {  Contract } from '$lib/wizard/smart-contracts';
    import { printContract } from '$lib/wizard/smart-contracts';
  
    import type {  DeployContract } from '$lib/wizard/deploy-scripts';
    import {  printDeployContract } from '$lib/wizard/deploy-scripts';
  
    import hljs  from '$lib/ui/utils/highlightjs';
    import { postConfig } from '$lib/ui/utils/post-config';
  
    import fileSaver from 'file-saver';
  
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
  
    $: codeExample1 = md.render(`
  \`\`\`bash
    forge script script/100_${deployContract.name}.s.sol --trezor --sender <DEPLOYER_ADDRESS> --rpc-url <RPC_URL> --broadcast
  \`\`\`
  `);

  $: codeExample2 = md.render(`
  \`\`\`bash
    --mnemonic-derivation-paths \"m/44'/60'/0'/0/0\"
  \`\`\`
  `);
  
    const dispatch = createEventDispatcher();

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
    // injected hyper link
    // $: highlightedCode = hljs.highlight(code, {language: 'solidity'} ).value;
    $: highlightedCode = injectHyperlinks(hljs.highlight(code, {language: 'solidity'} ).value);
    $: highlightedDeployCode = injectHyperlinks(hljs.highlight(deployCode, {language: 'solidity'} ).value);
  
    const language = 'solidity';
  
    let isContractCopied = false;
    const copyContractHandler = async () => {
      await navigator.clipboard.writeText(code);
      isContractCopied = true;
      if (opts) {
          await postConfig(opts, 'copy-contract', language);
      }
      setTimeout(() => {
        isContractCopied = false;
      }, 1000);
    };
  
    let isScriptCopied = false;
    const copyScriptHandler = async () => {
      await navigator.clipboard.writeText(deployCode);
      isScriptCopied = true;
      if (opts) {
          await postConfig(opts, 'copy-script', language);
      }
      setTimeout(() => {
        isScriptCopied = false;
      }, 1000);
    };
  
    const downloadContractNpmHandler = async () => {
        const blob = new Blob([code], { type: 'text/plain' });
        if (opts) {
          fileSaver.saveAs(blob, opts.contractName + '.sol');
          await postConfig(opts, 'download-contract', language);
        }
    };
  
    const downloadScriptNpmHandler = async () => {
        const blob = new Blob([deployCode], { type: 'text/plain' });
        if (opts) {
          fileSaver.saveAs(blob, opts.deployName + '.sol');
          await postConfig(opts, 'download-script', language);
        }
    };
  
  </script>
  
  <div class="container flex flex-col gap-4 p-8 mx-8">
  
    <div class="divider divider-primary bg-primary-100">
      <p class="text-2xl">1.1 : Deploy Contracts</p>
    </div>
  
    <p>In your terminal, copy below contracts' codes and run deployment scripts to your prefered network:</p>
  
    <div class="flex flex-row justify-center">
      <code class="hljs">
        {@html md.render(codeExample1)}
      </code>
    </div>
  
    <p>(Optional), you can specify your derivation path:</p>
  
    <div class="flex flex-row justify-center">
      <code class="hljs">
        {@html md.render(codeExample2)}
      </code>
    </div>

    <div class="header flex flex-row justify-between">

      <slot name="menu" />
  
      <div class="action flex flex-row gap-2 shrink-0">
        <!-- to do : track analytics -->
        <button class="action-button min-w-[165px]" on:click={copyContractHandler}>
          <div class="flex justify-between">
            {#if isContractCopied}
              <CheckIcon />Copied
            {:else}
              <CopyIcon />Copy Contract Code
            {/if}
          </div>
        </button>
  
        <!-- to do : track analytics -->
        <button class="action-button min-w-[165px]" on:click={downloadContractNpmHandler}>
          <div class="flex justify-between">
            <FileIcon /> Download As .sol
          </div>
        </button>
  
      </div>
  
      <!-- to do : track analytics -->
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
  
        <!-- to do : track analytics -->
        <button class="action-button min-w-[165px]" on:click={downloadScriptNpmHandler}>
          <div class="flex justify-between">
            <FileIcon /> Download As .sol
          </div>
        </button>
  
      </div>
  
    </div>
  
    <div class="flex flex-row gap-4 grow">
        <slot name="control" />

      <div class="output flex flex-col grow overflow-auto h-[calc(100vh-40px)]">
        <div class="badge badge-primary badge-outline badge-lg">
          Smart Contract: {contract.name}.sol
        </div>
  
        <pre class="flex flex-col grow basis-0 overflow-auto">
          <code class="hljs grow overflow-auto p-4">
            {@html highlightedCode}
          </code>
        </pre>
      </div>
      
      <div class="output flex flex-col grow overflow-auto h-[calc(100vh-40px)]">
  
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
  
    <div class="divider divider-primary bg-primary-100">
      <p class="text-2xl">1.1 : Deploy Contracts</p>
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
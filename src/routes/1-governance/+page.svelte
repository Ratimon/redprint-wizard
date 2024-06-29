<script  lang="ts">
  import { createEventDispatcher } from 'svelte';
  import MarkdownIt from "markdown-it";

  import CopyIcon from '$lib/ui/icons/CopyIcon.svelte';
  import CheckIcon from '$lib/ui/icons/CheckIcon.svelte';
  import FileIcon from '$lib/ui/icons/FileIcon.svelte';

  import GovernorControls from '$lib/ui/controls/1-GovernorControls.svelte';
  import SafeControls from '$lib/ui/controls//1-SafeControls.svelte';
  import { injectHyperlinks } from '$lib/ui/utils/inject-hyperlinks';

  import type { KindedOptions, Kind, OptionsErrorMessages } from '$lib/wizard/shared';
  import {  sanitizeKind, OptionsError } from '$lib/wizard/shared';

  import type {  Contract } from '$lib/wizard/smart-contracts';
  import { ContractBuilder, buildContractGeneric, printContract } from '$lib/wizard/smart-contracts';

  import type {  DeployContract } from '$lib/wizard/deploy-scripts';
  import { DeployBuilder, buildDeployGeneric, printDeployContract } from '$lib/wizard/deploy-scripts';

  import hljs  from '../highlightjs';
  import { postConfig } from '../post-config';

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

  export let initialContractTab: string | undefined = 'Safe';
  export let contractTab: Kind = sanitizeKind(initialContractTab);

  $: {
    contractTab = sanitizeKind(contractTab);
    dispatch('contractTab-change', contractTab);
  };

  let allContractsOpts: { [k in Kind]?: Required<KindedOptions [k]> } = {};
  let errors: { [k in Kind]?: OptionsErrorMessages } = {};

  let contract: Contract = new ContractBuilder('SafeProxy');
  
  let deployContract: DeployContract = new DeployBuilder('DeploySafeScript');

  $: opts = allContractsOpts[contractTab];
  $: {
  if (opts) {
          try {
              contract = buildContractGeneric(opts);
              deployContract = buildDeployGeneric(opts);
              errors[contractTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
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

    <!-- to do : Add button to download zip -->

    <!-- to do : track analytics -->
    <div class="action flex flex-row gap-2 shrink-0">
        <button class="action-button min-w-[165px]" on:click={copyContractHandler}>
          <div class="flex justify-between">
            {#if isContractCopied}
              <CheckIcon />Copied
            {:else}
              <CopyIcon />Copy Contract Code
            {/if}
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
      <button class="action-button min-w-[165px]" on:click={downloadContractNpmHandler}>
        <div class="flex justify-between">
          <FileIcon /> Download As .sol
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
  <!-- to do : eg. 1.2 upgrade contract (comming soon) -->

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
  
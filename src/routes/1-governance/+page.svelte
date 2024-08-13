<script  lang="ts">
  import type { KindedOptions, Kind, OptionsErrorMessages } from '$lib/wizard/shared';
  import {  sanitizeKind, OptionsError } from '$lib/wizard/shared';

  import type {  Contract } from '$lib/wizard/smart-contracts';
  import { ContractBuilder, buildContractGeneric, printContract } from '$lib/wizard/smart-contracts';

  import type {  DeployContract } from '$lib/wizard/deploy-scripts';
  import { DeployBuilder, buildDeployGeneric, printDeployContract } from '$lib/wizard/deploy-scripts';

  import Background from '$lib/ui/background/Background.svelte';
  import Wizard from '$lib/ui/components/Wizard.svelte';
  import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';
  import CopyBlock from '$lib/ui/components/CopyBlock.svelte';

  import MarkdownIt from "markdown-it";
  import hljs  from '$lib/ui/utils/highlightjs';

  import SafeControls from '$lib/ui/controls//1-SafeControls.svelte';
  import GovernorControls from '$lib/ui/controls/1-GovernorControls.svelte';

  export let initialContractTab: string | undefined = 'Safe';
  export let contractTab: Kind = sanitizeKind(initialContractTab);

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

  $: remmapingContent = md.render(`
  \`\`\`bash
@redprint-core/=node_modules/redprint-forge/src
@redprint-deploy/=node_modules/redprint-forge/script
@redprint-forge-std/=node_modules/redprint-forge/lib/forge-std/src
@redprint-openzeppelin/=node_modules/redprint-forge/lib/openzeppelin-4_9_4/contracts
@redprint-openzeppelin-upgradable/=node_modules/redprint-forge/lib/openzeppelin-upgradable-4_9_4/contracts
@redprint-safe-contracts/=node_modules/redprint-forge/lib/safe-smart-account/contracts
  \`\`\`
  `);

</script>

<Background color="bg-base-100 pt-3 pb-4">
  <div class="divider divider-primary">
    <h1 class="text-2xl ">1.1 : Prerequisites</h1>
  </div>
</Background>

<div class="container flex flex-col gap-4 p-8 mx-8">
  <h2 class="m-4 font-semibold">Add the <a class="bg-primary underline" href="https://github.com/Ratimon/redprint-forge" target="_blank" rel="noreferrer">redprint-forge</a> using your favorite package manager, e.g., with npm:</h2>

  <CopyBlock
    boxClass="p-2 rounded-box font-black text-primary max-w-xl mx-auto"
    class="mb-5"
    background="bg-primary-content"
    copiedBackground="bg-success"
    copiedColor="text-success-content"
    text={`npm install -D redprint-forge`}
  />

  <p class="mt-6 text-base-300">
    Find out more on
    <a class="underline" href="https://github.com/Ratimon/redprint-forge" target="_blank" rel="noreferrer"
      >github
    </a>
  </p>

  <p class="m-4 font-semibold">
    Adding <span class="underline bg-secondary">remappings.txt</span> with following:
  </p>

  <div class="output flex flex-col grow overflow-auto">
      <code class="hljs grow overflow-auto p-4">
        {@html md.render(remmapingContent)}
      </code>
  </div>

  <p class="mt-6 text-base-300">
    We use <span class="underline bg-accent">@redprint-/</span> as a convention to avoid any naming conflicts with your previously installed libararies ( i.e. @redprint-forge-std/ vs @forge-std/)
  </p>

</div>

<Background color="bg-base-100 pt-3 pb-4">
  <div class="divider divider-primary ">
    <p class="text-2xl">1.2 : Deploy Governance Contract</p>
  </div>
</Background>

<Wizard initialContractTab={initialContractTab} contractTab={contractTab} opts={opts} contract={contract} deployContract={deployContract}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractTab === 'Safe'} on:click={() => contractTab = 'Safe'}>
              MultiSig
            </button>
            <button class:selected={contractTab === 'Governor'} on:click={() => contractTab = 'Governor'}>
              Governor
            </button>            
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractTab !== 'Safe'}>
              <SafeControls bind:opts={allContractsOpts.Safe} />
            </div>
          <div class:hidden={contractTab !== 'Governor'}>
              <GovernorControls bind:opts={allContractsOpts.Governor} errors={errors.Governor} />
          </div> 
      </div>
  </div> 

</Wizard>

<!-- to do : Add menu to scroll to each contract -->
<!-- to do : eg. 1.2 upgrade contract (coming soon) -->


<style lang="postcss">

  .container {
      background-color: var(--gray-1);
      border: 1px solid var(--gray-2);
      border-radius: 10px;
      min-width: 32rem;
  }

  .tab {
    color: var(--gray-5);
  }

  .tab button, :global(.overflow-btn) {
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

  .controls {
    background-color: white;
    padding: var(--size-4);
  }

  .controls {
    border-radius: 5px;
    box-shadow: var(--shadow);
  }
</style>
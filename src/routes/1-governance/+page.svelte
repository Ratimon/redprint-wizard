<script  lang="ts">
  import type { KindedOptions, Kind, OptionsErrorMessages } from '$lib/wizard/shared';
  import {  sanitizeKind, OptionsError } from '$lib/wizard/shared';

  import type {  Contract } from '$lib/wizard/smart-contracts';
  import { ContractBuilder, buildContractGeneric, printContract } from '$lib/wizard/smart-contracts';

  import type {  DeployContract } from '$lib/wizard/deploy-scripts';
  import { DeployBuilder, buildDeployGeneric, printDeployContract } from '$lib/wizard/deploy-scripts';

  import Wizard from '$lib/ui/components/Wizard.svelte'

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

</script>

<Wizard initialContractTab={initialContractTab} contractTab={contractTab} opts={opts} contract={contract} deployContract={deployContract}>
  
  <div slot="menu" >
      <div class="tab overflow-hidden">
          <ul class="menu menu-horizontal bg-base-200">
            <li>
              <button class:selected={contractTab === 'Safe'} on:click={() => contractTab = 'Safe'}>
                MultiSig
              </button>
            </li>
            <li>
              <button class:selected={contractTab === 'Governor'} on:click={() => contractTab = 'Governor'}>
                Governor
              </button>
            </li>
          </ul>
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

<style lang="postcss">

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
<script  lang="ts">
  import type { PageData } from "./$types";

  import type { KindedAddressManagerOptions, KindAddressManager,  OptionsErrorMessages } from '$lib/wizard/shared';
  import {  sanitizeKindAddressManager, OptionsError } from '$lib/wizard/shared';

  import type {  Contract } from '$lib/wizard/smart-contracts';
  import { ContractBuilder, buildContractGeneric } from '$lib/wizard/smart-contracts';
  import type {  DeployContract } from '$lib/wizard/deploy-scripts';
  import { DeployBuilder, buildDeployGeneric } from '$lib/wizard/deploy-scripts';

  import Background from '$lib/ui/background/Background.svelte';
  import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
  import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';

  import AddressManagerControls from '$lib/ui/controls/2-AddressManagerControls.svelte';

  import MarkdownIt from "markdown-it";
  import hljs  from '$lib/ui/utils/highlightjs';

  export let data : PageData;

  export let initialContractAddressManagerTab: string | undefined = 'AddressManager';
  export let contractAddressManagerTab: KindAddressManager = sanitizeKindAddressManager(initialContractAddressManagerTab);

  let allContractsAddressManagerOpts: { [k in KindAddressManager]?: Required<KindedAddressManagerOptions [k]> } = {};

  let errorsAddressManager: { [k in KindAddressManager]?: OptionsErrorMessages } = {};

  let contractAddressManager: Contract = new ContractBuilder('AddressManager');
  let deployContractAddressManager: DeployContract = new DeployBuilder('DeployAddressManagerScript');

  $: optsAddressManager = allContractsAddressManagerOpts[contractAddressManagerTab];
  $: {
  if (optsAddressManager) {
          try {
              contractAddressManager = buildContractGeneric(optsAddressManager);
              deployContractAddressManager = buildDeployGeneric(optsAddressManager);
              errorsAddressManager[contractAddressManagerTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsAddressManager[contractAddressManagerTab] = e.messages;
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

  $: addressAllContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>"
  "AddressManager": "<ADDRESS_4>"
}
  \`\`\`
  `);

  let isArtifactStepOneModalOpen = false;

</script>

<Background color="bg-base-100 pt-3 pb-4">
    <section id={data.dropDownLinks[0].pathname}>
      <div class="divider divider-primary">
        <h1 class="text-2xl ">2.0 : Prerequisites</h1>
      </div>
    </section>
</Background>

<div class="container flex flex-col gap-4 p-8 mx-8">
  <h2 class="m-4 font-semibold">
    Make sure you have run the <a class="bg-primary underline" href="/1-governance/" target="_blank" rel="noreferrer">deploy script</a> for governance layer:
  </h2>

  <h2 class="m-4 font-semibold">
    You should have following file with below <span class="underline">fields</span> saved at the <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
  </h2>

  <div class="output flex flex-col grow overflow-auto">
      <code class="hljs grow overflow-auto p-4">
        {@html md.render(addressAllContent)}
      </code>
  </div>

  <p class="mt-6 text-base-300">
    Without <span class="underline bg-accent">this artifact file</span>, the next deployment scripts can not be run.
  </p>
</div>

<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[1].pathname}>
    <div class="divider divider-primary ">
      <p class="text-2xl">2.1 : Deploy AddressManager Contract</p>
    </div>
  </section>
</Background>
  
<WizardDouble conventionNumber={'201'} initialContractTab={initialContractAddressManagerTab} contractTab={contractAddressManagerTab} opts={optsAddressManager} contract={contractAddressManager} deployContract={deployContractAddressManager}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractAddressManagerTab === 'AddressManager'} on:click={() => contractAddressManagerTab = 'AddressManager'}>
              AddressManager
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractAddressManagerTab !== 'AddressManager'}>
              <AddressManagerControls bind:opts={allContractsAddressManagerOpts.AddressManager} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressAllContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- version control -->

<!-- 201B_DeployAndSetupProxyAdmin.s.sol -->

<!-- 202A_DeploySuperchainConfigProxy.s.sol -->

<!-- 202B_DeployAndInitializeSuperchainConfig.s.sol -->

<!-- 000_DeployAll.s.sol -->

<style lang="postcss">

  .container {
      background-color: var(--gray-1);
      border: 1px solid var(--gray-2);
      border-radius: 10px;
      min-width: 32rem;
  }

</style>
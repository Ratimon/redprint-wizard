<script  lang="ts">
  import type { PageData } from "./$types";

  import type {  Contract } from '$lib/wizard/smart-contracts';
  import { ContractBuilder, buildContractGeneric } from '$lib/wizard/smart-contracts';
  import type {  DeployContract } from '$lib/wizard/deploy-scripts';
  import { DeployBuilder, buildDeployGeneric } from '$lib/wizard/deploy-scripts';

  import type {
    KindedAddressManagerOptions, KindAddressManager,
    KindedProxyAdminOptions, KindProxyAdmin,
    KindedSuperchainConfigProxyOptions, KindSuperchainConfigProxy,
    KindedSuperchainConfigOptions, KindSuperchainConfig,
    OptionsErrorMessages
  } from '$lib/wizard/shared';

  import {
    sanitizeKindAddressManager,
    sanitizeKindProxyAdmin,
    sanitizeKindSuperchainConfigProxy,
    sanitizeKindSuperchainConfig,
    OptionsError
  } from '$lib/wizard/shared';

  import Background from '$lib/ui/background/Background.svelte';
  import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
  import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';

  import AddressManagerControls from '$lib/ui/controls/2-AddressManagerControls.svelte';
  import ProxyAdminControls from '$lib/ui/controls/2-ProxyAdminControls.svelte';
  import SuperchainConfigProxyControls from '$lib/ui/controls/2-SuperchainConfigProxyControls.svelte';
  import SuperchainConfigControls from '$lib/ui/controls/2-SuperchainConfigControls.svelte';

  import MarkdownIt from "markdown-it";
  import hljs  from '$lib/ui/utils/highlightjs';

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

  export let data : PageData;

  $: addressPreContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>"
}
  \`\`\`
  `);

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

  let isArtifactStepOneAModalOpen = false;
  $: addressStepOneAContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "AddressManager": "<ADDRESS_4>",
}
  \`\`\`
  `);

  export let initialContractProxyAdminTab: string | undefined = 'ProxyAdmin';
  export let contractProxyAdminTab: KindProxyAdmin = sanitizeKindProxyAdmin(initialContractProxyAdminTab);
  let allContractsProxyAdminOpts: { [k in KindProxyAdmin]?: Required<KindedProxyAdminOptions [k]> } = {};
  let errorsProxyAdmin: { [k in KindProxyAdmin]?: OptionsErrorMessages } = {};
  let contractProxyAdmin: Contract = new ContractBuilder('ProxyAdmin');
  let deployContractProxyAdmin: DeployContract = new DeployBuilder('DeployProxyAdminScript');

  $: optsProxyAdmin = allContractsProxyAdminOpts[contractProxyAdminTab];
  $: {
  if (optsProxyAdmin) {
          try {
              contractProxyAdmin = buildContractGeneric(optsProxyAdmin);
              deployContractProxyAdmin = buildDeployGeneric(optsProxyAdmin);
              errorsProxyAdmin[contractProxyAdminTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsProxyAdmin[contractProxyAdminTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepOneBModalOpen = false;
  $: addressStepOneBContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "AddressManager": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>"
}
  \`\`\`
  `);

  export let initialContractSuperchainConfigProxyTab: string | undefined = 'SuperchainConfigProxy';
  export let contractSuperchainConfigProxyTab: KindSuperchainConfigProxy = sanitizeKindSuperchainConfigProxy(initialContractSuperchainConfigProxyTab);
  let allContractsSuperchainConfigProxyOpts: { [k in KindSuperchainConfigProxy]?: Required<KindedSuperchainConfigProxyOptions [k]> } = {};
  let errorsSuperchainConfigProxy: { [k in KindSuperchainConfigProxy]?: OptionsErrorMessages } = {};
  let contractSuperchainConfigProxy: Contract = new ContractBuilder('SuperchainConfigProxy');
  let deployContractSuperchainConfigProxy: DeployContract = new DeployBuilder('DeploySuperchainConfigProxyScript');

  $: optsSuperchainConfigProxy = allContractsSuperchainConfigProxyOpts[contractSuperchainConfigProxyTab];
  $: {
  if (optsSuperchainConfigProxy) {
          try {
              contractSuperchainConfigProxy = buildContractGeneric(optsSuperchainConfigProxy);
              deployContractSuperchainConfigProxy = buildDeployGeneric(optsSuperchainConfigProxy);
              errorsSuperchainConfigProxy[contractSuperchainConfigProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsSuperchainConfigProxy[contractSuperchainConfigProxyTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoAModalOpen = false;
  $: addressStepTwoAContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "AddressManager": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>"
}
  \`\`\`
  `);

  export let initialContractSuperchainConfigTab: string | undefined = 'SuperchainConfig';
  export let contractSuperchainConfigTab: KindSuperchainConfig = sanitizeKindSuperchainConfig(initialContractSuperchainConfigTab);
  let allContractsSuperchainConfigOpts: { [k in KindSuperchainConfig]?: Required<KindedSuperchainConfigOptions [k]> } = {};
  let errorsSuperchainConfig: { [k in KindSuperchainConfig]?: OptionsErrorMessages } = {};
  let contractSuperchainConfig: Contract = new ContractBuilder('SuperchainConfig');
  let deployContractSuperchainConfig: DeployContract = new DeployBuilder('DeploySuperchainConfigScript');

  $: optsSuperchainConfig = allContractsSuperchainConfigOpts[contractSuperchainConfigTab];
  $: {
  if (optsSuperchainConfig) {
          try {
              contractSuperchainConfig = buildContractGeneric(optsSuperchainConfig);
              deployContractSuperchainConfig = buildDeployGeneric(optsSuperchainConfig);
              errorsSuperchainConfig[contractSuperchainConfigTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsSuperchainConfig[contractSuperchainConfigTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoBModalOpen = false;
  $: addressStepTwoBContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "AddressManager": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>"
}
  \`\`\`
  `);


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
        {@html md.render(addressPreContent)}
      </code>
  </div>

  <p class="mt-6 text-base-300">
    Without <span class="underline bg-accent">this artifact file</span>, the next deployment scripts can not be run.
  </p>
</div>

<!-- 201A_DeployAddressManager.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[1].pathname}>
    <div class="divider divider-primary ">
      <p class="text-2xl">2.1A : Deploy AddressManager Contract</p>
    </div>
  </section>
</Background>

<!-- version control -->
  
<WizardDouble conventionNumber={'201A'} initialContractTab={initialContractAddressManagerTab} contractTab={contractAddressManagerTab} opts={optsAddressManager} contract={contractAddressManager} deployContract={deployContractAddressManager}>
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
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
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
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneAModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneAModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneAModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneAContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 201B_DeployAndSetupProxyAdmin.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[2].pathname}>
    <div class="divider divider-primary ">
      <p class="text-2xl">2.1B : Deploy And Setup ProxyAdmin Contract</p>
    </div>
  </section>
</Background>

<WizardDouble conventionNumber={'201B'} initialContractTab={initialContractProxyAdminTab} contractTab={contractProxyAdminTab} opts={optsProxyAdmin} contract={contractProxyAdmin} deployContract={deployContractProxyAdmin}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractProxyAdminTab === 'ProxyAdmin'} on:click={() => contractProxyAdminTab = 'ProxyAdmin'}>
              ProxyAdmin
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractProxyAdminTab !== 'ProxyAdmin'}>
              <ProxyAdminControls bind:opts={allContractsProxyAdminOpts.ProxyAdmin} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneBModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneBModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneBModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneBContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 202A_DeploySuperchainConfigProxy.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[3].pathname}>
    <div class="divider divider-primary ">
      <p class="text-2xl">2.2A : Deploy SuperchainConfigProxy Contract</p>
    </div>
  </section>
</Background>

<WizardDouble conventionNumber={'202A'} initialContractTab={initialContractSuperchainConfigProxyTab} contractTab={contractSuperchainConfigProxyTab} opts={optsSuperchainConfigProxy} contract={contractSuperchainConfigProxy} deployContract={deployContractSuperchainConfigProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractSuperchainConfigProxyTab === 'SuperchainConfigProxy'} on:click={() => contractSuperchainConfigProxyTab = 'SuperchainConfigProxy'}>
              SuperchainConfigProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractSuperchainConfigProxyTab !== 'SuperchainConfigProxy'}>
              <SuperchainConfigProxyControls bind:opts={allContractsSuperchainConfigProxyOpts.SuperchainConfigProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoAModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoAModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoAModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoAContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 202B_DeployAndInitializeSuperchainConfig.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[4].pathname}>
    <div class="divider divider-primary ">
      <p class="text-2xl">2.2B : DeployAndInitializeSuperchainConfig Contract</p>
    </div>
  </section>
</Background>

<WizardDouble conventionNumber={'202B'} initialContractTab={initialContractSuperchainConfigTab} contractTab={contractSuperchainConfigTab} opts={optsSuperchainConfig} contract={contractSuperchainConfig} deployContract={deployContractSuperchainConfig}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractSuperchainConfigTab === 'SuperchainConfig'} on:click={() => contractSuperchainConfigTab = 'SuperchainConfig'}>
              SuperchainConfig
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractSuperchainConfigTab !== 'SuperchainConfig'}>
              <SuperchainConfigControls bind:opts={allContractsSuperchainConfigOpts.SuperchainConfig} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoBModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoBModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoBModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoBContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>


<!-- 000_DeployAll.s.sol -->

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
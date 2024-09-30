<script  lang="ts">
    import type { PageData } from "./$types";

    import type {  Contract } from '$lib/wizard/smart-contracts';
    import { ContractBuilder, buildContractGeneric } from '$lib/wizard/smart-contracts';
    import type {  DeployContract } from '$lib/wizard/deploy-scripts';
    import { DeployBuilder, buildDeployGeneric } from '$lib/wizard/deploy-scripts';

    import type {
        KindedOptimismPortalProxyOptions, KindOptimismPortalProxy,
        KindedSystemConfigProxyOptions, KindSystemConfigProxy,
        KindedL1StandardBridgeProxyOptions, KindL1StandardBridgeProxy,
        OptionsErrorMessages
    } from '$lib/wizard/shared';

    import {
        sanitizeKindOptimismPortalProxy,
        sanitizeKindSystemConfigProxy,
        sanitizeKindL1StandardBridgeProxy,
        OptionsError
    } from '$lib/wizard/shared';

    import Background from '$lib/ui/background/Background.svelte';
    import WizardSingle from '$lib/ui/components/WizardSingle.svelte';
    import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
    import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';
    import AllControls from '$lib/ui/controls/2-AllControls.svelte';

    import OptimismPortalProxyControls from '$lib/ui/controls/4-OptimismPortalProxyControls.svelte';
    import SystemConfigProxyControls from '$lib/ui/controls/4-SystemConfigProxyControls.svelte';
    import L1StandardBridgeProxyControls from '$lib/ui/controls/4-L1StandardBridgeProxyControls.svelte';

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
  "SystemOwnerSafe": "<ADDRESS_3>",
  "OptimismPortalProxy": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>",
  "ProtocolVersions": "<ADDRESS_9>"
}
  \`\`\`
  `);

  // **** step 4.1A ***

  export let initialContractOptimismPortalProxyTab: string | undefined = 'OptimismPortalProxy';
  export let contractOptimismPortalProxyTab: KindOptimismPortalProxy = sanitizeKindOptimismPortalProxy(initialContractOptimismPortalProxyTab);
  let allContractsOptimismPortalProxyOpts: { [k in KindOptimismPortalProxy]?: Required<KindedOptimismPortalProxyOptions [k]> } = {};
  let errorsOptimismPortalProxy: { [k in KindOptimismPortalProxy]?: OptionsErrorMessages } = {};
  let contractOptimismPortalProxy: Contract = new ContractBuilder('OptimismPortalProxy');
  let deployContractOptimismPortalProxy: DeployContract = new DeployBuilder('DeployOptimismPortalProxyScript');

  $: optsOptimismPortalProxy = allContractsOptimismPortalProxyOpts[contractOptimismPortalProxyTab];
  $: {
  if (optsOptimismPortalProxy) {
          try {
              contractOptimismPortalProxy = buildContractGeneric(optsOptimismPortalProxy);
              deployContractOptimismPortalProxy = buildDeployGeneric(optsOptimismPortalProxy);
              errorsOptimismPortalProxy[contractOptimismPortalProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsOptimismPortalProxy[contractOptimismPortalProxyTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepOneAModalOpen = false;
  $: addressStepOneAContent = md.render(`
  \`\`\`bash
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "OptimismPortalProxy": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>",
  "ProtocolVersions": "<ADDRESS_9>",
  "OptimismPortalProxy": "<ADDRESS_10>"
  \`\`\`
  `);

  // **** step 4.1B ***
  export let initialContractSystemConfigProxyTab: string | undefined = 'SystemConfigProxy';
  export let contractSystemConfigProxyTab: KindSystemConfigProxy = sanitizeKindSystemConfigProxy(initialContractSystemConfigProxyTab);
  let allContractsSystemConfigProxyOpts: { [k in KindSystemConfigProxy]?: Required<KindedSystemConfigProxyOptions [k]> } = {};
  let errorsSystemConfigProxy: { [k in KindSystemConfigProxy]?: OptionsErrorMessages } = {};
  let contractSystemConfigProxy: Contract = new ContractBuilder('SystemConfigProxy');
  let deployContractSystemConfigProxy: DeployContract = new DeployBuilder('DeploySystemConfigProxyScript');

  $: optsSystemConfigProxy = allContractsSystemConfigProxyOpts[contractSystemConfigProxyTab];
  $: {
  if (optsSystemConfigProxy) {
          try {
              contractSystemConfigProxy = buildContractGeneric(optsSystemConfigProxy);
              deployContractSystemConfigProxy = buildDeployGeneric(optsSystemConfigProxy);
              errorsSystemConfigProxy[contractSystemConfigProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsSystemConfigProxy[contractSystemConfigProxyTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepOneBModalOpen = false;
  $: addressStepOneBContent = md.render(`
  \`\`\`bash
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "OptimismPortalProxy": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>",
  "ProtocolVersions": "<ADDRESS_9>",
  "OptimismPortalProxy": "<ADDRESS_10>",
  "SystemConfigProxy": "<ADDRESS_11>"
  \`\`\`
  `);

  // **** step 4.1C ***
  export let initialContractL1StandardBridgeProxyTab: string | undefined = 'L1StandardBridgeProxy';
  export let contractL1StandardBridgeProxyTab: KindL1StandardBridgeProxy = sanitizeKindL1StandardBridgeProxy(initialContractL1StandardBridgeProxyTab);
  let allContractsL1StandardBridgeProxyOpts: { [k in KindL1StandardBridgeProxy]?: Required<KindedL1StandardBridgeProxyOptions [k]> } = {};
  let errorsL1StandardBridgeProxy: { [k in KindL1StandardBridgeProxy]?: OptionsErrorMessages } = {};
  let contractL1StandardBridgeProxy: Contract = new ContractBuilder('L1StandardBridgeProxy');
  let deployContractL1StandardBridgeProxy: DeployContract = new DeployBuilder('DeployL1StandardBridgeProxyScript');

  $: optsL1StandardBridgeProxy = allContractsL1StandardBridgeProxyOpts[contractL1StandardBridgeProxyTab];
  $: {
  if (optsL1StandardBridgeProxy) {
          try {
              contractL1StandardBridgeProxy = buildContractGeneric(optsL1StandardBridgeProxy);
              deployContractL1StandardBridgeProxy = buildDeployGeneric(optsL1StandardBridgeProxy);
              errorsL1StandardBridgeProxy[contractL1StandardBridgeProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsL1StandardBridgeProxy[contractL1StandardBridgeProxyTab] = e.messages;
              } else {
                throw e;
              }
          }
      }
  }

  let isArtifactStepOneCModalOpen = false;
  $: addressStepOneCContent = md.render(`
  \`\`\`bash
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "OptimismPortalProxy": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>",
  "ProtocolVersions": "<ADDRESS_9>",
  "OptimismPortalProxy": "<ADDRESS_10>",
  "SystemConfigProxy": "<ADDRESS_11>",
  "L1StandardBridgeProxy": "<ADDRESS_12>"
  \`\`\`
  `);
  
  
</script>

<Background color="bg-base-100 pt-3 pb-4">
    <section id={data.dropDownLinks[0].pathname}>
      <div class="divider divider-primary">
        <h1 class="text-2xl ">4.0 : Prerequisites</h1>
      </div>
    </section>
</Background>

<div class="container flex flex-col gap-4 p-8 mx-8">
    <h2 class="m-4 font-semibold">
      Make sure you have run the <a class="bg-primary underline" href="/2-superchain/" target="_blank" rel="noreferrer">deploy script</a> for superchain layer:
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

<Background color="bg-base-100 pt-3 pb-4">
    <section id={data.dropDownLinks[1].pathname}>
      <div class="divider divider-primary ">
        <p class="text-2xl">4.1 : Deploy Proxies Contracts</p>
      </div>
    </section>
    <!-- 401A_DeployOptimismPortalProxy -->
    <div class="divider divider-primary ">
      <p class="text-xl">4.1A : Deploy OptimismPortalProxy Contract</p>
    </div>
</Background>

<WizardDouble conventionNumber={'401A'} initialContractTab={initialContractOptimismPortalProxyTab} contractTab={contractOptimismPortalProxyTab} opts={optsOptimismPortalProxy} contract={contractOptimismPortalProxy} deployContract={deployContractOptimismPortalProxy}>
    <div slot="menu" >
        <div class="tab overflow-hidden">
          <Background color="bg-base-200">
            <OverflowMenu>
              <button class:selected={contractOptimismPortalProxyTab === 'OptimismPortalProxy'} on:click={() => contractOptimismPortalProxyTab = 'OptimismPortalProxy'}>
                OptimismPortalProxy
              </button>      
            </OverflowMenu>
          </Background>
        </div>
    </div> 
  
    <div slot="control" >
         <!-- w-64 -->
        <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
            <div class:hidden={contractOptimismPortalProxyTab !== 'OptimismPortalProxy'}>
                <OptimismPortalProxyControls bind:opts={allContractsOptimismPortalProxyOpts.OptimismPortalProxy} />
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

<Background color="bg-base-100 pt-3 pb-4">
  <div class="divider divider-primary ">
    <p class="text-xl">4.1B : Deploy SystemConfigProxy Contract</p>
  </div>
</Background>

<WizardDouble conventionNumber={'401B'} initialContractTab={initialContractSystemConfigProxyTab} contractTab={contractSystemConfigProxyTab} opts={optsSystemConfigProxy} contract={contractSystemConfigProxy} deployContract={deployContractSystemConfigProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractSystemConfigProxyTab === 'SystemConfigProxy'} on:click={() => contractSystemConfigProxyTab = 'SystemConfigProxy'}>
              SystemConfigProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractSystemConfigProxyTab !== 'SystemConfigProxy'}>
              <SystemConfigProxyControls bind:opts={allContractsSystemConfigProxyOpts.SystemConfigProxy} />
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

<Background color="bg-base-100 pt-3 pb-4">
  <div class="divider divider-primary ">
    <p class="text-xl">4.1C : Deploy L1StandardBridgeProxy Contract</p>
  </div>
</Background>

<WizardDouble conventionNumber={'401C'} initialContractTab={initialContractL1StandardBridgeProxyTab} contractTab={contractL1StandardBridgeProxyTab} opts={optsL1StandardBridgeProxy} contract={contractL1StandardBridgeProxy} deployContract={deployContractL1StandardBridgeProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractL1StandardBridgeProxyTab === 'L1StandardBridgeProxy'} on:click={() => contractL1StandardBridgeProxyTab = 'L1StandardBridgeProxy'}>
              L1StandardBridgeProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractL1StandardBridgeProxyTab !== 'L1StandardBridgeProxy'}>
              <L1StandardBridgeProxyControls bind:opts={allContractsL1StandardBridgeProxyOpts.L1StandardBridgeProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneCModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneCModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneCModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneCContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<Background color="bg-base-100 pt-3 pb-4">
  <div class="divider divider-primary ">
    <p class="text-xl">4.1D : Deploy L1CrossDomainMessengerProxy Contract</p>
  </div>
</Background>

<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[2].pathname}>
    <div class="divider divider-primary ">
      <p class="text-2xl">4.2 : Deploy Implementations Contracts</p>
    </div>
  </section>
  <!-- 402A_ -->
  <div class="divider divider-primary ">
    <p class="text-xl">4.2A : Deploy L1CrossDomainMessenger Contract</p>
  </div>
</Background>
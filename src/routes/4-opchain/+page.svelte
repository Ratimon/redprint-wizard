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
        KindedL1CrossDomainMessengerProxyOptions, KindL1CrossDomainMessengerProxy,
        KindedOptimismMintableERC20FactoryProxyOptions, KindOptimismMintableERC20FactoryProxy,
        KindedL1ERC721BridgeProxyOptions, KindL1ERC721BridgeProxy,
        OptionsErrorMessages
    } from '$lib/wizard/shared';

    import {
        sanitizeKindOptimismPortalProxy,
        sanitizeKindSystemConfigProxy,
        sanitizeKindL1StandardBridgeProxy,
        sanitizeKindL1CrossDomainMessengerProxy,
        sanitizeKindOptimismMintableERC20FactoryProxy,
        sanitizeKindL1ERC721BridgeProxy,
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
    import L1CrossDomainMessengerProxyControls from '$lib/ui/controls/4-L1CrossDomainMessengerProxyControls.svelte';
    import OptimismMintableERC20FactoryProxyControls from '$lib/ui/controls/4-OptimismMintableERC20FactoryProxyControls.svelte';
    import L1ERC721BridgeProxyControls from '$lib/ui/controls/4-L1ERC721BridgeProxyControls.svelte';
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

   // **** step 4.1D ***
   export let initialContractL1CrossDomainMessengerProxyTab: string | undefined = 'L1CrossDomainMessengerProxy';
   export let contractL1CrossDomainMessengerProxyTab: KindL1CrossDomainMessengerProxy = sanitizeKindL1CrossDomainMessengerProxy(initialContractL1CrossDomainMessengerProxyTab);
   let allContractsL1CrossDomainMessengerProxyOpts: { [k in KindL1CrossDomainMessengerProxy]?: Required<KindedL1CrossDomainMessengerProxyOptions [k]> } = {};
   let errorsL1CrossDomainMessengerProxy: { [k in KindL1CrossDomainMessengerProxy]?: OptionsErrorMessages } = {};
   let contractL1CrossDomainMessengerProxy: Contract = new ContractBuilder('L1CrossDomainMessengerProxy');
   let deployContractL1CrossDomainMessengerProxy: DeployContract = new DeployBuilder('DeployL1CrossDomainMessengerProxyScript');

   $: optsL1CrossDomainMessengerProxy = allContractsL1CrossDomainMessengerProxyOpts[contractL1CrossDomainMessengerProxyTab];
   $: {
  if (optsL1CrossDomainMessengerProxy) {
          try {
              contractL1CrossDomainMessengerProxy = buildContractGeneric(optsL1CrossDomainMessengerProxy);
              deployContractL1CrossDomainMessengerProxy = buildDeployGeneric(optsL1CrossDomainMessengerProxy);
              errorsL1CrossDomainMessengerProxy[contractL1CrossDomainMessengerProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsL1CrossDomainMessengerProxy[contractL1CrossDomainMessengerProxyTab] = e.messages;
              } else {
                throw e;
              }
          }
      }
  }

  let isArtifactStepOneDModalOpen = false;
  $: addressStepOneDContent = md.render(`
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
  "L1StandardBridgeProxy": "<ADDRESS_12>",
  "L1CrossDomainMessengerProxy": "<ADDRESS_13>"
  \`\`\`
  `);

  // **** step 4.1E ***
  export let initialContractOptimismMintableERC20FactoryProxyTab: string | undefined = 'OptimismMintableERC20FactoryProxy';
  export let contractOptimismMintableERC20FactoryProxyTab: KindOptimismMintableERC20FactoryProxy = sanitizeKindOptimismMintableERC20FactoryProxy(initialContractOptimismMintableERC20FactoryProxyTab);
  let allContractsOptimismMintableERC20FactoryProxyOpts: { [k in KindOptimismMintableERC20FactoryProxy]?: Required<KindedOptimismMintableERC20FactoryProxyOptions [k]> } = {};
  let errorsOptimismMintableERC20FactoryProxy: { [k in KindOptimismMintableERC20FactoryProxy]?: OptionsErrorMessages } = {};
  let contractOptimismMintableERC20FactoryProxy: Contract = new ContractBuilder('OptimismMintableERC20FactoryProxy');
  let deployContractOptimismMintableERC20FactoryProxy: DeployContract = new DeployBuilder('DeployOptimismMintableERC20FactoryProxyScript');

  $: optsOptimismMintableERC20FactoryProxy = allContractsOptimismMintableERC20FactoryProxyOpts[contractOptimismMintableERC20FactoryProxyTab];
  $: {
  if (optsOptimismMintableERC20FactoryProxy) {
          try {
              contractOptimismMintableERC20FactoryProxy = buildContractGeneric(optsOptimismMintableERC20FactoryProxy);
              deployContractOptimismMintableERC20FactoryProxy = buildDeployGeneric(optsOptimismMintableERC20FactoryProxy);
              errorsOptimismMintableERC20FactoryProxy[contractOptimismMintableERC20FactoryProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsOptimismMintableERC20FactoryProxy[contractOptimismMintableERC20FactoryProxyTab] = e.messages;
              } else {
                throw e;
              }
          }
      }
  }

  let isArtifactStepOneEModalOpen = false;
  $: addressStepOneEContent = md.render(`
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
  "L1StandardBridgeProxy": "<ADDRESS_12>",
  "L1CrossDomainMessengerProxy": "<ADDRESS_13>",
  "OptimismMintableERC20FactoryProxy": "<ADDRESS_14>"
  \`\`\`
  `);

  // **** step 4.1F ***
  export let initialContractL1ERC721BridgeProxyTab: string | undefined = 'L1ERC721BridgeProxy';
  export let contractL1ERC721BridgeProxyTab: KindL1ERC721BridgeProxy = sanitizeKindL1ERC721BridgeProxy(initialContractL1ERC721BridgeProxyTab);
  let allContractsL1ERC721BridgeProxyOpts: { [k in KindL1ERC721BridgeProxy]?: Required<KindedL1ERC721BridgeProxyOptions [k]> } = {};
  let errorsL1ERC721BridgeProxy: { [k in KindL1ERC721BridgeProxy]?: OptionsErrorMessages } = {};
  let contractL1ERC721BridgeProxy: Contract = new ContractBuilder('L1ERC721BridgeProxy');
  let deployContractL1ERC721BridgeProxy: DeployContract = new DeployBuilder('DeployL1ERC721BridgeProxyScript');

  $: optsL1ERC721BridgeProxy = allContractsL1ERC721BridgeProxyOpts[contractL1ERC721BridgeProxyTab];
  $: {
  if (optsL1ERC721BridgeProxy) {
          try {
              contractL1ERC721BridgeProxy = buildContractGeneric(optsL1ERC721BridgeProxy);
              deployContractL1ERC721BridgeProxy = buildDeployGeneric(optsL1ERC721BridgeProxy);
              errorsL1ERC721BridgeProxy[contractL1ERC721BridgeProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsL1ERC721BridgeProxy[contractL1ERC721BridgeProxyTab] = e.messages;
              } else {
                throw e;
              }
          }
      }
  }

  let isArtifactStepOneFModalOpen = false;
  $: addressStepOneFContent = md.render(`
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
  "L1StandardBridgeProxy": "<ADDRESS_12>",
  "L1CrossDomainMessengerProxy": "<ADDRESS_13>",
  "OptimismMintableERC20FactoryProxy": "<ADDRESS_14>",
  "L1ERC721BridgeProxy": "<ADDRESS_15>"
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

<WizardDouble conventionNumber={'401D'} initialContractTab={initialContractL1CrossDomainMessengerProxyTab} contractTab={contractL1CrossDomainMessengerProxyTab} opts={optsL1CrossDomainMessengerProxy} contract={contractL1CrossDomainMessengerProxy} deployContract={deployContractL1CrossDomainMessengerProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractL1CrossDomainMessengerProxyTab === 'L1CrossDomainMessengerProxy'} on:click={() => contractL1CrossDomainMessengerProxyTab = 'L1CrossDomainMessengerProxy'}>
              L1CrossDomainMessengerProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractL1CrossDomainMessengerProxyTab !== 'L1CrossDomainMessengerProxy'}>
              <L1CrossDomainMessengerProxyControls bind:opts={allContractsL1CrossDomainMessengerProxyOpts.L1CrossDomainMessengerProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneDModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneDModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneDModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneDContent)}
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
    <p class="text-xl">4.1E : Deploy OptimismMintableERC20FactoryProxy Contract</p>
  </div>
</Background>

<WizardDouble conventionNumber={'401E'} initialContractTab={initialContractOptimismMintableERC20FactoryProxyTab} contractTab={contractOptimismMintableERC20FactoryProxyTab} opts={optsOptimismMintableERC20FactoryProxy} contract={contractOptimismMintableERC20FactoryProxy} deployContract={deployContractOptimismMintableERC20FactoryProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractOptimismMintableERC20FactoryProxyTab === 'OptimismMintableERC20FactoryProxy'} on:click={() => contractOptimismMintableERC20FactoryProxyTab = 'OptimismMintableERC20FactoryProxy'}>
              OptimismMintableERC20FactoryProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractOptimismMintableERC20FactoryProxyTab !== 'OptimismMintableERC20FactoryProxy'}>
              <OptimismMintableERC20FactoryProxyControls bind:opts={allContractsOptimismMintableERC20FactoryProxyOpts.OptimismMintableERC20FactoryProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneEModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneEModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneEModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneEContent)}
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
    <p class="text-xl">4.1F : Deploy L1ERC721BridgeProxy Contract</p>
  </div>
</Background>

<WizardDouble conventionNumber={'401F'} initialContractTab={initialContractL1ERC721BridgeProxyTab} contractTab={contractL1ERC721BridgeProxyTab} opts={optsL1ERC721BridgeProxy} contract={contractL1ERC721BridgeProxy} deployContract={deployContractL1ERC721BridgeProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractL1ERC721BridgeProxyTab === 'L1ERC721BridgeProxy'} on:click={() => contractL1ERC721BridgeProxyTab = 'L1ERC721BridgeProxy'}>
              L1ERC721BridgeProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractL1ERC721BridgeProxyTab !== 'L1ERC721BridgeProxy'}>
              <L1ERC721BridgeProxyControls bind:opts={allContractsL1ERC721BridgeProxyOpts.L1ERC721BridgeProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneFModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneFModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneFModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneFContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

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
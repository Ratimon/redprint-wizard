<script  lang="ts">
    import type { PageData } from "../4-opchain-proxies/$types";

    import type {  Contract } from '$lib/wizard/smart-contracts';
    import { ContractBuilder, buildContractGeneric } from '$lib/wizard/smart-contracts';
    import type {  DeployContract } from '$lib/wizard/deploy-scripts';
    import { DeployBuilder, buildDeployGeneric } from '$lib/wizard/deploy-scripts';

    import type {
        KindedL1CrossDomainMessengerOptions, KindL1CrossDomainMessenger,
        KindedStepFourPointOneAllOptions, KindStepFourPointOneAll,
        KindedStepFourPointOneAllSubOptions, KindStepFourPointOneAllSub,
        OptionsErrorMessages
    } from '$lib/wizard/shared';

    import {
        sanitizeKindL1CrossDomainMessenger,
        sanitizeKindStepFourPointOneAll,
        sanitizeKindStepFourPointOneAllSub,
        OptionsError
    } from '$lib/wizard/shared';

    import Background from '$lib/ui/background/Background.svelte';
    import WizardSingle from '$lib/ui/components/WizardSingle.svelte';
    import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
    import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';

    import L1CrossDomainMessengerControls from '$lib/ui/controls/4-L1CrossDomainMessengerControls.svelte';
    import AllSubControls from '$lib/ui/controls/4-1AllSubControls.svelte';
    import AllControls from '$lib/ui/controls/4-1AllControls.svelte';

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
  "ProtocolVersions": "<ADDRESS_9>",
  "OptimismPortalProxy": "<ADDRESS_10>",
  "SystemConfigProxy": "<ADDRESS_11>",
  "L1StandardBridgeProxy": "<ADDRESS_12>",
  "L1CrossDomainMessengerProxy": "<ADDRESS_13>",
  "OptimismMintableERC20FactoryProxy": "<ADDRESS_14>",
  "L1ERC721BridgeProxy": "<ADDRESS_15>",
  "DisputeGameFactoryProxy": "<ADDRESS_16>",
  "L2OutputOracleProxy": "<ADDRESS_17>",
  "DelayedWETHProxy": "<ADDRESS_18>",
  "PermissionedDelayedWETHProxy": "<ADDRESS_19>",
  "AnchorStateRegistryProxy": "<ADDRESS_20>"
}
  \`\`\`
  `);

  // **** step 4.2A ***
  export let initialContractL1CrossDomainMessengerTab: string | undefined = 'L1CrossDomainMessenger';
  export let contractL1CrossDomainMessengerTab: KindL1CrossDomainMessenger = sanitizeKindL1CrossDomainMessenger(initialContractL1CrossDomainMessengerTab);
  let allContractsL1CrossDomainMessengerOpts: { [k in KindL1CrossDomainMessenger]?: Required<KindedL1CrossDomainMessengerOptions [k]> } = {};
  let errorsL1CrossDomainMessenger: { [k in KindL1CrossDomainMessenger]?: OptionsErrorMessages } = {};
  let contractL1CrossDomainMessenger: Contract = new ContractBuilder('L1CrossDomainMessenger');
  let deployContractL1CrossDomainMessenger: DeployContract = new DeployBuilder('DeployL1CrossDomainMessengerScript');

  $: optsL1CrossDomainMessenger = allContractsL1CrossDomainMessengerOpts[contractL1CrossDomainMessengerTab];
  $: {
  if (optsL1CrossDomainMessenger) {
          try {
              contractL1CrossDomainMessenger = buildContractGeneric(optsL1CrossDomainMessenger);
              deployContractL1CrossDomainMessenger = buildDeployGeneric(optsL1CrossDomainMessenger);
              errorsL1CrossDomainMessenger[contractL1CrossDomainMessengerTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsL1CrossDomainMessenger[contractL1CrossDomainMessengerTab] = e.messages;
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
  "L1ERC721BridgeProxy": "<ADDRESS_15>",
  "DisputeGameFactoryProxy": "<ADDRESS_16>",
  "L2OutputOracleProxy": "<ADDRESS_17>",
  "DelayedWETHProxy": "<ADDRESS_18>",
  "PermissionedDelayedWETHProxy": "<ADDRESS_19>",
  "AnchorStateRegistryProxy": "<ADDRESS_20>"
}
  \`\`\`
  `);


export let initialContractStepTab: string | undefined = 'StepFourPointOneAll';
export let contractStepTab: KindStepFourPointOneAll = sanitizeKindStepFourPointOneAll(initialContractStepTab);

let allContractsStepOpts: { [k in KindStepFourPointOneAll]?: Required<KindedStepFourPointOneAllOptions [k]> } = {};

let errorsStep: { [k in KindStepFourPointOneAll]?: OptionsErrorMessages } = {};

let deployContractStep: DeployContract = new DeployBuilder('DeployAllScript');

$: optsStep = allContractsStepOpts[contractStepTab];
$: {
if (optsStep) {
        try {
            deployContractStep = buildDeployGeneric(optsStep);
            errorsStep[contractStepTab] = undefined;
        } catch (e: unknown) {
            if (e instanceof OptionsError) {
              errorsStep[contractStepTab] = e.messages;
            } else {
            throw e;
            }
        }
    }
}

let isArtifactStepAllModalOpen = false;
  $: addressStepAllContent = md.render(`
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
  "ProtocolVersions": "<ADDRESS_9>",
  "OptimismPortalProxy": "<ADDRESS_10>",
  "SystemConfigProxy": "<ADDRESS_11>",
  "L1StandardBridgeProxy": "<ADDRESS_12>",
  "L1CrossDomainMessengerProxy": "<ADDRESS_13>",
  "OptimismMintableERC20FactoryProxy": "<ADDRESS_14>",
  "L1ERC721BridgeProxy": "<ADDRESS_15>",
  "DisputeGameFactoryProxy": "<ADDRESS_16>",
  "L2OutputOracleProxy": "<ADDRESS_17>",
  "DelayedWETHProxy": "<ADDRESS_18>",
  "PermissionedDelayedWETHProxy": "<ADDRESS_19>",
  "AnchorStateRegistryProxy": "<ADDRESS_20>"
}
  \`\`\`
  `);

export let initialContractStepSubTab: string | undefined = 'StepFourPointOneAllSub';
export let contractStepSubTab: KindStepFourPointOneAllSub = sanitizeKindStepFourPointOneAllSub(initialContractStepSubTab);

let allContractsStepSubOpts: { [k in KindStepFourPointOneAllSub]?: Required<KindedStepFourPointOneAllSubOptions [k]> } = {};

let errorsStepSub: { [k in KindStepFourPointOneAllSub]?: OptionsErrorMessages } = {};

let deployContractStepSub: DeployContract = new DeployBuilder('SetupSuperchainScript');

$: optsStepSub = allContractsStepSubOpts[contractStepSubTab];
$: {
if (optsStepSub) {
        try {
            deployContractStepSub = buildDeployGeneric(optsStepSub);
            errorsStepSub[contractStepSubTab] = undefined;
        } catch (e: unknown) {
            if (e instanceof OptionsError) {
              errorsStepSub[contractStepSubTab] = e.messages;
            } else {
            throw e;
            }
        }
    }
}

  
</script>

<Background color="bg-base-100 pt-3 pb-4">
    <section id={data.dropDownLinks[0].pathname}>
      <div class="divider divider-primary">
        <h1 class="text-2xl ">4.2 : Prerequisites</h1>
      </div>
    </section>
</Background>

<div class="container flex flex-col gap-4 p-8 mx-8">
    <h2 class="m-4 font-semibold">
      Make sure you have run the <a class="bg-primary underline" href="/4-opchain-proxies/" target="_blank" rel="noreferrer">deploy script</a> for l2 OP Chain - Proxies :
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
        <p class="text-2xl">4.2 : Deploy Implementations Contracts</p>
      </div>
    </section>
    <div class="divider divider-primary ">
      <p class="text-xl">4.2A : Deploy L1CrossDomainMessenger Contract</p>
    </div>
</Background>

<WizardDouble conventionNumber={'401A'} initialContractTab={initialContractL1CrossDomainMessengerTab} contractTab={contractL1CrossDomainMessengerTab} opts={optsL1CrossDomainMessenger} contract={contractL1CrossDomainMessenger} deployContract={deployContractL1CrossDomainMessenger}>
    <div slot="menu" >
        <div class="tab overflow-hidden">
          <Background color="bg-base-200">
            <OverflowMenu>
              <button class:selected={contractL1CrossDomainMessengerTab === 'L1CrossDomainMessenger'} on:click={() => contractL1CrossDomainMessengerTab = 'L1CrossDomainMessenger'}>
                L1CrossDomainMessenger
              </button>      
            </OverflowMenu>
          </Background>
        </div>
    </div> 
  
    <div slot="control" >
         <!-- w-64 -->
        <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
            <div class:hidden={contractL1CrossDomainMessengerTab !== 'L1CrossDomainMessenger'}>
                <L1CrossDomainMessengerControls bind:opts={allContractsL1CrossDomainMessengerOpts.L1CrossDomainMessenger} />
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



<!-- 000_DeployAll.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[2].pathname}>
    <div class="divider divider-primary">
      <h1 class="text-2xl ">(Alternative) : Deploy All</h1>
    </div>
  </section>
</Background>

<WizardSingle isShowingCommand={true} conventionNumber={'000'} initialContractTab={initialContractStepTab} contractTab={contractStepTab} opts={optsStep} deployContract={deployContractStep}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractStepTab === 'StepFourPointOneAll'} on:click={() => contractStepTab = 'StepFourPointOneAll'}>
              DeployAll
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractStepTab !== 'StepFourPointOneAll'}>
              <AllControls bind:opts={allContractsStepOpts.StepFourPointOneAll} />
          </div>
      </div>
  </div>
  


</WizardSingle>

<WizardSingle isShowingCommand={false} conventionNumber={'400'} initialContractTab={initialContractStepSubTab} contractTab={contractStepSubTab} opts={optsStepSub} deployContract={deployContractStepSub}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractStepSubTab === 'StepFourPointOneAllSub'} on:click={() => contractStepSubTab = 'StepFourPointOneAllSub'}>
              SetupOpchain
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractStepSubTab !== 'StepFourPointOneAllSub'}>
              <AllSubControls bind:opts={allContractsStepSubOpts.StepFourPointOneAllSub} />
          </div>
      </div>
  </div>

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepAllModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepAllModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepAllModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepAllContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
  
</WizardSingle>
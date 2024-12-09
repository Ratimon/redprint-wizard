<script  lang="ts">
  import type { PageData } from "./$types";

  import type {  Contract } from '$lib/wizard/smart-contracts';
  import { ContractBuilder, buildContractGeneric } from '$lib/wizard/smart-contracts';
  import type {  DeployContract } from '$lib/wizard/deploy-scripts';
  import { DeployBuilder, buildDeployGeneric } from '$lib/wizard/deploy-scripts';

  import type {
    KindedDataAvailabilityChallengeProxyOptions, KindDataAvailabilityChallengeProxy,
    KindedDataAvailabilityChallengeOptions, KindDataAvailabilityChallenge,
    KindedStepThreeAllOptions, KindStepThreeAll,
    KindedStepThreeAllSubOptions, KindStepThreeAllSub,
    OptionsErrorMessages
  } from '$lib/wizard/shared';

  import {
    sanitizeKindDataAvailabilityChallengeProxy,
    sanitizeKindDataAvailabilityChallenge,
    sanitizeKindStepThreeAll,
    sanitizeKindStepThreeAllSub,
    OptionsError
  } from '$lib/wizard/shared';

  import Background from '$lib/ui/background/Background.svelte';
  import QuickGuide from '$lib/ui/components/QuickGuide.svelte';
  import ScrollStep from '$lib/ui/templates/ScrollStep.svelte';
  import WizardSingle from '$lib/ui/components/WizardSingle.svelte';
  import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
  import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';
  import AllSubControls from '$lib/ui/controls/3-AllSubControls.svelte';
  import AllControls from '$lib/ui/controls/3-AllControls.svelte';

  import Error from '$lib/ui/error/Error.svelte';

  import DataAvailabilityChallengeProxyControls from '$lib/ui/controls/3-DataAvailabilityChallengeProxyControls.svelte';
  import DataAvailabilityChallengeControls from '$lib/ui/controls/3-DataAvailabilityChallengeControls.svelte';
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
  $: stepLinks  = data.dropDownLinks.slice(Math.max(data.dropDownLinks.length - 2, 2));

  $: addressPreContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "AddressManager": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>",
  "ProtocolVersions": "<ADDRESS_9>"
}
  \`\`\`
  `);

  export let initialContractStepTab: string | undefined = 'StepThreeAll';
  export let contractStepTab: KindStepThreeAll = sanitizeKindStepThreeAll(initialContractStepTab);

  let allContractsStepOpts: { [k in KindStepThreeAll]?: Required<KindedStepThreeAllOptions [k]> } = {};

  let errorsStep: { [k in KindStepThreeAll]?: OptionsErrorMessages } = {};

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

  export let initialContractStepSubTab: string | undefined = 'StepThreeAllSub';
  export let contractStepSubTab: KindStepThreeAllSub = sanitizeKindStepThreeAllSub(initialContractStepSubTab);

  let allContractsStepSubOpts: { [k in KindStepThreeAllSub]?: Required<KindedStepThreeAllSubOptions [k]> } = {};

  let errorsStepSub: { [k in KindStepThreeAllSub]?: OptionsErrorMessages } = {};

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

  let isArtifactStepAllModalOpen = false;
  $: addressStepAllContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "AddressManager": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>",
  "ProtocolVersions": "<ADDRESS_9>",
  "DataAvailabilityChallengeProxy": "<ADDRESS_10>", // optional
  "DataAvailabilityChallenge": "<ADDRESS_11>" // optional
}
  \`\`\`
  `);

  // **** step 1 ***
  export let initialContractDataAvailabilityChallengeProxyTab: string | undefined = 'DataAvailabilityChallengeProxy';
  export let contractDataAvailabilityChallengeProxyTab: KindDataAvailabilityChallengeProxy = sanitizeKindDataAvailabilityChallengeProxy(initialContractDataAvailabilityChallengeProxyTab);
  let allContractsDataAvailabilityChallengeProxyOpts: { [k in KindDataAvailabilityChallengeProxy]?: Required<KindedDataAvailabilityChallengeProxyOptions [k]> } = {};
  let errorsDataAvailabilityChallengeProxy: { [k in KindDataAvailabilityChallengeProxy]?: OptionsErrorMessages } = {};
  let contractDataAvailabilityChallengeProxy: Contract = new ContractBuilder('DataAvailabilityChallengeProxy');
  let deployContractDataAvailabilityChallengeProxy: DeployContract = new DeployBuilder('DeployDataAvailabilityChallengeProxyScript');

  $: optsDataAvailabilityChallengeProxy = allContractsDataAvailabilityChallengeProxyOpts[contractDataAvailabilityChallengeProxyTab];
  $: {
  if (optsDataAvailabilityChallengeProxy) {
          try {
              contractDataAvailabilityChallengeProxy = buildContractGeneric(optsDataAvailabilityChallengeProxy);
              deployContractDataAvailabilityChallengeProxy = buildDeployGeneric(optsDataAvailabilityChallengeProxy);
              errorsDataAvailabilityChallengeProxy[contractDataAvailabilityChallengeProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsDataAvailabilityChallengeProxy[contractDataAvailabilityChallengeProxyTab] = e.messages;
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
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>",
  "ProtocolVersions": "<ADDRESS_9>",
  "DataAvailabilityChallengeProxy": "<ADDRESS_10>", // optional
}
  \`\`\`
  `);

  // **** step 2 ***
  export let initialContractDataAvailabilityChallengeTab: string | undefined = 'DataAvailabilityChallenge';
  export let contractDataAvailabilityChallengeTab: KindDataAvailabilityChallenge = sanitizeKindDataAvailabilityChallenge(initialContractDataAvailabilityChallengeTab);
  let allContractsDataAvailabilityChallengeOpts: { [k in KindDataAvailabilityChallenge]?: Required<KindedDataAvailabilityChallengeOptions [k]> } = {};
  let errorsDataAvailabilityChallenge: { [k in KindDataAvailabilityChallenge]?: OptionsErrorMessages } = {};
  let contractDataAvailabilityChallenge: Contract = new ContractBuilder('DataAvailabilityChallenge');
  let deployContractDataAvailabilityChallenge: DeployContract = new DeployBuilder('DeployDataAvailabilityChallengeScript');

  $: optsDataAvailabilityChallenge = allContractsDataAvailabilityChallengeOpts[contractDataAvailabilityChallengeTab];
  $: {
  if (optsDataAvailabilityChallenge) {
          try {
              contractDataAvailabilityChallenge = buildContractGeneric(optsDataAvailabilityChallenge);
              deployContractDataAvailabilityChallenge = buildDeployGeneric(optsDataAvailabilityChallenge);
              errorsDataAvailabilityChallenge[contractDataAvailabilityChallengeTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsDataAvailabilityChallenge[contractDataAvailabilityChallengeTab] = e.messages;
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
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>",
  "ProtocolVersions": "<ADDRESS_9>",
  "DataAvailabilityChallengeProxy": "<ADDRESS_10>", // optional,
  "DataAvailabilityChallenge": "<ADDRESS_11>" // optional
}
  \`\`\`
  `);



</script>

<QuickGuide path1={data.dropDownLinks[0].pathname} path2={data.dropDownLinks[1].pathname} path3={data.dropDownLinks[2].pathname} />

<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[0].pathname}>
    <div class="divider divider-primary">
      <h1 class="btn btn-ghost text-2xl ">3.0 : Prerequisites</h1>
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

<!-- 000_DeployAll.s.sol -->

<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[1].pathname}>
    <div class="divider divider-primary">
      <h1 class="btn btn-primary text-2xl ">One-Click OpAltDA Deployment</h1>
    </div>
    <div class="divider divider-default">
    </div>
    <div class="divider divider-primary">
      <p class="text-2xs ">Note: This script is not completed yet. It is for one layer only. Check our <a class="bg-accent underline" href="/4-opchain-implementations" target="_blank" rel="noreferrer">final script</a> for full deployment.</p>
    </div>
  </section>
</Background>
  
  
<WizardSingle isShowingCommand={true} conventionNumber={'000'} initialContractTab={initialContractStepTab} contractTab={contractStepTab} opts={optsStep} deployContract={deployContractStep}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractStepTab === 'StepThreeAll'} on:click={() => contractStepTab = 'StepThreeAll'}>
              DeployAll
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
        <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(120vh-80px)] overflow-auto">
          <div class:hidden={contractStepTab !== 'StepThreeAll'}>
              <AllControls bind:opts={allContractsStepOpts.StepThreeAll} />
          </div>
      </div>
  </div>

</WizardSingle>

<WizardSingle isShowingCommand={false} conventionNumber={'300'} initialContractTab={initialContractStepSubTab} contractTab={contractStepSubTab} opts={optsStepSub} deployContract={deployContractStepSub}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractStepSubTab === 'StepThreeAllSub'} on:click={() => contractStepSubTab = 'StepThreeAllSub'}>
              SetupOpAltDA
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
        <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractStepSubTab !== 'StepThreeAllSub'}>
              <AllSubControls bind:opts={allContractsStepSubOpts.StepThreeAllSub} />
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

<!-- 301A_DeployDataAvailabilityChallengeProxy.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[0].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">3.1A : Deploy DataAvailabilityChallengeProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[0].title} />

<WizardDouble conventionNumber={'301A'} initialContractTab={initialContractDataAvailabilityChallengeProxyTab} contractTab={contractDataAvailabilityChallengeProxyTab} opts={optsDataAvailabilityChallengeProxy} contract={contractDataAvailabilityChallengeProxy} deployContract={deployContractDataAvailabilityChallengeProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractDataAvailabilityChallengeProxyTab === 'DataAvailabilityChallengeProxy'} on:click={() => contractDataAvailabilityChallengeProxyTab = 'DataAvailabilityChallengeProxy'}>
              DataAvailabilityChallengeProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractDataAvailabilityChallengeProxyTab !== 'DataAvailabilityChallengeProxy'}>
              <DataAvailabilityChallengeProxyControls bind:opts={allContractsDataAvailabilityChallengeProxyOpts.DataAvailabilityChallengeProxy} />
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

<!-- 301B_DeployDataAvailabilityChallenge.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[1].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">3.1B : Deploy DataAvailabilityChallenge Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[1].title} />

<WizardDouble conventionNumber={'301B'} initialContractTab={initialContractDataAvailabilityChallengeTab} contractTab={contractDataAvailabilityChallengeTab} opts={optsDataAvailabilityChallenge} contract={contractDataAvailabilityChallenge} deployContract={deployContractDataAvailabilityChallenge}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractDataAvailabilityChallengeTab === 'DataAvailabilityChallenge'} on:click={() => contractDataAvailabilityChallengeTab = 'DataAvailabilityChallenge'}>
              DataAvailabilityChallenge
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractDataAvailabilityChallengeTab !== 'DataAvailabilityChallenge'}>
              <DataAvailabilityChallengeControls bind:opts={allContractsDataAvailabilityChallengeOpts.DataAvailabilityChallenge} />
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
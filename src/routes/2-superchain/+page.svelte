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
    KindedProtocolVersionsProxyOptions, KindProtocolVersionsProxy,
    KindedProtocolVersionsOptions, KindProtocolVersions,
    KindedStepTwoAllOptions, KindStepTwoAll,
    KindedStepTwoAllSubOptions, KindStepTwoAllSub,
    OptionsErrorMessages
  } from '$lib/wizard/shared';

  import {
    sanitizeKindAddressManager,
    sanitizeKindProxyAdmin,
    sanitizeKindSuperchainConfigProxy,
    sanitizeKindSuperchainConfig,
    sanitizeKindProtocolVersionsProxy,
    sanitizeKindProtocolVersions,
    sanitizeKindStepTwoAll,
    sanitizeKindStepTwoAllSub,
    OptionsError
  } from '$lib/wizard/shared';

  import Background from '$lib/ui/background/Background.svelte';
  import QuickGuide from '$lib/ui/components/QuickGuide.svelte';
  import ScrollStep from '$lib/ui/templates/ScrollStep.svelte';
  import WizardSingle from '$lib/ui/components/WizardSingle.svelte';
  import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
  import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';
  import AllSubControls from '$lib/ui/controls/2-AllSubControls.svelte';
  import AllControls from '$lib/ui/controls/2-AllControls.svelte';

  import AddressManagerControls from '$lib/ui/controls/2-AddressManagerControls.svelte';
  import ProxyAdminControls from '$lib/ui/controls/2-ProxyAdminControls.svelte';
  import SuperchainConfigProxyControls from '$lib/ui/controls/2-SuperchainConfigProxyControls.svelte';
  import SuperchainConfigControls from '$lib/ui/controls/2-SuperchainConfigControls.svelte';
  import ProtocolVersionsProxyControls from '$lib/ui/controls/2-ProtocolVersionsProxyControls.svelte';
  import ProtocolVersionsControls from '$lib/ui/controls/2-ProtocolVersions.svelte';

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
  $: stepLinks  = data.dropDownLinks.slice(Math.max(data.dropDownLinks.length - 6, 2));

  $: addressPreContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>"
}
  \`\`\`
  `);

  export let initialContractStepTab: string | undefined = 'StepTwoAll';
  export let contractStepTab: KindStepTwoAll = sanitizeKindStepTwoAll(initialContractStepTab);

  let allContractsStepOpts: { [k in KindStepTwoAll]?: Required<KindedStepTwoAllOptions [k]> } = {};

  let errorsStep: { [k in KindStepTwoAll]?: OptionsErrorMessages } = {};

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

  export let initialContractStepSubTab: string | undefined = 'StepTwoAllSub';
  export let contractStepSubTab: KindStepTwoAllSub = sanitizeKindStepTwoAllSub(initialContractStepSubTab);

  let allContractsStepSubOpts: { [k in KindStepTwoAllSub]?: Required<KindedStepTwoAllSubOptions [k]> } = {};

  let errorsStepSub: { [k in KindStepTwoAllSub]?: OptionsErrorMessages } = {};

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
  "ProtocolVersions": "<ADDRESS_9>"
}
  \`\`\`
  `);

  // **** step 1 ***
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

  // **** step 2 ***
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
  let deployContractSuperchainConfig: DeployContract = new DeployBuilder('DeployAndInitializeSuperchainConfigScript');

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

  export let initialContractProtocolVersionsProxyTab: string | undefined = 'ProtocolVersionsProxy';
  export let contractProtocolVersionsProxyTab: KindProtocolVersionsProxy = sanitizeKindProtocolVersionsProxy(initialContractProtocolVersionsProxyTab);
  let allContractsProtocolVersionsProxyOpts: { [k in KindProtocolVersionsProxy]?: Required<KindedProtocolVersionsProxyOptions [k]> } = {};
  let errorsProtocolVersionsProxy: { [k in KindProtocolVersionsProxy]?: OptionsErrorMessages } = {};
  let contractProtocolVersionsProxy: Contract = new ContractBuilder('ProtocolVersionsProxy');
  let deployContractProtocolVersionsProxy: DeployContract = new DeployBuilder('DeployProtocolVersionsProxyScript');

  $: optsProtocolVersionsProxy = allContractsProtocolVersionsProxyOpts[contractProtocolVersionsProxyTab];
  $: {
  if (optsProtocolVersionsProxy) {
          try {
              contractProtocolVersionsProxy = buildContractGeneric(optsProtocolVersionsProxy);
              deployContractProtocolVersionsProxy = buildDeployGeneric(optsProtocolVersionsProxy);
              errorsProtocolVersionsProxy[contractProtocolVersionsProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsProtocolVersionsProxy[contractProtocolVersionsProxyTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepThreeAModalOpen = false;
  $: addressStepThreeAContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "AddressManager": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>"
}
  \`\`\`
  `);

  export let initialContractProtocolVersionsTab: string | undefined = 'ProtocolVersions';
  export let contractProtocolVersionsTab: KindProtocolVersions = sanitizeKindProtocolVersions(initialContractProtocolVersionsTab);
  let allContractsProtocolVersionsOpts: { [k in KindProtocolVersions]?: Required<KindedProtocolVersionsOptions [k]> } = {};
  let errorsProtocolVersions: { [k in KindProtocolVersions]?: OptionsErrorMessages } = {};
  let contractProtocolVersions: Contract = new ContractBuilder('ProtocolVersions');
  let deployContractProtocolVersions: DeployContract = new DeployBuilder('DeployAndInitializeProtocolVersionsScript');

  $: optsProtocolVersions = allContractsProtocolVersionsOpts[contractProtocolVersionsTab];
  $: {
  if (optsProtocolVersions) {
          try {
              contractProtocolVersions = buildContractGeneric(optsProtocolVersions);
              deployContractProtocolVersions = buildDeployGeneric(optsProtocolVersions);
              errorsProtocolVersions[contractProtocolVersionsTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsProtocolVersions[contractProtocolVersionsTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepThreeBModalOpen = false;
  $: addressStepThreeBContent = md.render(`
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


</script>

<QuickGuide path1={data.dropDownLinks[0].pathname} path2={data.dropDownLinks[1].pathname} path3={data.dropDownLinks[2].pathname} />

<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[0].pathname}>
    <div class="divider divider-primary">
      <h1 class="btn btn-ghost text-2xl ">2.0 : Prerequisites</h1>
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

<!-- 000_DeployAll.s.sol -->

<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[1].pathname}>
    <div class="divider divider-primary">
      <h1 class="btn btn-primary text-2xl ">One-Click L1 Superchain Deployment</h1>
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
            <button class:selected={contractStepTab === 'StepTwoAll'} on:click={() => contractStepTab = 'StepTwoAll'}>
              DeployAll
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(120vh-80px)] overflow-auto">
          <div class:hidden={contractStepTab !== 'StepTwoAll'}>
              <AllControls bind:opts={allContractsStepOpts.StepTwoAll} />
          </div>
      </div>
  </div>

</WizardSingle>

<WizardSingle isShowingCommand={false} conventionNumber={'200'} initialContractTab={initialContractStepSubTab} contractTab={contractStepSubTab} opts={optsStepSub} deployContract={deployContractStepSub}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractStepSubTab === 'StepTwoAllSub'} on:click={() => contractStepSubTab = 'StepTwoAllSub'}>
              SetupSuperchain
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractStepSubTab !== 'StepTwoAllSub'}>
              <AllSubControls bind:opts={allContractsStepSubOpts.StepTwoAllSub} />
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

<!-- 201A_DeployAddressManager.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[0].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">2.1A : Deploy AddressManager Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[0].title} />

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
  <section id={stepLinks[1].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">2.1B : Deploy And Setup ProxyAdmin Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[1].title} />

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
  <section id={stepLinks[2].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">2.2A : Deploy SuperchainConfigProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[2].title} />

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
  <section id={stepLinks[3].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">2.2B : DeployAndInitializeSuperchainConfig Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[3].title} />

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

<!-- 203A_DeployProtocolVersionsProxy.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[4].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">2.3A : Deploy ProtocolVersionsProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[4].title} />

<WizardDouble conventionNumber={'203A'} initialContractTab={initialContractProtocolVersionsProxyTab} contractTab={contractProtocolVersionsProxyTab} opts={optsProtocolVersionsProxy} contract={contractProtocolVersionsProxy} deployContract={deployContractProtocolVersionsProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractProtocolVersionsProxyTab === 'ProtocolVersionsProxy'} on:click={() => contractProtocolVersionsProxyTab = 'ProtocolVersionsProxy'}>
              ProtocolVersionsProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractProtocolVersionsProxyTab !== 'ProtocolVersionsProxy'}>
              <ProtocolVersionsProxyControls bind:opts={allContractsProtocolVersionsProxyOpts.ProtocolVersionsProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepThreeAModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepThreeAModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepThreeAModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepThreeAContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 203B_DeployAndInitializeProtocolVersions.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[5].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">2.3B : DeployAndInitializeProtocolVersions Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[5].title} />

<WizardDouble conventionNumber={'203B'} initialContractTab={initialContractProtocolVersionsTab} contractTab={contractProtocolVersionsTab} opts={optsProtocolVersions} contract={contractProtocolVersions} deployContract={deployContractProtocolVersions}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractProtocolVersionsTab === 'ProtocolVersions'} on:click={() => contractProtocolVersionsTab = 'ProtocolVersions'}>
              ProtocolVersions
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractProtocolVersionsTab !== 'ProtocolVersions'}>
              <ProtocolVersionsControls bind:opts={allContractsProtocolVersionsOpts.ProtocolVersions} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepThreeBModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepThreeBModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepThreeBModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepThreeBContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>


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
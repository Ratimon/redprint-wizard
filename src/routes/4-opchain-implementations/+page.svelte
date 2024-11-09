<script  lang="ts">
    import type { PageData } from "../4-opchain-proxies/$types";

    import type {  Contract } from '$lib/wizard/smart-contracts';
    import { ContractBuilder, buildContractGeneric } from '$lib/wizard/smart-contracts';
    import type {  DeployContract } from '$lib/wizard/deploy-scripts';
    import { DeployBuilder, buildDeployGeneric } from '$lib/wizard/deploy-scripts';

    import type {
        KindedL1CrossDomainMessengerOptions, KindL1CrossDomainMessenger,
        KindedOptimismMintableERC20FactoryOptions, KindOptimismMintableERC20Factory,
        KindedSystemConfigOptions, KindSystemConfig,
        KindedL1StandardBridgeOptions, KindL1StandardBridge,
        KindedL1ERC721BridgeOptions, KindL1ERC721Bridge,
        KindedStepFourPointTwoAllOptions, KindStepFourPointTwoAll,
        KindedStepFourPointTwoAllSubOptions, KindStepFourPointTwoAllSub,
        OptionsErrorMessages
    } from '$lib/wizard/shared';

    import {
        sanitizeKindL1CrossDomainMessenger,
        sanitizeKindOptimismMintableERC20Factory,
        sanitizeKindSystemConfig,
        sanitizeKindL1StandardBridge,
        sanitizeKindL1ERC721Bridge,
        sanitizeKindStepFourPointTwoAll,
        sanitizeKindStepFourPointTwoAllSub,
        OptionsError
    } from '$lib/wizard/shared';

    import Background from '$lib/ui/background/Background.svelte';
    import WizardSingle from '$lib/ui/components/WizardSingle.svelte';
    import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
    import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';

    import L1CrossDomainMessengerControls from '$lib/ui/controls/4-L1CrossDomainMessengerControls.svelte';
    import OptimismMintableERC20FactoryControls from '$lib/ui/controls/4-OptimismMintableERC20FactoryControls.svelte';
    import SystemConfigControls from '$lib/ui/controls/4-SystemConfigControls.svelte';
    import SystemConfigInteropControls from '$lib/ui/controls/4-SystemConfigInteropControls.svelte';
    import L1StandardBridgeControls from '$lib/ui/controls/4-L1StandardBridgeControls.svelte';
    import L1ERC721BridgeControls from '$lib/ui/controls/4-L1ERC721BridgeControls.svelte';
    import AllSubControls from '$lib/ui/controls/4-2AllSubControls.svelte';
    import AllControls from '$lib/ui/controls/4-2AllControls.svelte';

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
  "AnchorStateRegistryProxy": "<ADDRESS_20>",
  "L1CrossDomainMessenger": "<ADDRESS_21>"
}
  \`\`\`
  `);

  // **** step 4.2B ***
  export let initialContractOptimismMintableERC20FactoryTab: string | undefined = 'OptimismMintableERC20Factory';
  export let contractOptimismMintableERC20FactoryTab: KindOptimismMintableERC20Factory = sanitizeKindOptimismMintableERC20Factory(initialContractOptimismMintableERC20FactoryTab);
  let allContractsOptimismMintableERC20FactoryOpts: { [k in KindOptimismMintableERC20Factory]?: Required<KindedOptimismMintableERC20FactoryOptions [k]> } = {};
  let errorsOptimismMintableERC20Factory: { [k in KindOptimismMintableERC20Factory]?: OptionsErrorMessages } = {};
  let contractOptimismMintableERC20Factory: Contract = new ContractBuilder('OptimismMintableERC20Factory');
  let deployContractOptimismMintableERC20Factory: DeployContract = new DeployBuilder('DeployOptimismMintableERC20FactoryScript');

  $: optsOptimismMintableERC20Factory = allContractsOptimismMintableERC20FactoryOpts[contractOptimismMintableERC20FactoryTab];
  $: {
  if (optsOptimismMintableERC20Factory) {
          try {
              contractOptimismMintableERC20Factory = buildContractGeneric(optsOptimismMintableERC20Factory);
              deployContractOptimismMintableERC20Factory = buildDeployGeneric(optsOptimismMintableERC20Factory);
              errorsOptimismMintableERC20Factory[contractOptimismMintableERC20FactoryTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsOptimismMintableERC20Factory[contractOptimismMintableERC20FactoryTab] = e.messages;
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
  "AnchorStateRegistryProxy": "<ADDRESS_20>",
  "L1CrossDomainMessenger": "<ADDRESS_21>",
  "OptimismMintableERC20Factory": "<ADDRESS_22>"
}
  \`\`\`
  `);

  // **** step 4.2C ***
  export let initialContractSystemConfigTab: string | undefined = 'SystemConfig';
  export let contractSystemConfigTab: KindSystemConfig = sanitizeKindSystemConfig(initialContractSystemConfigTab);
  let allContractsSystemConfigOpts: { [k in KindSystemConfig]?: Required<KindedSystemConfigOptions [k]> } = {};
  let errorsSystemConfig: { [k in KindSystemConfig]?: OptionsErrorMessages } = {};
  let contractSystemConfig: Contract = new ContractBuilder('SystemConfig');
  let deployContractSystemConfig: DeployContract = new DeployBuilder('DeploySystemConfigScript');

  $: optsSystemConfig = allContractsSystemConfigOpts[contractSystemConfigTab];
  $: {
  if (optsSystemConfig) {
          try {
              contractSystemConfig = buildContractGeneric(optsSystemConfig);
              deployContractSystemConfig = buildDeployGeneric(optsSystemConfig);
              errorsSystemConfig[contractSystemConfigTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsSystemConfig[contractSystemConfigTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoCModalOpen = false;
  $: addressStepTwoCContent = md.render(`
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
  "AnchorStateRegistryProxy": "<ADDRESS_20>",
  "L1CrossDomainMessenger": "<ADDRESS_21>",
  "OptimismMintableERC20Factory": "<ADDRESS_22>",
  "SystemConfig": "<ADDRESS_23>"
}
  \`\`\`
  `);

  // **** step 4.2D ***
  export let initialContractL1StandardBridgeTab: string | undefined = 'L1StandardBridge';
  export let contractL1StandardBridgeTab: KindL1StandardBridge = sanitizeKindL1StandardBridge(initialContractL1StandardBridgeTab);
  let allContractsL1StandardBridgeOpts: { [k in KindL1StandardBridge]?: Required<KindedL1StandardBridgeOptions [k]> } = {};
  let errorsL1StandardBridge: { [k in KindL1StandardBridge]?: OptionsErrorMessages } = {};
  let contractL1StandardBridge: Contract = new ContractBuilder('L1StandardBridge');
  let deployContractL1StandardBridge: DeployContract = new DeployBuilder('DeployL1StandardBridgeScript');

  $: optsL1StandardBridge = allContractsL1StandardBridgeOpts[contractL1StandardBridgeTab];
  $: {
  if (optsL1StandardBridge) {
          try {
              contractL1StandardBridge = buildContractGeneric(optsL1StandardBridge);
              deployContractL1StandardBridge = buildDeployGeneric(optsL1StandardBridge);
              errorsL1StandardBridge[contractL1StandardBridgeTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsL1StandardBridge[contractL1StandardBridgeTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoDModalOpen = false;
  $: addressStepTwoDContent = md.render(`
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
  "AnchorStateRegistryProxy": "<ADDRESS_20>",
  "L1CrossDomainMessenger": "<ADDRESS_21>",
  "OptimismMintableERC20Factory": "<ADDRESS_22>",
  "SystemConfig": "<ADDRESS_23>",
  "L1StandardBridge": "<ADDRESS_24>"
}
  \`\`\`
  `);


  // **** step 4.2E ***
  export let initialContractL1ERC721BridgeTab: string | undefined = 'L1ERC721Bridge';
  export let contractL1ERC721BridgeTab: KindL1ERC721Bridge = sanitizeKindL1ERC721Bridge(initialContractL1ERC721BridgeTab);
  let allContractsL1ERC721BridgeOpts: { [k in KindL1ERC721Bridge]?: Required<KindedL1ERC721BridgeOptions [k]> } = {};
  let errorsL1ERC721Bridge: { [k in KindL1ERC721Bridge]?: OptionsErrorMessages } = {};
  let contractL1ERC721Bridge: Contract = new ContractBuilder('L1ERC721Bridge');
  let deployContractL1ERC721Bridge: DeployContract = new DeployBuilder('DeployL1ERC721BridgeScript');

  $: optsL1ERC721Bridge = allContractsL1ERC721BridgeOpts[contractL1ERC721BridgeTab];
  $: {
  if (optsL1ERC721Bridge) {
          try {
              contractL1ERC721Bridge = buildContractGeneric(optsL1ERC721Bridge);
              deployContractL1ERC721Bridge = buildDeployGeneric(optsL1ERC721Bridge);
              errorsL1ERC721Bridge[contractL1ERC721BridgeTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsL1ERC721Bridge[contractL1ERC721BridgeTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoEModalOpen = false;
  $: addressStepTwoEContent = md.render(`
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
  "AnchorStateRegistryProxy": "<ADDRESS_20>",
  "L1CrossDomainMessenger": "<ADDRESS_21>",
  "OptimismMintableERC20Factory": "<ADDRESS_22>",
  "SystemConfig": "<ADDRESS_23>",
  "L1StandardBridge": "<ADDRESS_24>",
  "L1ERC721Bridge": "<ADDRESS_25>"
}
  \`\`\`
  `);

export let initialContractStepTab: string | undefined = 'StepFourPointTwoAll';
export let contractStepTab: KindStepFourPointTwoAll = sanitizeKindStepFourPointTwoAll(initialContractStepTab);

let allContractsStepOpts: { [k in KindStepFourPointTwoAll]?: Required<KindedStepFourPointTwoAllOptions [k]> } = {};

let errorsStep: { [k in KindStepFourPointTwoAll]?: OptionsErrorMessages } = {};

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
  "AnchorStateRegistryProxy": "<ADDRESS_20>",
  "L1CrossDomainMessenger": "<ADDRESS_21>",
  "OptimismMintableERC20Factory": "<ADDRESS_22>",
  "SystemConfig": "<ADDRESS_23>",
  "L1StandardBridge": "<ADDRESS_24>",
  "L1ERC721Bridge": "<ADDRESS_25>"
}
  \`\`\`
  `);

export let initialContractStepSubTab: string | undefined = 'StepFourPointTwoAllSub';
export let contractStepSubTab: KindStepFourPointTwoAllSub = sanitizeKindStepFourPointTwoAllSub(initialContractStepSubTab);

let allContractsStepSubOpts: { [k in KindStepFourPointTwoAllSub]?: Required<KindedStepFourPointTwoAllSubOptions [k]> } = {};

let errorsStepSub: { [k in KindStepFourPointTwoAllSub]?: OptionsErrorMessages } = {};

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

<!-- 401A_DeployL1CrossDomainMessenger.s.sol -->
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

<!-- 401B_DeployOptimismMintableERC20Factory.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[2].pathname}>
    <div class="divider divider-primary ">
      <p class="text-xl">4.2B : Deploy OptimismMintableERC20Factory Contract</p>
    </div>
  </section>
</Background>

<WizardDouble conventionNumber={'402B'} initialContractTab={initialContractOptimismMintableERC20FactoryTab} contractTab={contractOptimismMintableERC20FactoryTab} opts={optsOptimismMintableERC20Factory} contract={contractOptimismMintableERC20Factory} deployContract={deployContractOptimismMintableERC20Factory}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractOptimismMintableERC20FactoryTab === 'OptimismMintableERC20Factory'} on:click={() => contractOptimismMintableERC20FactoryTab = 'OptimismMintableERC20Factory'}>
              OptimismMintableERC20Factory
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractOptimismMintableERC20FactoryTab !== 'OptimismMintableERC20Factory'}>
              <OptimismMintableERC20FactoryControls bind:opts={allContractsOptimismMintableERC20FactoryOpts.OptimismMintableERC20Factory} />
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

<!-- 401C_DeploySystemConfig.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[2].pathname}>
    <div class="divider divider-primary ">
      <p class="text-xl">4.2C : Deploy SystemConfig Contract</p>
    </div>
  </section>
</Background>

<WizardDouble conventionNumber={'402C'} initialContractTab={initialContractSystemConfigTab} contractTab={contractSystemConfigTab} opts={optsSystemConfig} contract={contractSystemConfig} deployContract={deployContractSystemConfig}>
  <div slot="caption" >
    <h2 class="m-4 font-extrabold	">When configuring <a class="bg-secondary underline" href="https://specs.optimism.io/interop/overview.html" target="_blank" rel="noreferrer">useInterop=false</a>, the contract is <span class="bg-primary underline">SystemConfig</span>(Default). Otherwise, it is <span class="bg-primary underline">SystemConfigInterop</span>.</h2>
  </div>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractSystemConfigTab === 'SystemConfig'} on:click={() => contractSystemConfigTab = 'SystemConfig'}>
              SystemConfig
            </button>
            <button class:selected={contractSystemConfigTab === 'SystemConfigInterop'} on:click={() => contractSystemConfigTab = 'SystemConfigInterop'}>
              SystemConfigInterop
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractSystemConfigTab !== 'SystemConfig'}>
              <SystemConfigControls bind:opts={allContractsSystemConfigOpts.SystemConfig} />
          </div>
          <div class:hidden={contractSystemConfigTab !== 'SystemConfigInterop'}>
            <SystemConfigInteropControls bind:opts={allContractsSystemConfigOpts.SystemConfigInterop} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoCModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoCModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoCModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoCContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 401D_DeployL1StandardBridge.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[3].pathname}>
    <div class="divider divider-primary ">
      <p class="text-xl">4.2D : Deploy L1StandardBridge Contract</p>
    </div>
  </section>
</Background>

<WizardDouble conventionNumber={'402D'} initialContractTab={initialContractL1StandardBridgeTab} contractTab={contractL1StandardBridgeTab} opts={optsL1StandardBridge} contract={contractL1StandardBridge} deployContract={deployContractL1StandardBridge}>
  <div slot="caption" >
    <h2 class="m-4 font-extrabold	">When configuring <a class="bg-secondary underline" href="https://specs.optimism.io/interop/overview.html" target="_blank" rel="noreferrer">useInterop=false</a>, the contract is <span class="bg-primary underline">L1StandardBridge</span>(Default). Otherwise, it is <span class="bg-primary underline">L1StandardBridgeInterop</span>.</h2>
  </div>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractL1StandardBridgeTab === 'L1StandardBridge'} on:click={() => contractL1StandardBridgeTab = 'L1StandardBridge'}>
              L1StandardBridge
            </button>
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractL1StandardBridgeTab !== 'L1StandardBridge'}>
              <L1StandardBridgeControls bind:opts={allContractsL1StandardBridgeOpts.L1StandardBridge} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoDModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoDModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoDModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoDContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 401E_DeployL1ERC721Bridge.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[4].pathname}>
    <div class="divider divider-primary ">
      <p class="text-xl">4.2D : Deploy L1ERC721Bridge Contract</p>
    </div>
  </section>
</Background>

<WizardDouble conventionNumber={'402D'} initialContractTab={initialContractL1ERC721BridgeTab} contractTab={contractL1ERC721BridgeTab} opts={optsL1ERC721Bridge} contract={contractL1ERC721Bridge} deployContract={deployContractL1ERC721Bridge}>
  <div slot="caption" >
    <h2 class="m-4 font-extrabold	">When configuring <a class="bg-secondary underline" href="https://specs.optimism.io/interop/overview.html" target="_blank" rel="noreferrer">useInterop=false</a>, the contract is <span class="bg-primary underline">L1ERC721Bridge</span>(Default). Otherwise, it is <span class="bg-primary underline">L1ERC721BridgeInterop</span>.</h2>
  </div>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractL1ERC721BridgeTab === 'L1ERC721Bridge'} on:click={() => contractL1ERC721BridgeTab = 'L1ERC721Bridge'}>
              L1ERC721Bridge
            </button>
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractL1ERC721BridgeTab !== 'L1ERC721Bridge'}>
              <L1ERC721BridgeControls bind:opts={allContractsL1ERC721BridgeOpts.L1ERC721Bridge} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoEModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoEModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoEModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoEContent)}
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
  <section id={data.dropDownLinks[5].pathname}>
    <div class="divider divider-primary">
      <h1 class="text-2xl ">(Alternative) : Deploy All</h1>
    </div>
    <div class="divider divider-primary">
      <p class="text-2xs ">Note: This script is not completed yet. It is for illustration purpose. Use it at final step.</p>
    </div>
  </section>
</Background>

<WizardSingle isShowingCommand={true} conventionNumber={'000'} initialContractTab={initialContractStepTab} contractTab={contractStepTab} opts={optsStep} deployContract={deployContractStep}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractStepTab === 'StepFourPointTwoAll'} on:click={() => contractStepTab = 'StepFourPointTwoAll'}>
              DeployAll
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractStepTab !== 'StepFourPointTwoAll'}>
              <AllControls bind:opts={allContractsStepOpts.StepFourPointTwoAll} />
          </div>
      </div>
  </div>
  
</WizardSingle>

<WizardSingle isShowingCommand={false} conventionNumber={'400'} initialContractTab={initialContractStepSubTab} contractTab={contractStepSubTab} opts={optsStepSub} deployContract={deployContractStepSub}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractStepSubTab === 'StepFourPointTwoAllSub'} on:click={() => contractStepSubTab = 'StepFourPointTwoAllSub'}>
              SetupOpchain
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractStepSubTab !== 'StepFourPointTwoAllSub'}>
              <AllSubControls bind:opts={allContractsStepSubOpts.StepFourPointTwoAllSub} />
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
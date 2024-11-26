<script  lang="ts">
    import type { PageData } from "../4-opchain-proxies/$types";

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
        KindedDisputeGameFactoryProxyOptions, KindDisputeGameFactoryProxy,
        KindedL2OutputOracleProxyOptions, KindL2OutputOracleProxy,
        KindedDelayedWETHProxyOptions, KindDelayedWETHProxy,
        KindedPermissionedDelayedWETHProxyOptions, KindPermissionedDelayedWETHProxy,
        KindedAnchorStateRegistryProxyOptions, KindAnchorStateRegistryProxy,
        KindedTransferAddressManagerOwnershipOptions, KindTransferAddressManagerOwnership,
        KindedStepFourPointOneAllOptions, KindStepFourPointOneAll,
        KindedStepFourPointOneAllSubOptions, KindStepFourPointOneAllSub,
        OptionsErrorMessages
    } from '$lib/wizard/shared';

    import {
        sanitizeKindOptimismPortalProxy,
        sanitizeKindSystemConfigProxy,
        sanitizeKindL1StandardBridgeProxy,
        sanitizeKindL1CrossDomainMessengerProxy,
        sanitizeKindOptimismMintableERC20FactoryProxy,
        sanitizeKindL1ERC721BridgeProxy,
        sanitizeKindDisputeGameFactoryProxy,
        sanitizeKindL2OutputOracleProxy,
        sanitizeKindDelayedWETHProxy,
        sanitizeKindPermissionedDelayedWETHProxy,
        sanitizeKindAnchorStateRegistryProxy,
        sanitizeKindTransferAddressManagerOwnership,
        sanitizeKindStepFourPointOneAll,
        sanitizeKindStepFourPointOneAllSub,
        OptionsError
    } from '$lib/wizard/shared';

    import Background from '$lib/ui/background/Background.svelte';
    import QuickGuide from '$lib/ui/components/QuickGuide.svelte';
    import ScrollStep from '$lib/ui/templates/ScrollStep.svelte';
    import WizardSingle from '$lib/ui/components/WizardSingle.svelte';
    import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
    import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';

    import OptimismPortalProxyControls from '$lib/ui/controls/4-OptimismPortalProxyControls.svelte';
    import SystemConfigProxyControls from '$lib/ui/controls/4-SystemConfigProxyControls.svelte';
    import L1StandardBridgeProxyControls from '$lib/ui/controls/4-L1StandardBridgeProxyControls.svelte';
    import L1CrossDomainMessengerProxyControls from '$lib/ui/controls/4-L1CrossDomainMessengerProxyControls.svelte';
    import OptimismMintableERC20FactoryProxyControls from '$lib/ui/controls/4-OptimismMintableERC20FactoryProxyControls.svelte';
    import L1ERC721BridgeProxyControls from '$lib/ui/controls/4-L1ERC721BridgeProxyControls.svelte';
    import DisputeGameFactoryProxyControls from '$lib/ui/controls/4-DisputeGameFactoryProxyControls.svelte';
    import L2OutputOracleProxyControls from '$lib/ui/controls/4-L2OutputOracleProxyControls.svelte';
    import DelayedWETHProxyControls from '$lib/ui/controls/4-DelayedWETHProxyControls.svelte';
    import PermissionedDelayedWETHProxyControls from '$lib/ui/controls/4-PermissionedDelayedWETHProxyControls.svelte';
    import AnchorStateRegistryProxyControls from '$lib/ui/controls/4-AnchorStateRegistryProxyControls.svelte';
    import TransferAddressManagerOwnershipControls from '$lib/ui/controls/4-TransferAddressManagerOwnershipControls.svelte';
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
    $: stepLinks  = data.dropDownLinks.slice(Math.max(data.dropDownLinks.length - 12, 2))

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
  "OptimismPortalProxy": "<ADDRESS_10>"
}
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
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingletosn": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>",
  "OptimismPortalProxy": "<ADDRESS_4>",
  "ProxyAdmin": "<ADDRESS_5>",
  "SuperchainConfigProxy": "<ADDRESS_6>",
  "SuperchainConfig": "<ADDRESS_7>",
  "ProtocolVersionsProxy": "<ADDRESS_8>",
  "ProtocolVersions": "<ADDRESS_9>",
  "OptimismPortalProxy": "<ADDRESS_10>",
  "SystemConfigProxy": "<ADDRESS_11>"
}
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
  "L1StandardBridgeProxy": "<ADDRESS_12>"
}
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
  "L1CrossDomainMessengerProxy": "<ADDRESS_13>"
}
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
  "OptimismMintableERC20FactoryProxy": "<ADDRESS_14>"
}
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
  "L1ERC721BridgeProxy": "<ADDRESS_15>"
}
  \`\`\`
  `);

  // **** step 4.1G ***
  export let initialContractDisputeGameFactoryProxyTab: string | undefined = 'DisputeGameFactoryProxy';
  export let contractDisputeGameFactoryProxyTab: KindDisputeGameFactoryProxy = sanitizeKindDisputeGameFactoryProxy(initialContractDisputeGameFactoryProxyTab);
  let allContractsDisputeGameFactoryProxyOpts: { [k in KindDisputeGameFactoryProxy]?: Required<KindedDisputeGameFactoryProxyOptions [k]> } = {};
  let errorsDisputeGameFactoryProxy: { [k in KindDisputeGameFactoryProxy]?: OptionsErrorMessages } = {};
  let contractDisputeGameFactoryProxy: Contract = new ContractBuilder('DisputeGameFactoryProxy');
  let deployContractDisputeGameFactoryProxy: DeployContract = new DeployBuilder('DeployDisputeGameFactoryProxyScript');

  $: optsDisputeGameFactoryProxy = allContractsDisputeGameFactoryProxyOpts[contractDisputeGameFactoryProxyTab];
  $: {
  if (optsDisputeGameFactoryProxy) {
          try {
              contractDisputeGameFactoryProxy = buildContractGeneric(optsDisputeGameFactoryProxy);
              deployContractDisputeGameFactoryProxy = buildDeployGeneric(optsDisputeGameFactoryProxy);
              errorsDisputeGameFactoryProxy[contractDisputeGameFactoryProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsDisputeGameFactoryProxy[contractDisputeGameFactoryProxyTab] = e.messages;
              } else {
                throw e;
              }
          }
      }
  }

  let isArtifactStepOneGModalOpen = false;
  $: addressStepOneGContent = md.render(`
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
  "DisputeGameFactoryProxy": "<ADDRESS_16>"
}
  \`\`\`
  `);

  // **** step 4.1H **
  export let initialContractL2OutputOracleProxyTab: string | undefined = 'L2OutputOracleProxy';
  export let contractL2OutputOracleProxyTab: KindL2OutputOracleProxy = sanitizeKindL2OutputOracleProxy(initialContractL2OutputOracleProxyTab);
  let allContractsL2OutputOracleProxyOpts: { [k in KindL2OutputOracleProxy]?: Required<KindedL2OutputOracleProxyOptions [k]> } = {};
  let errorsL2OutputOracleProxy: { [k in KindL2OutputOracleProxy]?: OptionsErrorMessages } = {};
  let contractL2OutputOracleProxy: Contract = new ContractBuilder('L2OutputOracleProxy');
  let deployContractL2OutputOracleProxy: DeployContract = new DeployBuilder('DeployL2OutputOracleProxyScript');

  $: optsL2OutputOracleProxy = allContractsL2OutputOracleProxyOpts[contractL2OutputOracleProxyTab];
  $: {
  if (optsL2OutputOracleProxy) {  
          try {
              contractL2OutputOracleProxy = buildContractGeneric(optsL2OutputOracleProxy);
              deployContractL2OutputOracleProxy = buildDeployGeneric(optsL2OutputOracleProxy);
              errorsL2OutputOracleProxy[contractL2OutputOracleProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsL2OutputOracleProxy[contractL2OutputOracleProxyTab] = e.messages;
              } else {
                throw e;
              }
          }
      }
  }

  let isArtifactStepOneHModalOpen = false;
  $: addressStepOneHContent = md.render(`
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
  "L2OutputOracleProxy": "<ADDRESS_17>"
}
  \`\`\`
  `);

  // **** step 4.1I ***
  export let initialContractDelayedWETHProxyTab: string | undefined = 'DelayedWETHProxy';
  export let contractDelayedWETHProxyTab: KindDelayedWETHProxy = sanitizeKindDelayedWETHProxy(initialContractDelayedWETHProxyTab);
  let allContractsDelayedWETHProxyOpts: { [k in KindDelayedWETHProxy]?: Required<KindedDelayedWETHProxyOptions [k]> } = {};
  let errorsDelayedWETHProxy: { [k in KindDelayedWETHProxy]?: OptionsErrorMessages } = {};
  let contractDelayedWETHProxy: Contract = new ContractBuilder('DelayedWETHProxy');
  let deployContractDelayedWETHProxy: DeployContract = new DeployBuilder('DeployDelayedWETHProxyScript');

  $: optsDelayedWETHProxy = allContractsDelayedWETHProxyOpts[contractDelayedWETHProxyTab];
  $: {
  if (optsDelayedWETHProxy) {
          try {
              contractDelayedWETHProxy = buildContractGeneric(optsDelayedWETHProxy);
              deployContractDelayedWETHProxy = buildDeployGeneric(optsDelayedWETHProxy);
              errorsDelayedWETHProxy[contractDelayedWETHProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsDelayedWETHProxy[contractDelayedWETHProxyTab] = e.messages;
              } else {
                throw e;
              }
          }
      }
  }

  let isArtifactStepOneIModalOpen = false;
  $: addressStepOneIContent = md.render(`
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
  "DelayedWETHProxy": "<ADDRESS_18>"
}
  \`\`\`
  `);

  // **** step 4.1J ***
  export let initialContractPermissionedDelayedWETHProxyTab: string | undefined = 'PermissionedDelayedWETHProxy';
  export let contractPermissionedDelayedWETHProxyTab: KindPermissionedDelayedWETHProxy = sanitizeKindPermissionedDelayedWETHProxy(initialContractPermissionedDelayedWETHProxyTab);
  let allContractsPermissionedDelayedWETHProxyOpts: { [k in KindPermissionedDelayedWETHProxy]?: Required<KindedPermissionedDelayedWETHProxyOptions [k]> } = {};
  let errorsPermissionedDelayedWETHProxy: { [k in KindPermissionedDelayedWETHProxy]?: OptionsErrorMessages } = {};
  let contractPermissionedDelayedWETHProxy: Contract = new ContractBuilder('PermissionedDelayedWETHProxy');
  let deployContractPermissionedDelayedWETHProxy: DeployContract = new DeployBuilder('DeployPermissionedDelayedWETHProxyScript');

  $: optsPermissionedDelayedWETHProxy = allContractsPermissionedDelayedWETHProxyOpts[contractPermissionedDelayedWETHProxyTab];
  $: {
  if (optsPermissionedDelayedWETHProxy) {
          try {
              contractPermissionedDelayedWETHProxy = buildContractGeneric(optsPermissionedDelayedWETHProxy);
              deployContractPermissionedDelayedWETHProxy = buildDeployGeneric(optsPermissionedDelayedWETHProxy);
              errorsPermissionedDelayedWETHProxy[contractPermissionedDelayedWETHProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsPermissionedDelayedWETHProxy[contractPermissionedDelayedWETHProxyTab] = e.messages;
              } else {
                throw e;
              }
          }
      }
  }

  let isArtifactStepOneJModalOpen = false;
  $: addressStepOneJContent = md.render(`
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
  "PermissionedDelayedWETHProxy": "<ADDRESS_19>"
}
  \`\`\`
  `);

  // **** step 4.1K ***
  export let initialContractAnchorStateRegistryProxyTab: string | undefined = 'AnchorStateRegistryProxy';
  export let contractAnchorStateRegistryProxyTab: KindAnchorStateRegistryProxy = sanitizeKindAnchorStateRegistryProxy(initialContractAnchorStateRegistryProxyTab);
  let allContractsAnchorStateRegistryProxyOpts: { [k in KindAnchorStateRegistryProxy]?: Required<KindedAnchorStateRegistryProxyOptions [k]> } = {};
  let errorsAnchorStateRegistryProxy: { [k in KindAnchorStateRegistryProxy]?: OptionsErrorMessages } = {};
  let contractAnchorStateRegistryProxy: Contract = new ContractBuilder('AnchorStateRegistryProxy');
  let deployContractAnchorStateRegistryProxy: DeployContract = new DeployBuilder('DeployAnchorStateRegistryProxyScript');

  $: optsAnchorStateRegistryProxy = allContractsAnchorStateRegistryProxyOpts[contractAnchorStateRegistryProxyTab];
  $: {
  if (optsAnchorStateRegistryProxy) {
          try {
              contractAnchorStateRegistryProxy = buildContractGeneric(optsAnchorStateRegistryProxy);
              deployContractAnchorStateRegistryProxy = buildDeployGeneric(optsAnchorStateRegistryProxy);
              errorsAnchorStateRegistryProxy[contractAnchorStateRegistryProxyTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsAnchorStateRegistryProxy[contractAnchorStateRegistryProxyTab] = e.messages;
              } else {
                throw e;
              }
          }
      }
  }

  let isArtifactStepOneKModalOpen = false;
  $: addressStepOneKContent = md.render(`
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


export let initialContractTransferAddressManagerOwnershipTab: string | undefined = 'TransferAddressManagerOwnership';
export let contractTransferAddressManagerOwnershipTab: KindTransferAddressManagerOwnership = sanitizeKindTransferAddressManagerOwnership(initialContractTransferAddressManagerOwnershipTab);

let allContractsTransferAddressManagerOwnershipOpts: { [k in KindTransferAddressManagerOwnership]?: Required<KindedTransferAddressManagerOwnershipOptions [k]> } = {};

let errorsTransferAddressManagerOwnership: { [k in KindTransferAddressManagerOwnership]?: OptionsErrorMessages } = {};

let deployContractTransferAddressManagerOwnership: DeployContract = new DeployBuilder('TransferAddressManagerOwnershipScript');

$: optsTransferAddressManagerOwnership = allContractsTransferAddressManagerOwnershipOpts[contractTransferAddressManagerOwnershipTab];
$: {
if (optsTransferAddressManagerOwnership) {
        try {
            deployContractTransferAddressManagerOwnership = buildDeployGeneric(optsTransferAddressManagerOwnership);
            errorsTransferAddressManagerOwnership[contractTransferAddressManagerOwnershipTab] = undefined;
        } catch (e: unknown) {
            if (e instanceof OptionsError) {
              errorsTransferAddressManagerOwnership[contractTransferAddressManagerOwnershipTab] = e.messages;
            } else {
            throw e;
            }
        }
    }
}

</script>

<QuickGuide path1={data.dropDownLinks[0].pathname} path2={data.dropDownLinks[1].pathname} path3={data.dropDownLinks[2].pathname} />

<Background color="bg-base-100 pt-3 pb-4">
    <section id={data.dropDownLinks[0].pathname}>
      <div class="divider divider-primary">
        <h1 class="btn btn-ghost text-2xl ">4.1 : Prerequisites</h1>
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
      <h1 class="btn btn-primary text-2xl ">One-Click L2 Opchain (Proxies) Deployment</h1>
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

 <!-- 401A_DeployOptimismPortalProxy -->
<Background color="bg-base-100 pt-3 pb-4">
    <section id={stepLinks[0].pathname}>
      <div class="divider divider-primary ">
        <p class="btn btn-accent text-2xl">4.1 : Deploy Proxies Contracts</p>
      </div>
    </section>
    <div class="divider divider-default">
    </div>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1A : Deploy OptimismPortalProxy Contract</p>
    </div>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[0].title} />

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
  <section id={stepLinks[1].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1B : Deploy SystemConfigProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[1].title} />

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
  <section id={stepLinks[2].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1C : Deploy L1StandardBridgeProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[2].title} />


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
  <section id={stepLinks[3].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1D : Deploy L1CrossDomainMessengerProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[3].title} />

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
  <section id={stepLinks[4].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1E : Deploy OptimismMintableERC20FactoryProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[4].title} />

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
  <section id={stepLinks[5].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1F : Deploy L1ERC721BridgeProxy Contract</p>
  </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[5].title} />

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
  <section id={stepLinks[6].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1G : Deploy DisputeGameFactoryProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[6].title} />

<WizardDouble conventionNumber={'401G'} initialContractTab={initialContractDisputeGameFactoryProxyTab} contractTab={contractDisputeGameFactoryProxyTab} opts={optsDisputeGameFactoryProxy} contract={contractDisputeGameFactoryProxy} deployContract={deployContractDisputeGameFactoryProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractDisputeGameFactoryProxyTab === 'DisputeGameFactoryProxy'} on:click={() => contractDisputeGameFactoryProxyTab = 'DisputeGameFactoryProxy'}>
              DisputeGameFactoryProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractDisputeGameFactoryProxyTab !== 'DisputeGameFactoryProxy'}>
              <DisputeGameFactoryProxyControls bind:opts={allContractsDisputeGameFactoryProxyOpts.DisputeGameFactoryProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneGModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneGModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneGModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneGContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[7].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1H : Deploy L2OutputOracleProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[7].title} />

<WizardDouble conventionNumber={'401H'} initialContractTab={initialContractL2OutputOracleProxyTab} contractTab={contractL2OutputOracleProxyTab} opts={optsL2OutputOracleProxy} contract={contractL2OutputOracleProxy} deployContract={deployContractL2OutputOracleProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractL2OutputOracleProxyTab === 'L2OutputOracleProxy'} on:click={() => contractL2OutputOracleProxyTab = 'L2OutputOracleProxy'}>
              L2OutputOracleProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractL2OutputOracleProxyTab !== 'L2OutputOracleProxy'}>
              <L2OutputOracleProxyControls bind:opts={allContractsL2OutputOracleProxyOpts.L2OutputOracleProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneHModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneHModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneHModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneHContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[8].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1I : Deploy DelayedWETHProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[8].title} />

<WizardDouble conventionNumber={'401I'} initialContractTab={initialContractDelayedWETHProxyTab} contractTab={contractDelayedWETHProxyTab} opts={optsDelayedWETHProxy} contract={contractDelayedWETHProxy} deployContract={deployContractDelayedWETHProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractDelayedWETHProxyTab === 'DelayedWETHProxy'} on:click={() => contractDelayedWETHProxyTab = 'DelayedWETHProxy'}>
              DelayedWETHProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractDelayedWETHProxyTab !== 'DelayedWETHProxy'}>
              <DelayedWETHProxyControls bind:opts={allContractsDelayedWETHProxyOpts.DelayedWETHProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneIModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneIModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneIModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneIContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[9].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1J : Deploy PermissionedDelayedWETHProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[9].title} />

<WizardDouble conventionNumber={'401J'} initialContractTab={initialContractPermissionedDelayedWETHProxyTab} contractTab={contractPermissionedDelayedWETHProxyTab} opts={optsPermissionedDelayedWETHProxy} contract={contractPermissionedDelayedWETHProxy} deployContract={deployContractPermissionedDelayedWETHProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractPermissionedDelayedWETHProxyTab === 'PermissionedDelayedWETHProxy'} on:click={() => contractPermissionedDelayedWETHProxyTab = 'PermissionedDelayedWETHProxy'}>
              PermissionedDelayedWETHProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractPermissionedDelayedWETHProxyTab !== 'PermissionedDelayedWETHProxy'}>
              <PermissionedDelayedWETHProxyControls bind:opts={allContractsPermissionedDelayedWETHProxyOpts.PermissionedDelayedWETHProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneJModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneJModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneJModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneJContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[10].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1K : Deploy AnchorStateRegistryProxy Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[10].title} />


<WizardDouble conventionNumber={'401K'} initialContractTab={initialContractAnchorStateRegistryProxyTab} contractTab={contractAnchorStateRegistryProxyTab} opts={optsAnchorStateRegistryProxy} contract={contractAnchorStateRegistryProxy} deployContract={deployContractAnchorStateRegistryProxy}>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractAnchorStateRegistryProxyTab === 'AnchorStateRegistryProxy'} on:click={() => contractAnchorStateRegistryProxyTab = 'AnchorStateRegistryProxy'}>
              AnchorStateRegistryProxy
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractAnchorStateRegistryProxyTab !== 'AnchorStateRegistryProxy'}>
              <AnchorStateRegistryProxyControls bind:opts={allContractsAnchorStateRegistryProxyOpts.AnchorStateRegistryProxy} />
          </div>
      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepOneKModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepOneKModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepOneKModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepOneKContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 401L_TransferAddressManagerOwnership.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[11].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1L : Transfer AddressManager Ownership</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[11].title} />

<WizardSingle isShowingCommand={true} conventionNumber={'401L'} initialContractTab={initialContractTransferAddressManagerOwnershipTab} contractTab={contractTransferAddressManagerOwnershipTab} opts={optsTransferAddressManagerOwnership} deployContract={deployContractTransferAddressManagerOwnership}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractTransferAddressManagerOwnershipTab === 'TransferAddressManagerOwnership'} on:click={() => contractTransferAddressManagerOwnershipTab = 'TransferAddressManagerOwnership'}>
              TransferAddressManagerOwnership
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractTransferAddressManagerOwnershipTab !== 'TransferAddressManagerOwnership'}>
              <TransferAddressManagerOwnershipControls bind:opts={allContractsTransferAddressManagerOwnershipOpts.TransferAddressManagerOwnership} />
          </div>
      </div>
  </div>
  
</WizardSingle>
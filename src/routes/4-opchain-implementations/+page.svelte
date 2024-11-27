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
      KindedOptimismPortalOptions, KindOptimismPortal,
      KindedL2OutputOracleOptions, KindL2OutputOracle,
      KindedOptimismPortal2Options, KindOptimismPortal2,
      KindedDisputeGameFactoryOptions, KindDisputeGameFactory,
      KindedDelayedWETHOptions, KindDelayedWETH,
      KindedPreimageOracleOptions, KindPreimageOracle,
      KindedMIPSOptions, KindMIPS,
      KindedAnchorStateRegistryOptions, KindAnchorStateRegistry,
      KindedInitializeImplementationsOptions, KindInitializeImplementations,
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
      sanitizeKindOptimismPortal,
      sanitizeKindL2OutputOracle,
      sanitizeKindOptimismPortal2,
      sanitizeKindDisputeGameFactory,
      sanitizeKindDelayedWETH,
      sanitizeKindPreimageOracle,
      sanitizeKindMIPS,
      sanitizeKindAnchorStateRegistry,
      sanitizeKindInitializeImplementations,
      sanitizeKindStepFourPointTwoAll,
      sanitizeKindStepFourPointTwoAllSub,
      OptionsError
  } from '$lib/wizard/shared';

  import Background from '$lib/ui/background/Background.svelte';
  import QuickGuide from '$lib/ui/components/QuickGuide.svelte';
  import ScrollStep from '$lib/ui/templates/ScrollStep.svelte';  
  import WizardSingle from '$lib/ui/components/WizardSingle.svelte';
  import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
  import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';

  import L1CrossDomainMessengerControls from '$lib/ui/controls/4-L1CrossDomainMessengerControls.svelte';
  import OptimismMintableERC20FactoryControls from '$lib/ui/controls/4-OptimismMintableERC20FactoryControls.svelte';
  import SystemConfigControls from '$lib/ui/controls/4-SystemConfigControls.svelte';
  import SystemConfigInteropControls from '$lib/ui/controls/4-SystemConfigInteropControls.svelte';
  import L1StandardBridgeControls from '$lib/ui/controls/4-L1StandardBridgeControls.svelte';
  import L1ERC721BridgeControls from '$lib/ui/controls/4-L1ERC721BridgeControls.svelte';
  import OptimismPortalControls from '$lib/ui/controls/4-OptimismPortalControls.svelte';
  import L2OutputOracleControls from '$lib/ui/controls/4-L2OutputOracleControls.svelte';
  import OptimismPortal2Controls from '$lib/ui/controls/4-OptimismPortal2Controls.svelte';
  import OptimismPortalInteropControls from '$lib/ui/controls/4-OptimismPortalInteropControls.svelte';
  import DisputeGameFactoryControls from '$lib/ui/controls/4-DisputeGameFactoryControls.svelte';
  import DelayedWETHControls from '$lib/ui/controls/4-DelayedWETHControls.svelte';
  import PreimageOracleControls from '$lib/ui/controls/4-PreimageOracleControls.svelte';
  import MIPSControls from '$lib/ui/controls/4-MIPSControls.svelte';
  import AllSubControls from '$lib/ui/controls/4-2AllSubControls.svelte';
  import AllControls from '$lib/ui/controls/4-2AllControls.svelte';
  import AnchorStateRegistryControls from '$lib/ui/controls/4-AnchorStateRegistryControls.svelte';
  import InitializeImplementationsControls from '$lib/ui/controls/4-InitializeImplementationsControls.svelte';
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
  $: stepLinks  = data.dropDownLinks.slice(Math.max(data.dropDownLinks.length - 14, 2))

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
  "L1ERC721Bridge": "<ADDRESS_25>",
  "OptimismPortal": "<ADDRESS_26>",
  "L2OutputOracle": "<ADDRESS_27>",
  "OptimismPortal2": "<ADDRESS_28>",
  "DisputeGameFactory": "<ADDRESS_29>",
  "DelayedWETH": "<ADDRESS_30>",
  "PreimageOracle" : "<ADDRESS_31>",
  "Mips" : "<ADDRESS_32>",
  "AnchorStateRegistry" : "<ADDRESS_33>"
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

  // **** step 4.2F ***
  export let initialContractOptimismPortalTab: string | undefined = 'OptimismPortal';
  export let contractOptimismPortalTab: KindOptimismPortal = sanitizeKindOptimismPortal(initialContractOptimismPortalTab);
  let allContractsOptimismPortalOpts: { [k in KindOptimismPortal]?: Required<KindedOptimismPortalOptions [k]> } = {};
  let errorsOptimismPortal: { [k in KindOptimismPortal]?: OptionsErrorMessages } = {};
  let contractOptimismPortal: Contract = new ContractBuilder('OptimismPortal');
  let deployContractOptimismPortal: DeployContract = new DeployBuilder('DeployOptimismPortalScript');

  $: optsOptimismPortal = allContractsOptimismPortalOpts[contractOptimismPortalTab];
  $: {
  if (optsOptimismPortal) {
          try {
              contractOptimismPortal = buildContractGeneric(optsOptimismPortal);
              deployContractOptimismPortal = buildDeployGeneric(optsOptimismPortal);
              errorsOptimismPortal[contractOptimismPortalTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsOptimismPortal[contractOptimismPortalTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoFModalOpen = false;
  $: addressStepTwoFContent = md.render(`
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
  "L1ERC721Bridge": "<ADDRESS_25>",
  "OptimismPortal": "<ADDRESS_26>"
}
  \`\`\`
  `);

  // **** step 4.2G ***
  export let initialContractL2OutputOracleTab: string | undefined = 'L2OutputOracle';
  export let contractL2OutputOracleTab: KindL2OutputOracle = sanitizeKindL2OutputOracle(initialContractL2OutputOracleTab);
  let allContractsL2OutputOracleOpts: { [k in KindL2OutputOracle]?: Required<KindedL2OutputOracleOptions [k]> } = {};
  let errorsL2OutputOracle: { [k in KindL2OutputOracle]?: OptionsErrorMessages } = {};
  let contractL2OutputOracle: Contract = new ContractBuilder('L2OutputOracle');
  let deployContractL2OutputOracle: DeployContract = new DeployBuilder('DeployL2OutputOracleScript');

  $: optsL2OutputOracle = allContractsL2OutputOracleOpts[contractL2OutputOracleTab];
  $: {
  if (optsL2OutputOracle) {
          try {
              contractL2OutputOracle = buildContractGeneric(optsL2OutputOracle);
              deployContractL2OutputOracle = buildDeployGeneric(optsL2OutputOracle);
              errorsL2OutputOracle[contractL2OutputOracleTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsL2OutputOracle[contractL2OutputOracleTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoGModalOpen = false;
  $: addressStepTwoGContent = md.render(`
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
  "L1ERC721Bridge": "<ADDRESS_25>",
  "OptimismPortal": "<ADDRESS_26>",
  "L2OutputOracle": "<ADDRESS_27>"
}
  \`\`\`
  `);

  // **** step 4.2H ***
  export let initialContractOptimismPortal2Tab: string | undefined = 'OptimismPortal2';
  export let contractOptimismPortal2Tab: KindOptimismPortal2 = sanitizeKindOptimismPortal2(initialContractOptimismPortal2Tab);
  let allContractsOptimismPortal2Opts: { [k in KindOptimismPortal2]?: Required<KindedOptimismPortal2Options [k]> } = {};
  let errorsOptimismPortal2: { [k in KindOptimismPortal2]?: OptionsErrorMessages } = {};
  let contractOptimismPortal2: Contract = new ContractBuilder('OptimismPortal2');
  let deployContractOptimismPortal2: DeployContract = new DeployBuilder('DeployOptimismPortal2Script');

  $: optsOptimismPortal2 = allContractsOptimismPortal2Opts[contractOptimismPortal2Tab];
  $: {
  if (optsOptimismPortal2) {
          try {
              contractOptimismPortal2 = buildContractGeneric(optsOptimismPortal2);
              deployContractOptimismPortal2 = buildDeployGeneric(optsOptimismPortal2);
              errorsOptimismPortal2[contractOptimismPortal2Tab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsOptimismPortal2[contractOptimismPortal2Tab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoHModalOpen = false;
  $: addressStepTwoHContent = md.render(`
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
  "L1ERC721Bridge": "<ADDRESS_25>",
  "OptimismPortal": "<ADDRESS_26>",
  "L2OutputOracle": "<ADDRESS_27>",
  "OptimismPortal2": "<ADDRESS_28>"
}
  \`\`\`
  `);

  // **** step 4.2I ***
  export let initialContractDisputeGameFactoryTab: string | undefined = 'DisputeGameFactory';
  export let contractDisputeGameFactoryTab: KindDisputeGameFactory = sanitizeKindDisputeGameFactory(initialContractDisputeGameFactoryTab);
  let allContractsDisputeGameFactoryOpts: { [k in KindDisputeGameFactory]?: Required<KindedDisputeGameFactoryOptions [k]> } = {};
  let errorsDisputeGameFactory: { [k in KindDisputeGameFactory]?: OptionsErrorMessages } = {};
  let contractDisputeGameFactory: Contract = new ContractBuilder('DisputeGameFactory');
  let deployContractDisputeGameFactory: DeployContract = new DeployBuilder('DeployDisputeGameFactoryScript');

  $: optsDisputeGameFactory = allContractsDisputeGameFactoryOpts[contractDisputeGameFactoryTab];
  $: {
  if (optsDisputeGameFactory) {
          try {
              contractDisputeGameFactory = buildContractGeneric(optsDisputeGameFactory);
              deployContractDisputeGameFactory = buildDeployGeneric(optsDisputeGameFactory);
              errorsDisputeGameFactory[contractDisputeGameFactoryTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsDisputeGameFactory[contractDisputeGameFactoryTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoIModalOpen = false;
  $: addressStepTwoIContent = md.render(`
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
  "L1ERC721Bridge": "<ADDRESS_25>",
  "OptimismPortal": "<ADDRESS_26>",
  "L2OutputOracle": "<ADDRESS_27>",
  "OptimismPortal2": "<ADDRESS_28>",
  "DisputeGameFactory": "<ADDRESS_29>"
}
  \`\`\`
  `);

  // **** step 4.2J ***
  export let initialContractDelayedWETHTab: string | undefined = 'DelayedWETH';
  export let contractDelayedWETHTab: KindDelayedWETH = sanitizeKindDelayedWETH(initialContractDelayedWETHTab);
  let allContractsDelayedWETHOpts: { [k in KindDelayedWETH]?: Required<KindedDelayedWETHOptions [k]> } = {};
  let errorsDelayedWETH: { [k in KindDelayedWETH]?: OptionsErrorMessages } = {};
  let contractDelayedWETH: Contract = new ContractBuilder('DelayedWETH');
  let deployContractDelayedWETH: DeployContract = new DeployBuilder('DeployDelayedWETHScript');

  $: optsDelayedWETH = allContractsDelayedWETHOpts[contractDelayedWETHTab];
  $: {
  if (optsDelayedWETH) {
          try {
              contractDelayedWETH = buildContractGeneric(optsDelayedWETH);
              deployContractDelayedWETH = buildDeployGeneric(optsDelayedWETH);
              errorsDelayedWETH[contractDelayedWETHTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsDelayedWETH[contractDelayedWETHTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoJModalOpen = false;
  $: addressStepTwoJContent = md.render(`
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
  "L1ERC721Bridge": "<ADDRESS_25>",
  "OptimismPortal": "<ADDRESS_26>",
  "L2OutputOracle": "<ADDRESS_27>",
  "OptimismPortal2": "<ADDRESS_28>",
  "DisputeGameFactory": "<ADDRESS_29>",
  "DelayedWETH": "<ADDRESS_30>"
}
  \`\`\`
  `);

  // **** step 4.2K ***
  export let initialContractPreimageOracleTab: string | undefined = 'PreimageOracle';
  export let contractPreimageOracleTab: KindPreimageOracle = sanitizeKindPreimageOracle(initialContractPreimageOracleTab);
  let allContractsPreimageOracleOpts: { [k in KindPreimageOracle]?: Required<KindedPreimageOracleOptions [k]> } = {};
  let errorsPreimageOracle: { [k in KindPreimageOracle]?: OptionsErrorMessages } = {};
  let contractPreimageOracle: Contract = new ContractBuilder('PreimageOracle');
  let deployContractPreimageOracle: DeployContract = new DeployBuilder('DeployPreimageOracleScript');

  $: optsPreimageOracle = allContractsPreimageOracleOpts[contractPreimageOracleTab];
  $: {
  if (optsPreimageOracle) {
          try {
              contractPreimageOracle = buildContractGeneric(optsPreimageOracle);
              deployContractPreimageOracle = buildDeployGeneric(optsPreimageOracle);
              errorsPreimageOracle[contractPreimageOracleTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsPreimageOracle[contractPreimageOracleTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoKModalOpen = false;
  $: addressStepTwoKContent = md.render(`
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
  "L1ERC721Bridge": "<ADDRESS_25>",
  "OptimismPortal": "<ADDRESS_26>",
  "L2OutputOracle": "<ADDRESS_27>",
  "OptimismPortal2": "<ADDRESS_28>",
  "DisputeGameFactory": "<ADDRESS_29>",
  "DelayedWETH": "<ADDRESS_30>",
  "PreimageOracle" : "<ADDRESS_31>"
}
  \`\`\`
  `);

  // **** step 4.2L ***
  export let initialContractMIPSTab: string | undefined = 'MIPS';
  export let contractMIPSTab: KindMIPS = sanitizeKindMIPS(initialContractMIPSTab);
  let allContractsMIPSOpts: { [k in KindMIPS]?: Required<KindedMIPSOptions [k]> } = {};
  let errorsMIPS: { [k in KindMIPS]?: OptionsErrorMessages } = {};
  let contractMIPS: Contract = new ContractBuilder('MIPS');
  let deployContractMIPS: DeployContract = new DeployBuilder('DeployMIPSScript');

  $: optsMIPS = allContractsMIPSOpts[contractMIPSTab];
  $: {
  if (optsMIPS) {
          try {
              contractMIPS = buildContractGeneric(optsMIPS);
              deployContractMIPS = buildDeployGeneric(optsMIPS);
              errorsMIPS[contractMIPSTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsMIPS[contractMIPSTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoLModalOpen = false;
  $: addressStepTwoLContent = md.render(`
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
  "L1ERC721Bridge": "<ADDRESS_25>",
  "OptimismPortal": "<ADDRESS_26>",
  "L2OutputOracle": "<ADDRESS_27>",
  "OptimismPortal2": "<ADDRESS_28>",
  "DisputeGameFactory": "<ADDRESS_29>",
  "DelayedWETH": "<ADDRESS_30>",
  "PreimageOracle" : "<ADDRESS_31>",
  "Mips" : "<ADDRESS_32>"
}
  \`\`\`
  `);

  // **** step 4.2M ***
  export let initialContractAnchorStateRegistryTab: string | undefined = 'AnchorStateRegistry';
  export let contractAnchorStateRegistryTab: KindAnchorStateRegistry = sanitizeKindAnchorStateRegistry(initialContractAnchorStateRegistryTab);
  let allContractsAnchorStateRegistryOpts: { [k in KindAnchorStateRegistry]?: Required<KindedAnchorStateRegistryOptions [k]> } = {};
  let errorsAnchorStateRegistry: { [k in KindAnchorStateRegistry]?: OptionsErrorMessages } = {};
  let contractAnchorStateRegistry: Contract = new ContractBuilder('AnchorStateRegistry');
  let deployContractAnchorStateRegistry: DeployContract = new DeployBuilder('DeployAnchorStateRegistryScript');

  $: optsAnchorStateRegistry = allContractsAnchorStateRegistryOpts[contractAnchorStateRegistryTab];
  $: {
  if (optsAnchorStateRegistry) {
          try {
              contractAnchorStateRegistry = buildContractGeneric(optsAnchorStateRegistry);
              deployContractAnchorStateRegistry = buildDeployGeneric(optsAnchorStateRegistry);
              errorsAnchorStateRegistry[contractAnchorStateRegistryTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsAnchorStateRegistry[contractAnchorStateRegistryTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepTwoMModalOpen = false;
  $: addressStepTwoMContent = md.render(`
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
  "L1ERC721Bridge": "<ADDRESS_25>",
  "OptimismPortal": "<ADDRESS_26>",
  "L2OutputOracle": "<ADDRESS_27>",
  "OptimismPortal2": "<ADDRESS_28>",
  "DisputeGameFactory": "<ADDRESS_29>",
  "DelayedWETH": "<ADDRESS_30>",
  "PreimageOracle" : "<ADDRESS_31>",
  "Mips" : "<ADDRESS_32>",
  "AnchorStateRegistry" : "<ADDRESS_33>"
}
  \`\`\`
  `);

  export let initialContractInitializeImplementationsTab: string | undefined = 'InitializeImplementations';
  export let contractInitializeImplementationsTab: KindInitializeImplementations = sanitizeKindInitializeImplementations(initialContractInitializeImplementationsTab);

  let allContractsInitializeImplementationsOpts: { [k in KindInitializeImplementations]?: Required<KindedInitializeImplementationsOptions [k]> } = {};

  let errorsInitializeImplementations: { [k in KindInitializeImplementations]?: OptionsErrorMessages } = {};

  let deployContractInitializeImplementations: DeployContract = new DeployBuilder('InitializeImplementationsScript');

  $: optsInitializeImplementations = allContractsInitializeImplementationsOpts[contractInitializeImplementationsTab];
  $: {
  if (optsInitializeImplementations) {
          try {
              deployContractInitializeImplementations = buildDeployGeneric(optsInitializeImplementations);
              errorsInitializeImplementations[contractInitializeImplementationsTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsInitializeImplementations[contractInitializeImplementationsTab] = e.messages;
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
        <h1 class="btn btn-ghost text-2xl ">4.2 : Prerequisites</h1>
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

<!-- 000_DeployAll.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[1].pathname}>
    <div class="divider divider-primary">
      <h1 class="btn btn-primary text-2xl ">One-Click L2 Opchain (Implementations & Fault Proof) Deployment</h1>
    </div>
    <div class="divider divider-default">
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

<!-- 402A_DeployL1CrossDomainMessenger.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
    <section id={stepLinks[0].pathname}>
      <div class="divider divider-primary ">
        <p class="btn btn-accent text-2xl">4.2 - Part 1 : Deploy Implementations Contracts</p>
      </div>
    </section>
    <div class="divider divider-default">
    </div>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2A : Deploy L1CrossDomainMessenger Contract</p>
    </div>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[0].title} />

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
  <section id={stepLinks[1].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2B : Deploy OptimismMintableERC20Factory Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[1].title} />

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
  <section id={stepLinks[2].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2C : Deploy SystemConfig Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[2].title} />

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
  <section id={stepLinks[3].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2D : Deploy L1StandardBridge Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[3].title} />

<WizardDouble conventionNumber={'402D'} initialContractTab={initialContractL1StandardBridgeTab} contractTab={contractL1StandardBridgeTab} opts={optsL1StandardBridge} contract={contractL1StandardBridge} deployContract={deployContractL1StandardBridge}>

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
  <section id={stepLinks[4].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2E : Deploy L1ERC721Bridge Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[4].title} />

<WizardDouble conventionNumber={'402E'} initialContractTab={initialContractL1ERC721BridgeTab} contractTab={contractL1ERC721BridgeTab} opts={optsL1ERC721Bridge} contract={contractL1ERC721Bridge} deployContract={deployContractL1ERC721Bridge}>

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

<!-- 401F_DeployOptimismPortal.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[5].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2F : Deploy OptimismPortal Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[5].title} />

<WizardDouble conventionNumber={'402F'} initialContractTab={initialContractOptimismPortalTab} contractTab={contractOptimismPortalTab} opts={optsOptimismPortal} contract={contractOptimismPortal} deployContract={deployContractOptimismPortal}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractOptimismPortalTab === 'OptimismPortal'} on:click={() => contractOptimismPortalTab = 'OptimismPortal'}>
              OptimismPortal
            </button>
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractOptimismPortalTab !== 'OptimismPortal'}>
              <OptimismPortalControls bind:opts={allContractsOptimismPortalOpts.OptimismPortal} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoFModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoFModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoFModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoFContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 401G_DeployL2OutputOracle.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[6].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2G : Deploy L2OutputOracle Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[6].title} />

<WizardDouble conventionNumber={'402G'} initialContractTab={initialContractL2OutputOracleTab} contractTab={contractL2OutputOracleTab} opts={optsL2OutputOracle} contract={contractL2OutputOracle} deployContract={deployContractL2OutputOracle}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractL2OutputOracleTab === 'L2OutputOracle'} on:click={() => contractL2OutputOracleTab = 'L2OutputOracle'}>
              L2OutputOracle
            </button>
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractL2OutputOracleTab !== 'L2OutputOracle'}>
              <L2OutputOracleControls bind:opts={allContractsL2OutputOracleOpts.L2OutputOracle} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoGModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoGModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoGModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoGContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 402H_DeployOptimismPortal2Script.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[7].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">4.2 - Part 2 : Deploy Fault proofs System</p>
    </div>
  </section>
  <div class="divider divider-default">
  </div>
  <div class="divider divider-primary ">
    <p class="btn btn-accent text-xl">4.2H : Deploy OptimismPortal2 Contract</p>
  </div>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[7].title} />

<WizardDouble conventionNumber={'402H'} initialContractTab={initialContractOptimismPortal2Tab} contractTab={contractOptimismPortal2Tab} opts={optsOptimismPortal2} contract={contractOptimismPortal2} deployContract={deployContractOptimismPortal2}>
  <div slot="caption" >
    <h2 class="m-4 font-extrabold	">When configuring <a class="bg-secondary underline" href="https://specs.optimism.io/interop/overview.html" target="_blank" rel="noreferrer">useInterop=false</a>, the contract is <span class="bg-primary underline">OptimismPortal2</span>(Default). Otherwise, it is <span class="bg-primary underline">OptimismPortalInterop</span>.</h2>
    <h2 class="m-4 font-extrabold	">The mainnet default value of <a class="bg-secondary underline" href="https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/deploy-config/mainnet.json#L55" target="_blank" rel="noreferrer">proofMaturityDelaySeconds</a> is <span class="bg-primary underline">604800</span>.</h2>
    <h2 class="m-4 font-extrabold	">The mainnet default value of <a class="bg-secondary underline" href="https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/deploy-config/mainnet.json#L56" target="_blank" rel="noreferrer">disputeGameFinalityDelaySeconds</a> is <span class="bg-primary underline">302400</span>.</h2>
    
  </div>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractOptimismPortal2Tab === 'OptimismPortal2'} on:click={() => contractOptimismPortal2Tab = 'OptimismPortal2'}>
              OptimismPortal2
            </button>
            <button class:selected={contractOptimismPortal2Tab === 'OptimismPortalInterop'} on:click={() => contractOptimismPortal2Tab = 'OptimismPortalInterop'}>
              OptimismPortalInterop
            </button>     
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractOptimismPortal2Tab !== 'OptimismPortal2'}>
              <OptimismPortal2Controls bind:opts={allContractsOptimismPortal2Opts.OptimismPortal2} />
          </div>

          <div class:hidden={contractOptimismPortal2Tab !== 'OptimismPortalInterop'}>
              <OptimismPortalInteropControls bind:opts={allContractsOptimismPortal2Opts.OptimismPortalInterop} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoHModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoHModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoHModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoHContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 402I_DeployDisputeGameFactoryScript.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[8].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2I : Deploy DisputeGameFactory Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[8].title} />

<WizardDouble conventionNumber={'402I'} initialContractTab={initialContractDisputeGameFactoryTab} contractTab={contractDisputeGameFactoryTab} opts={optsDisputeGameFactory} contract={contractDisputeGameFactory} deployContract={deployContractDisputeGameFactory}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractDisputeGameFactoryTab === 'DisputeGameFactory'} on:click={() => contractDisputeGameFactoryTab = 'DisputeGameFactory'}>
              DisputeGameFactory
            </button> 
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractDisputeGameFactoryTab !== 'DisputeGameFactory'}>
              <DisputeGameFactoryControls bind:opts={allContractsDisputeGameFactoryOpts.DisputeGameFactory} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoIModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoIModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoIModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoIContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>


<!-- 402J_DeployDelayedWETHScript.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[9].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2J : Deploy DelayedWETH Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[9].title} />

<WizardDouble conventionNumber={'402J'} initialContractTab={initialContractDelayedWETHTab} contractTab={contractDelayedWETHTab} opts={optsDelayedWETH} contract={contractDelayedWETH} deployContract={deployContractDelayedWETH}>
  <div slot="caption" >
    <h2 class="m-4 font-extrabold	">The mainnet default value of <a class="bg-secondary underline" href="https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/deploy-config/mainnet.json#L52" target="_blank" rel="noreferrer">faultGameWithdrawalDelay</a> is <span class="bg-primary underline">604800</span>.</h2>
  </div>
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractDelayedWETHTab === 'DelayedWETH'} on:click={() => contractDelayedWETHTab = 'DelayedWETH'}>
              DelayedWETH
            </button> 
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractDelayedWETHTab !== 'DelayedWETH'}>
              <DelayedWETHControls bind:opts={allContractsDelayedWETHOpts.DelayedWETH} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoJModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoJModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoJModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoJContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 402K_DeployPreimageOracleScript.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[10].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2K : Deploy PreimageOracle Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[10].title} />

<WizardDouble conventionNumber={'402K'} initialContractTab={initialContractPreimageOracleTab} contractTab={contractPreimageOracleTab} opts={optsPreimageOracle} contract={contractPreimageOracle} deployContract={deployContractPreimageOracle}>
  <div slot="caption" >
    <h2 class="m-4 font-extrabold	">The default value of <a class="bg-secondary underline" href="https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/deploy-config/mainnet.json#L53" target="_blank" rel="noreferrer">preimageOracleMinProposalSize</a> is <span class="bg-primary underline">1800000</span>.</h2>
    <h2 class="m-4 font-extrabold	">The default value of <a class="bg-secondary underline" href="https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/deploy-config/mainnet.json#L54" target="_blank" rel="noreferrer">preimageOracleChallengePeriod</a> is <span class="bg-primary underline">126000</span>.</h2>
  </div>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractPreimageOracleTab === 'PreimageOracle'} on:click={() => contractPreimageOracleTab = 'PreimageOracle'}>
              PreimageOracle
            </button> 
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractPreimageOracleTab !== 'PreimageOracle'}>
              <PreimageOracleControls bind:opts={allContractsPreimageOracleOpts.PreimageOracle} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoKModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoKModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoKModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoKContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 402L_DeployMIPSScript.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[11].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2L : Deploy MIPS Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[11].title} />

<WizardDouble conventionNumber={'402L'} initialContractTab={initialContractMIPSTab} contractTab={contractMIPSTab} opts={optsMIPS} contract={contractMIPS} deployContract={deployContractMIPS}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractMIPSTab === 'MIPS'} on:click={() => contractMIPSTab = 'MIPS'}>
              MIPS
            </button> 
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractMIPSTab !== 'MIPS'}>
              <MIPSControls bind:opts={allContractsMIPSOpts.MIPS} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoLModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoLModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoLModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoLContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 402M_DeployAnchorStateRegistryScript.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[12].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.2M : Deploy AnchorStateRegistry Contract</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[12].title} />

<WizardDouble conventionNumber={'402M'} initialContractTab={initialContractAnchorStateRegistryTab} contractTab={contractAnchorStateRegistryTab} opts={optsAnchorStateRegistry} contract={contractAnchorStateRegistry} deployContract={deployContractAnchorStateRegistry}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractAnchorStateRegistryTab === 'AnchorStateRegistry'} on:click={() => contractAnchorStateRegistryTab = 'AnchorStateRegistry'}>
              AnchorStateRegistry
            </button>
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(100vh-80px)] overflow-auto">
          <div class:hidden={contractAnchorStateRegistryTab !== 'AnchorStateRegistry'}>
              <AnchorStateRegistryControls bind:opts={allContractsAnchorStateRegistryOpts.AnchorStateRegistry} />
          </div>

      </div>
  </div> 

  <div slot="artifact" >

    <div class="flex flex-col items-center">
      <p class="m-4 font-semibold">
        After running the deploy script, the address deployed is saved at <span class="underline bg-secondary">deployments/31337/.save.json</span>. Otherwise, as specified in <span class="underline bg-secondary">.env.&lt;network&gt;.local</span>.
      </p>
    
      <button class="btn modal-button" on:click={()=>isArtifactStepTwoMModalOpen = true}>See the artifact's content example</button>
    
      <div class="modal" class:modal-open={isArtifactStepTwoMModalOpen}>
        <div class="modal-box w-11/12 max-w-5xl">
    
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isArtifactStepTwoMModalOpen = false} >✕</button>
          </form>
    
          <h3 class="font-bold text-lg">Example!</h3>
          <p class="py-4"> Your saved address will be different. </p>
          <p class="py-4"> You can change <span class="underline bg-secondary">DEPLOYMENT_OUTFILE=deployments/31337/.save.json</span> to reflect yours!</p>
          <div class="output flex flex-col grow overflow-auto">
            <code class="hljs grow overflow-auto p-4">
              {@html md.render(addressStepTwoMContent)}
            </code>
          </div>
          <p class="py-4">click on ✕ button to close</p>
    
        </div>
      </div>
    </div>

  </div>
</WizardDouble>

<!-- 401N_InitializeImplementations.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
  <section id={stepLinks[13].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-xl">4.1N : Initialize Implementations</p>
    </div>
  </section>
</Background>

<ScrollStep links={stepLinks} titleHighlighted={stepLinks[13].title} />

<WizardSingle isShowingCommand={true} conventionNumber={'401N'} initialContractTab={initialContractInitializeImplementationsTab} contractTab={contractInitializeImplementationsTab} opts={optsInitializeImplementations} deployContract={deployContractInitializeImplementations}>

  <div slot="caption" >
    <h2 class="m-4 font-extrabold	">When configuring <a class="bg-secondary underline" href="https://specs.optimism.io/fault-proof/index.html" target="_blank" rel="noreferrer">useFaultProofs==false</a>, we will initialize <span class="bg-primary underline">OptimismPortal</span>(Default). Otherwise, it is <span class="bg-primary underline">OptimismPortal2</span>.</h2>
    <h2 class="m-4 font-extrabold	">When configuring <a class="bg-secondary underline" href="https://specs.optimism.io/experimental/custom-gas-token.html?highlight=custom#configuring-the-gas-paying-token" target="_blank" rel="noreferrer">useCustomGasToken==false</a>, we will use <span class="bg-primary underline">Ethereum</span> as gas (Default) . Otherwise, dont forget to config it as same as  <span class="bg-primary underline">cfg.customGasTokenAddress()</span> in <a class="bg-secondary underline" href="https://github.com/ethereum-optimism/optimism/blob/72eb3116c2f6ff573099a8cafc8f35415138850c/op-chain-ops/genesis/testdata/test-deploy-config-full.json#L9" target="_blank" rel="noreferrer">genesis file</a></h2>

  </div>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractInitializeImplementationsTab === 'InitializeImplementations'} on:click={() => contractInitializeImplementationsTab = 'InitializeImplementations'}>
              InitializeImplementations
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractInitializeImplementationsTab !== 'InitializeImplementations'}>
              <InitializeImplementationsControls bind:opts={allContractsInitializeImplementationsOpts.InitializeImplementations} />
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
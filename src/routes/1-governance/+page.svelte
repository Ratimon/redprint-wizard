<script  lang="ts">
  import type { PageData } from "./$types";

  import type {  Contract } from '$lib/wizard/smart-contracts';
  import { ContractBuilder, buildContractGeneric } from '$lib/wizard/smart-contracts';
  import type {  DeployContract } from '$lib/wizard/deploy-scripts';
  import { DeployBuilder, buildDeployGeneric } from '$lib/wizard/deploy-scripts';

  import type { KindedGovernanceOptions, KindGovernance, KindedStepOneAllOptions, KindStepOneAll, OptionsErrorMessages } from '$lib/wizard/shared';
  import {  sanitizeKindGovernance, sanitizeKindStepOneAll, OptionsError } from '$lib/wizard/shared';

  import Background from '$lib/ui/background/Background.svelte';
  import QuickGuide from '$lib/ui/components/QuickGuide.svelte';
  import WizardSingle from '$lib/ui/components/WizardSingle.svelte';
  import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
  import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';
  import CopyBlock from '$lib/ui/components/CopyBlock.svelte';

  import SafeControls from '$lib/ui/controls/1-SafeControls.svelte';
  import GovernorControls from '$lib/ui/controls/1-GovernorControls.svelte';
  import AllControls from '$lib/ui/controls/1-AllControls.svelte';

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

  $: remmapingContent = md.render(`
  \`\`\`diff
[profile.default]

# Compilation settings
src = 'src'
out = 'forge-artifacts'
script = 'scripts'
optimizer = true
optimizer_runs = 999999
remappings = [
  '@openzeppelin/contracts-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts',
  '@openzeppelin/contracts/=lib/openzeppelin-contracts/contracts',
  '@openzeppelin/contracts-v5/=lib/openzeppelin-contracts-v5/contracts',
  '@rari-capital/solmate/=lib/solmate',
  '@lib-keccak/=lib/lib-keccak/contracts/lib',
  '@solady/=lib/solady/src',
  'forge-std/=lib/forge-std/src',
  'ds-test/=lib/forge-std/lib/ds-test/src',
  'safe-contracts/=lib/safe-contracts/contracts',
  'kontrol-cheatcodes/=lib/kontrol-cheatcodes/src',
  'gelato/=lib/automate/contracts'
  '@redprint-core/=src/',
  '@redprint-deploy/=node_modules/redprint-forge/script',
  '@scripts/=scripts/',
  '@redprint-test/=node_modules/redprint-forge/test/',
  '@redprint-forge-std/=lib/forge-std/src',
  '@redprint-openzeppelin/=lib/openzeppelin-contracts/contracts',
  '@redprint-openzeppelin-upgradeable/=lib/openzeppelin-contracts-upgradeable/contracts',
  '@redprint-safe-contracts/=lib/safe-contracts/contracts',
  '@redprint-lib-keccak/=lib/lib-keccak/contracts/lib',
  '@redprint-solady/=lib/solady/src',
]
...
  \`\`\`
  `);

  let isConfigModalOpen = false;

  $: deployConfigContent = md.render(`
  \`\`\`json
{
    "l1StartingBlockTag": "0x28665aedb1e78a65e0878347df30f116e5652ce24ede025a80d603656536074f",
    "l1ChainID": 11155111,
    "l2ChainID": 42069,
    "l2BlockTime": 2,
    "l1BlockTime": 12,
    "maxSequencerDrift": 600,
    "sequencerWindowSize": 3600,
    "channelTimeout": 300,
    "p2pSequencerAddress": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "batchInboxAddress": "0xff00000000000000000000000000000000042069",
    "batchSenderAddress": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "l2OutputOracleSubmissionInterval": 120,
    "l2OutputOracleStartingBlockNumber": 0,
    "l2OutputOracleStartingTimestamp": 1709796684,
    "l2OutputOracleProposer": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "l2OutputOracleChallenger": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "finalizationPeriodSeconds": 12,
    "proxyAdminOwner": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "baseFeeVaultRecipient": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "l1FeeVaultRecipient": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "sequencerFeeVaultRecipient": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "finalSystemOwner": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "superchainConfigGuardian": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "baseFeeVaultMinimumWithdrawalAmount": "0x8ac7230489e80000",
    "l1FeeVaultMinimumWithdrawalAmount": "0x8ac7230489e80000",
    "sequencerFeeVaultMinimumWithdrawalAmount": "0x8ac7230489e80000",
    "baseFeeVaultWithdrawalNetwork": 0,
    "l1FeeVaultWithdrawalNetwork": 0,
    "sequencerFeeVaultWithdrawalNetwork": 0,
    "gasPriceOracleOverhead": 2100,
    "gasPriceOracleScalar": 1000000,
    "enableGovernance": true,
    "governanceTokenSymbol": "OP",
    "governanceTokenName": "Optimism",
    "governanceTokenOwner": "0x70997970C51812dc3A010C7d01b50e0d17dc79C8",
    "l2GenesisBlockGasLimit": "0x1c9c380",
    "l2GenesisBlockBaseFeePerGas": "0x3b9aca00",
    "l2GenesisRegolithTimeOffset": "0x0",
    "eip1559Denominator": 50,
    "eip1559DenominatorCanyon": 250,
    "eip1559Elasticity": 6,
    "l2GenesisDeltaTimeOffset": null,
    "l2GenesisCanyonTimeOffset": "0x0",
    "systemConfigStartBlock": 0,
    "requiredProtocolVersion": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "recommendedProtocolVersion": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "faultGameAbsolutePrestate": "0x0000000000000000000000000000000000000000000000000000000000000000",
    "faultGameMaxDepth": 8,
    "faultGameClockExtension": 0,
    "faultGameMaxClockDuration": 1200,
    "faultGameGenesisBlock": 0,
    "faultGameGenesisOutputRoot": "0xDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEFDEADBEEF",
    "faultGameSplitDepth": 4,
    "faultGameWithdrawalDelay": 604800,
    "preimageOracleMinProposalSize": 1800000,
    "preimageOracleChallengePeriod": 120,
    "preimageOracleCancunActivationTimestamp": 0
}
  \`\`\`
  `);

  let isEnvModalOpen = false;
  $: envContent = md.render(`
\`\`\`bash

RPC_URL_localhost=http://localhost:8545

#secret management
MNEMONIC="test test test test test test test test test test test junk"
# local network 's default private key so it is still not exposed
DEPLOYER_PRIVATE_KEY=0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
DEPLOYER_ADDRESS=0x70997970C51812dc3A010C7d01b50e0d17dc79C8

# script/Config.sol
DEPLOYMENT_OUTFILE=deployments/31337/.save.json
DEPLOY_CONFIG_PATH=deploy-config/hardhat.json
CHAIN_ID=
IMPL_SALT=$(openssl rand -hex 32)
STATE_DUMP_PATH=
SIG=
DEPLOY_FILE=
DRIPPIE_OWNER_PRIVATE_KEY=9000

# deploy-Config
GS_ADMIN_ADDRESS=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
GS_BATCHER_ADDRESS=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
GS_PROPOSER_ADDRESS=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
GS_SEQUENCER_ADDRESS=0x70997970C51812dc3A010C7d01b50e0d17dc79C8
L1_RPC_URL=http://localhost:8545
\`\`\`
`);

  export let initialContractStepTab: string | undefined = 'AllStepOne';
  export let contractStepTab: KindStepOneAll = sanitizeKindStepOneAll(initialContractStepTab);

  let allContractsStepOpts: { [k in KindStepOneAll]?: Required<KindedStepOneAllOptions [k]> } = {};

  let errorsStep: { [k in KindStepOneAll]?: OptionsErrorMessages } = {};

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
  "SafeProxyFactory": "0x41C3c259514f88211c4CA2fd805A93F8F9A57504",
  "SafeSingleton": "0x0401911641c4781D93c41f9aa8094B171368E6a9",
  "SystemOwnerSafe": "0x31Ce59Df6F742e1C83f00427F09DCAaF0765DF3b"
}
  \`\`\`
  `);

  export let initialContractGovernanceTab: string | undefined = 'Safe';
  export let contractGovernanceTab: KindGovernance = sanitizeKindGovernance(initialContractGovernanceTab);

  let allContractsGovernanceOpts: { [k in KindGovernance]?: Required<KindedGovernanceOptions [k]> } = {};

  let errorsGovernance: { [k in KindGovernance]?: OptionsErrorMessages } = {};

  let contractGovernance: Contract = new ContractBuilder('SafeProxy');
  let deployContractGovernance: DeployContract = new DeployBuilder('DeploySafeScript');

  $: optsGovernance = allContractsGovernanceOpts[contractGovernanceTab];
  $: {
  if (optsGovernance) {
          try {
              contractGovernance = buildContractGeneric(optsGovernance);
              deployContractGovernance = buildDeployGeneric(optsGovernance);
              errorsGovernance[contractGovernanceTab] = undefined;
          } catch (e: unknown) {
              if (e instanceof OptionsError) {
                errorsGovernance[contractGovernanceTab] = e.messages;
              } else {
              throw e;
              }
          }
      }
  }

  let isArtifactStepOneModalOpen = false;
  $: addressStepOneContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>"
}
  \`\`\`
  `);


</script>

<QuickGuide path1={data.dropDownLinks[0].pathname} path2={data.dropDownLinks[1].pathname} path3={data.dropDownLinks[2].pathname} />

<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[0].pathname}>
    <div class="divider divider-primary">
      <h1 class="btn btn-ghost text-2xl ">1.0 : Prerequisites</h1>
    </div>
  </section>
</Background>

<div class="container flex flex-col gap-4 p-8 mx-8">

  <h2 class="m-4 font-semibold">
    Fork <a class="bg-primary underline" href="https://github.com/ethereum-optimism/optimism.git" target="_blank" rel="noreferrer">optimism</a> 's monorepo:
  </h2>

  <CopyBlock
    boxClass="p-2 rounded-box font-black text-primary max-w-xl mx-auto"
    class="mb-5"
    background="bg-primary-content"
    copiedBackground="bg-success"
    copiedColor="text-success-content"
    text={`git clone --depth 1 --branch v1.9.4 https://github.com/ethereum-optimism/optimism.git`}
  />

  <p class="mt-6 text-base-300">
    All OPStack's contracts are based on
    <a class="underline" href="https://github.com/ethereum-optimism/optimism/tree/v1.9.4/packages/contracts-bedrock" target="_blank" rel="noreferrer"
      >v1.9.4
    </a>
  </p>

  <h2 class="m-4 font-semibold">
    Add the <a class="bg-primary underline" href="https://github.com/Ratimon/redprint-forge" target="_blank" rel="noreferrer">redprint-forge</a> using your favorite package manager, e.g., with pnpm:
  </h2>

  <CopyBlock
    boxClass="p-2 rounded-box font-black text-primary max-w-xl mx-auto"
    class="mb-5"
    background="bg-primary-content"
    copiedBackground="bg-success"
    copiedColor="text-success-content"
    text={`pnpm add redprint-forge`}
  />

  <h2 class="m-4 font-semibold">
    Modify OPStack's <a class="bg-primary underline" href="https://github.com/ethereum-optimism/optimism/blob/v1.9.4/packages/contracts-bedrock/foundry.toml" target="_blank" rel="noreferrer">foundry.toml</a> to the <span class="underline">root directory</span> with following:
  </h2>

  <div class="output flex flex-col grow overflow-auto">
      <code class="hljs grow overflow-auto p-4">
        {@html md.render(remmapingContent)}
      </code>
  </div>

  <p class="mt-6 text-base-300">
    We use <span class="underline bg-accent">@redprint-/</span> as a convention to avoid any naming conflicts with your previously installed libararies ( i.e. @redprint-forge-std/ vs @forge-std/)
  </p>

  <h2 class="m-4 font-semibold">
    Add the deploy config file<span class="underline bg-secondary"> &lt; network &gt;.json</span> to your desired directory ( i.e <span class="underline">script/deploy-config/hardhat.json</span> ) with following:
  </h2>

  <button class="btn modal-button" on:click={()=>isConfigModalOpen = true}>See and Copy Config File </button>

  <div class="modal" class:modal-open={isConfigModalOpen}>
    <div class="modal-box w-11/12 max-w-5xl">

      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isConfigModalOpen = false} >✕</button>
      </form>

      <h3 class="font-bold text-lg">Copy config!</h3>
      <p class="py-4">( e.g. <span class="underline bg-secondary">hardhat.json</span>, <span class="underline bg-secondary">mainnet.json</span> or <span class="underline bg-secondary">optimism.json</span>)</p>
      <div class="output flex flex-col grow overflow-auto">
        <code class="hljs grow overflow-auto p-4">
          {@html md.render(deployConfigContent)}
        </code>
      </div>
      <p class="py-4">click on ✕ button to close</p>

    </div>
  </div>

  <h2 class="m-4 font-semibold">
    Add <span class="underline bg-secondary">.env</span>and modify as required.
  </h2>

  <button class="btn modal-button" on:click={()=>isEnvModalOpen = true}>See and Copy Env File </button>

  <div class="modal" class:modal-open={isEnvModalOpen}>
    <div class="modal-box w-11/12 max-w-5xl">

      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" on:click={()=>isEnvModalOpen = false} >✕</button>
      </form>

      <h3 class="font-bold text-lg">Copy .env!</h3>
      <p class="py-4"> This following file uses foundry's default test private keys. </p>
      <p class="py-4"> DONT forget to change <span class="underline bg-secondary">MNEMONIC</span>, <span class="underline bg-secondary">DEPLOYER_PRIVATE_KEY</span> and <span class="underline bg-secondary">DEPLOYER_ADDRESS</span> to be yours!</p>
      <div class="output flex flex-col grow overflow-auto">
        <code class="hljs grow overflow-auto p-4">
          {@html md.render(envContent)}
        </code>
      </div>
      <p class="py-4">click on ✕ button to close</p>

    </div>
  </div>

  <p class="mt-6 text-base-300">
    Find out more about our guide on
    <a class="underline" href="https://github.com/Ratimon/redprint-forge?tab=readme-ov-file#quickstart" target="_blank" rel="noreferrer"
      >github
    </a>
  </p>


</div>

<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[1].pathname}>
    <div class="divider divider-primary">
      <h1 class="btn btn-primary text-2xl ">One-Click Governance Layer Deployment</h1>
    </div>
    <div class="divider divider-default">
    </div>
    <div class="divider divider-primary">
      <p class="text-2xs ">Note: This script is not completed yet. It is for one layer only. Check our <a class="bg-accent underline" href="/4-opchain-implementations" target="_blank" rel="noreferrer">final script</a> for full deployment.</p>
    </div>
  </section>
</Background>

<WizardSingle conventionNumber={'000'} initialContractTab={initialContractStepTab} contractTab={contractStepTab} opts={optsStep} deployContract={deployContractStep}>

  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractStepTab === 'StepOneAll'} on:click={() => contractStepTab = 'StepOneAll'}>
              DeployAll
            </button>      
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractStepTab !== 'StepOneAll'}>
              <AllControls bind:opts={allContractsStepOpts.StepOneAll} />
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

<Background color="bg-base-100 pt-3 pb-4">
  <section id={data.dropDownLinks[2].pathname}>
    <div class="divider divider-primary ">
      <p class="btn btn-accent text-2xl">1.1 : Deploy Governance Contract</p>
    </div>
  </section>
</Background>

<WizardDouble conventionNumber={'101'} initialContractTab={initialContractGovernanceTab} contractTab={contractGovernanceTab} opts={optsGovernance} contract={contractGovernance} deployContract={deployContractGovernance}>

  <div slot="caption" >
    <h2 class="m-4 font-extrabold	">The default contract is <span class="bg-primary underline">MultiSig</span>.</h2>
  </div>
  
  <div slot="menu" >
      <div class="tab overflow-hidden">
        <Background color="bg-base-200">
          <OverflowMenu>
            <button class:selected={contractGovernanceTab === 'Safe'} on:click={() => contractGovernanceTab = 'Safe'}>
              MultiSig
            </button>
            <button class:selected={contractGovernanceTab === 'Governor'} on:click={() => contractGovernanceTab = 'Governor'}>
              Governor
            </button>            
          </OverflowMenu>
        </Background>
      </div>
  </div> 

  <div slot="control" >
       <!-- w-64 -->
      <div class="controls w-48 flex flex-col shrink-0 justify-between h-[calc(150vh-80px)] overflow-auto">
          <div class:hidden={contractGovernanceTab !== 'Safe'}>
              <SafeControls bind:opts={allContractsGovernanceOpts.Safe} />
            </div>
          <div class:hidden={contractGovernanceTab !== 'Governor'}>
              <GovernorControls bind:opts={allContractsGovernanceOpts.Governor} errors={errorsGovernance.Governor} />
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
              {@html md.render(addressStepOneContent)}
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
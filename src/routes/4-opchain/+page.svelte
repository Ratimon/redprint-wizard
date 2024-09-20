<script  lang="ts">
    import type { PageData } from "./$types";

    import type {  Contract } from '$lib/wizard/smart-contracts';
    import { ContractBuilder, buildContractGeneric } from '$lib/wizard/smart-contracts';
    import type {  DeployContract } from '$lib/wizard/deploy-scripts';
    import { DeployBuilder, buildDeployGeneric } from '$lib/wizard/deploy-scripts';

    import type {
        KindedOptimismPortalProxyOptions, KindOptimismPortalProxy,
        OptionsErrorMessages
    } from '$lib/wizard/shared';

    import {
        sanitizeKindOptimismPortalProxy,
        OptionsError
    } from '$lib/wizard/shared';

    import Background from '$lib/ui/background/Background.svelte';
    import WizardSingle from '$lib/ui/components/WizardSingle.svelte';
    import WizardDouble from '$lib/ui/components/WizardDouble.svelte';
    import OverflowMenu from '$lib/ui/layouts/OverflowMenu.svelte';
    import AllControls from '$lib/ui/controls/2-AllControls.svelte';

    import OptimismPortalProxyControls from '$lib/ui/controls/4-OptimismPortalProxyControls.svelte';

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

  // **** step 1 ***

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
  "OptimismPortalProxy": "<ADDRESS_10>",
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

<!-- 201A_DeployAddressManager.s.sol -->
<Background color="bg-base-100 pt-3 pb-4">
    <section id={data.dropDownLinks[1].pathname}>
      <div class="divider divider-primary ">
        <p class="text-2xl">4.1A : Deploy AddressManager Contract</p>
      </div>
    </section>
</Background>

<WizardDouble conventionNumber={'201A'} initialContractTab={initialContractOptimismPortalProxyTab} contractTab={contractOptimismPortalProxyTab} opts={optsOptimismPortalProxy} contract={contractOptimismPortalProxy} deployContract={deployContractOptimismPortalProxy}>
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
<script  lang="ts">
  import type { PageData } from "./$types";

  import Background from '$lib/ui/background/Background.svelte';

  import MarkdownIt from "markdown-it";
  import hljs  from '$lib/ui/utils/highlightjs';

  export let data : PageData;

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

  $: remmapingContent = md.render(`
  \`\`\`bash
@redprint-core/=node_modules/redprint-forge/src
@redprint-deploy/=node_modules/redprint-forge/script
@redprint-forge-std/=node_modules/redprint-forge/lib/forge-std/src
@redprint-openzeppelin/=node_modules/redprint-forge/lib/openzeppelin-4_9_4/contracts
@redprint-openzeppelin-upgradable/=node_modules/redprint-forge/lib/openzeppelin-upgradable-4_9_4/contracts
@redprint-safe-contracts/=node_modules/redprint-forge/lib/safe-smart-account/contracts
  \`\`\`
  `);

  let isConfigModalOpen = false;

  $: addressAllContent = md.render(`
  \`\`\`bash
{
  "SafeProxyFactory": "<ADDRESS_1>",
  "SafeSingleton": "<ADDRESS_2>",
  "SystemOwnerSafe": "<ADDRESS_3>"
}
  \`\`\`
  `);

</script>

<Background color="bg-base-100 pt-3 pb-4">
    <section id={data.dropDownLinks[0].pathname}>
      <div class="divider divider-primary">
        <h1 class="text-2xl ">2.1 : Prerequisites</h1>
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
        {@html md.render(addressAllContent)}
      </code>
  </div>

  <p class="mt-6 text-base-300">
    Without <span class="underline bg-accent">this artifact file</span>, the next deployment scripts can not be run.
  </p>

</div>
  

<!-- 201A_DeployAddressManager.s -->

<!-- 201B_DeployAndSetupProxyAdmin.s.sol -->

<!-- 202A_DeploySuperchainConfigProxy.s.sol -->

<!-- 202B_DeployAndInitializeSuperchainConfig.s.sol -->

<!-- 000_DeployAll.s.sol -->

<style lang="postcss">

  .container {
      background-color: var(--gray-1);
      border: 1px solid var(--gray-2);
      border-radius: 10px;
      min-width: 32rem;
  }

</style>
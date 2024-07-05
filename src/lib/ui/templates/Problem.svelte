<script lang="ts">
  import MarkdownIt from "markdown-it";
  import hljs  from '$lib/ui/utils/highlightjs';

  import Arrow from "$lib/ui/problem/Arrow.svelte";
  import Background from '$lib/ui/background/Background.svelte';
  import Step from "$lib/ui/problem/Step.svelte";

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

  $: deployCommand = md.render(`
  \`\`\`bash
    forge script -vvv scripts/deploy/Deploy.s.sol:Deploy 
`);



</script>

<Background color="bg-neutral">
  <section class="justify-center text-neutral-content">
    <div class="max-w-7xl mx-auto px-8 py-16 md:py-32 text-center">
      <h2 class="max-w-3xl mx-auto font-extrabold text-4xl md:text-5xl tracking-tight mb-6 md:mb-8">
        As Eth roll-up-centric roadmap continues, it becomes a challenge to walkthrough all of OPStack's contract variations.
      </h2>
      <p class="max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-12 md:mb-20">
        Governence Layer, Plasma, Bridge ... There&apos;s so much going
        on.
      </p>

      <div class="flex flex-col md:flex-row justify-center items-center md:items-start gap-6">
        <Step emoji="🧑‍💻" text="Weeks to understand and fork OP Stack" />

        <Arrow extraStyle="max-md:-scale-x-100 md:-rotate-90" />

        <Step emoji="😮‍💨" text="Struggle to keep up with fast development pace" />

        <Arrow extraStyle="md:-scale-x-100 md:-rotate-90" />

        <Step emoji="😔" text="Quit Blockchain Dev" />
      </div>

      <!-- <div class="divider divider-neutral	"></div>
      <p class="max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-12 md:mb-20 whitespace-pre">
        This is from OPStack repo :
      </p>

      <div class="flex flex-row justify-center">
        <code class="hljs">
          {@html md.render(deployCommand)}
        </code>
      </div>

      <div class="divider divider-neutral	"></div>
      <p class="max-w-xl mx-auto text-lg opacity-90 leading-relaxed mb-12 md:mb-20">
        This is from OPStack repo :
      </p> -->

    </div>
  </section>
</Background>
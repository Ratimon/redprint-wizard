<script lang="ts">
  import Background from '$lib/ui/background/Background.svelte';
  import TestimonialsAvatars from "$lib/ui/testinomials/TestimonialsAvatars.svelte";
</script>

<Background color="bg-base-100">
  <section class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
    <div class="flex flex-col gap-10 lg:gap-14 items-center justify-center text-center lg:text-left lg:items-start">

      <h1 class="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
        Interactive Playgound for OPStack Developers.
      </h1>
      <p class="text-lg opacity-80 leading-relaxed">
        Redprint Wizard supports a space to visialize and build your own OPStack contract components. This empowers developers to experience, tinker, and push the boundaries of L2/App-chain innoavtion.
      </p>

      <div class="flex flex-row gap-x-2 justify-center">

        <a href="/1-governance" class="btn btn-primary btn-wide">
          START CUSTOMIZING
        </a>

        <a href="https://github.com/Ratimon/redprint-wizard" class="btn btn-netral btn-md">
          WIZARD's GITHUB
        </a>

        <a href="https://github.com/Ratimon/redprint-forge" class="btn btn-netral btn-md">
          REDPRINT-FORGE's GITHUB
        </a>
      </div>
      <TestimonialsAvatars />
    </div>
    <div class="hidden lg:block lg:w-full">
      <img
        class="w-full"
        alt="Redprint Wizard"
        src="/icon.png"
        width={512}
        height={512}
        />
    </div>
  </section>
</Background>
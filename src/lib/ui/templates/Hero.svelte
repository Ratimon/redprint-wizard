<script lang="ts">
  import type {GithubRepo } from '$lib/model/GithubRepo';

  import Background from '$lib/ui/background/Background.svelte';
  import TestimonialsAvatars from "$lib/ui/testimonials/TestimonialsAvatars.svelte";

  import Stargazers from '$lib/ui/components/Stargazers.svelte';
  import ScrollLink from '$lib/ui/header/ScrollLink.svelte';

  export let repositories: GithubRepo[]= [
    {title: 'Wizard', owner : 'Ratimon', name: 'redprint-wizard' },
    {title: 'redprint-forge', owner : 'Ratimon', name: 'redprint-forge' },
  ];
</script>

<Background color="bg-base-100">
  
  <section class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 px-8 py-8 lg:py-20">
    
    <div class="flex flex-col gap-14 lg:gap-10 items-center justify-center text-center lg:text-left lg:items-start">

      <h1 class="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
        Interactive Playgound for OPStack Developers.
      </h1>

      <p class="text-lg opacity-80 leading-relaxed">
        - <b>Redprint Wizard</b> supports a space to visualize and build your own OPStack contract components.
      </p>

      <p class="text-lg opacity-80 leading-relaxed">
        - <b>redprint-forge</b> is a developer-friendly framework/library in solidity to modify & deploy OPStack ’s contracts in a modular style 
      </p>

      <div class="flex flex-row gap-x-1 justify-center">

        <a href="/1-governance" class="btn btn-primary btn-wide">
          GET STARTED
        </a>

        {#if repositories}

          {#each repositories as repo}
            <Stargazers
              title={repo.title}
              owner={repo.owner}
              name={repo.name}>
            </Stargazers>
          {/each}

        {/if}

      </div>

      <p class="text-lg opacity-80 leading-relaxed">
        "It is great to quickly get an idea for hackathon or quick prototypes, and it is also a good starting point for long term rollup projects as it contains a set of best practices for smart contract developments and
        Opsec management". 
      </p> 

      <div class="flex flex-row gap-x-12 justify-center">
        <TestimonialsAvatars />
          <ScrollLink
            class='btn btn-secondary btn-wide'
            href="#testimonial"
          >
          Check out full testimonials!!
          </ScrollLink>
      </div>


    </div>

    <div class="hidden lg:block lg:w-full">
      <img
        class="w-full"
        alt="Hero showing the Redprint logo"
        src="/icon.png"
        width={512}
        height={512}
        />
    </div>

  </section>

</Background>
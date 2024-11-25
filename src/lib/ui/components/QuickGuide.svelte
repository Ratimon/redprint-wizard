<script lang="ts">
  import ScrollLink from '$lib/ui/header/ScrollLink.svelte';

  export let title: string = `Quick Guide !!`
  export let quote: string = `We have prepared a set of scripts to deploy all contracts in one click. Otherwise, you can look into and customize each contract as you like.`

  export let path1: string= '/';
  export let path2: string= '/';
  export let path3: string= '/';
  
</script>


<div class="flex justify-around">

    <div class="card bg-neutral text-neutral-content w-3/4">
      <div class="card-body items-center text-center">

        <h2 class="card-title text-secondary">{title}</h2>

        <p>{quote}</p>

        <div class="card-actions justify-end">
          <ScrollLink
            class='btn btn-ghost btn-wide'
            href={path1}
          >
            Prerequisites
          </ScrollLink>
          <ScrollLink
            class='btn btn-primary btn-wide'
            href={path2}
          >
            🔥 Deploy in One Click 🔥
          </ScrollLink>
          <ScrollLink
            class='btn btn-accent btn-wide'
            href={path3}
          >
            👀 Visualize & Customize Each 🛠️
          </ScrollLink>
        </div>

        <div class="divider divider-primary">

          <p class="mt-2 text-2xs text-base-300">
            we reference to OPStack 's version of <a class="bg-info underline" href=hhttps://github.com/ethereum-optimism/optimism/tree/v1.9.4/packages/contracts-bedrock/ target="_blank" rel="noreferrer">v1.9.4</a>
          </p>
        </div>


      </div>
    </div>
  
</div>

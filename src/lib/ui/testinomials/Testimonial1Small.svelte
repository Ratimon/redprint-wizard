<script lang="ts">

  import Background from '$lib/ui/background/Background.svelte';

  export let quoteHighlighted: string = ``
  export let quoteDetail1: string = ``
  export let quoteDetail2: string = ``
  export let name: string = ``

  export let bio: string = ``
  export let companyName: string = ``
  export let companyLink: string = ``

  export let socialPlatform: string = ``
  export let socialAccount: string = ``
  export let socialLink: string = ``

  export let bioImgPath: string = ``
  export let companyImgPath: string = ``

</script>

<Background color="bg-base-100">
    <div class="space-y-6 md:space-y-8 max-w-lg mx-auto px-8 py-16 md:py-32 ">
      <div class="rating !flex justify-center">

        {#each [...Array(5)] as _, i}
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="w-5 h-5 text-warning"
            >
                <path
                    d="M10.868 2.884c-.321-.772-1.415-.772-1.736 0l-1.83 4.401-4.753.381c-.833.067-1.171 1.107-.536 1.651l3.62 3.102-1.106 4.637c-.194.813.691 1.456 1.405 1.02L10 15.591l4.069 2.485c.713.436 1.598-.207 1.404-1.02l-1.106-4.637 3.62-3.102c.635-.544.297-1.584-.536-1.65l-4.752-.382-1.831-4.401z"
                />
            </svg>
        {/each}

      </div>
      <div class="text-base leading-relaxed space-y-2 max-w-md mx-auto text-center">
        <p>
          <span class="bg-warning/25 px-1.5">
            {quoteHighlighted}
          </span>{" "}
            {quoteDetail1}
        </p>
        <p>
            {quoteDetail2}
        </p>
      </div>
      <div class="flex justify-center items-center gap-3 md:gap-4">
        <img
          class="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
          src={bioImgPath}
          alt={`Profile`}
          width={48}
          height={48}
        />
        <div>
          <p class="font-semibold">
            {name}
          </p>
          
          <p class="text-base-content/80 text-sm">
            {bio} @ <a class="bg-primary underline" href={companyLink} target="_blank" rel="noreferrer">{companyName}</a>
          </p>

          <p class="text-base-content/60">
            {socialPlatform} @ <a class="bg-secondary underline" href={socialLink} target="_blank" rel="noreferrer">{socialAccount}</a>
          </p>

        </div>
        <img
          width={150}
          height={50}
          class="w-20 md:w-24"
          src={companyImgPath}
          alt="Company logo"
        />
      </div>
    </div>
</Background>
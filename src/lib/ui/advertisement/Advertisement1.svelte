<script lang="ts">
  import Background from "$lib/ui/background/Background.svelte";
  import TestimonialsAvatars from "$lib/ui/testimonials/TestimonialsAvatars.svelte";

  export let landingTitle: string = "Superfuse Wizard";
  export let landingSubtitle: string = "an interactive code generator for superchain interoperability.";
  export let landingAction: string = "Build your own cross-chain contracts!!";
  export let link: string = "https://superfuse.ninja/";

  export let userNumber: number = 20;

</script>

<Background color="bg-gray-100">
  <div class="flex flex-col gap-4 p-4 m-8">
    <div class="flex flex-col md:flex-row gap-x-6 justify-center items-center">

      <h2 class="font-semibold text-xl lg:text-2xl text-base-300 tracking-tight md:-mb-4">
        <div class="bg-gradient-to-r from-red-600 via-yellow-500 to-orange-400 text-transparent bg-clip-text" >{landingTitle}</div>: {landingSubtitle}
      </h2>
      
      <a
        class='btn btn-secondary btn-wide'
        href={link}
      >
        {landingAction}
      </a>

      <TestimonialsAvatars {userNumber} />
    </div>
  </div>
</Background>
<script lang="ts">
    import TestimonialElement from '$lib/ui/elements/TestimonialElement.svelte';

    export let testimonialElements : {
        quote: string;
        name: string;
        socialAccount: string;
        bioImgPath: string;
    }[] = [
        {
            quote: `As a developer, I appreciate how its visualization is not only simple but also intuitive.`,
            name: `Billy191`,
            socialAccount: `@billy191`,
            bioImgPath: `/testimonials/1_bio.png`,
        },
        {
            quote: `Redprint accelerates the way I build on OPStack.`,
            name: `wit03.eth`,
            socialAccount: `@witjarukit`,
            bioImgPath: `/testimonials/2_bio.png`,
        },
        {
            quote: `Redprint accelerates the way I build on OPStack.`,
            name: `wit03.eth`,

            socialAccount: `@witjarukit`,

            bioImgPath: `/testimonials/2_bio.png`,
        },
  	];

</script>

<section>
    <div class="py-24 px-8 max-w-7xl mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <div class="mb-8">
          <h2 class="sm:text-5xl text-4xl font-extrabold text-base-content">
            48 developers are already optimismtic !
          </h2>
        </div>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base text-base-content/80">
          Don&apos;t take our word for it. Here&apos;s what they have to say
          about Redprint.
        </p>
      </div>

        <ul
        role="list"
        class="flex flex-col items-center lg:flex-row lg:items-stretch gap-6 lg:gap-8"
        >

      {#each testimonialElements as  testimonial}

            <TestimonialElement
                quote={testimonial.quote}
                name ={testimonial.name}
                socialAccount={testimonial.socialAccount}
                bioImgPath={testimonial.bioImgPath}
            ></TestimonialElement>

        {/each}

      </ul>
    </div>
</section>

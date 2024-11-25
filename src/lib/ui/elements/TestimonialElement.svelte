<script lang="ts">
    import {appName} from 'web-config';

    export let quote: string = ``
    export let name: string = ``

    export let socialAccount: string = ``
    export let bioImgPath: string = `/testimonials/1_bio.webp`

</script>

<li >
    <figure class="relative max-w-lg h-full p-6 md:p-10 bg-base-200 rounded-2xl max-md:text-sm flex flex-col">
      <blockquote class="relative flex-1">
        <p class="text-base-content/80 leading-relaxed">
          {quote}
        </p>
      </blockquote>
      <figcaption class="relative flex items-center justify-start gap-4 pt-4 mt-4 md:gap-8 md:pt-8 md:mt-8 border-t border-base-content/5">
        <div class="w-full flex items-center justify-between gap-2">
          <div>
            <div class="font-medium text-base-content md:mb-0.5">
              {name}
            </div>

            {#if socialAccount}
                <div class="mt-0.5 text-sm text-base-content/80">
                    {socialAccount}
                </div>
            {/if}

          </div>

          <div class="overflow-hidden rounded-full bg-base-300 shrink-0">
            
            {#if bioImgPath}
                <img
                    class="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                    src={bioImgPath}
                    alt={`${name}'s testimonial for ${appName}`}
                    width={48}
                    height={48}
                />
            {:else}
                <span class="w-10 h-10 md:w-12 md:h-12 rounded-full flex justify-center items-center text-lg font-medium bg-base-300">
                    {name.charAt(0)}
                </span>
            
            {/if}
          </div>
        </div>
      </figcaption>
    </figure>
</li>
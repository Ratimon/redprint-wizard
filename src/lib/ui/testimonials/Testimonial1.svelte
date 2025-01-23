<script lang="ts">

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

<div class="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.base-300),theme(colors.base-100))] opacity-20" />
<div class="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-base-100 shadow-lg ring-1 ring-base-content/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
<div class="mx-auto max-w-2xl lg:max-w-5xl">
    <figure class="mt-10">
        <div class="flex flex-col lg:flex-row items-center gap-12">
        <div class="relative rounded-xl border border-base-content/5 bg-base-content/5 p-1.5 sm:-rotate-1">
            <img
                width={320}
                height={320}
                class="rounded-lg max-w-[320px] md:max-w-[280px] lg:max-w-[320px] object-center border-2 border-white/10 shadow-md"
                src={bioImgPath}
                alt="A testimonial from a happy customer"
            />
        </div>

        <div>
            <blockquote class="bg-warning/25 px-1.5 text-xl font-medium text-base-content sm:text-2xl sm:leading-10">
                {quoteHighlighted}
            </blockquote>
            <br>
            <blockquote class="text-xl font-medium leading-8 text-base-content sm:text-2xl sm:leading-10">
                {quoteDetail1}
            </blockquote>
            {#if quoteDetail2}
                <br>
                <blockquote class="text-xl font-medium leading-8 text-base-content sm:text-2xl sm:leading-10">
                    {quoteDetail2}
                </blockquote>
            {/if}
            <figure>
                <figcaption class="mt-10 flex items-center justify-start gap-5">
                    <div class="text-base">
                        <div class="font-semibold text-base-content mb-0.5">
                            {name}
                        </div>
                        {#if companyLink}
                            <div class="text-base-content/60">
                                {bio} @ <a class="bg-primary underline" href={companyLink} target="_blank" rel="noreferrer">{companyName}</a>
                            </div>
                        {:else}
                            <div class="text-base-content/60">
                                {bio} @ {companyName}
                            </div>
                        {/if}

                        {#if socialPlatform}
                            <div class="text-base-content/60">
                                {socialPlatform} @ <a class="bg-secondary underline" href={socialLink} target="_blank" rel="noreferrer">{socialAccount}</a>
                            </div>
                        {/if}
                    </div>
                    {#if companyImgPath}
                        <img
                            width={150}
                            height={50}
                            class="w-20 md:w-24"
                            src={companyImgPath}
                            alt="Company logo"
                        />
                    {/if}
                </figcaption>
            </figure>

        </div>
        </div>
    </figure>
</div>
<script lang="ts">
    
    export let title: string = '';
    export let subtitle: string= '';
    export let description: string = '';
    export let yPadding: string= '';

</script>

<div class={`mx-auto max-w-screen-xl px-3 sm:px-5 lg:px-6 ${yPadding ? yPadding : 'py-16'}`}>

    {#if title || subtitle || description}
        <div class="mx-auto mb-12 w-full text-center md:w-4/5 lg:w-3/4 xl:w-2/3">
            {#if subtitle }
                <div class="text-sm font-bold text-primary-500">
                    {subtitle}
                </div>
            {/if}
            {#if title }
                <h2 class="text-center font-extrabold text-3xl md:text-5xl tracking-tight mb-12 md:mb-20">
                    {title}
                </h2>
            {/if}

            {#if description}
                <div class="mt-4 text-xl">
                    {description}
                </div>
            {/if}
        </div>

    {/if}
    <slot />

</div>
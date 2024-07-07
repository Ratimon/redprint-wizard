<script lang="ts">

    import Icon from '@iconify/svelte';

    export let title: string = '';
    export let iconName: string= '';

</script>

<div class="text-primary-400 stroke-current w-6 h-6 stroke-2 flex flex-col">

    <div class="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full border border-gray-300 bg-gray-100">
        <Icon icon={iconName} />
    </div>

    <div class="mt-2 text-center">
        <div class="text-2xl font-semibold text-gray-900">
            {title}
        </div>
        <div class="mt-2 text-lg leading-8">
            <slot />
        </div>
    </div>

</div>

<style lang="postcss">
    /* .feature-element :global(svg) {
        @apply text-primary-400 stroke-current w-6 h-6 stroke-2;
    } */
</style>
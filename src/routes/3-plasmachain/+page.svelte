<script  lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
    import Error from '$lib/ui/error/Error.svelte';
</script>

<Background color="bg-base-100 pt-3 pb-4">
    <div class="divider divider-primary">
        <h1 class="text-2xl ">3.0 </h1>
    </div>
</Background>

<Error error={`This module is Optional`}></Error>
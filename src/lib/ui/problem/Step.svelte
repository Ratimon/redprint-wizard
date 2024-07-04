<script lang="ts">
    
    let emojiName: string = '';
    export {emojiName as emoji};

    let textName: string = '';
    export {textName as text};
    
</script>

<div class="w-full md:w-48 flex flex-col gap-2 items-center justify-center">
    <span class="text-4xl">{emojiName}</span>
    <h3 class="font-bold">{textName}</h3>
</div>
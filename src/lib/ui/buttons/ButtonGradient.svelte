<script lang="ts">
    
  let titleName: string;
  export {titleName as title};

  const onClick = () => {};

</script>


<button class="btn btn-gradient animate-shimmer" on:click={() => onClick()}>
    {titleName}
</button>
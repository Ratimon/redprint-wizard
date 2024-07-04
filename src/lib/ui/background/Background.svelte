<script lang="ts">
    let colorName: string;
    export {colorName as color};
    
  </script>
  
  <div class={`${colorName}`}>
    <slot />
  </div>
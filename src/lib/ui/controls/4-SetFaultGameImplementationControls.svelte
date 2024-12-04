<script lang="ts">
    import Background from '$lib/ui/background/Background.svelte';
  
    import InfoSection from '$lib/ui/controls/InfoSection.svelte';
  
    import type { KindedSetFaultGameImplementationOptions } from '$lib/wizard/shared';
  
    import { deploySetFaultGameImplementation } from '$lib/wizard/deploy-scripts';
  
    const deploySetFaultGameImplementationDefaults = deploySetFaultGameImplementation.defaults;
  
    export let opts: Required<KindedSetFaultGameImplementationOptions['SetFaultGameImplementation'] > = {
      kind: 'SetFaultGameImplementation',
      ...deploySetFaultGameImplementationDefaults,
      deployInfo: {  securityContact: 'Consult full internal deploy script at https://github.com/Ratimon/redprint-forge', license: 'MIT'  },
    };
    
</script>
    
<section class="controls-section">
    <Background color="bg-neutral-content">
        <h1 >Contract Settings</h1>
    </Background>

    <label class="labeled-input">
        <span>Name</span>
        <input bind:value={opts.deployName}>
    </label>
</section>

<section class="controls-section">
    <h1>set AlphabetFaultGame Implementation</h1>
</section>
    
<section class="controls-section">
    <h1>set FastFaultGame Implementation</h1>
</section>
  

<InfoSection bind:info={opts.deployInfo} />
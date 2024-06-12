<script lang="ts">

  import type {Info } from '$lib/wizard/smart-contracts';
  import { contractInfoDefaults } from '$lib/wizard/smart-contracts';

  import HelpTooltip from './HelpTooltip.svelte';

  export let info: Info;
</script>

<section class="controls-section">
  <h1>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="flex items-center tooltip-container pr-2">
      <span>Info</span>
    </label>
  </h1>

  <label class="labeled-input">
    <span class="flex justify-between pr-2">
      Reference
      <HelpTooltip link="https://github.com/ethereum-lists/contracts/blob/main/README.md#tracking-new-deployments">
         The link to original code
      </HelpTooltip>
    </span>
    <input bind:value={info.securityContact} placeholder="security@example.com" />
  </label>

  <label class="labeled-input">
    <span>License</span>
    <input bind:value={info.license} placeholder={contractInfoDefaults.license} />
  </label>
</section>


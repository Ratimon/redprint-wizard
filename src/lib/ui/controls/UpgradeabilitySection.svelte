<script lang="ts">
  import type { Upgradeable } from '$lib/wizard/smart-contracts';

  import ToggleRadio from'$lib/ui/inputs/ToggleRadio.svelte';
  import HelpTooltip from './HelpTooltip.svelte';

  export let upgradeable: Upgradeable;
</script>

<section class="controls-section">
  <h1>
    <!-- svelte-ignore a11y-label-has-associated-control -->
    <label class="flex items-center tooltip-container pr-2">
      <span>Upgradeability</span>
      <span class="ml-1">
        <ToggleRadio bind:value={upgradeable} defaultValue="transparent" />
      </span>
      <HelpTooltip align="right" link="https://docs.openzeppelin.com/openzeppelin/upgrades">
      Smart contracts are immutable by default unless deployed behind an upgradeable proxy.
      </HelpTooltip>
    </label>
  </h1>

  <div class="checkbox-group">
    <label class:checked={upgradeable === 'transparent'}>
      <input type="radio" bind:group={upgradeable} value="transparent">
      Transparent
      <HelpTooltip link="https://docs.openzeppelin.com/contracts/api/proxy#TransparentUpgradeableProxy">
      Uses more complex proxy with higher overhead, requires less changes in your contract. Can also be used with beacons.
      </HelpTooltip>
    </label>
    <label class:checked={upgradeable === 'uups'}>
      <input type="radio" bind:group={upgradeable} value="uups">
      UUPS
      <HelpTooltip link="https://docs.openzeppelin.com/contracts/api/proxy#UUPSUpgradeable">
      Uses simpler proxy with less overhead, requires including extra code in your contract. Allows flexibility for authorizing upgrades.
      </HelpTooltip>
    </label>
  </div>
</section>


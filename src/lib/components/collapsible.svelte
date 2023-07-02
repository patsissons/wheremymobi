<script lang="ts">
  import { CaretCollapsedIcon, CaretExpandedIcon } from '$lib/icons';
  import collapse from 'svelte-collapse';

  export let expanded = false;
  export let duration = 0.2;
  export let easing = 'ease';

  function handleToggleExpanded() {
    expanded = !expanded;
  }
</script>

<div class="flex flex-col gap-2 w-full" aria-expanded={expanded}>
  <button
    type="button"
    class="flex items-center gap-1 w-full bg-none"
    on:click={handleToggleExpanded}
  >
    <slot name="header" />
    {#if expanded}
      <CaretExpandedIcon />
    {:else}
      <CaretCollapsedIcon />
    {/if}
  </button>

  <div use:collapse={{ open: expanded, duration, easing }}>
    <slot />
  </div>
</div>

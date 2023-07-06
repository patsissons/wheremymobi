<script lang="ts">
  import { onMount } from 'svelte';
  import collapse from 'svelte-collapse';
  import { CaretCollapsedIcon, CaretExpandedIcon } from '$lib/icons';

  export let expanded = false;
  export let duration = 0.2;
  export let easing = 'ease';

  let mounted = false;

  onMount(() => {
    mounted = true;
  });

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

  <!-- use:collapse is having some FOUC issues, so we'll only render it after mounting -->
  {#if mounted}
    <div use:collapse={{ open: expanded, duration, easing }}>
      <slot />
    </div>
  {/if}
</div>

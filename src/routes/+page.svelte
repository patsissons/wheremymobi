<script lang="ts">
  import { onMount } from 'svelte';
  import { GOOGLE_MAPS_API_KEY } from '$lib/utils/env';
  import type { PageData } from './$types';
  import { createMap, loadMarkers } from '$lib/maps/utils';
  import type { MapContext } from '$lib/maps/types';

  export let data: PageData;

  let container: HTMLDivElement;
  let mapContext: MapContext;

  onMount(async () => {
    mapContext = await createMap(container);
    loadMarkers(mapContext, data.stations);

    console.log(`loaded ${data.stations.length} stations`);
  });
</script>

<svelte:head>
  <script
    defer
    async
    src={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}`}
  ></script>
</svelte:head>

<div class="w-full h-full" bind:this={container} />

{#if data.debug}
  <pre class="text-sm font-mono whitespace-pre-wrap">
{JSON.stringify(data, null, 2)}
  </pre>
{/if}

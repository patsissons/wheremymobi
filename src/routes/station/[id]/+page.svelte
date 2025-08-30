<script lang="ts">
  import MetaTags from '$lib/components/meta-tags.svelte';
  import { Station } from '$lib/components/station';
  import type { PageData } from './$types';

  export let data: PageData;

  $: title = data.station
    ? `Station #${data.station.station_id}: ${data.station.name}`
    : `Station ${data.id} not found`;
</script>

<MetaTags {title} />

<div class="container mx-auto h-full">
  {#if data.station}
    {@const { debug, station } = data}
    <div class="py-4">
      <Station {station} {debug} rounded />
    </div>
  {:else}
    <div class="flex h-full w-full items-center justify-center">
      <p class="text-3xl font-bold text-red-400">Station not found</p>
    </div>
  {/if}
</div>

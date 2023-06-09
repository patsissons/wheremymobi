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
    <div class="flex items-center justify-center w-full h-full">
      <p class="text-red-400 text-3xl font-bold">Station not found</p>
    </div>
  {/if}
</div>

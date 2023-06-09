<script lang="ts">
  import { onMount } from 'svelte';
  import {
    createMap,
    infoWindowId,
    loadMarkers,
    type MapContext,
  } from '$lib/maps';
  import type { PageData } from './$types';
  import JsonData from '$lib/components/json-data.svelte';
  import Station from '$lib/components/station/station.svelte';
  import GpsMarker from '$lib/components/gps-marker/gps-marker.svelte';
  import MetaTags from '$lib/components/meta-tags.svelte';

  export let data: PageData;

  let container: HTMLDivElement | undefined;
  let station: Station | undefined;
  let mapContext: MapContext | undefined;

  onMount(async () => {
    if (!container) return;

    const context = await createMap(container);
    loadMarkers(context, data.stations);

    context.selectedStation.subscribe((value) => {
      if (station) {
        station.$destroy();
        station = undefined;
      }

      if (!value) return;

      const selected = value;
      console.log('selecting station', selected);

      const target = document.getElementById(infoWindowId);

      if (target) {
        mountInfoWindow(target);
      } else {
        const listener = context.infoWindow.addListener('domready', () => {
          listener.remove();
          const target = document.getElementById(infoWindowId);
          if (!target) return;

          mountInfoWindow(target);
        });
      }

      function mountInfoWindow(target: HTMLElement) {
        station = new Station({
          target,
          props: {
            station: selected,
            debug: data.debug,
          },
        });
      }
    });

    mapContext = context;

    console.log(
      `loaded ${data.stations.length} stations and ${data.bikes.length} bikes`,
    );
  });
</script>

<MetaTags />

<div class="w-full h-full" bind:this={container}>
  {#if !mapContext}
    <div class="flex items-center justify-center w-full h-full">
      <div class="animate-bounce">
        <p class="text-3xl animate-pulse">Loading...</p>
      </div>
    </div>
  {/if}
</div>
{#if mapContext}
  <GpsMarker {mapContext} />
{/if}

{#if data.debug}
  <JsonData {data} />
{/if}

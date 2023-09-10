<script lang="ts">
  import { onMount } from 'svelte';
  import {
    createMap,
    infoWindowId,
    loadMarkers,
    updateMarkerForMotion,
    type MapContext,
  } from '$lib/maps';
  import type { PageData } from './$types';
  import StationComponent from '$lib/components/station/station.svelte';
  import GpsMarker from '$lib/components/gps-marker/gps-marker.svelte';
  import MetaTags from '$lib/components/meta-tags.svelte';

  export let data: PageData;

  let container: HTMLDivElement | undefined;
  let stationComponent: StationComponent | undefined;
  let mapContext: MapContext | undefined;

  let inMotion = true;

  $: if (mapContext) {
    mapContext.markers.forEach((marker) => {
      updateMarkerForMotion(marker, inMotion);
    });
  }

  $: if (mapContext && data.stations) {
    updateStations(mapContext, data.stations);
  }

  onMount(async () => {
    if (!container) return;

    const context = await createMap(container);
    mapContext = context;

    context.map.addListener('dragstart', () => {
      inMotion = true;
    });

    context.map.addListener('zoom_changed', () => {
      inMotion = true;
    });

    context.map.addListener('idle', () => {
      inMotion = false;
    });

    context.selectedStation.subscribe((value) => {
      if (stationComponent) {
        stationComponent.$destroy();
        stationComponent = undefined;
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
        stationComponent = new StationComponent({
          target,
          props: {
            station: selected,
            debug: data.debug,
          },
        });
      }
    });
  });

  function updateStations(
    mapContext: MapContext,
    stations: PageData['stations'],
  ) {
    loadMarkers(mapContext, stations);

    console.log(
      `loaded ${data.stations.length} stations and ${data.bikes.length} bikes`,
    );
  }
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

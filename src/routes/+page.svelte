<script lang="ts">
  import { mount, onMount, unmount } from 'svelte';
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
  let stationComponent: ReturnType<typeof mount> | undefined;
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
        unmount(stationComponent);
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
        stationComponent = mount(StationComponent, {
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

<div class="h-full w-full" bind:this={container}>
  {#if !mapContext}
    <div class="flex h-full w-full items-center justify-center">
      <div class="animate-bounce">
        <p class="animate-pulse text-3xl">Loading...</p>
      </div>
    </div>
  {/if}
</div>
{#if mapContext}
  <GpsMarker {mapContext} />
{/if}

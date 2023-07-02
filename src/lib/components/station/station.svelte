<script lang="ts">
  import dayjs from 'dayjs';
  import orderBy from 'lodash/orderBy';
  import { type Station, VehicleType } from '$lib/client';
  import AgeCounter from '../age-counter.svelte';
  import Collapsible from '../collapsible.svelte';
  import JsonData from '../json-data.svelte';
  import Link from '../link.svelte';
  import Badge from './badge.svelte';
  import Row from './row.svelte';
  import Bike from './bike.svelte';
  import { DirectionsIcon, GoogleMapsIcon, RefreshIcon } from '$lib/icons';

  export let station: Station;
  export let rounded = false;
  export let debug = false;

  let refreshing = false;

  $: counts = countBikes(station);

  function countBikes(station: Station) {
    const pedal =
      station.vehicle_types_available.find(
        ({ vehicle_type_id }) => Number(vehicle_type_id) === VehicleType.PEDAL,
      )?.count ?? station.num_bikes_available;
    const electric =
      station.vehicle_types_available.find(
        ({ vehicle_type_id }) =>
          Number(vehicle_type_id) === VehicleType.ELECTRIC,
      )?.count ?? 0;

    return { pedal, electric };
  }

  async function handleRefresh() {
    try {
      refreshing = true;
      const res = await fetch(`/api/station/${station.station_id}`);
      if (!res.ok) {
        const payload = await res.text();
        console.error(
          `Failed to refresh station ${station.station_id}`,
          payload,
        );
        return;
      }

      const data = (await res.json()) as { station?: Station };
      if (!data.station) {
        console.error(`Failed to refresh station ${station.station_id}`, data);
        return;
      }

      station = data.station;
    } catch (error) {
      console.error(`Failed to refresh station ${station.station_id}`, error);
    } finally {
      refreshing = false;
    }
  }

  function sortBikes() {
    return orderBy(
      station.bikes,
      [
        (bike) => Number(bike.vehicle_type_id),
        (bike) => Number(bike.last_reported),
      ],
      ['desc', 'desc'],
    );
  }
</script>

<div
  class="bg-mobi border border-white rounded-lg p-4"
  class:rounded-xl={rounded}
>
  <div class="flex flex-col items-center">
    <Row first>
      <Link href="/station/{station.station_id}">
        <p class="text-center text-xl font-bold underline">
          {`Station #${station.station_id}: ${station.name}`}
        </p>
      </Link>
      <div slot="right" class="flex items-center gap-1 p-1">
        <Link
          href="https://www.google.com/maps/place/{station.lat},{station.lon}"
          title="Open in Google Maps"
          external
        >
          <GoogleMapsIcon size="2em" />
        </Link>
        <Link
          href="https://www.google.com/maps/dir/?api=1&travelmode=bicycling&destination={station.lat},{station.lon}"
          title="Find directions in Google Maps"
          external
        >
          <DirectionsIcon size="1.5em" />
        </Link>
      </div>
    </Row>
    <Row>
      <div class="flex flex-wrap items-center justify-center gap-1">
        <Badge status={station.is_installed}>Installed</Badge>
        <Badge status={station.is_renting}>Renting</Badge>
        <Badge status={station.is_returning}>Returning</Badge>
      </div>
    </Row>
    <Row>
      <p class="text-center">
        {`${counts.pedal} pedal + ${counts.electric} electric + ${station.num_docks_available} slots = ${station.capacity} total`}
      </p>
      <div slot="right" class:p-1={station.is_charging_station}>
        {#if station.is_charging_station}
          <p class="text-yellow-300 font-bold leading-none">
            <span class="hidden md:inline">charging</span>
            <span>⚡️</span>
          </p>
        {/if}
      </div>
    </Row>
    {#if station.num_bikes_disabled > 0}
      <Row>
        <p class="text-yellow-400">
          {`${station.num_bikes_disabled} disabled bike${
            station.num_bikes_disabled > 1 ? 's' : ''
          }`}
        </p>
      </Row>
    {/if}
    <Row>
      <div class="text-center">
        <AgeCounter date={dayjs(station.last_reported * 1000)} humanize invert>
          <span slot="prefix">Last reported</span>
        </AgeCounter>
      </div>
    </Row>
    <Row>
      <button
        class="bg-fuchsia-500 hover:bg-fuchsia-600 disabled:bg-slate-500 disabled:border-slate-800 px-2 py-1 rounded-md border border-fuchsia-800 leading-none shadow-lg flex items-center gap-1"
        type="button"
        disabled={refreshing}
        on:click={handleRefresh}
      >
        <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        <RefreshIcon size="2em" />
      </button>
    </Row>
    <Row>
      <Collapsible>
        <div
          slot="header"
          class="flex items-center justify-center gap-1 w-full"
        >
          <h2 class="text-xl font-semibold">{station.bikes.length} Bikes</h2>
        </div>
        <div
          class="grid grid-cols-[repeat(4,auto)] md:grid-cols-[1fr_repeat(4,auto)] justify-items-center gap-2 font-mono"
        >
          <p class="hidden md:block">Bike Id</p>
          <p class="hidden md:block">Disabled</p>
          <p class="hidden md:block">Reserved</p>
          <p class="hidden md:block">Electric</p>
          <p class="hidden md:block">Last reported</p>
          {#each sortBikes() as bike}
            <Bike {bike} />
          {/each}
        </div>
      </Collapsible>
    </Row>
  </div>
  {#if debug}
    <Row>
      <div class="w-full overflow-x-auto">
        <JsonData data={station} />
      </div>
    </Row>
  {/if}
</div>

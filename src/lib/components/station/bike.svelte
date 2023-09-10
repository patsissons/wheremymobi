<script lang="ts">
  import dayjs from 'dayjs';
  import { type Bike, VehicleType } from '$lib/client';
  import AgeCounter from '../age-counter.svelte';

  export let bike: Bike;

  $: isElectric = Number(bike.vehicle_type_id) === VehicleType.ELECTRIC;
  $: range = isElectric ? (bike.current_range_meters ?? 0) / 1000 : undefined;
  $: lowBattery = Boolean(range != null && range < 2.5);
</script>

<p class="hidden md:block">{bike.bike_id}</p>
<div class="text-xs leading-none">
  {#if bike.is_disabled}
    <p>❌</p>
  {/if}
</div>
<div class="text-sm leading-none">
  {#if bike.is_reserved}
    <p>🔒</p>
  {/if}
</div>
<div class="w-full text-center">
  {#if isElectric}
    <div
      class="flex items-center justify-between gap-1 px-2 w-full leading-none"
    >
      {#if lowBattery}
        <span class="text-xs text-red-500">🪫</span>
      {:else}
        <span class="text-sm text-yellow-300">⚡️</span>
      {/if}
      {#if range != null}
        <span class="text-xs">
          {range.toFixed(1).replace(/\.0$/, '')}km
        </span>
      {/if}
    </div>
  {:else}
    <span class="text-sm bg-white/40 px-2 pb-1 rounded-sm">🚲</span>
  {/if}
</div>
<p class="justify-self-end text-xs">
  <AgeCounter date={dayjs(bike.last_reported * 1000)} humanize invert />
</p>

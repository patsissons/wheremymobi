<script lang="ts">
  import dayjs from 'dayjs';
  import { type Bike, VehicleType } from '$lib/client';
  import AgeCounter from '../age-counter.svelte';

  export let bike: Bike;
</script>

<p class="hidden md:block">{bike.bike_id}</p>
<div class="text-xl font-bold leading-none">
  {#if bike.is_disabled}
    <p>❌</p>
  {/if}
</div>
<div>
  {#if bike.is_reserved}
    <p>🔒</p>
  {/if}
</div>
<div class="text-xl font-bold leading-none">
  {#if Number(bike.vehicle_type_id) === VehicleType.ELECTRIC}
    <p class="text-yellow-300">⚡️</p>
  {:else}
    <p>🚲</p>
  {/if}
</div>
<p class="justify-self-end">
  <AgeCounter date={dayjs(bike.last_reported * 1000)} humanize invert />
</p>

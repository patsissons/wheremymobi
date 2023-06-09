<script lang="ts">
  import dayjs from 'dayjs';
  import { writable } from 'svelte/store';
  import type { FetchStationsResponse } from '$lib/client/stations';
  import { formatAge } from '$lib/utils/dayjs';
  import Refreshable from './refreshable.svelte';

  export let stations: FetchStationsResponse['stations'];
  export let bikes: FetchStationsResponse['bikes'];
  export let timestamp: number;

  const updatedAt = writable(dayjs(timestamp));

  function onUpdate() {
    updatedAt.set(dayjs(timestamp));
  }
</script>

<div class="flex items-stretch gap-2 text-xs">
  <Refreshable {onUpdate}>
    <div class="grid grid-flow-row grid-cols-2 gap-1">
      <p>Stations</p>
      <p class="justify-self-end font-mono">{stations.length}</p>
      <p>Bikes</p>
      <p class="justify-self-end font-mono">{bikes.length}</p>
      <p>Age</p>
      <p class="justify-self-end font-mono">{formatAge($updatedAt)}</p>
    </div>
  </Refreshable>
</div>

<script lang="ts">
  import dayjs from 'dayjs';
  import { writable } from 'svelte/store';
  import type { Metadata } from '$lib/client';
  import type { FetchStationsResponse } from '$lib/client/stations';
  import Refreshable from './refreshable.svelte';
  import { formatAge } from '$lib/utils/dayjs';

  interface DataAge {
    bikes: dayjs.Dayjs;
    info: dayjs.Dayjs;
    status: dayjs.Dayjs;
  }

  export let metadata: FetchStationsResponse['metadata'];

  let updatedAt = writable<DataAge>(calculateAge());

  function onUpdate() {
    updatedAt.set(calculateAge());
  }

  function calculateAge() {
    const { bikes, stationsInfo, stationsStatus } = metadata;

    return {
      bikes: timestamp(bikes),
      info: timestamp(stationsInfo),
      status: timestamp(stationsStatus),
    };

    function timestamp(data: Metadata) {
      return dayjs(data.last_updated * 1000);
    }
  }
</script>

<div class="flex items-center gap-2 text-xs">
  <Refreshable {onUpdate}>
    <div class="grid grid-flow-row grid-cols-2 gap-1">
      <p class="justify-self-end font-mono">{formatAge($updatedAt.bikes)}</p>
      <p>Bikes</p>
      <p class="justify-self-end font-mono">{formatAge($updatedAt.info)}</p>
      <p>Info</p>
      <p class="justify-self-end font-mono">{formatAge($updatedAt.status)}</p>
      <p>Status</p>
    </div>
  </Refreshable>
</div>

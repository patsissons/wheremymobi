import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { fetchStations } from '$lib/client/stations';
import type { PageServerLoad } from './$types';

dayjs.extend(duration);

export const load: PageServerLoad = async ({ fetch, params }) => {
  const { id } = params;
  const { stations } = await fetchStations({ fetch });

  const station = stations.find(({ station_id }) => station_id === id);

  return { id, station };
};

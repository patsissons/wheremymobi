import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { fetchStations } from '$lib/client/stations';
import type { LayoutServerLoad } from './$types';

dayjs.extend(duration);

export const load: LayoutServerLoad = async ({ fetch }) => {
  const data = await fetchStations({ fetch });

  return data;
};

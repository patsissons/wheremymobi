import '$lib/utils/dayjs';
import { fetchStations } from '$lib/client/stations';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = ({ fetch }) => {
  return fetchStations({ fetch });
};

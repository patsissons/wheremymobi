import '$lib/utils/dayjs';
import { fetchStations } from '$lib/client/stations';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ fetch, url }) => {
  const stations = await fetchStations({ fetch });

  return {
    ...stations,
    beta: url.hostname.startsWith('beta'),
    debug: url.searchParams.has('debug'),
  };
};

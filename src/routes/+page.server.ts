import { fetchStations } from '$lib/client/stations';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = ({ fetch }) => {
  return fetchStations({ fetch });
};

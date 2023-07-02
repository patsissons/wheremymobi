import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import type { PageServerLoad } from './$types';

dayjs.extend(duration);

export const load: PageServerLoad = async ({ parent, params }) => {
  const { id } = params;
  const { stations } = await parent();
  const station = stations.find(({ station_id }) => station_id === id);

  return { id, station };
};

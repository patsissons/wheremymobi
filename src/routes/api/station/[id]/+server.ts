import { fetchStations } from '$lib/client/stations';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
  const { id } = params;
  if (!id) throw error(400, 'Missing station ID');

  const { stations } = await fetchStations({ fetch });
  const station = stations.find(({ station_id }) => station_id === id);
  if (!station) throw error(404, 'Station not found');

  return json({ station });
};

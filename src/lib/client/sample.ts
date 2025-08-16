import { writeFile } from 'fs/promises';
import type { FetchStationsResponse } from './stations';

export async function fetchSampleStations(): Promise<FetchStationsResponse> {
  const { default: sample } = await import('$lib/data/sample.json');
  return sample as FetchStationsResponse;
}

export async function saveSampleStations(stations: FetchStationsResponse) {
  await writeFile(
    'src/lib/data/sample.json',
    JSON.stringify(stations, null, 2),
  );
}

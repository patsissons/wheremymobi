import moment from 'moment';
import {Observable, of} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {catchError, map, tap} from 'rxjs/operators';
import {createStationNode, StationData, StationNode} from './Station';

export interface FetchResponse {
  result: StationData[];
}

export interface FetchResult {
  error?: any;
  fetchedAt: moment.Moment;
  stations: StationNode[];
}

export interface FetchOptions {
  headers?: {};
  verboseOutput?: boolean;
}

export const defaultUrl = 'http://vancouver-ca.smoove.pro/api-public/stations';

export function fetch(url?: string, options?: FetchOptions) {
  return fetchObservable(url, options).toPromise();
}

export function fetchObservable(
  url = defaultUrl,
  {
    headers = {},
    verboseOutput = process.env.NODE_ENV !== 'production',
  }: FetchOptions = {},
): Observable<FetchResult> {
  const debug = (message: string, ...args: any[]) => {
    if (verboseOutput) {
      if (args.length) {
        console.log(message, args);
      } else {
        console.log(message);
      }
    }
  };

  debug(`Fetching stations from '${url}' ...`);

  return ajax.getJSON<FetchResponse>(`https://cors.io/?${url}`, headers).pipe(
    tap((response) => {
      debug('Fetch Response', response);

      if (!response || !response.result) {
        throw new Error(
          `Invalid Response: ${response ? 'Missing result' : 'Empty'}`,
        );
      }

      debug(`Fetched ${response.result.length} stations`);
    }),
    map(({result}) => {
      return {
        fetchedAt: moment(),
        stations: result.map((stationData) => {
          return createStationNode(stationData);
        }),
      };
    }),
    catchError((error) => {
      debug(`Fetch failed: ${error.message}`, error);

      return of({
        error,
        fetchedAt: moment(),
        stations: [],
      });
    }),
  );
}

import axios, {AxiosRequestConfig} from 'axios';
import moment from 'moment';
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
  axiosRequestConfig?: AxiosRequestConfig;
  verboseOutput?: boolean;
}

export const defaultUrl = 'http://vancouver-ca.smoove.pro/api-public/stations';

// console.log(axios.defaults);
// axios.defaults.headers.get['Access-Control-Allow-Origin'] = '*';
// axios.defaults.crossDomain = true;

export async function fetch(
  url = defaultUrl,
  {
    axiosRequestConfig = {},
    verboseOutput = process.env.NODE_ENV !== 'production',
  }: FetchOptions = {},
): Promise<FetchResult> {
  const debug = (message: string, ...args: any[]) => {
    if (verboseOutput) {
      if (args.length) {
        console.log(message, args);
      } else {
        console.log(message);
      }
    }
  };

  try {
    if (!url) {
      throw new Error(`'url' is required`);
    }

    debug(`Fetching stations from '${url}' ...`);

    const response = await axios.get<FetchResponse>(url, axiosRequestConfig);

    debug('Fetch Response', response);

    const {data} = response;

    if (!data || !data.result) {
      throw new Error(`Invalid Response: ${data ? 'Missing result' : 'Empty'}`);
    }

    debug(`Fetched ${data.result.length} stations`);

    const stations = data.result.map((stationData) => {
      return createStationNode(stationData);
    });

    return {
      stations,
      fetchedAt: moment(),
    };
  } catch (error) {
    debug(`Fetch failed: ${error.message}`, error);

    return {
      error,
      fetchedAt: moment(),
      stations: [],
    };
  }
}

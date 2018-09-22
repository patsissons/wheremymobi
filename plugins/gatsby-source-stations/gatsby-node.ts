import axios, {AxiosBasicCredentials, AxiosProxyConfig} from 'axios';

import {readJson} from 'fs-extra';
import {StationData, createStationNode} from './Station';

export interface FetchResult {
  result: StationData[];
}

export interface AxiosOptions {
  method?: string;
  baseURL?: string;
  headers?: any;
  params?: any;
  data?: any;
  timeout?: number;
  withCredentials?: boolean;
  auth?: AxiosBasicCredentials;
  responseType?: string;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  maxContentLength?: number;
  maxRedirects?: number;
  httpAgent?: any;
  httpsAgent?: any;
  proxy?: AxiosProxyConfig | false;
}

export interface GatsbyOptions {
  localData: string;
  name: string;
  typePrefix: string;
  useLocalData: boolean;
  verboseOutput?: boolean;
  url: string;
}

type ComposedOptions = AxiosOptions & GatsbyOptions;

export async function sourceNodes(
  {actions: {createNode, setPluginStatus}, createNodeId}: any,
  {
    localData,
    name,
    typePrefix,
    useLocalData,
    verboseOutput,
    url,
    ...axiosConfig
  }: ComposedOptions
) {
  if (!url) {
    return;
  }

  const debug = (message: string) => {
    if (verboseOutput) {
      console.log(message);
    }
  };

  const uri = useLocalData ? localData : url;

  debug(`Fetching stations from ${uri} ...`);
  const {data} = useLocalData
    ? await fetchLocalData(uri)
    : await fetchRemoteData(uri, axiosConfig);

  if (!data || !data.result) {
    debug(`Fetch failed.`);
    return;
  }

  debug(`Fetched ${data.result.length} stations`);

  data.result.forEach((station) => {
    createStationNode(station, createNode, createNodeId);
  });

  setPluginStatus({lastFetched: Date.now()});
}

async function fetchLocalData(path: string) {
  return {
    data: (await readJson(path)) as FetchResult,
  };
}

function fetchRemoteData(url: string, axiosConfig: AxiosOptions) {
  return axios.get<FetchResult>(url, axiosConfig);
}

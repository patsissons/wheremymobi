import axios, {AxiosBasicCredentials, AxiosProxyConfig} from 'axios';

import {readJson} from 'fs-extra';
import {StationData, createStationNode} from './Station';

export interface FetchResult {
  result: StationData[];
}

export interface AxiosOptions {
  url: string;
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
}

type ComposedOptions = AxiosOptions & GatsbyOptions;

export async function sourceNodes(
  {actions: {createNode}, createNodeId}: any,
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
  const debug = (message: string) => {
    if (verboseOutput) {
      console.log(message);
    }
  };

  const uri = useLocalData ? localData : url;

  debug(`Fetching stations from ${uri} ...`);
  const {data} = useLocalData
    ? {data: (await readJson(localData)) as FetchResult}
    : await axios.get<FetchResult>(url, axiosConfig);

  if (!data || !data.result) {
    debug(`Fetch failed.`);
    return;
  }

  debug(`Fetched ${data.result.length} stations`);

  data.result.forEach((station) => {
    createNode(createStationNode(station, createNodeId));
  });
}

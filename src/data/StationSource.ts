import fetch from 'isomorphic-fetch';
import moment from 'moment';
import {Station} from 'models';
import {
  getConfig,
  getConfigByLocation,
  getCorsUri,
  mapTransform,
  SourceName,
  StationSourceConfig,
  StationSourceTransform,
} from './config';

export interface StationSourceResult {
  config: StationSourceConfig;
  error?: any;
  fetchedAt: moment.Moment;
  stations: Station[];
}

export interface Options {
  debug?: boolean;
}

export class StationSource {
  public static create(
    configOrKey: SourceName | StationSourceConfig,
    {debug}: Options,
  ) {
    const config =
      typeof configOrKey === 'string' ? getConfig(configOrKey) : configOrKey;

    return new StationSource(config, mapTransform(config), debug);
  }

  public static nearest(location: google.maps.LatLngLiteral, options: Options) {
    return StationSource.create(getConfigByLocation(location), options);
  }

  readonly config: StationSourceConfig;
  readonly verboseOutput: boolean;
  private readonly transform: StationSourceTransform;

  constructor(
    config: StationSourceConfig,
    transform: StationSourceTransform,
    // eslint-disable-next-line no-process-env
    verboseOutput = process.env.NODE_ENV !== 'production',
  ) {
    this.config = config;
    this.transform = transform;
    this.verboseOutput = verboseOutput;
  }

  async getJSON() {
    const uri = this.config.cors
      ? getCorsUri(this.config.uri)
      : this.config.uri;
    this.debug(`Fetching stations from '${uri}' ...`);

    const response = await fetch(uri, {
      headers: this.config.options ? this.config.options.headers : undefined,
    });

    const json = response.json();

    this.debug('Fetch Response', json);

    return json;
  }

  async getStations(): Promise<StationSourceResult> {
    try {
      const json = await this.getJSON();

      const stations = this.transform(json);

      this.debug(`Fetched ${stations.length} stations`);

      return {
        config: this.config,
        fetchedAt: moment(),
        stations,
      };
    } catch (error) {
      this.debug(`Fetch failed: ${error.message || 'Unknown Error'}`, error);

      return {
        config: this.config,
        error,
        fetchedAt: moment(),
        stations: [],
      };
    }
  }

  protected debug(message: string, ...args: any[]) {
    if (this.verboseOutput) {
      // eslint-disable-next-line no-console
      console.log(message, args);
    }
  }
}

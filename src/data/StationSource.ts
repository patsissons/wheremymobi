import moment from 'moment';
import {Observable, of, timer, merge} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {tap, map, catchError, mergeMap, debounceTime} from 'rxjs/operators';
import {Station, StationNode} from '~/station';
import {
  getConfig,
  getConfigByLocation,
  mapTransform,
  StationSourceConfig,
  StationSourceTransform,
} from './config';

export interface StationSourceResult {
  config: StationSourceConfig;
  error?: any[];
  fetchedAt: moment.Moment;
  nodes: StationNode[];
}

export interface Options {
  debug?: boolean;
}

export class StationSource {
  public static create(
    configOrKey: string | StationSourceConfig,
    {debug}: Options,
  ) {
    const config =
      typeof configOrKey === 'string' ? getConfig(configOrKey) : configOrKey;

    return new StationSource(config, mapTransform(config), debug);
  }

  public static nearest(location: google.maps.LatLng, options: Options) {
    return StationSource.create(getConfigByLocation(location), options);
  }

  readonly config: StationSourceConfig;
  readonly verboseOutput: boolean;
  private readonly transform: StationSourceTransform;

  constructor(
    config: StationSourceConfig,
    transform: StationSourceTransform,
    verboseOutput = process.env.NODE_ENV !== 'production',
  ) {
    this.config = config;
    this.transform = transform;
    this.verboseOutput = verboseOutput;
  }

  getJSON() {
    const uri = this.config.cors
      ? `https://cors.io/?${this.config.uri}`
      : this.config.uri;
    this.debug(`Fetching stations from '${uri}' ...`);

    const headers = this.config.options
      ? this.config.options.headers
      : undefined;
    return ajax.getJSON(uri, headers);
  }

  getStations(source?: Observable<any>) {
    return (source || this.getJSON()).pipe(
      tap((response) => {
        this.debug('Fetch Response', response);
      }),
      this.transform,
      map<Station[], StationSourceResult>((stations) => {
        this.debug(`Fetched ${stations.length} stations`);

        return {
          config: this.config,
          nodes: stations.map((station) => new StationNode(station)),
          fetchedAt: moment(),
        };
      }),
      catchError((error = {}) => {
        this.debug(`Fetch failed: ${error.message || 'Unknown Error'}`, error);

        return of<StationSourceResult>({
          error,
          config: this.config,
          fetchedAt: moment(),
          nodes: [],
        });
      }),
    );
  }

  watchStations(
    reloader: Observable<any> = of(true),
    interval = 300,
    source?: Observable<any>,
  ) {
    return merge(timer(0, 1000 * interval), reloader).pipe(
      debounceTime(100),
      mergeMap(() => this.getStations(source)),
    );
  }

  protected debug(message: string, ...args: any[]) {
    if (this.verboseOutput) {
      if (args.length) {
        console.log(message, args);
      } else {
        console.log(message);
      }
    }
  }
}

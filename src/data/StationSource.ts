import moment from 'moment';
import {Observable, of, timer} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {tap, map, catchError, mergeMap} from 'rxjs/operators';
import {Station, StationNode} from '~/station';
import {
  getConfig,
  getConfigByLocation,
  mapTransform,
  StationSourceConfig,
  StationSourceTransform,
} from './config';

export interface StationSourceResult {
  error?: any[];
  fetchedAt: moment.Moment;
  nodes: StationNode[];
}

export class StationSource {
  public static create(
    configOrKey: string | StationSourceConfig,
    verboseOutput?: boolean,
  ) {
    const config =
      typeof configOrKey === 'string' ? getConfig(configOrKey) : configOrKey;
    return new StationSource(config, mapTransform(config), verboseOutput);
  }

  public static nearest(location: google.maps.LatLng, verboseOutput?: boolean) {
    return StationSource.create(getConfigByLocation(location), verboseOutput);
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
    const uri = `https://cors.io/?${this.config.uri}`;
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
          nodes: stations.map((station) => new StationNode(station)),
          fetchedAt: moment(),
        };
      }),
      catchError((error = {}) => {
        this.debug(`Fetch failed: ${error.message || 'Unknown Error'}`, error);

        return of<StationSourceResult>({
          error,
          fetchedAt: moment(),
          nodes: [],
        });
      }),
    );
  }

  watchStations(interval = 300, source?: Observable<any>) {
    return timer(0, 1000 * interval).pipe(
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

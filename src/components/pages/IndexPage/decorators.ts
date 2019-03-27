import {mapPropsStream, setObservableConfig, withProps} from 'recompose';
import {from, Observable} from 'rxjs';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  startWith,
} from 'rxjs/operators';
import {StationSource, StationSourceResult} from '~/data';
import {Subject} from 'rxjs/internal/Subject';

setObservableConfig({
  fromESObservable: from as any,
});

export type QueryParams = Map<string, string>;

export interface WithQueryParamProps {
  params: QueryParams | null;
}

function getUrlParams() {
  if (typeof window === 'undefined') {
    return null;
  }

  const params = new Map<string, string>();

  new URLSearchParams(window.location.search).forEach((value, key) => {
    params.set(key.toLowerCase(), value);
  });

  return params;
}

export const withQueryParams = withProps<WithQueryParamProps, {}>(() => {
  return {
    params: getUrlParams(),
  };
});

interface PositionProps {
  coords?: Coordinates;
  timestamp?: number;
  error?: any;
}

export interface WithPositionProps {
  position?: PositionProps;
}

export function withPosition(
  options: PositionOptions = {enableHighAccuracy: true},
) {
  const reloader = new Subject();
  const reload = () => reloader.next();

  return mapPropsStream<WithPositionProps, {}>((props) => {
    return props.pipe(
      map(() => typeof navigator !== 'undefined' && navigator.geolocation),
      filter((geolocation): geolocation is Geolocation => Boolean(geolocation)),
      mergeMap((geolocation) => {
        return new Observable<PositionProps>((observer) => {
          geolocation.watchPosition(
            (position) => {
              observer.next(position);
            },
            (error) => {
              observer.error({error});
            },
            options,
          );
        });
      }),
      startWith(undefined),
      combineLatest(props, (position, prev) => {
        // eslint-disable-next-line no-console
        console.log('[position]', position, prev);
        return {
          ...prev,
          reload,
          position,
        };
      }),
    );
  });
}

export interface WithStationsProps {
  stations?: StationSourceResult;
  reload(): void;
}

export function withStations(defaultKey = 'vancouver') {
  const reloader = new Subject();
  const reload = () => {
    // eslint-disable-next-line no-console
    console.log('reload');
    reloader.next();
  };

  return mapPropsStream<
    WithStationsProps,
    WithStationsProps & WithQueryParamProps
  >((props) => {
    return props.pipe(
      map(({params}) => params),
      filter((params): params is QueryParams => params != null),
      map((params) => {
        return {
          debug: Boolean(params.get('debug')),
          source:
            params.get('source') ||
            (params.get('test') && 'test') ||
            defaultKey,
        };
      }),
      distinctUntilChanged(
        (left, right) =>
          left.debug === right.debug && left.source === right.source,
      ),
      mergeMap(({debug, source}) => {
        // eslint-disable-next-line no-console
        console.log('fetch', {source, debug});
        return StationSource.create(source, {debug}).watchStations(reloader);
      }),
      combineLatest(props, (stations, prev) => {
        // eslint-disable-next-line no-console
        console.log('[stations]', stations, prev);
        return {
          ...prev,
          reload,
          stations,
        };
      }),
    );
  });
}

import {mapPropsStream, setObservableConfig, withProps} from 'recompose';
import {from, Observable} from 'rxjs';
import {
  withLatestFrom,
  map,
  filter,
  distinctUntilChanged,
  mergeMap,
  startWith,
} from 'rxjs/operators';
import {StationSource, StationSourceResult} from '~/data';

setObservableConfig({
  fromESObservable: from as any,
});

export interface WithQueryParamProps {
  params: Map<string, string>;
}

function getUrlParams() {
  const params = new Map<string, string>();
  new URLSearchParams(window.location.search).forEach((value, key) => {
    params.set(key.toLowerCase(), value);
  });
  return params;
}

export const withQueryParams = withProps<WithQueryParamProps, {}>({
  params: getUrlParams(),
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
  const source = new Observable<PositionProps>((observer) => {
    navigator.geolocation.watchPosition(
      (position) => {
        observer.next(position);
      },
      (error) => {
        observer.error({error});
      },
      options,
    );
  });

  return mapPropsStream<WithPositionProps, {}>((props) => {
    return source.pipe(
      withLatestFrom(props, (position, prevProps) => {
        return {
          ...prevProps,
          position,
        };
      }),
      startWith({}),
    );
  });
}

export interface WithStationsProps {
  stations?: StationSourceResult;
}

export function withStations(defaultKey = 'vancouver') {
  return mapPropsStream<WithStationsProps, WithQueryParamProps>((props) => {
    return props.pipe(
      filter(({params}) => Boolean(params)),
      map(({params}) => {
        return params.get('source') || defaultKey;
      }),
      distinctUntilChanged(),
      withLatestFrom(props, (key, {params}) => {
        return StationSource.create(key, params.has('debug'));
      }),
      mergeMap((station) => station.watchStations()),
      withLatestFrom(props, (stations, prevProps) => {
        return {
          ...prevProps,
          stations,
        };
      }),
      startWith({}),
    );
  });
}

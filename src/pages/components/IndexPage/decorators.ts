import {mapPropsStream, setObservableConfig, withProps} from 'recompose';
import {from, Observable} from 'rxjs';
import {withLatestFrom} from 'rxjs/operators';
import {StationSource, StationSourceResult} from '~/data';

setObservableConfig({
  fromESObservable: from as any,
});

export interface WithQueryParamProps {
  params: Map<string, string>;
}

export const withQueryParams = withProps<WithQueryParamProps, {}>(() => {
  const params = new Map<string, string>();
  new URLSearchParams(window.location.search).forEach((value, key) => {
    params.set(key, value);
  });

  return {
    params,
  };
});

interface PositionProps {
  coords?: Coordinates;
  timestamp?: number;
  error?: Error;
}

export interface WithPositionProps {
  position: PositionProps;
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
    );
  });
}

export interface WithStationsProps {
  stations: StationSourceResult;
}

export function withStations(key: string) {
  const source = StationSource.create(key).watchStations();

  return mapPropsStream<WithStationsProps, {}>((props) => {
    return source.pipe(
      withLatestFrom(props, (stations, prevProps) => {
        return {
          ...prevProps,
          stations,
        };
      }),
    );
  });
}

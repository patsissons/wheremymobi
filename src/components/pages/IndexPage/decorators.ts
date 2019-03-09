import {mapPropsStream, setObservableConfig, withProps} from 'recompose';
import {from, Observable, combineLatest} from 'rxjs';
import {
  map,
  filter,
  distinctUntilChanged,
  startWith,
  mergeMap,
} from 'rxjs/operators';
import {StationSource, StationSourceResult} from '~/data';
import {Subject} from 'rxjs/internal/Subject';

setObservableConfig({
  fromESObservable: from as any,
});

export interface WithQueryParamProps {
  params: Map<string, string> | null;
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

// export function withPosition(
//   options: PositionOptions = {enableHighAccuracy: true},
// ) {
//   return mapPropsStream<WithPositionProps, {}>((props) => {
//     const source = new Observable<PositionProps>((observer) => {
//       navigator.geolocation.watchPosition(
//         (position) => {
//           observer.next(position);
//         },
//         (error) => {
//           observer.error({error});
//         },
//         options,
//       );
//     });

//     return combineLatest(
//       source.pipe(startWith(undefined)),
//       props,
//       (position, prev) => {
//         console.log('[position]', position, prev);
//         return {
//           ...prev,
//           position,
//         };
//       },
//     );
//   });
// }

export interface WithStationsProps {
  stations?: StationSourceResult;
  reload(): void;
}

export function withStations(defaultKey = 'vancouver') {
  const reloader = new Subject();

  return mapPropsStream<
    WithStationsProps,
    WithStationsProps & WithQueryParamProps
  >((props) => {
    const stationsObservable = props.pipe(
      map(({params}) => params),
      map((params) => {
        return {
          debug: params ? Boolean(params.get('debug')) : false,
          source:
            (params &&
              (params.get('source') || (params.get('test') && 'test'))) ||
            defaultKey,
        };
      }),
      distinctUntilChanged(
        (a, b) => a.debug === b.debug && a.source === b.source,
      ),
      mergeMap(({debug, source}) => {
        console.log('fetch', {source, debug});
        return StationSource.create(source, {debug}).watchStations(reloader);
      }),
    );

    return combineLatest(stationsObservable, props, (stations, prev) => {
      console.log('[stations]', stations, prev);
      return {
        ...prev,
        stations,
        reload: () => {
          console.log('reload');
          reloader.next();
        },
      };
    });
  });
}

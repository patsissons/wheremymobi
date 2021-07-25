import React, {
  ComponentPropsWithoutRef,
  useCallback,
  useContext,
  useState,
  useEffect,
} from 'react';
import MarkerClustererPlus, {
  MarkerClustererOptions,
} from '@googlemaps/markerclustererplus';
import {GoogleMapContext} from '@googlemap-react/core';
import {useGoogleNamespace} from 'utilities/google';

type Context = ComponentPropsWithoutRef<
  typeof GoogleMapContext.Provider
>['value'];
type Action = Context['dispatch'] extends (action: infer T) => void ? T : never;

const defaultOpts: MarkerClustererOptions = {
  averageCenter: true,
  gridSize: 90,
  maxZoom: 17,
  enableRetinaIcons: false,
};

export function useMarkerClusterer(opts: MarkerClustererOptions = {}) {
  const {dispatch, state} = useContext(GoogleMapContext);
  const [clusterer, setClusterer] = useState<MarkerClustererPlus>();
  const [context, setContext] = useState<Context>();
  const Provider = useCallback(
    (props: {children?: any}) =>
      context ? <GoogleMapContext.Provider value={context} {...props} /> : null,
    [context],
  );
  const [google] = useGoogleNamespace();
  useEffect(() => {
    if (!clusterer && state && state.map) {
      setClusterer(
        new MarkerClustererPlus(state.map, [], {
          ...defaultOpts,
          ...opts,
        }),
      );
    }
    if (!context && clusterer && state) {
      setContext({
        dispatch(action: Action) {
          const {type, id, object} = action;

          if (clusterer && state && state.objects) {
            switch (type) {
              case 'add_object':
                if (object && object instanceof google.maps.Marker) {
                  clusterer.addMarker(object);
                }
                break;
              case 'remove_object':
                if (id) {
                  const marker = state.objects.get(id);

                  if (marker && marker instanceof google.maps.Marker) {
                    clusterer.removeMarker(marker);
                  }
                }
                break;
            }
          }

          dispatch(action);
        },
        state,
      });
    }
  }, [clusterer, context, dispatch, google.maps.Marker, opts, state]);

  return Provider;
}

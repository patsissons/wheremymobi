import * as React from 'react';
import moment from 'moment';
import {
  compose,
  mapProps,
  withProps,
  withStateHandlers,
  // mapPropsStream,
} from 'recompose';
import {
  BicyclingLayer,
  GoogleMap,
  InfoWindow,
  withScriptjs,
  WithScriptjsProps,
  withGoogleMap,
  WithGoogleMapProps,
} from 'react-google-maps';
import MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';
// import {Observable} from 'rxjs';
// import {combineLatest, tap} from 'rxjs/operators';
import {
  withMapsApiKey,
  WithMapsApiKeyProps,
} from '~/components/StationMap/utils';
import {StationNode} from '~/gatsby-source-stations/Station';
import {StationInfo, StationMarker} from './components';
import {StationMarkerActionProps} from './components/StationMarker';

import * as styles from './StationMap.module.scss';

interface FetchProps {
  fetchedAt: moment.Moment;
}

export interface Props extends FetchProps {
  stations: StationNode[];
}

// interface PositionProps {
//   position: Position | undefined;
// }

interface MappedProps extends FetchProps {
  stations: Map<number, StationNode>;
}

interface ActionProps extends StationMarkerActionProps {
  hideInfo(): void;
}

interface StateProps {
  selectedStation?: StationNode;
}

type ComposedProps = MappedProps &
  ActionProps &
  // PositionProps &
  StateProps &
  WithMapsApiKeyProps &
  WithScriptjsProps &
  WithGoogleMapProps;

export class StationMap extends React.PureComponent<ComposedProps> {
  renderInfo = () => {
    const {fetchedAt, selectedStation: station} = this.props;

    return (
      (station && (
        <InfoWindow
          position={{lat: station.lat, lng: station.lng}}
          onCloseClick={this.props.hideInfo}
          options={{
            pixelOffset: new google.maps.Size(0, -100),
          }}
        >
          <StationInfo fetchedAt={fetchedAt} station={station} />
        </InfoWindow>
      )) ||
      false
    );
  };

  renderMarker = (station: StationNode) => {
    if (!station.valid) {
      // tslint:disable-next-line:no-console
      console.debug(`Bad Station Found`, station);
      return false;
    }

    return (
      <StationMarker
        key={station.number}
        station={station}
        showInfo={this.props.showInfo}
        position={{lat: station.lat, lng: station.lng}}
      />
    );
  };

  renderMarkers = (clustered = true) => {
    const markers = Array.from(this.props.stations.values()).map(
      this.renderMarker,
    );

    return clustered ? (
      <MarkerClusterer averageCenter enableRetinaIcons gridSize={30}>
        {markers}
      </MarkerClusterer>
    ) : (
      markers
    );
  };

  render() {
    const {hideInfo} = this.props;

    // const center = position
    //   ? {lat: position.coords.latitude, lng: position.coords.longitude}
    //   : undefined;
    // const zoom = position ? 13 : undefined;

    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: 49.279627, lng: -123.121116}}
        // center={center}
        // zoom={zoom}
        onClick={hideInfo}
      >
        <BicyclingLayer />
        {this.renderInfo()}
        {this.renderMarkers()}
      </GoogleMap>
    );
  }
}

export default compose<ComposedProps, Props>(
  // mapPropsStream<any, any>((oldProps) => {
  //   return new Observable((observer) => {
  //     navigator.geolocation.watchPosition(
  //       (position) => {
  //         observer.next(position);
  //       },
  //       (error) => {
  //         observer.error(error);
  //       },
  //       {enableHighAccuracy: true},
  //     );
  //   }).pipe(
  //     combineLatest(oldProps as any, (position, props) => ({
  //       ...props,
  //       position,
  //     })),
  //   );
  // }),
  withMapsApiKey(),
  mapProps<MappedProps, Props & WithMapsApiKeyProps>(
    ({mapsApiKey, stations, ...props}) => {
      return {
        googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
        stations: stations.reduce((map, station) => {
          return map.set(station.number, station);
        }, new Map<number, StationNode>()),
        ...props,
      };
    },
  ),
  withProps({
    loadingElement: <div className={styles.LoadingContainer}>Loading...</div>,
    containerElement: <div className={styles.MapContainer} />,
    mapElement: <div className={styles.Map} />,
  }),
  withStateHandlers<StateProps, any, ComposedProps>(
    {},
    {
      showInfo() {
        return (selectedStation: StationNode) => ({selectedStation});
      },
      hideInfo() {
        return () => ({selectedStation: undefined});
      },
    },
  ),
  withScriptjs,
  withGoogleMap,
)(StationMap);

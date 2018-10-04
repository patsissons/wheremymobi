import * as React from 'react';
import moment from 'moment';
import {compose, mapProps, withProps, withStateHandlers} from 'recompose';
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
            pixelOffset: {
              width: 0,
              height: -100,
            },
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
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: 49.279627, lng: -123.121116}}
        onClick={this.props.hideInfo}
      >
        <BicyclingLayer />
        {this.renderInfo()}
        {this.renderMarkers()}
      </GoogleMap>
    );
  }
}

export default compose<ComposedProps, Props>(
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
    loadingElement: <div className={styles.LoadingContainer} />,
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

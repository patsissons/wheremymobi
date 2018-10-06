import * as React from 'react';
import moment from 'moment';
import {
  compose,
  mapProps,
  withProps,
  withStateHandlers,
  defaultProps,
  StateHandlerMap,
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
import {StationNode} from '~/gatsby-source-stations/Station';
import {
  SelectedStationProps,
  StationInfo,
  StationMarker,
  StationMarkerActionProps,
} from './components';
import {withMapsApiKey, WithMapsApiKeyProps} from './decorators';

import * as styles from './StationMap.module.scss';

interface FetchProps {
  fetchedAt: moment.Moment;
}

export interface Props extends FetchProps {
  stations: StationNode[];
}

interface DefaultProps {
  defaultCenter: google.maps.LatLngLiteral;
  defaultZoom: number;
}

interface InjectedProps {
  stations: Map<number, StationNode>;
}

interface ActionProps
  extends StationMarkerActionProps,
    StateHandlerMap<SelectedStationProps> {
  hideInfo(): SelectedStationProps;
}

type ComposedProps = ActionProps &
  DefaultProps &
  FetchProps &
  InjectedProps &
  SelectedStationProps &
  WithMapsApiKeyProps &
  WithGoogleMapProps &
  WithScriptjsProps;

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
      // this should never happen
      // tslint:disable-next-line:no-console
      console.debug(`Bad Station Found`, station);
      return false;
    }

    const {showInfo} = this.props;

    return (
      <StationMarker
        key={station.number}
        station={station}
        showInfo={showInfo}
      />
    );
  };

  renderMarkers = (clustered = true) => {
    const markers = Array.from(this.props.stations.values()).map(
      this.renderMarker,
    );

    return clustered ? (
      <MarkerClusterer averageCenter enableRetinaIcons gridSize={50}>
        {markers}
      </MarkerClusterer>
    ) : (
      markers
    );
  };

  render() {
    const {hideInfo, defaultCenter, defaultZoom} = this.props;

    return (
      <GoogleMap
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
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
  withMapsApiKey,
  defaultProps<DefaultProps>({
    defaultCenter: {
      lat: 49.279627,
      lng: -123.121116,
    },
    defaultZoom: 13,
  }),
  withStateHandlers<SelectedStationProps, ActionProps, ComposedProps>(
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
  withProps<WithGoogleMapProps & WithScriptjsProps, WithMapsApiKeyProps>(
    ({mapsApiKey}) => ({
      googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${mapsApiKey}&v=3.exp&libraries=geometry,drawing,places`,
      loadingElement: <div className={styles.LoadingContainer}>Loading...</div>,
      containerElement: <div className={styles.MapContainer} />,
      mapElement: <div className={styles.Map} />,
    }),
  ),
  mapProps<InjectedProps, WithMapsApiKeyProps & Props>(
    ({mapsApiKey, stations, ...props}) => {
      return {
        stations: stations.reduce((map, station) => {
          return map.set(station.number, station);
        }, new Map<number, StationNode>()),
        ...props,
      };
    },
  ),
  withScriptjs,
  withGoogleMap,
)(StationMap);

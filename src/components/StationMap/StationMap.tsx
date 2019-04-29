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
import {StationNode} from '~/station';
import {Control, ControlSite} from 'react-google-maps-controls';
import {
  GpsMarker,
  GpsMarkerProps,
  SelectedStationProps,
  StationInfo,
  StationMarker,
  StationMarkerActionProps,
} from './components';
import {withMapsApiKey, WithMapsApiKeyProps} from './decorators';

import * as styles from './StationMap.module.scss';

interface FetchProps {
  fetchedAt: moment.Moment;
  location: google.maps.LatLngLiteral;
}

interface PositionProps {
  position: Partial<GpsMarkerProps> | undefined;
}

export interface Props extends FetchProps, PositionProps {
  nodes: StationNode[];
  reload(): void;
}

interface DefaultProps {
  defaultCenter: google.maps.LatLngLiteral;
  defaultZoom: number;
}

interface InjectedProps {
  nodes: Map<number, StationNode>;
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
  PositionProps &
  SelectedStationProps &
  WithMapsApiKeyProps &
  WithGoogleMapProps &
  WithScriptjsProps;

interface State {
  followGps: boolean;
}

export class StationMap extends React.PureComponent<ComposedProps, State> {
  state: State = {followGps: true};

  get gpsCenter() {
    const {
      props: {position},
      state: {followGps},
    } = this;

    if (followGps && position && position.coords) {
      const {
        coords: {latitude, longitude},
      } = position;

      return new google.maps.LatLng(latitude, longitude);
    }

    return undefined;
  }

  get gpsZoom() {
    const {
      props: {position},
      state: {followGps},
    } = this;

    if (followGps && position && position.coords) {
      const {
        coords: {accuracy},
      } = position;

      return Math.min(20, Math.max(1, Math.log2(591657550 / accuracy) - 6));
    }

    return undefined;
  }

  handleDrag = () => {
    this.setState({followGps: false});
  };

  handleGpsCenter = () => {
    this.setState({followGps: true});
  };

  renderInfo = () => {
    const {fetchedAt, selectedNode} = this.props;

    if (!selectedNode) {
      return false;
    }

    const {
      station: {lat, lng},
    } = selectedNode;

    return (
      <InfoWindow
        position={{
          lat,
          lng,
        }}
        onCloseClick={this.props.hideInfo}
        options={{
          pixelOffset: new google.maps.Size(0, -100),
        }}
      >
        <StationInfo fetchedAt={fetchedAt} station={selectedNode.station} />
      </InfoWindow>
    );
  };

  renderMarker = (node: StationNode) => {
    if (!node.isValid) {
      // this should never happen
      // eslint-disable-next-line no-console
      console.debug(`Bad Station Found`, node.station);
      return false;
    }

    const {showInfo} = this.props;

    return (
      <StationMarker
        key={node.station.number}
        node={node}
        showInfo={showInfo}
      />
    );
  };

  renderMarkers = (clustered = true) => {
    const markers = Array.from(this.props.nodes.values()).map(
      this.renderMarker,
    );

    return clustered ? (
      <MarkerClusterer
        averageCenter
        enableRetinaIcons
        gridSize={60}
        maxZoom={17}
      >
        {markers}
      </MarkerClusterer>
    ) : (
      markers
    );
  };

  renderPosition = () => {
    const {position} = this.props;

    if (!position || !position.coords || !position.timestamp) {
      return false;
    }

    return (
      <GpsMarker coords={position.coords} timestamp={position.timestamp} />
    );
  };

  render() {
    const {
      props: {hideInfo, defaultCenter, defaultZoom},
      state: {followGps},
    } = this;

    return (
      <GoogleMap
        center={this.gpsCenter}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onClick={hideInfo}
        onDrag={this.handleDrag}
        zoom={this.gpsZoom}
      >
        <BicyclingLayer />
        <ControlSite>
          <Control onClick={this.handleGpsCenter}>
            <div
              style={{
                backgroundImage:
                  'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-1x.png)',
                backgroundPositionX: (followGps ? -9 : -5) * 18,
                backgroundRepeat: 'no-repeat',
                width: '18px',
                height: '18px',
              }}
            />
          </Control>
        </ControlSite>
        {this.renderMarkers()}
        {this.renderPosition()}
        {this.renderInfo()}
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
        return (selectedNode: StationNode) => ({selectedNode});
      },
      hideInfo() {
        return () => ({selectedNode: undefined});
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
    ({mapsApiKey, nodes, ...props}) => {
      return {
        nodes: nodes.reduce((map, node) => {
          return map.set(node.station.number, node);
        }, new Map<number, StationNode>()),
        ...props,
      };
    },
  ),
  withScriptjs,
  withGoogleMap,
)(StationMap);

import * as React from 'react';
import {
  compose,
  mapProps,
  withProps,
  withStateHandlers,
  withHandlers,
  withState,
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
import {graphql} from 'gatsby';
import {StationNode} from '~/gatsby-source-stations';
import {StationInfo, StationMarker} from './components';
import {StationMarkerActionProps} from './components/StationMarker';

import * as styles from './StationMap.module.scss';

export interface Props {
  stations: {
    totalCount: number;
    edges: [
      {
        node: StationNode;
      }
    ];
  };
}

interface MappedProps {
  stations: Map<string, StationNode>;
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
  WithScriptjsProps &
  WithGoogleMapProps;

export class StationMap extends React.PureComponent<ComposedProps> {
  renderInfo = () => {
    const {selectedStation: station} = this.props;

    return (
      (station && (
        <InfoWindow
          position={{lat: station.lat, lng: station.lng}}
          onCloseClick={this.props.hideInfo}
        >
          <StationInfo station={station} />
        </InfoWindow>
      )) ||
      false
    );
  };

  renderMarker = (station: StationNode) => {
    return (
      <StationMarker
        key={station.id}
        station={station}
        showInfo={this.props.showInfo}
        position={{lat: station.lat, lng: station.lng}}
      />
    );
  };

  renderMarkers = (clustered = true) => {
    const markers = Array.from(this.props.stations.values()).map(
      this.renderMarker
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

const key = 'AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc';

export const query = graphql`
  fragment StationMapFragment on Query {
    allStation {
      totalCount
      edges {
        node {
          id
          number
          name
          lat
          lng
          bikes
          free
          total
          operative
          style
          valid
        }
      }
    }
  }
`;

export default compose<ComposedProps, Props>(
  mapProps<MappedProps, Props>(({stations}) => {
    return {
      stations: stations.edges.reduce((map, {node}) => {
        return map.set(node.id, node);
      }, new Map<string, StationNode>()),
    };
  }),
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`,
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
    }
  ),
  withScriptjs,
  withGoogleMap
)(StationMap);

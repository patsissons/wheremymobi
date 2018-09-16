import * as React from 'react';
import {compose, withProps, withStateHandlers} from 'recompose';
import {
  BicyclingLayer,
  GoogleMap,
  withScriptjs,
  WithScriptjsProps,
  withGoogleMap,
  WithGoogleMapProps,
} from 'react-google-maps';
import {graphql} from 'gatsby';
import {StationNode} from '~/source-stations';
import {StationMarker} from './components';

import * as styles from './StationMap.module.scss';

export interface Props {
  data: {
    allStation: {
      totalCount: number;
      edges: [
        {
          node: StationNode;
        }
      ];
    };
  };
}

type ComposedProps = Props & WithScriptjsProps & WithGoogleMapProps;

export interface State {
  stations: Map<string, StationNode>;
  stationInfoId?: number;
}

export class StationMap extends React.PureComponent<ComposedProps, State> {
  state: State = {
    stations: new Map<string, StationNode>(
      this.props.data.allStation.edges.reduce(
        (map, {node}) => map.set(node.id, node),
        new Map<string, StationNode>()
      )
    ),
  };

  get allStations() {
    return Array.from(this.state.stations.values());
  }

  renderMarkers = (node: StationNode) => {
    return (
      <StationMarker key={node.id} position={{lat: node.lat, lng: node.lng}} />
    );
  };

  render() {
    const {} = this.props;

    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: 49.279627, lng: -123.121116}}
      >
        <BicyclingLayer />
        {this.allStations.map(this.renderMarkers)}
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
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${key}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div className={styles.LoadingContainer} />,
    containerElement: <div className={styles.MapContainer} />,
    mapElement: <div className={styles.Map} />,
  }),
  withScriptjs,
  withGoogleMap
)(StationMap);

import * as React from 'react';
import {compose, withProps, withStateHandlers} from 'recompose';
import {
  BicyclingLayer,
  GoogleMap,
  InfoWindow,
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

interface ActionProps {
  showInfo(id: string): void;
  hideInfo(): void;
}

type ComposedProps = Props &
  ActionProps &
  WithScriptjsProps &
  WithGoogleMapProps;

export interface State {
  stationInfoId?: string;
}

export class StationMap extends React.PureComponent<ComposedProps, State> {
  // state: State = {};

  get allStations() {
    return this.props.data.allStation.edges.map(({node}) => node);
  }

  renderInfo = () => {
    if (!this.state || !this.state.stationInfoId) {
      return false;
    }

    debugger;
    const id = this.state.stationInfoId;
    const station = this.allStations.filter((node) => node.id === id).shift();

    if (!station) {
      return false;
    }

    console.log(`Showing station ${id}`, station);

    return (
      <InfoWindow
        position={{lat: station.lat, lng: station.lng}}
        onCloseClick={this.props.hideInfo}
      >
        <div>{station.name}</div>
      </InfoWindow>
    );
  };

  renderMarkers = (station: StationNode) => {
    return (
      <StationMarker
        key={station.id}
        station={station}
        showInfo={this.props.showInfo}
        position={{lat: station.lat, lng: station.lng}}
      />
    );
  };

  render() {
    return (
      <GoogleMap
        defaultZoom={13}
        defaultCenter={{lat: 49.279627, lng: -123.121116}}
      >
        <BicyclingLayer />
        {this.renderInfo()}
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
  withStateHandlers<State, any, ComposedProps>(
    {stationInfoId: undefined},
    {
      showInfo(state, props) {
        return (stationInfoId: string) => {
          // debugger;
          return {stationInfoId};
        };
      },
      // hideInfo(state, props) {
      //   return () => ({stationInfoId: undefined});
      // },
    }
  ),
  withScriptjs,
  withGoogleMap
)(StationMap);

import * as React from 'react';
import {compose, withProps} from 'recompose';
import {
  GoogleMap,
  Marker,
  withScriptjs,
  WithScriptjsProps,
  withGoogleMap,
  WithGoogleMapProps,
} from 'react-google-maps';
import {graphql} from 'gatsby';

import * as styles from './StationMap.module.scss';

const {BicyclingLayer} = require('react-google-maps');

export interface Props {
  data: {
    allStation: {
      totalCount: number;
      edges: [
        {
          node: {
            id: string;
            number: number;
            name: string;
            lat: number;
            lng: number;
            bikes: number;
            free: number;
            total: number;
            operative: boolean;
            style: string;
            valid: boolean;
          };
        }
      ];
    };
  };
}

type ComposedProps = Props & WithScriptjsProps & WithGoogleMapProps;

export function StationMap({
  data: {
    allStation: {edges},
  },
}: ComposedProps) {
  return (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{lat: 49.279627, lng: -123.121116}}
    >
      <BicyclingLayer autoUpdate />
      {edges.map(({node}) => {
        return (
          <Marker key={node.id} position={{lat: node.lat, lng: node.lng}} />
        );
      })}
    </GoogleMap>
  );
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

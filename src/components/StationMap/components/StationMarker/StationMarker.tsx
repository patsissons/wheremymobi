import * as React from 'react';
import {Marker, MarkerProps} from 'react-google-maps';

export interface Props extends MarkerProps {}

export function StationMarker({...markerProps}: Props) {
  return <Marker {...markerProps} />;
}

export default StationMarker;

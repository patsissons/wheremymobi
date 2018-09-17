import * as React from 'react';
import {Marker, MarkerProps} from 'react-google-maps';
import {compose, withHandlers} from 'recompose';
import {StationNode} from '~/source-stations';

export interface ActionProps {
  showInfo(station: StationNode): void;
}

export interface Props extends ActionProps, MarkerProps {
  station: StationNode;
}

interface HandlerProps {
  handleOnClick(): void;
}

type ComposedProps = Props & HandlerProps;

const defaultIcon = {
  path:
    'M49.609,2.168c-22.481,0-40.701,18.21-40.701,40.694c0,17.634,11.226,32.592,26.904,38.244l5.995,7.457  l7.408,9.207l7.404-9.207l5.671-7.049c16.256-5.328,28.013-20.604,28.013-38.652C90.303,20.378,72.074,2.168,49.609,2.168z   M49.608,75.842c-18.22,0-32.97-14.77-32.97-32.98c0-18.21,14.75-32.979,32.97-32.979c18.21-0.001,32.967,14.769,32.967,32.979  C82.575,61.072,67.818,75.842,49.608,75.842z',
  fillColor: '#000000',
  fillOpacity: 1,
  strokeWeight: 0,
  scale: 0.3,
};

export function StationMarker({
  handleOnClick,
  showInfo,
  station,
  ...props
}: ComposedProps) {
  // const icon = {
  //   ...defaultIcon,
  //   fillColor:
  //     station.bikes > 10 ? '#0f0' : station.bikes > 5 ? '#777' : '#f00',
  // };

  const icon = `https://www.mobibikes.ca/sites/default/files/markers/${
    station.bikes > 10 ? 'vert' : 'route'
  }-${station.bikes}.png`;

  return (
    <Marker onClick={handleOnClick} defaultIcon={icon} label="P" {...props} />
  );
}

export default compose<ComposedProps, Props>(
  withHandlers({
    handleOnClick({showInfo, station}: Props) {
      return () => showInfo(station);
    },
  })
)(StationMarker);

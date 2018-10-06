import * as React from 'react';
import {Marker, MarkerProps} from 'react-google-maps';
import {compose, withHandlers} from 'recompose';
import {StationNode} from '~/gatsby-source-stations/Station';
import {createIcon} from './icon';

export interface SelectedStationProps {
  selectedStation?: StationNode;
}

export interface ActionProps {
  showInfo(station: StationNode): SelectedStationProps;
}

export interface Props extends ActionProps, MarkerProps {
  station: StationNode;
}

interface HandlerProps {
  handleOnClick(): void;
}

type ComposedProps = Props & HandlerProps;

export function StationMarker({
  handleOnClick,
  showInfo,
  station,
  ...props
}: ComposedProps) {
  const {lat, lng} = station;

  return (
    <Marker
      onClick={handleOnClick}
      icon={createIcon(station)}
      label={{
        text: `${station.bikes} | ${station.free}`,
        fontSize: '0.75rem',
        fontWeight: 'bold',
      }}
      position={new google.maps.LatLng(lat, lng)}
      {...props}
    />
  );
}

export default compose<ComposedProps, Props>(
  withHandlers({
    handleOnClick({showInfo, station}: Props) {
      return () => showInfo(station);
    },
  }),
)(StationMarker);

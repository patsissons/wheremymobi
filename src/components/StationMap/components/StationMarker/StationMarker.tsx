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

export function StationMarker({
  handleOnClick,
  showInfo,
  station,
  ...props
}: ComposedProps) {
  return <Marker onClick={handleOnClick} {...props} />;
}

export default compose<ComposedProps, Props>(
  withHandlers({
    handleOnClick({showInfo, station}: Props) {
      return () => showInfo(station);
    },
  })
)(StationMarker);

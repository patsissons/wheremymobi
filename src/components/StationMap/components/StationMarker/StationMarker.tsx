import * as React from 'react';
import {Marker, MarkerProps} from 'react-google-maps';
import {compose, withHandlers} from 'recompose';
import {StationNode} from '~/gatsby-source-stations/Station';
import Icon from './icon';

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

// const defaultIcon = {
//   // path:
//   //   'M49.609,2.168c-22.481,0-40.701,18.21-40.701,40.694c0,17.634,11.226,32.592,26.904,38.244l5.995,7.457  l7.408,9.207l7.404-9.207l5.671-7.049c16.256-5.328,28.013-20.604,28.013-38.652C90.303,20.378,72.074,2.168,49.609,2.168z   M49.608,75.842c-18.22,0-32.97-14.77-32.97-32.98c0-18.21,14.75-32.979,32.97-32.979c18.21-0.001,32.967,14.769,32.967,32.979  C82.575,61.072,67.818,75.842,49.608,75.842z',
//   // url: `data:image/svg+xml;utf-8,<svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" fill="#000">
//   //   <g>
//   //    <path id="bg" d="m49.609,2.168c-22.481,0 -40.701,18.21 -40.701,40.694c0,17.634 11.226,32.592 26.904,38.244l5.995,7.457l7.408,9.207l7.404,-9.207l5.671,-7.049c16.256,-5.328 28.013,-20.604 28.013,-38.652c0,-22.484 -18.229,-40.694 -40.694,-40.694z" fill="#fff"/>
//   //    <path id="fill" d="m49.609,2.168c-22.481,0 -40.701,18.21 -40.701,40.694c0,17.634 11.226,32.592 26.904,38.244l5.995,7.457l7.408,9.207l7.404,-9.207l5.671,-7.049c16.256,-5.328 28.013,-20.604 28.013,-38.652c0,-22.484 -18.229,-40.694 -40.694,-40.694zm-0.001,73.674c-18.22,0 -32.97,-14.77 -32.97,-32.98c0,-18.21 14.75,-32.979 32.97,-32.979c18.21,-0.001 32.967,14.769 32.967,32.979c0,18.21 -14.757,32.98 -32.967,32.98z"/>
//   //   </g>
//   //  </svg>`,
//   fillColor: '#000000',
//   fillOpacity: 1,
//   strokeWeight: 0,
//   scale: 1,
// };

export function StationMarker({
  handleOnClick,
  showInfo,
  station,
  ...props
}: ComposedProps) {
  const fillColor =
    station.bikes > 10
      ? 'forestgreen'
      : station.bikes > 5
        ? 'coral'
        : 'crimson';

  return (
    <Marker
      onClick={handleOnClick}
      icon={{
        url: Icon({fillColor}),
        labelOrigin: {x: 49, y: 33},
      }}
      label={{
        text: `${station.bikes} | ${station.free}`,
        fontSize: '0.75rem',
        fontWeight: 'bold',
      }}
      // labelContent={`${station.bikes} / ${station.free}`}
      // labelAnchor={{x: 0, y: 0}}
      // labelStyle={{fontSize: '20rem'} as any}
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

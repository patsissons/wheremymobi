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
  const icon = `data:image/svg+xml;utf-8,<svg width="100px" height="100px" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve" fill="${fillColor}">
  <path id="bg" fill="#ffffff" d="m77.438,31.70225c-0.139,-5.802 -1.797,-10.248 -4.202,-14.012c-2.307,-3.607 -5.341,-6.666 -9.258,-8.958c-4.793,-2.803 -11.556,-4.639 -18.766,-3.553c-8.819,1.33 -15.391,6.39 -19.316,12.561c-2.385,3.752 -4.039,8.341 -4.152,14.062c-0.117,5.854 1.706,10.369 3.954,14.261c1.122,1.948 2.132,3.929 3.302,5.805c3.504,5.621 7.291,10.97 10.559,16.765c4.406,7.812 8.044,16.242 10.108,26.371c2.984,-15.367 9.802,-26.583 17.063,-37.58c2.439,-3.692 4.867,-7.382 6.806,-11.41c0.993,-2.063 2.107,-3.996 2.803,-6.306c0.684,-2.283 1.172,-5.035 1.099,-8.006z"/>
  <path id="fill" d="M77.438,31.834c-0.139-5.802-1.797-10.248-4.202-14.012c-2.307-3.607-5.341-6.666-9.258-8.958   c-4.793-2.803-11.556-4.639-18.766-3.553c-8.819,1.33-15.391,6.39-19.316,12.561c-2.385,3.752-4.039,8.341-4.152,14.062   c-0.117,5.854,1.706,10.369,3.954,14.261C26.82,48.143,27.83,50.124,29,52c3.504,5.621,7.291,10.97,10.559,16.765   c4.406,7.812,8.044,16.242,10.108,26.371c2.984-15.367,9.802-26.583,17.063-37.58c2.439-3.692,4.867-7.382,6.806-11.41   c0.993-2.063,2.107-3.996,2.803-6.306C77.023,37.557,77.511,34.805,77.438,31.834z M49.685,52.47   c-11.004,0-19.923-8.92-19.923-19.923c0-11.002,8.919-19.922,19.923-19.922c11.003,0,19.923,8.92,19.923,19.922   C69.607,43.55,60.688,52.47,49.685,52.47z"/>
</svg>`;

  return (
    <Marker
      onClick={handleOnClick}
      // defaultIcon={icon}
      icon={{
        url: icon,
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
  })
)(StationMarker);

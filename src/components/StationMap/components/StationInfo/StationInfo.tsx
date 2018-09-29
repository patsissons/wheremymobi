import * as React from 'react';
import moment from 'moment';
import {StationNode} from '~/gatsby-source-stations/Station';

export interface Props {
  fetchedAt: moment.Moment;
  station: StationNode;
}

export function StationInfo({fetchedAt, station}: Props) {
  return (
    <div>
      <ul>
        <li>{`[${station.number.toString().padStart(4, '0')}] ${station.name}${
          station.operative ? '' : ' (CLOSED)'
        }`}</li>
        <li>{`${station.bikes} bikes / ${station.free} slots (${
          station.total
        } total)`}</li>
        <li>
          <a
            target="_blank"
            href={`https://www.google.com/maps/@${station.lat},${
              station.lng
            },15z`}
          >{`${station.lat}, ${station.lng}`}</a>
        </li>
        <li>{`Last Updated: ${fetchedAt.fromNow()}`}</li>
      </ul>
    </div>
  );
}

export default StationInfo;

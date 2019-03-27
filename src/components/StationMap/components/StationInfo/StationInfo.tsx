import * as React from 'react';

import moment from 'moment';
import {Station} from '~/station';

export interface Props {
  fetchedAt: moment.Moment;
  station: Station;
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
            href={`https://www.google.com/maps/dir/?api=${1}&travelmode=bicycling&destination=${
              station.lat
            },${station.lng}`}
          >{`${station.lat}, ${station.lng}`}</a>
        </li>
        <li>{`Last Updated: ${fetchedAt.fromNow()}`}</li>
      </ul>
    </div>
  );
}

export default StationInfo;

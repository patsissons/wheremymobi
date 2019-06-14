import React from 'react';
import moment from 'moment';
import {ValidStation} from 'models';

interface Props {
  fetchedAt: moment.Moment;
  station: ValidStation;
}

export function StationInfo({fetchedAt, station}: Props) {
  return (
    <ul>
      <li>{`[${station.number.toString().padStart(4, '0')}] ${station.name}${
        station.operative ? '' : ' (CLOSED)'
      }`}</li>
      <li>{`${station.bikes} bikes / ${station.free} slots (${
        station.total
      } total)`}</li>
      <li>
        <a
          rel="noopener noreferrer"
          target="_blank"
          href={`https://www.google.com/maps/dir/?api=${1}&travelmode=bicycling&destination=${
            station.lat
          },${station.lng}`}
        >{`${station.lat}, ${station.lng}`}</a>
      </li>
      <li>{`Last Updated: ${fetchedAt.fromNow()}`}</li>
    </ul>
  );
}

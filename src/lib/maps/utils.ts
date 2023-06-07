import type { Station } from '$lib/client';
import { VehicleType } from '$lib/client/constants';
import type { MapContext } from './types';

export async function createMap(container: HTMLElement): Promise<MapContext> {
  const { Map } = (await google.maps.importLibrary(
    'maps',
  )) as google.maps.MapsLibrary;
  const map = new Map(container, {
    center: {
      lat: 49.279627,
      lng: -123.121116,
    },
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
  });

  const bikeLayer = new google.maps.BicyclingLayer();
  bikeLayer.setMap(map);

  const infoWindow = new google.maps.InfoWindow();

  return {
    container,
    map,
    markers: [],
    infoWindow,
  };
}

export function clearMarkers(context: MapContext) {
  context.markers.forEach((marker) => marker.setMap(null));
  context.markers = [];
}

export function loadMarkers(context: MapContext, stations: Station[]) {
  clearMarkers(context);

  stations
    .filter(({ valid }) => valid)
    .forEach((station) => {
      const hasElectric = station.vehicle_types_available.some(
        ({ count, vehicle_type_id }) =>
          Number(vehicle_type_id) === VehicleType.ELECTRIC && count > 0,
      );
      const marker = new google.maps.Marker({
        map: context.map,
        position: {
          lat: station.lat,
          lng: station.lon,
        },
        icon: {
          path: 'M2.5,11.3C1,10.1,0.1,8.4,0.1,6.5c0-1.8,0.8-3.2,2.4-4.5C4,0.8,6,0.1,8,0.1s4,0.7,5.5,1.9 c1.6,1.4,2.4,2.9,2.4,4.5c0,1.8-0.9,3.6-2.4,4.8L8,15.8L2.5,11.3z',
          fillColor: stationColor(),
          fillOpacity: 0.9,
          strokeWeight: hasElectric ? 3 : 0,
          strokeColor: '#0f172a',
          strokeOpacity: 0.7,
          scale: 2.5,
          anchor: new google.maps.Point(7, 16),
          labelOrigin: new google.maps.Point(8, 7),
        },
        label: {
          text: `${station.num_bikes_available}|${station.capacity}`,
          color: '#f8fafc',
          fontFamily: 'monospace',
          fontSize: '1em',
          className: 'station',
        },
        title: station.name,
        animation: google.maps.Animation.DROP,
      });

      marker.addListener('click', () => {
        context.infoWindow.setContent(
          `<pre class="text-black font-mono whitespace-pre-wrap">${JSON.stringify(
            station,
            null,
            2,
          )}</pre>`,
        );
        context.infoWindow.open(context.map, marker);
      });

      context.markers.push(marker);

      function stationColor() {
        const fraction = station.num_bikes_available / station.capacity;

        if (fraction > 0.5) return '#10b981';
        if (fraction > 0.25) return '#f97316';
        if (fraction > 0) return '#ef4444';
        return '#000000';
      }
    });
}

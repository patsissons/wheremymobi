import * as gmaps from '@googlemaps/js-api-loader';
import type { Station } from '$lib/client';
import { VehicleType } from '$lib/client/constants';
import type { MapContext } from './types';
import { GOOGLE_MAPS_API_KEY } from '$lib/utils/env';
import { writable } from 'svelte/store';
import { infoWindowId } from './constants';

const { Loader } = gmaps;

export async function createMap(container: HTMLElement): Promise<MapContext> {
  const loader = new Loader({
    apiKey: GOOGLE_MAPS_API_KEY,
    version: 'weekly',
  });

  const { Map } = await loader.importLibrary('maps');

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

  const infoWindow = new google.maps.InfoWindow({
    content: `<div id="${infoWindowId}" />`,
  });

  const selectedStation = writable<Station | null>(null);

  infoWindow.addListener('closeclick', () => {
    selectedStation.set(null);
  });

  return {
    container,
    map,
    markers: [],
    infoWindow,
    selectedStation,
  };
}

export function clearMarkers(context: MapContext) {
  context.markers.forEach((marker) => marker.setMap(null));
  context.markers = [];
}

export function updateMarkerForMotion(
  marker: google.maps.Marker,
  inMotion = false,
) {
  if (inMotion) {
    marker.setIcon(null);
    marker.setLabel(null);
    return;
  }

  const station = marker.get('station') as Station;
  if (!station) return;

  const availableBikes = station.bikes.filter(
    ({ is_disabled }) => !is_disabled,
  );
  const hasElectric = availableBikes.some(
    ({ vehicle_type_id }) => Number(vehicle_type_id) === VehicleType.ELECTRIC,
  );

  marker.setIcon({
    path: 'M2.5,11.3C1,10.1,0.1,8.4,0.1,6.5c0-1.8,0.8-3.2,2.4-4.5C4,0.8,6,0.1,8,0.1s4,0.7,5.5,1.9 c1.6,1.4,2.4,2.9,2.4,4.5c0,1.8-0.9,3.6-2.4,4.8L8,15.8L2.5,11.3z',
    fillColor: stationColor(),
    fillOpacity: 0.9,
    strokeWeight: hasElectric ? 3 : 0,
    strokeColor: '#0f172a',
    strokeOpacity: 0.7,
    scale: 2.5,
    anchor: new google.maps.Point(7, 16),
    labelOrigin: new google.maps.Point(8, 7),
  });

  marker.setLabel({
    text: `${availableBikes.length}${station.is_charging_station ? '⍭' : '|'}${
      station.num_docks_available
    }`,
    color: '#f8fafc',
    fontFamily: 'monospace',
    fontSize: '1em',
    className: 'station',
  });

  function stationColor() {
    const fraction = availableBikes.length / station.capacity;

    if (fraction > 0.5) return '#10b981';
    if (fraction > 0.25) return '#f97316';
    if (fraction > 0) return '#ef4444';
    return '#000000';
  }
}

export function loadMarkers(context: MapContext, stations: Station[]) {
  clearMarkers(context);

  const undocumentedFeatures = {
    optimized: true,
  } as unknown as google.maps.MarkerOptions;

  stations
    .filter(({ valid }) => valid)
    .forEach((station) => {
      const marker = new google.maps.Marker({
        map: context.map,
        position: {
          lat: station.lat,
          lng: station.lon,
        },
        title: station.name,
        animation: google.maps.Animation.DROP,
        ...undocumentedFeatures,
      });

      marker.set('station', station);

      updateMarkerForMotion(marker);

      marker.addListener('click', () => {
        context.infoWindow.open(context.map, marker);
        context.selectedStation.set(station);
      });

      context.markers.push(marker);
    });
}

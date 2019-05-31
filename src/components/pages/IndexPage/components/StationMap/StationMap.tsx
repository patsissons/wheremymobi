import React, {useCallback, useContext, useEffect, useState} from 'react';
import moment from 'moment';
import {
  BicyclingLayer,
  GoogleMapContext,
  InfoWindow,
  MapBox,
} from '@googlemap-react/core';
import {Loader} from '~/components';
import {Station, ValidStation} from '~/models';
import {
  CustomButton,
  CustomControl,
  GpsCenterButton,
  GpsMarker,
  StationInfo,
  StationMarker,
} from './components';
import {useMarkerClusterer} from './hooks';

import AutoRenewImage from './images/autorenew-1x.png';
import BikeImage from './images/bike-1x.png';
import * as styles from './StationMap.module.scss';

const defaultZoom = 13;

export interface Props {
  fetchedAt: moment.Moment;
  location: google.maps.LatLngLiteral;
  stations: Station[];
  position: Position | undefined;
  updateStations(): void;
}

export function StationMap({
  fetchedAt,
  location,
  stations,
  updateStations,
  position,
}: Props) {
  const {state: {map = undefined} = {}} = useContext(GoogleMapContext);
  const [followGps, setFollowGps] = useState(true);
  const [validStations, setValidStations] = useState<ValidStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<ValidStation>();
  const MarkerClusterer = useMarkerClusterer();
  const selectedNearestStation = useCallback(() => {
    const station = nearestStation(position, validStations);

    if (station) {
      if (station === selectedStation) {
        if (map) {
          map.panTo(station);
        }
      } else {
        setFollowGps(false);
        setSelectedStation(station);
      }
    }
  }, [map, position, selectedStation, validStations]);
  const centerGps = useCallback(() => {
    if (map) {
      const center = gpsCenter(position);
      const zoom = gpsZoom(position);

      if (center) {
        map.setCenter(center);
      }

      if (zoom) {
        map.setZoom(zoom);
      }
    }
  }, [map, position]);
  const showInfo = useCallback(
    (id: number) => {
      setSelectedStation(
        validStations.filter((station) => station.number === id).shift(),
      );
    },
    [validStations],
  );
  const hideInfo = useCallback(() => {
    setSelectedStation(undefined);
  }, []);
  const renderInfoWindow = useCallback(() => {
    if (!map || !selectedStation) {
      return null;
    }

    const {lat, lng} = selectedStation;

    return (
      <InfoWindow
        onCloseClick={hideInfo}
        opts={{
          position: {lat, lng},
          pixelOffset: new google.maps.Size(0, -100),
        }}
        visible
      >
        <StationInfo fetchedAt={fetchedAt} station={selectedStation} />
      </InfoWindow>
    );
  }, [fetchedAt, hideInfo, map, selectedStation]);
  const renderGpsMarker = useCallback(() => {
    if (!map || !position || !position.coords || !position.timestamp) {
      return null;
    }

    return (
      <GpsMarker coords={position.coords} timestamp={position.timestamp} />
    );
  }, [map, position]);
  const handleDrag = useCallback(() => {
    setFollowGps(false);
  }, []);
  const handleGpsCenter = useCallback(() => {
    if (followGps) {
      centerGps();
    } else {
      setFollowGps(true);
    }
  }, [centerGps, followGps]);
  useEffect(() => {
    const updatedStations: ValidStation[] = [];

    stations.forEach((station) => {
      if (!station.valid) {
        // this should never happen
        // eslint-disable-next-line no-console
        console.debug(`Bad Station Found`, station);
      }

      updatedStations.push(station as ValidStation);
    });

    if (!stationCollectionComparer(validStations, updatedStations)) {
      setValidStations(updatedStations);
    }
  }, [stations, validStations]);
  useEffect(() => {
    if (followGps) {
      centerGps();
    }
  }, [followGps, position, centerGps]);

  return (
    <div className={styles.MapContainer}>
      <MapBox
        apiKey="AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc"
        opts={{
          center: location,
          zoom: defaultZoom,
        }}
        onClick={hideInfo}
        onDrag={handleDrag}
        LoadingComponent={<Loader />}
        useDrawing
        useGeometry
        usePlaces
        useVisualization
      />
      <BicyclingLayer />
      <CustomControl bindingPosition="TOP_CENTER">
        <CustomButton onClick={selectedNearestStation}>
          <img alt="Nearest stations" src={BikeImage} />
        </CustomButton>
      </CustomControl>
      <CustomControl bindingPosition="TOP_CENTER">
        <CustomButton onClick={updateStations}>
          <img alt="Update stations" src={AutoRenewImage} />
        </CustomButton>
      </CustomControl>
      <CustomControl bindingPosition="BOTTOM_CENTER">
        <GpsCenterButton
          followGps={followGps}
          position={position}
          onClick={handleGpsCenter}
        />
      </CustomControl>
      {map && validStations.length > 0 && (
        <MarkerClusterer>
          {validStations.map(({bikes, free, lat, lng, number}) => {
            return (
              <StationMarker
                key={number}
                bikes={bikes}
                free={free}
                id={number}
                lat={lat}
                lng={lng}
                showInfo={showInfo}
              />
            );
          })}
        </MarkerClusterer>
      )}
      {renderGpsMarker()}
      {renderInfoWindow()}
    </div>
  );
}

export function nearestStation(
  position: Position | undefined,
  stations: ValidStation[],
) {
  if (!position || stations.length === 0) {
    return undefined;
  }

  const source = new google.maps.LatLng(
    position.coords.latitude,
    position.coords.longitude,
  );

  return stations
    .map((station) => ({
      station,
      distance: google.maps.geometry.spherical.computeDistanceBetween(
        source,
        new google.maps.LatLng(station.lat, station.lng),
      ),
    }))
    .sort((left, right) => left.distance - right.distance)[0].station;
}

function stationCollectionComparer(prev: Station[], next: Station[]) {
  if (prev.length !== next.length) {
    return false;
  }

  const prevSorted = prev.sort(
    ({number: aId = 0}, {number: bId = 0}) => aId - bId,
  );
  const nextSorted = next.sort(
    ({number: aId = 0}, {number: bId = 0}) => aId - bId,
  );

  return prevSorted.every((prev, i) => stationComparer(prev, nextSorted[i]));
}

function stationComparer(prev: Station, next: Station) {
  return (
    prev.number === next.number &&
    prev.valid === next.valid &&
    JSON.stringify(prev.data) === JSON.stringify(next.data)
  );
}

function gpsCenter(position: Position | undefined) {
  if (position) {
    const {
      coords: {latitude, longitude},
    } = position;

    return new google.maps.LatLng(latitude, longitude);
  }

  return undefined;
}

function gpsZoom(position: Position | undefined) {
  if (position) {
    const {
      coords: {accuracy},
    } = position;

    // magic number explained here: https://gis.stackexchange.com/a/111589
    return Math.min(20, Math.max(1, Math.log2(591657550 / accuracy) - 6));
  }

  return undefined;
}

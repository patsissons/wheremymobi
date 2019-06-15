import React, {useContext, useEffect, useState, useCallback} from 'react';
import {
  BicyclingLayer,
  GoogleMapContext,
  InfoWindow,
  MapBox,
} from '@googlemap-react/core';
import moment from 'moment';
import {Loader} from 'components';
import {Station, ValidStation} from 'models';
import {googleMapsAsync} from 'utilities/google';
import {
  CustomButton,
  CustomControl,
  GpsMarker,
  StationInfo,
  StationMarker,
} from './components';
import {useMarkerClusterer} from './hooks';
import {BikeImage, GpsImage, RefreshImage, SlotImage} from './images';

import styles from './StationMap.module.scss';

const defaultZoom = 13;
const maxZoom = 17;

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
  const [centered, setCentered] = useState(false);
  const [validStations, setValidStations] = useState<ValidStation[]>([]);
  const [selectedStation, setSelectedStation] = useState<ValidStation>();
  const [preferBikes, setPreferBikes] = useState(true);
  const MarkerClusterer = useMarkerClusterer();
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

      if (!centered) {
        setCentered(true);
      }
    }
  }, [centered, map, position]);
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
  }, [followGps, centerGps]);

  function selectedNearestStation() {
    if (map) {
      const station = nearestStation(position, validStations, preferBikes);

      if (station) {
        if (station === selectedStation) {
          map.panTo(station);
          map.setZoom(maxZoom);
        } else {
          if (followGps) {
            setFollowGps(false);
          }
          setSelectedStation(station);
        }
      }
    }
  }

  function showInfo(id: number) {
    setSelectedStation(
      validStations.filter((station) => station.number === id).shift(),
    );
  }

  function hideInfo() {
    setSelectedStation(undefined);
  }

  function renderInfoWindow() {
    if (!map || !selectedStation) {
      return null;
    }

    const {number} = selectedStation;

    return (
      <InfoWindow
        anchorId={`station-${number}`}
        onCloseClick={hideInfo}
        visible
      >
        <StationInfo fetchedAt={fetchedAt} station={selectedStation} />
      </InfoWindow>
    );
  }

  function renderGpsMarker() {
    if (!map || !position || !position.coords || !position.timestamp) {
      return null;
    }

    return (
      <GpsMarker coords={position.coords} timestamp={position.timestamp} />
    );
  }

  function handleDragStart() {
    if (followGps) {
      setFollowGps(false);
    }

    if (centered) {
      setCentered(false);
    }
  }

  function handleGpsCenter() {
    if (followGps) {
      if (centered) {
        if (followGps) {
          setFollowGps(false);
        }

        if (centered) {
          setCentered(false);
        }
      } else {
        centerGps();
      }
    } else if (!followGps) {
      setFollowGps(true);
    }
  }

  function handleTogglePreference() {
    setPreferBikes((value) => !value);
  }

  return (
    <div className={styles.MapContainer}>
      <MapBox
        apiKey="AIzaSyBXrYScIU6sWYUWLLlovYhzq-bLzwTgAoc"
        opts={{
          center: location,
          zoom: defaultZoom,
          maxZoom,
        }}
        onClick={hideInfo}
        onDragStart={handleDragStart}
        LoadingComponent={<Loader />}
        useDrawing
        useGeometry
        usePlaces
        useVisualization
      />
      <BicyclingLayer />
      <CustomControl bindingPosition="BOTTOM_CENTER">
        <CustomButton onClick={updateStations}>
          <RefreshImage className={styles.ButtonImage} />
        </CustomButton>
      </CustomControl>
      <CustomControl bindingPosition="BOTTOM_CENTER">
        <CustomButton
          disabled={!isValidPosition(position)}
          onClick={handleGpsCenter}
        >
          <GpsImage
            className={styles.ButtonImage}
            style={{
              fill: followGps ? '#008ABF' : '#000',
              fillOpacity: isValidPosition(position) ? 1 : 0.25,
            }}
            focusable="false"
            aria-hidden="true"
          />
        </CustomButton>
      </CustomControl>
      <CustomControl bindingPosition="BOTTOM_CENTER">
        <CustomButton onClick={selectedNearestStation}>
          {preferBikes ? (
            <BikeImage className={styles.ButtonImage} />
          ) : (
            <SlotImage
              className={styles.ButtonImage}
              style={{fill: '#008ABF'}}
            />
          )}
        </CustomButton>
      </CustomControl>
      <CustomControl bindingPosition="RIGHT_TOP">
        <CustomButton onClick={handleTogglePreference}>
          {preferBikes ? (
            <BikeImage className={styles.ButtonImage} />
          ) : (
            <SlotImage
              className={styles.ButtonImage}
              style={{fill: '#008ABF'}}
            />
          )}
        </CustomButton>
      </CustomControl>
      {map && validStations.length > 0 && (
        <MarkerClusterer>
          {validStations.map(({bikes, free, lat, lng, number, total}) => {
            return (
              <StationMarker
                key={number}
                bikes={bikes}
                free={free}
                id={number}
                lat={lat}
                lng={lng}
                preferBikes={preferBikes}
                showInfo={showInfo}
                total={total}
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
  preferNearestBike: boolean | undefined,
) {
  if (!position || stations.length === 0) {
    return undefined;
  }

  const google = googleMapsAsync(false);

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
    .filter(
      ({station: {bikes, errors, free, operative}}) =>
        preferNearestBike == null ||
        ((!errors || !errors.length) &&
          operative &&
          (preferNearestBike ? bikes > 0 : free > 0)),
    )
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

    const google = googleMapsAsync();

    return new google.maps.LatLng(latitude, longitude);
  }

  return undefined;
}

function gpsZoom(position: Position | undefined, max = maxZoom) {
  if (position) {
    const {
      coords: {accuracy},
    } = position;

    // magic number explained here: https://gis.stackexchange.com/a/111589
    return Math.min(max, Math.max(1, Math.log2(591657550 / accuracy) - 6));
  }

  return undefined;
}

function isValidPosition(position: Position | undefined) {
  return (
    position &&
    position.coords.latitude !== 0 &&
    position.coords.longitude !== 0
  );
}

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
import {gmapKey} from 'utilities/env';
import {googleMapsAsync} from 'utilities/google';

import {
  CustomButton,
  CustomControl,
  GpsMarker,
  StationInfo,
  StationMarker,
} from './components';
import {useMarkerClusterer} from './hooks';
import {
  BikeImage,
  CircleMinus,
  CirclePlus,
  GpsImage,
  RefreshImage,
  SlotImage,
} from './images';
import styles from './StationMap.module.scss';

const defaultZoom = 13;
const maxZoom = 17;

export interface Props {
  fetchedAt: moment.Moment;
  location: google.maps.LatLngLiteral;
  stations: Station[];
  position: GeolocationPosition | undefined;
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
  const [showLabels, setShowLabels] = useState(false);
  const MarkerClusterer = useMarkerClusterer();
  const centerGps = useCallback(() => {
    if (map) {
      const center = isValidPosition(position) && latLngFromPosition(position);
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
        return;
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
      const station = nearestStation(
        (followGps &&
          isValidPosition(position) &&
          latLngFromPosition(position)) ||
          map.getCenter(),
        validStations,
        preferBikes,
      );

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

  return (
    <div className={styles.MapContainer}>
      <MapBox
        apiKey={gmapKey()}
        opts={{
          center: location,
          zoom: defaultZoom,
          maxZoom,
        }}
        onClick={() => setSelectedStation(undefined)}
        onDragStart={handleDragStart}
        LoadingComponent={<Loader />}
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
          {renderBikeSlotImage()}
        </CustomButton>
      </CustomControl>
      <CustomControl bindingPosition="RIGHT_TOP">
        <CustomButton onClick={() => setPreferBikes((value) => !value)}>
          {renderBikeSlotImage()}
        </CustomButton>
      </CustomControl>
      <CustomControl bindingPosition="RIGHT_TOP">
        <CustomButton onClick={() => setShowLabels((value) => !value)}>
          {renderCircleImage()}
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
                lat={lat}
                lng={lng}
                number={number}
                onClick={() =>
                  setSelectedStation(
                    validStations
                      .filter((station) => station.number === number)
                      .shift(),
                  )
                }
                preferBikes={preferBikes}
                showLabel={showLabels}
                total={total}
              />
            );
          })}
        </MarkerClusterer>
      )}
      {map && position && position.coords && position.timestamp && (
        <GpsMarker coords={position.coords} timestamp={position.timestamp} />
      )}
      {map && selectedStation && (
        <InfoWindow
          anchorId={`station-${selectedStation.number}`}
          onCloseClick={() => setSelectedStation(undefined)}
          visible
        >
          <StationInfo fetchedAt={fetchedAt} station={selectedStation} />
        </InfoWindow>
      )}
    </div>
  );

  function renderBikeSlotImage() {
    if (preferBikes) {
      return <BikeImage className={styles.ButtonImage} />;
    }

    return (
      <SlotImage className={styles.ButtonImage} style={{fill: '#008ABF'}} />
    );
  }

  function renderCircleImage() {
    if (showLabels) {
      return <CircleMinus className={styles.ButtonImage} />;
    }

    return <CirclePlus className={styles.ButtonImage} />;
  }
}

export function nearestStation(
  source: google.maps.LatLng,
  stations: ValidStation[],
  preferNearestBike: boolean | undefined,
) {
  const google = googleMapsAsync();

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

function latLngFromPosition({
  coords: {latitude, longitude},
}: GeolocationPosition) {
  const google = googleMapsAsync();

  return new google.maps.LatLng(latitude, longitude);
}

function gpsZoom(position: GeolocationPosition | undefined, max = maxZoom) {
  if (position) {
    const {
      coords: {accuracy},
    } = position;

    // magic number explained here: https://gis.stackexchange.com/a/111589
    return Math.min(max, Math.max(1, Math.log2(591657550 / accuracy) - 6));
  }

  return undefined;
}

function isValidPosition(
  position: GeolocationPosition | undefined,
): position is GeolocationPosition {
  return Boolean(
    position &&
      position.coords.latitude !== 0 &&
      position.coords.longitude !== 0,
  );
}

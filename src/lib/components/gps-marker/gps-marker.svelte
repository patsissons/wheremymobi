<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import dayjs from 'dayjs';
  import type { MapContext } from '$lib/maps';

  export let mapContext: MapContext;
  export let color = 'magenta';

  let position: GeolocationPosition | undefined;
  let rotation = 0;
  let watchId: number | undefined;
  let timeout: NodeJS.Timeout | undefined;

  const maxZoom = 17;

  const circle = new google.maps.Circle({
    radius: 0,
    fillColor: color,
    strokeColor: color,
    fillOpacity: 0.25,
    strokeWeight: 1,
  });
  const marker = new google.maps.Marker({
    zIndex: google.maps.Marker.MAX_ZINDEX,
  });

  onMount(() => {
    if (!navigator.geolocation.watchPosition) return;

    marker.addListener('click', () => {
      if (!position) return;

      zoomToPosition(position);
    });

    watchId = navigator.geolocation.watchPosition(setPosition, setError, {
      enableHighAccuracy: true,
    });

    timeout = setInterval(updateTimestamp, 1000);

    function setPosition(value: GeolocationPosition) {
      const { coords } = value;
      if (coords.latitude === 0 || coords.longitude === 0) return;

      if (!position) {
        zoomToPosition(value);
      }

      position = value;
      updateMarker();
    }

    function setError(error: GeolocationPositionError) {
      console.error(error);
    }
  });

  onDestroy(() => {
    if (timeout) clearInterval(timeout);
    if (!watchId) return;
    if (!navigator.geolocation.clearWatch) return;

    navigator.geolocation.clearWatch(watchId);
  });

  function updateMarker() {
    if (!position) {
      circle.setMap(null);
      marker.setMap(null);
      return;
    }

    const location: google.maps.LatLngLiteral = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    rotation = position.coords.heading ?? rotation;

    circle.setCenter(location);
    circle.setRadius(position.coords.accuracy || 255);
    marker.setPosition(location);
    marker.setIcon({
      anchor: new google.maps.Point(0, 2.6),
      path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
      strokeColor: color,
      fillColor: color,
      fillOpacity: 1,
      rotation,
      scale: 10,
      strokeWeight: 1,
      labelOrigin: new google.maps.Point(0, 2.6),
    });
    marker.setTitle(
      `${dayjs(position.timestamp).toISOString()} / ${
        position.coords.accuracy
      }m / ${rotation.toFixed()}deg`,
    );

    circle.setMap(mapContext.map);
    marker.setMap(mapContext.map);
  }

  function updateTimestamp() {
    if (!position) return;

    marker.setLabel({
      text: `${dayjs().diff(dayjs(position.timestamp), 'seconds')}`,
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '1em',
      className: 'gps-marker',
    });
  }

  function zoomToPosition(position: GeolocationPosition) {
    if (!position) return;

    mapContext.map.setCenter({
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    });
    mapContext.map.setZoom(gpsZoomForAccuracy(position.coords.accuracy));
  }

  function gpsZoomForAccuracy(accuracy: number, max = maxZoom) {
    // magic number explained here: https://gis.stackexchange.com/a/111589
    return Math.min(max, Math.max(1, Math.log2(591657550 / accuracy) - 6));
  }
</script>

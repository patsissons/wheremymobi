import type { Station } from '$lib/client';
import type { Writable } from 'svelte/store';

export interface MapContext {
  container: HTMLElement;
  map: google.maps.Map;
  markers: google.maps.Marker[];
  infoWindow: google.maps.InfoWindow;
  selectedStation: Writable<Station | null>;
}

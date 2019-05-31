/* global google */

declare global {
  interface Window {
    google: typeof google;
  }
}

const mockGoogle: any = {
  maps: {},
};

export type google = typeof google;

export function googleMapsAsync(allowMock = true): typeof google {
  if (window.google) {
    return window.google;
  }

  if (allowMock) {
    return mockGoogle;
  }

  throw new Error('google.maps API has not yet loaded');
}

export function useGoogleNamespace(): [typeof google, () => typeof google] {
  return [googleMapsAsync(), googleMapsAsync];
}

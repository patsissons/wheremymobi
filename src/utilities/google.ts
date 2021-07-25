/* global google */

declare global {
  interface Window {
    google: typeof google;
  }
}

const mockGoogle: any = {
  maps: {},
};

// eslint-disable-next-line @typescript-eslint/naming-convention
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

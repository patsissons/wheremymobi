declare module '*.png' {
  const content: any;
  export = content;
}

declare module '*.scss' {
  const content: any;
  export = content;
}

// see: http://htmlpreview.github.io/?https://github.com/googlemaps/v3-utility-library/blob/master/markerclustererplus/docs/reference.html
declare module '@google/markerclustererplus' {
  export interface Styles {
    url?: string;
    height?: number;
    width?: number;
    anchor?: any[];
    textColor?: string;
    textSize?: number;
    backgroundPosition?: string;
    iconAnchor?: any[];
  }

  export interface Options {
    averageCenter?: boolean;
    batchSize?: number;
    batchSizeIE?: number;
    clusterClass?: string;
    enableRetinaIcons?: boolean;
    gridSize?: number;
    ignoreHidden?: boolean;
    imageExtension?: string;
    imagePath?: string;
    imageSizes?: number[];
    maxZoom?: number;
    minimumClusterSize?: boolean;
    styles?: Styles;
    title?: string;
    zoomOnClick?: boolean;
  }

  export default class MarkerClustererPlus {
    constructor(
      map: google.maps.Map,
      markers?: google.maps.Marker[],
      opts?: Options,
    );

    addMarker(marker: google.maps.Marker, noRedraw?: boolean): void;
    addMarkers(markers: google.maps.Marker[], noRedraw?: boolean): void;
    clearMarkers(): void;
    redraw(): void;
    removeMarker(marker: google.maps.Marker): boolean;
    resetViewport(): void;
  }
}

export {};

declare global {
  type MapInstance = { destroy?: () => void };

  type PanoramaPov = { pan: number; tilt: number; fov: number };

  type PanoramaProjection = {
    fromCoordToPov: (coord: unknown) => PanoramaPov | null;
  };

  type PanoramaInstance = {
    destroy?: () => void;
    setPov?: (pov: PanoramaPov) => void;
    getProjection?: () => PanoramaProjection;
  };

  type MarkerInstance = {
    setMap: (m: MapInstance | PanoramaInstance | null) => void;
    getPosition: () => unknown;
  };

  interface NaverMaps {
    Map: new (el: HTMLElement, opts: Record<string, unknown>) => MapInstance;
    LatLng: new (lat: number, lng: number) => unknown;
    Marker: new (opts: Record<string, unknown>) => MarkerInstance;
    Panorama?: new (el: HTMLElement, opts: Record<string, unknown>) => PanoramaInstance;
    onJSContentLoaded?: () => void;

    /** 이벤트 유틸 (정적) */
    Event?: {
      addListener: (
        target: object,
        name: string,
        handler: (...args: unknown[]) => void
      ) => void;
    };
  }

  interface Window {
    naver?: { maps?: NaverMaps };
  }
}

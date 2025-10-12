export {};

declare global {
  type MapInstance = { destroy?: () => void };
  type MarkerInstance = { setMap: (m: MapInstance | null) => void };
  type PanoramaInstance = { destroy?: () => void };

  interface NaverMaps {
    Map: new (el: HTMLElement, opts: Record<string, unknown>) => MapInstance;
    LatLng: new (lat: number, lng: number) => unknown;
    Marker: new (opts: Record<string, unknown>) => MarkerInstance;
    Panorama?: new (el: HTMLElement, opts: Record<string, unknown>) => PanoramaInstance;
    /** SDK 내부 초기화 완료 시 호출되는 훅 */
    onJSContentLoaded?: () => void;
  }

  interface Window {
    naver?: { maps?: NaverMaps };
  }
}

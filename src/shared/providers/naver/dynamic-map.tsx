import {useEffect, useRef} from "react";
import {loadNaverSdk} from "./sdk";

type Props = {
  lat?: number;
  lng?: number;
  zoom?: number;     // default 10
  height?: number;   // px, default 400
  className?: string;
};

export default function NaverMap({lat, lng, zoom = 10, height = 400, className}: Props) {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasGeo = Number.isFinite(lat) && Number.isFinite(lng);
    if (!hasGeo || !elRef.current) return;

    let cleanup: (() => void) | undefined;
    let map: MapInstance | undefined;
    let marker: MarkerInstance | undefined;

    loadNaverSdk()
      .then(() => {
        const maps = window.naver!.maps!;
        const center = new maps.LatLng(Number(lat), Number(lng));

        map = new maps.Map(elRef.current!, {
          center,
          zoom,
          zoomControl: true,
          mapDataControl: false,
        });

        marker = new maps.Marker({position: center});
        marker.setMap(map);

        cleanup = () => {
          try {
            marker?.setMap(null);
            map?.destroy?.();
          } catch { /* empty */
          }
          if (elRef.current) elRef.current.innerHTML = "";
        };
      })
      .catch(console.error);

    return () => cleanup?.();
  }, [lat, lng, zoom]);

  const hasGeo = Number.isFinite(lat) && Number.isFinite(lng);

  return (
    <div className={className}>
      <div ref={elRef} style={{width: "100%", height}} className="rounded border"/>
      {!hasGeo && <div className="text-body-secondary mt-2">위치 정보가 없습니다</div>}
    </div>
  );
}

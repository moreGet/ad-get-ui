import {type JSX, useEffect, useRef} from "react";
import {loadNaverSdk} from "./sdk";

type Props = {
  lat: number;
  lng: number;
  height?: number;
  className?: string;
  pan?: number;
  tilt?: number;
  fov?: number;
  flightSpot?: boolean;
};

function waitPanoramaReady(maps: NaverMaps): Promise<void> {
  // Panorama 생성자가 이미 있으면 즉시 통과
  if (maps.Panorama) return Promise.resolve();

  // SDK 내부 init 완료 콜백을 기다린다
  return new Promise<void>((resolve) => {
    const prev = maps.onJSContentLoaded;
    maps.onJSContentLoaded = () => {
      try {
        prev?.();
      } finally {
        resolve();
      }
    };
  });
}

export default function NaverPanorama({
                                        lat,
                                        lng,
                                        height = 400,
                                        pan = -135,
                                        tilt = 29,
                                        fov = 100,
                                        flightSpot = true
                                      }: Props): JSX.Element {
  const elRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!Number.isFinite(lat) || !Number.isFinite(lng) || !elRef.current) return;

    let cleanup: (() => void) | undefined;
    let pano: PanoramaInstance | undefined;

    loadNaverSdk()
      .then(async () => {
        const maps = window.naver!.maps as NaverMaps;
        await waitPanoramaReady(maps); // (앞서 안내한 헬퍼 사용 중이라면 그대로)

        const position = new maps.LatLng(Number(lat), Number(lng));
        const PanoCtor = maps.Panorama!;
        pano = new PanoCtor(elRef.current!, {
          position,
          pov: {pan, tilt, fov},
          flightSpot,
          zoomControl: true,
        });

        // ★ 마커 아이콘(선택) — 기본 핀으로 쓰려면 icon 옵션은 빼도 됨
        const marker: MarkerInstance = new maps.Marker({
          position, // 같은 좌표에 찍음. 다른 좌표면 새 LatLng 사용
          // icon: {
          //   url: "/img/example/pin_map.png",
          //   size: new (window as any).naver.maps.Size(55, 36), // 필요시 Size/Point 타입 보강
          //   anchor: new (window as any).naver.maps.Point(28, 36),
          //   scaledSize: new (window as any).naver.maps.Size(55, 36),
          // },
        });

        // 파노라마 초기화 시점에 마커 올리고, 시선(pov)도 마커로 맞춤
        maps.Event?.addListener(pano as unknown as object, "init", () => {
          marker.setMap(pano!);

          const proj = pano?.getProjection?.();
          const lookAt = proj?.fromCoordToPov(marker.getPosition());
          if (lookAt) pano?.setPov?.(lookAt);
        });

        cleanup = () => {
          try {
            marker.setMap(null);
            pano?.destroy?.();
          } catch { /* noop */
          }
          if (elRef.current) elRef.current.innerHTML = "";
        };
      })
      .catch(console.error);

    return () => cleanup?.();
  }, [lat, lng, pan, tilt, fov, flightSpot]);

  const hasGeo = Number.isFinite(lat) && Number.isFinite(lng);

  return (
    <div>
      <div ref={elRef} style={{width: "100%", height}} className="rounded border"/>
      {!hasGeo && <div className="text-body-secondary mt-2">파노라마 위치 정보가 없습니다</div>}
    </div>
  );
}

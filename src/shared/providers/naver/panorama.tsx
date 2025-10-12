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
        const naver = window.naver!;
        const maps = naver.maps!;

        if (!(maps as any).Panorama) {
          await new Promise<void>((resolve) => {
            const prev = (maps as any).onJSContentLoaded;
            (maps as any).onJSContentLoaded = (...args: unknown[]) => {
              try {
                prev?.(...args as any);
              } catch { /* noop */
              }
              resolve();
            };
          });
        }

        const position = new maps.LatLng(Number(lat), Number(lng));
        const PanoCtor = (maps as any).Panorama as new (el: HTMLElement, opts: any) => PanoramaInstance;

        pano = new PanoCtor(elRef.current!, {
          position,
          pov: {pan, tilt, fov},
          flightSpot,
          zoomControl: true,
        });

        cleanup = () => {
          try {
            pano?.destroy?.();
          } catch { /* empty */
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

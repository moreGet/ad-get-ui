// src/app/routes/lung-medicine-detail.tsx
import {Navigate, useParams} from "react-router-dom";
import {useAsync} from "@shared/hooks/use-async";
import {parseRouteInt} from "@shared/utils/parse-utils";
import {fetchLungMedicine} from "@entities/listing/api/lung-medicine";
import type {LungMedicineDetail} from "@entities/listing/model/types";

import {ROUTES} from "@shared/constants/text";

import AdSlot from "@shared/ui/ad-slot";
import Breadcrumbs from "@shared/ui/breadcrumbs";
import {Field, SectionHeader} from "@shared/ui/helpers";

import NaverMap from "@shared/providers/naver/dynamic-map";
import NaverPanorama from "@shared/providers/naver/panorama";

import SEO from "@shared/ui/seo/seo";
import {buildLungMedicineSeoProps} from "@shared/seo/mappers/lung-medicine-mapper.ts";

import {formatUtcToKst} from "@shared/utils/date";

export default function LungMedicineDetail() {
  const SITE_URL = import.meta.env.VITE_SITE_BASE_URL as string | undefined;

  const {id: routeId} = useParams();
  const id = parseRouteInt(routeId);

  const {data, loading, error} = useAsync<LungMedicineDetail>(
    (signal) => fetchLungMedicine(id, {signal}),
    {deps: [id], immediate: true}
  );

  // 로딩 종료 후 에러 혹은 데이터 없음 → 404
  if (!loading && (error || !data)) {
    return <Navigate to="/not-found" replace/>;
  }

  const crumbs = [
    {label: "(폐)의약품 수거함", to: ROUTES.lungMedicineList},
    {label: loading ? "상세" : data?.installationPlaceName ?? "상세", active: true},
  ];

  return (
    <div className="container py-3 d-flex flex-column gap-3">
      {/* 데이터 메타 (완성) */}
      {!loading && data && (
        <SEO
          {...buildLungMedicineSeoProps(data, {
            siteUrl: SITE_URL,
            ogImage: SITE_URL ? `${SITE_URL}/og/default.png` : undefined,
            siteName: "AD-GET",
            robots: "index,follow",
          })}
        />
      )}

      {/* ── 상단 네비게이터(빵크럼) + 큰 타이틀 ─────────────────────── */}
      <div className="w-100" style={{maxWidth: 960}}>
        <div className="card">
          <div className="card-body position-relative">
            <Breadcrumbs items={crumbs}/>

            {/* 페이지 타이틀 + 보조설명(주소) */}
            <h1 className="display-6 fw-bold lh-sm mb-1 text-truncate">
              {loading ? (
                <span className="placeholder col-6" aria-hidden="true" style={{display: "inline-block"}}/>
              ) : (
                data!.installationPlaceName ?? "-"
              )}
            </h1>
            {!loading && data && (
              <p className="lead text-body-secondary mb-0">
                {[data?.provinceName, data?.cityDistrictName].filter(Boolean).join(' ') || '주소 정보 없음'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 광고 */}
      <AdSlot height={80}/>

      {/* 섹션: 설치 정보 / 주소 */}
      <div className="card">
        <div className="card-body position-relative">
          {loading && (
            <div className="py-2" role="status" aria-live="polite">
              <div className="placeholder-glow"><span className="placeholder col-3"/></div>
              <div className="mt-2 placeholder-glow"><span className="placeholder col-7"/></div>
              <div className="mt-1 placeholder-glow"><span className="placeholder col-4"/></div>
            </div>
          )}

          {!loading && data && (
            <>
              {/* ▶︎ 우측 상단 액션 버튼 */}
              <div className="position-absolute top-0 end-0 p-2">
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-primary"
                    aria-label="주소 복사"
                    disabled={!data.roadAddress}
                    onClick={async () => {
                      const text = data.roadAddress ?? "";
                      try {
                        await navigator.clipboard?.writeText(text);
                        alert("주소를 복사했어요.");
                      } catch {
                        window.prompt("주소를 복사하세요:", text);
                      }
                    }}
                  >
                    주소 복사
                  </button>
                </div>
              </div>

              <SectionHeader title="설치 정보"/>

              <Field label="설치 장소">
                {data.installationPlaceName || "-"}
              </Field>

              <Field label="주소" hint={<>{data.provinceName} {data.cityDistrictName}</>}>
                {data.roadAddress || "-"}
              </Field>
            </>
          )}
        </div>
      </div>

      {/* 광고 */}
      <AdSlot height={80}/>

      {/* 네이버 다이나믹 지도 */}
      {!loading && data && (
        <div className="row g-3">
          <div className="col-12 col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="h5 fw-bold mb-3">지도 위치</h2>
                <NaverMap lat={data.latitude} lng={data.longitude} zoom={18} height={360}/>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-6">
            <div className="card h-100">
              <div className="card-body">
                <h2 className="h5 fw-bold mb-3">거리 뷰</h2>
                <NaverPanorama lat={data.latitude} lng={data.longitude} height={360} pan={-135} tilt={29} fov={100}/>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 광고 */}
      <AdSlot height={80}/>

      {/* 섹션: 관리기관/연락처 */}
      <div className="card">
        <div className="card-body">
          {loading && (
            <div className="text-center py-4" role="status" aria-live="polite">
              Loading…
            </div>
          )}

          {!loading && data && (
            <>
              <SectionHeader title="관리 기관"/>

              <Field label="기관명">
                {data.managementAgencyName || "-"}
              </Field>

              <div className="mt-1 d-flex align-items-center gap-2">
                {/* 액션 버튼: 번호가 있을 때만 href, 없으면 완전 비활성 */}
                {data.managementAgencyPhoneNumber ? (
                  <a
                    className="btn btn-outline-primary btn-sm"
                    href={`tel:${data.managementAgencyPhoneNumber}`}
                    aria-label="관리기관 전화 걸기"
                  >
                    📞 전화
                  </a>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                    disabled
                    aria-disabled="true"
                    tabIndex={-1}
                  >
                    📞 번호없음
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* 광고 */}
      <AdSlot height={80}/>

      <div className="card">
        <div className="card-body">
          <Field label="데이터 갱신일">
            {formatUtcToKst(data?.updatedAt, {withSeconds: true, includeZone: false})}
          </Field>
        </div>
      </div>

    </div>
  );
}

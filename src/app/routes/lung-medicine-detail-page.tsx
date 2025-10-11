// src/app/routes/lung-medicine-detail-page.tsx
import {Navigate, useParams, Link} from "react-router-dom";
import {useAsync} from "@shared/hooks/use-async";
import {parseRouteInt} from "@shared/utils/parse-utils";
import {fetchLungMedicine} from "@entities/listing/api/lung-medicine";
import type {LungMedicineDetail} from "@entities/listing/model/types";

import AdSlot from "@shared/ui/ad-slot";
import Breadcrumbs from '@shared/ui/breadcrumbs';

export default function LungMedicineDetailPage() {
  const {id: routeId} = useParams();
  const id = parseRouteInt(routeId);

  const {data, loading, error} = useAsync<LungMedicineDetail>(
    (signal) => fetchLungMedicine(id, {signal}),
    {deps: [id], immediate: true}
  );

  if (!loading && error) return <Navigate to="/not-found" replace/>;

  const crumbs = [
    {label: "(폐)의약품 수거함", to: "/lung-medicine/list"},
    {label: loading ? "상세" : (data?.installationPlaceName ?? "상세"), active: true},
  ];

  return (
    <div className="container py-3 d-flex flex-column gap-3">

      {/* ── 상단 네비게이터(빵크럼) + 큰 타이틀 ─────────────────────── */}
      <div className="w-100" style={{maxWidth: 960}}>
        <div className="card">
          <div className="card-body">
            <Breadcrumbs items={crumbs}/>
            <h1 className="fw-bold lh-sm mb-0 text-truncate fs-3 fs-md-2">
              {loading ? "Loading…" : (data?.installationPlaceName ?? "-")}
            </h1>
          </div>
        </div>
      </div>

      {/* 광고 */}
      <AdSlot height={80}/>

      {/* 섹션 2: 주소/행정구역 */}
      <div className="card">
        <div className="card-body position-relative">
          {loading && <div className="text-center py-4">Loading…</div>}
          {!loading && data && (
            <>
              {/* ▶︎ 우측 상단 액션 버튼 */}
              <div className="position-absolute top-0 end-0 p-2">
                <div className="btn-group btn-group-sm">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    disabled={!data.roadAddress}
                    onClick={async () => {
                      const text = data.roadAddress ?? "";
                      try {
                        await navigator.clipboard?.writeText(text);
                      } catch {
                        window.prompt("주소를 복사하세요:", text);
                      }
                    }}
                  >
                    주소 복사
                  </button>
                  <a
                    className="btn btn-primary"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${data.latitude},${data.longitude}`
                    )}`}
                  >
                    구글 지도
                  </a>
                </div>
              </div>

              {/* 본문 내용 */}
              <div className="mb-2">
                <div className="text-muted small">설치 장소</div>
                <div className="fw-semibold">{data.installationPlaceName}</div>
              </div>

              <div className="mb-2 pe-5">{/* 버튼이 겹치지 않게 여백 약간 */}
                <div className="text-muted small">주소</div>
                <div>{data.roadAddress || "-"}</div>
                <div className="text-secondary small">
                  {data.provinceName} {data.cityDistrictName}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 광고 */}
      <AdSlot height={80}/>

      {/* 섹션 3: 관리기관/연락처 */}
      <div className="card">
        <div className="card-body">
          {!loading && data && (
            <>
              <div className="text-muted small">관리 기관</div>
              <div className="fw-medium">{data.managementAgencyName || "-"}</div>
              {data.managementAgencyPhoneNumber && (
                <a className="d-inline-block mt-1" href={`tel:${data.managementAgencyPhoneNumber}`}>
                  📞 {data.managementAgencyPhoneNumber}
                </a>
              )}
            </>
          )}
          {loading && <div className="text-center py-4">Loading…</div>}
        </div>
      </div>

      {/* 섹션 5: 메타 정보 */}
      <div className="card">
        <div className="card-body text-secondary small d-flex flex-wrap gap-3">
          {!loading && data && (
            <>
              <span>기준일: {new Date(data.dataReferenceDate).toLocaleString()}</span>
              <span>생성: {new Date(data.createdAt).toLocaleString()}</span>
              <span>수정: {new Date(data.updatedAt).toLocaleString()}</span>
            </>
          )}
          {loading && <div>Loading…</div>}
        </div>
      </div>

      {/* 광고 */}
      <AdSlot height={80}/>

    </div>
  );
}

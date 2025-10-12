// src/app/routes/lung-medicine-detail-page.tsx
import React, {useMemo} from "react";
import {Navigate, useParams} from "react-router-dom";
import {useAsync} from "@shared/hooks/use-async";
import {parseRouteInt} from "@shared/utils/parse-utils";
import {fetchLungMedicine} from "@entities/listing/api/lung-medicine";
import type {LungMedicineDetail} from "@entities/listing/model/types";

import AdSlot from "@shared/ui/ad-slot";
import Breadcrumbs from "@shared/ui/breadcrumbs";

/** ─────────────────────────────────────────────────────────────
 * UI helpers (이 파일 내부에서만 사용)
 * 라벨/값 타이포 계층을 일관되게 적용하기 위한 작은 컴포넌트들
 * ──────────────────────────────────────────────────────────── */
function SectionHeader({title}: { title: string }) {
  return <h2 className="h5 fw-bold mb-3">{title}</h2>;
}

function Field({
                 label,
                 children,
                 hint,
               }: {
  label: string;
  children: React.ReactNode;
  hint?: React.ReactNode;
}) {
  return (
    <div className="mb-3">
      <div className="text-uppercase text-body-secondary small fw-semibold" style={{letterSpacing: ".03em"}}>
        {label}
      </div>
      <div className="fs-5 fw-semibold">{children}</div>
      {hint && <div className="small text-body-secondary mt-1">{hint}</div>}
    </div>
  );
}

export default function LungMedicineDetailPage() {
  const {id: routeId} = useParams();
  const id = parseRouteInt(routeId);

  const {data, loading, error} = useAsync<LungMedicineDetail>(
    (signal) => fetchLungMedicine(id, {signal}),
    {deps: [id], immediate: true}
  );

  const fmt = useMemo(
    () =>
      new Intl.DateTimeFormat(undefined, {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      }),
    []
  );

  // 로딩 종료 후 에러 혹은 데이터 없음 → 404
  if (!loading && (error || !data)) {
    return <Navigate to="/not-found" replace/>;
  }

  const crumbs = [
    {label: "(폐)의약품 수거함", to: "/lung-medicine/list"},
    {label: loading ? "상세" : data?.installationPlaceName ?? "상세", active: true},
  ];

  // 지오 좌표 가드
  const hasGeo = Number.isFinite(data?.latitude) && Number.isFinite(data?.longitude);

  return (
    <div className="container py-3 d-flex flex-column gap-3">
      {/* ── 상단 네비게이터(빵크럼) + 큰 타이틀 ─────────────────────── */}
      <div className="w-100" style={{maxWidth: 960}}>
        <div className="card">
          <div className="card-body">
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

      {/* 섹션: 메타 정보 */}
      <div className="card">
        <div className="card-body">
          <SectionHeader title="메타 정보"/>

          {loading && (
            <div role="status" aria-live="polite">
              Loading…
            </div>
          )}

          {!loading && data && (
            <div className="row row-cols-1 row-cols-md-3 g-3">
              <div className="col">
                <div className="text-uppercase text-body-secondary small fw-semibold" style={{letterSpacing: ".03em"}}>
                  기준일
                </div>
                <div className="fw-semibold">{fmt.format(new Date(data.dataReferenceDate))}</div>
              </div>
              <div className="col">
                <div className="text-uppercase text-body-secondary small fw-semibold" style={{letterSpacing: ".03em"}}>
                  생성
                </div>
                <div className="fw-semibold">{fmt.format(new Date(data.createdAt))}</div>
              </div>
              <div className="col">
                <div className="text-uppercase text-body-secondary small fw-semibold" style={{letterSpacing: ".03em"}}>
                  수정
                </div>
                <div className="fw-semibold">{fmt.format(new Date(data.updatedAt))}</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 광고 */}
      <AdSlot height={80}/>
    </div>
  );
}

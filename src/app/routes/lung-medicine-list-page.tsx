// src/app/routes/lung-medicine-list-page.tsx
import {useRef} from "react";
import {Link} from "react-router-dom";
import {fetchLungMedicines} from "@entities/listing/api/lung-medicine";
import type {LungMedicineListResponse} from "@entities/listing/model/types";
import Pagination from "@shared/ui/pagination";

import {useMedia} from "@shared/hooks/use-media";
import {DEFAULT_PAGE_SIZE_DESKTOP, DEFAULT_PAGE_SIZE_MOBILE, BASE_PAGE_SIZE} from "@shared/config/pagination";
import {useIntQueryParam} from "@shared/hooks/use-page-param";
import {useAsync} from "@shared/hooks/use-async";

import {useScrollToTop} from "@shared/hooks/use-scroll-to-top";
import {useResetPageOnChange} from "@shared/hooks/use-reset-page-on-change";
import {usePaginationGo} from "@shared/hooks/use-pagination-go";

export default function LungMedicineListPage() {
  const isMobile = useMedia(BASE_PAGE_SIZE);
  const PAGE_SIZE = isMobile ? DEFAULT_PAGE_SIZE_MOBILE : DEFAULT_PAGE_SIZE_DESKTOP;

  // page 쿼리 공통 훅
  const {value: page, setValue: setPage} = useIntQueryParam();

  // 데이터 패칭 공통 훅
  const {data, loading, error} = useAsync<LungMedicineListResponse>(
    (signal) => fetchLungMedicines(page, PAGE_SIZE, [], {signal}),
    {deps: [page, PAGE_SIZE]}
  );

  // a) 페이지 바뀔 때 상단 스크롤 (공통 훅)
  const topRef = useRef<HTMLDivElement | null>(null);
  useScrollToTop(topRef, [page]);

  // b) pageSize 바뀌면 0페이지 리셋 (공통 훅)
  useResetPageOnChange(PAGE_SIZE, setPage);

  // c) Pagination onChange 콜백 (공통 훅)
  const go = usePaginationGo(data?.pageInfo.totalPages, setPage);

  return (
    <div className="container-fluid overflow-hidden d-flex flex-column align-items-center gap-5">
      <div ref={topRef} style={{position: "absolute", inset: 0, width: 0, height: 0}} aria-hidden="true"/>
      <div className="text-muted text-center pt-3 w-100">광고</div>

      <div className="container mx-auto px-2" style={{maxWidth: 1680}}>
        {loading && <div className="py-5 text-center">Loading…</div>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && data && (
          <div className="row g-2 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-6">
            {data.contents.map((item) => (
              <div key={item.id} className="col">
                <div className="card h-100">
                  <div className="card-body text-start d-flex flex-column">
                    <h6 className="card-title fw-semibold mb-2">{item.installationPlaceName}</h6>
                    <p className="card-text text-muted small mb-3">{item.roadAddress}</p>
                    <Link to={`/lung-medicine/${item.id}`} className="btn btn-primary mt-auto">
                      상세
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            {data.contents.length === 0 && (
              <div className="col-12">
                <div className="text-center text-muted py-5">데이터가 없습니다.</div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="text-muted text-center w-100">광고</div>

      {data && (
        <Pagination
          page={page}
          totalPages={data.pageInfo.totalPages}
          onChange={go}
          siblingCount={1}
          showEdges
        />
      )}
    </div>
  );
}

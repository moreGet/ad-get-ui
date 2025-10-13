// src/app/routes/lung-medicine-list-page.tsx
import {useEffect, useRef, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
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

import AdSlot from "@shared/ui/ad-slot";

export default function LungMedicineListPage() {
  const isMobile = useMedia(BASE_PAGE_SIZE);
  const PAGE_SIZE = isMobile ? DEFAULT_PAGE_SIZE_MOBILE : DEFAULT_PAGE_SIZE_DESKTOP;

  // page 쿼리 공통 훅
  const {value: page, setValue: setPage} = useIntQueryParam();

  // --- 검색 상태: URL ?q= 유지 + 디바운스 ---
  const [searchParams, setSearchParams] = useSearchParams();
  const qFromUrl = searchParams.get("q") ?? "";

  const [input, setInput] = useState(qFromUrl);
  useEffect(() => setInput(qFromUrl), [qFromUrl]);

  const [debouncedQ, setDebouncedQ] = useState(qFromUrl);
  useEffect(() => {
    const id = setTimeout(() => setDebouncedQ(input.trim()), 300);
    return () => clearTimeout(id);
  }, [input]);

  const applyQ = (next: string) => {
    const sp = new URLSearchParams(searchParams);
    if (next && next.trim()) sp.set("q", next.trim());
    else sp.delete("q");
    setSearchParams(sp, {replace: true});
  };

  const onSubmitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    applyQ(input);
    setPage(0); // 검색 제출 시 첫 페이지로
  };

  const onClear = () => {
    setInput("");
    applyQ("");
    setPage(0);
  };

  // 데이터 패칭 공통 훅 (q 전달)
  const {data, loading, error} = useAsync<LungMedicineListResponse>(
    (signal) => fetchLungMedicines(page, PAGE_SIZE, [], {signal, q: debouncedQ}),
    {deps: [page, PAGE_SIZE, debouncedQ]}
  );

  // a) 페이지 바뀔 때 상단 스크롤 (공통 훅)
  const topRef = useRef<HTMLDivElement | null>(null);
  useScrollToTop(topRef, [page]);

  // b) pageSize 바뀌면 0페이지 리셋 (공통 훅)
  useResetPageOnChange(PAGE_SIZE, setPage);

  // c) 검색어 변경 시 0페이지 리셋 (공통 훅)
  useResetPageOnChange(debouncedQ, setPage);

  // d) Pagination onChange 콜백 (공통 훅)
  const go = usePaginationGo(data?.pageInfo.totalPages, setPage);

  return (
    <div className="container-fluid overflow-hidden d-flex flex-column align-items-center gap-5">
      <div ref={topRef} style={{position: "absolute", inset: 0, width: 0, height: 0}} aria-hidden="true"/>

      {/* 검색바 */}
      <div className="container mx-auto px-2" style={{maxWidth: 1680}}>
        <form onSubmit={onSubmitSearch} className="w-100">
          <div className="input-group my-3">
            <input
              className="form-control"
              type="search"
              placeholder="설치 장소명, 도로명주소로 검색"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="폐의약품 수거함 검색"
            />
            {input && (
              <button type="button" className="btn btn-outline-secondary" onClick={onClear}>
                초기화
              </button>
            )}
            <button type="submit" className="btn btn-primary">검색</button>
          </div>
        </form>
      </div>

      {/* 광고 */}
      <div className="container-fluid px-0">
        <AdSlot height={80}/>
      </div>

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

      {/* 광고 */}
      <div className="container-fluid px-0">
        <AdSlot height={80}/>
      </div>

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

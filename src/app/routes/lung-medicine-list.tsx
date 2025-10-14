// src/app/routes/lung-medicine-list.tsx
import {useEffect, useRef, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {fetchLungMedicines} from "@entities/listing/api/lung-medicine";
import type {LungMedicineListResponse} from "@entities/listing/model/types";
import Pagination from "@shared/ui/pagination";

import {useMedia} from "@shared/hooks/use-media";
import {BASE_PAGE_SIZE, DEFAULT_PAGE_SIZE_DESKTOP, DEFAULT_PAGE_SIZE_MOBILE} from "@shared/config/pagination";
import {useIntQueryParam} from "@shared/hooks/use-page-param";
import {useAsync} from "@shared/hooks/use-async";

import {useScrollToTop} from "@shared/hooks/use-scroll-to-top";
import {useResetPageOnChange} from "@shared/hooks/use-reset-page-on-change";
import {usePaginationGo} from "@shared/hooks/use-pagination-go";

import ListCard from "@shared/ui/list-card";
import AdSlot from "@shared/ui/ad-slot";
import {getDefaultSearchFields, type SearchFieldOf} from "@shared/api/common-code/static";

type SearchField = SearchFieldOf<"lung-medicine">;

export default function LungMedicineList() {
  const isMobile = useMedia(BASE_PAGE_SIZE);
  const PAGE_SIZE = isMobile ? DEFAULT_PAGE_SIZE_MOBILE : DEFAULT_PAGE_SIZE_DESKTOP;

  // 공통코드(하드코딩)에서 필드/라벨
  // fields: readonly ["installationPlaceName", "roadAddress"]
  // labels: { installationPlaceName: "설치 장소명", roadAddress: "도로명주소" }
  const {fields, labels} = getDefaultSearchFields("lung-medicine");

  // page 쿼리 공통 훅
  const {value: page, setValue: setPage} = useIntQueryParam();

  // URL 쿼리 상태: ?q=, ?f=
  const [searchParams, setSearchParams] = useSearchParams();
  const qFromUrl = (searchParams.get("q") ?? "").trim();
  const fieldFromUrl = (searchParams.get("f") as SearchField) || (fields[0] as SearchField);

  // 입력(타이핑/선택)
  const [input, setInput] = useState(qFromUrl);
  const [fieldInput, setFieldInput] = useState<SearchField>(fieldFromUrl);

  // 커밋(조회용)
  const [query, setQuery] = useState(qFromUrl);
  const [fieldQuery, setFieldQuery] = useState<SearchField>(fieldFromUrl);

  // URL 동기화
  useEffect(() => {
    setInput(qFromUrl);
    setQuery(qFromUrl);
  }, [qFromUrl]);
  useEffect(() => {
    setFieldInput(fieldFromUrl);
    setFieldQuery(fieldFromUrl);
  }, [fieldFromUrl]);

  const applyToUrl = (nextQ: string, nextF: SearchField) => {
    const sp = new URLSearchParams(searchParams);
    if (nextQ && nextQ.trim()) sp.set("q", nextQ.trim()); else sp.delete("q");
    if (nextF) sp.set("f", nextF); else sp.delete("f");
    setSearchParams(sp, {replace: true});
  };

  const onSubmitSearch: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const nextQ = input.trim();
    const nextF = fieldInput;
    applyToUrl(nextQ, nextF);
    setQuery(nextQ);
    setFieldQuery(nextF);
    setPage(0);
  };

  const onClear = () => {
    setInput("");
    applyToUrl("", fieldInput); // 필드 유지
    setQuery("");
    setFieldQuery(fieldInput);
    setPage(0);
  };

  // 버튼 눌렀을 때만 커밋 값으로 조회
  const {data, loading, error} = useAsync<LungMedicineListResponse>(
    (signal) =>
      fetchLungMedicines(page, PAGE_SIZE, [], {
        signal,
        q: query,
        fields: query ? [fieldQuery] : undefined, // 검색어 없으면 전체 검색(기본 필드 사용)
      }),
    {deps: [page, PAGE_SIZE, query, fieldQuery]}
  );

  // UX 훅
  const topRef = useRef<HTMLDivElement | null>(null);
  useScrollToTop(topRef, [page]);
  useResetPageOnChange(PAGE_SIZE, setPage);
  useResetPageOnChange(query, setPage);
  useResetPageOnChange(fieldQuery, setPage);
  const go = usePaginationGo(data?.pageInfo.totalPages, setPage);

  return (
    <div className="container-fluid overflow-hidden vstack align-items-center gap-4">
      <div ref={topRef} style={{position: "absolute", inset: 0, width: 0, height: 0}} aria-hidden="true"/>

      {/* 광고 */}
      <div className="container-fluid px-0">
        <AdSlot height={80}/>
      </div>

      {/* 검색바 */}
      <div className="container mx-auto px-2" style={{maxWidth: 1680}}>
        <form onSubmit={onSubmitSearch} className="w-100">
          <div className="input-group my-3">
            <select
              className="form-select"
              value={fieldInput}
              onChange={(e) => setFieldInput(e.target.value as SearchField)}
              aria-label="검색 필드 선택"
              style={{maxWidth: 150}}
            >
              {fields.map((f) => (
                <option key={f} value={f}>
                  {labels[f] ?? f}
                </option>
              ))}
            </select>

            <input
              className="form-control" type="search" placeholder="검색어를 입력하세요" value={input}
              onChange={(e) => setInput(e.target.value)} aria-label="폐의약품 수거함 검색"
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
                <ListCard
                  className="card-hover"
                  title={item.installationPlaceName}
                  description={item.roadAddress}
                >
                  <Link
                    to={`/lung-medicine/${item.id}`}
                    className="btn btn-primary w-100"
                    aria-label={`${item.installationPlaceName} 상세로 이동`}
                  >
                    상세
                  </Link>
                </ListCard>
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
        <Pagination page={page} totalPages={data.pageInfo.totalPages} onChange={go} siblingCount={1} showEdges/>
      )}
    </div>
  );
}

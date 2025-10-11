// src/app/routes/lung-medicine-list-page.tsx
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {fetchLungMedicines} from '@entities/listing/api/lung-medicine';
import type {LungMedicineListResponse} from '@entities/listing/model/types';
import Pagination from '@shared/ui/pagination';

// 사용 환경 감지
import {useMedia} from "@shared/hooks/use-media.ts";
import { DEFAULT_PAGE_SIZE_DESKTOP, DEFAULT_PAGE_SIZE_MOBILE } from "@shared/config/pagination";

export default function LungMedicineListPage() {
  const isMobile = useMedia("(max-width: 767.98px)");
  const PAGE_SIZE = isMobile ? DEFAULT_PAGE_SIZE_MOBILE : DEFAULT_PAGE_SIZE_DESKTOP;

  const [sp, setSp] = useSearchParams();

  // page 안전 파싱
  const page = useMemo(() => {
    const raw = sp.get('page');
    const n = Number(raw);
    if (!raw || Number.isNaN(n) || n < 0) return 0;
    return Math.floor(n);
  }, [sp]);

  const [data, setData] = useState<LungMedicineListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  const topRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ac = new AbortController();

    setLoading(true);
    setErr(null);

    // fetch 시그니처: (page, size, sorts, opts) 이므로 빈 sorts([]) 넣고 4번째에 signal
    fetchLungMedicines(page, PAGE_SIZE, [], {signal: ac.signal})
      .then(res => setData(res))
      .catch(e => {
        if (ac.signal.aborted) return;
        setErr(e?.message ?? '요청 실패');
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false);
      });

    // UX: 페이지 전환 시 상단으로
    topRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});

    return () => ac.abort();
  }, [page]);

  const go = useCallback((p: number) => {
    if (!data) return;
    if (p < 0 || p >= data.pageInfo.totalPages) return;
    const next = new URLSearchParams(sp);
    next.set('page', String(p));
    setSp(next, {replace: true});
  }, [data, sp, setSp]);

  return (
    <div className="container-fluid overflow-hidden d-flex flex-column align-items-center gap-5">
      <div ref={topRef} style={{position: 'absolute', inset: 0, width: 0, height: 0}} aria-hidden="true"/>
      <div className="text-muted text-center pt-3 w-100">광고</div>

      <div className="container mx-auto px-2" style={{maxWidth: 1680}}>
        {loading && <div className="py-5 text-center">Loading…</div>}
        {err && <div className="alert alert-danger">{err}</div>}

        {/*
          논리 AND(단락 평가) 를 이용한 조건 렌더링 패턴
          data가 truthy 여야 다음으로 진행 (null/undefined면 중단)
        */}
        {!loading && data && (
          // <> React Fragment. DOM에 실제 태그를 추가하지 않고 여러 요소를 묶기 위한 문법
          <div className="row g-2 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-6">
            {data.contents.map(item => (
              <div key={item.id} className="col">
                <div className="card h-100">
                  <div className="card-body text-start d-flex flex-column">
                    <h6 className="card-title fw-semibold mb-2">{item.installationPlaceName}</h6>
                    <p className="card-text text-muted small mb-3">{item.roadAddress}</p>
                    <Link to={`/lung-medicine/${item.id}`} className="btn btn-primary mt-auto">상세</Link>
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

      {/*
        [Pagination → ListPage 데이터 갱신 플로우]
        클릭(번호/이전/다음/처음/끝)
        → Pagination 내부 onClick → internal go(p)
        → clamp & guard(next !== page)
        → props.onChange(next)        // 부모에 전달
        → (부모) ListPage.go(next) → setSp(?page=next)  // URL 쿼리 갱신
        → page 값 변경
        → useEffect([page]) 트리거 → fetchLungMedicines(page, ...)
        → setLoading(true) → setData(res) → setLoading(false)
        → 리렌더링 → 새 데이터와 함께 목록/페이지네이션 표시
      */}
      {data && (
        <Pagination
          page={page}
          totalPages={data.pageInfo.totalPages}
          onChange={(p) => go(p)}     // 기존 go 재사용
          siblingCount={1}
          showEdges
        />
      )}
    </div>
  );
}

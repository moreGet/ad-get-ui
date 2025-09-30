// src/app/routes/lung-medicine-list-page.tsx
import {useEffect, useState} from 'react';
import {Link, useSearchParams} from 'react-router-dom';
import {fetchLungMedicines} from '@entities/listing/api/lung-medicine';
import type {LungMedicineListResponse} from '@entities/listing/model/types';

const PAGE_SIZE = 9;

export default function LungMedicineListPage() {
  const [sp, setSp] = useSearchParams();
  const page = Math.max(0, Number(sp.get('page') ?? '0'));

  const [data, setData] = useState<LungMedicineListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let abort = false;
    setLoading(true);
    setErr(null);
    fetchLungMedicines(page, PAGE_SIZE)
      .then(res => {
        if (!abort) setData(res);
      })
      .catch(e => {
        if (!abort) setErr(e.message ?? '요청 실패');
      })
      .finally(() => {
        if (!abort) setLoading(false);
      });
    return () => {
      abort = true;
    };
  }, [page]);

  const go = (p: number) => {
    if (!data) return;
    if (p < 0 || p >= data.pageInfo.totalPages) return;
    const next = new URLSearchParams(sp);
    next.set('page', String(p));
    setSp(next);
  };

  return (
    <div className="container-fluid overflow-hidden d-flex flex-column align-items-center gap-5">
      <div className="text-muted text-center pt-3 w-100">광고</div>

      <div className="container mx-auto px-2" style={{maxWidth: 1680}}>
        {loading && <div className="py-5 text-center">Loading…</div>}
        {err && <div className="alert alert-danger">{err}</div>}

        {data && (
          <>
            <div className="row g-2 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-6">
              {data.contents.map(item => (
                <div key={item.id} className="col">
                  <div className="card h-100">
                    <div className="card-body text-start d-flex flex-column">
                      {/* 제목 = installationPlaceName */}
                      <h6 className="card-title fw-semibold mb-2">
                        {item.installationPlaceName}
                      </h6>

                      {/* 설명 = roadAddress */}
                      <p className="card-text text-muted small mb-3">
                        {item.roadAddress}
                      </p>

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

            {/* 페이지네이션 (필요 시) */}
            {data.pageInfo.totalPages > 1 && (
              <nav className="d-flex justify-content-center mt-3">
                <ul className="pagination">
                  <li className={`page-item ${data.pageInfo.isFirst ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => go(page - 1)}>이전</button>
                  </li>
                  {Array.from({length: data.pageInfo.totalPages}, (_, i) => (
                    <li key={i} className={`page-item ${i === page ? 'active' : ''}`}>
                      <button className="page-link" onClick={() => go(i)}>{i + 1}</button>
                    </li>
                  ))}
                  <li className={`page-item ${data.pageInfo.isLast ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => go(page + 1)}>다음</button>
                  </li>
                </ul>
              </nav>
            )}
          </>
        )}
      </div>

      <div className="text-muted text-center w-100">광고</div>
    </div>
  );
}

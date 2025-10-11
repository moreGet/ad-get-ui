// src/shared/ui/pagination.tsx
import {memo, useCallback} from 'react';

type Props = {
  page: number;            // 0-based
  totalPages: number;      // 0 => 숨김, 1 이상 => 번호 표시
  onChange: (next: number) => void;
  ariaLabel?: string;
  siblingCount?: number;
  showEdges?: boolean;
  size?: 'sm' | 'lg';
  className?: string;
};

const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

function buildRange(total: number, current: number, siblingCount: number) {
  if (total <= 1) return [0];
  const first = 0;
  const last = total - 1;
  const start = clamp(current - siblingCount, first, last);
  const end = clamp(current + siblingCount, first, last);

  const out: Array<number | '…'> = [];
  if (start > first + 1) out.push(first, '…');
  else for (let i = first; i < start; i++) out.push(i);

  for (let i = start; i <= end; i++) out.push(i);

  if (end < last - 1) out.push('…', last);
  else for (let i = end + 1; i <= last; i++) out.push(i);

  return out;
}

function PaginationBase({
                          page, totalPages, onChange, ariaLabel = '페이지네이션',
                          siblingCount = 1, showEdges = true, size, className = '',
                        }: Props) {
  // 훅 먼저 호출
  const go = useCallback(
    (p: number) => {
      const next = clamp(p, 0, Math.max(0, totalPages - 1));
      if (next !== page) onChange(next);
    },
    // 아래 값들중 하나라도 바뀌면 go 재생성
    // 해당 값들이 바뀌었는데 콜백을 재생성 하지 않으면 스에일 클로저(이전 값)을 재사용 할 수 있음.
    [onChange, page, totalPages]
  );

  // 이후에 early return
  if (totalPages < 1) return null;

  const isFirst = page <= 0;
  const isLast = page >= totalPages - 1;
  const items = buildRange(totalPages, page, siblingCount);
  const sizeCls = size ? ` pagination-${size}` : '';

  return (
    <nav className={`d-flex justify-content-center mt-3 ${className}`} aria-label={ariaLabel}>
      <ul className={`pagination mb-0${sizeCls}`}>
        {showEdges && (
          <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
            <button type="button" className="page-link" onClick={() => go(0)} disabled={isFirst} aria-label="첫 페이지">
              «
            </button>
          </li>
        )}

        <li className={`page-item ${isFirst ? 'disabled' : ''}`}>
          <button type="button" className="page-link" onClick={() => go(page - 1)} disabled={isFirst}
                  aria-label="이전 페이지">
            이전
          </button>
        </li>

        {items.map((it, idx) =>
          it === '…' ? (
            <li key={`ellipsis-${idx}`} className="page-item disabled">
              <span className="page-link" aria-hidden="true">…</span>
            </li>
          ) : (
            <li key={it} className={`page-item ${it === page ? 'active' : ''}`}>
              <button
                type="button"
                className="page-link"
                aria-current={it === page ? 'page' : undefined}
                onClick={() => go(it)}
              >
                {it + 1}
              </button>
            </li>
          )
        )}

        <li className={`page-item ${isLast ? 'disabled' : ''}`}>
          <button type="button" className="page-link" onClick={() => go(page + 1)} disabled={isLast}
                  aria-label="다음 페이지">
            다음
          </button>
        </li>

        {showEdges && (
          <li className={`page-item ${isLast ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => go(totalPages - 1)}
              disabled={isLast}
              aria-label="마지막 페이지"
            >
              »
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default memo(PaginationBase);

import {api} from '@shared/api/client';
import {buildPageQuery, appendSearchParams, type SortParam, type KeysValues} from '@shared/api/query';
import type {
  LungMedicineListResponse,
  LungMedicineDetail,
} from '@entities/listing/model/types';

// 리스트 마다 다를 수 있음
const DEFAULT_SEARCH_FIELDS = ["installationPlaceName", "roadAddress"] as const;

type FetchOpts = {
  signal?: AbortSignal;
  q?: string;             // ← 검색어만 넘길 때
  fields?: string[];      // ← q를 어떤 필드에 적용할지 (기본값은 아래에서 주입)
  filters?: KeysValues;   // ← keys/values 직접 제어 시
};

// 리스트 (9개 페이징)
export function fetchLungMedicines(page = 0, size = 9, sorts: SortParam[] = [], opts?: FetchOpts) {
  const safePage = Math.max(0, Math.floor(page));
  const safeSize = Math.max(1, Math.floor(size));

  // 1) 기본 페이지 파라미터 생성 (URLSearchParams)
  const sp = buildPageQuery(safePage, safeSize, sorts);

  // 2) 검색 파라미터 부착
  appendSearchParams(sp, {
    q: opts?.q,
    // fields가 주어지지 않으면 기본 필드 사용
    fields: opts?.fields?.length ? opts.fields : [...DEFAULT_SEARCH_FIELDS],
    filters: opts?.filters,
  });

  // 3) 최종 쿼리스트링
  const qs = `?${sp.toString()}`;

  // 4) 요청
  return api.get<LungMedicineListResponse>(`/api/lung-medicine${qs}`, {
    signal: opts?.signal,
  });
}

// 상세
export function fetchLungMedicine(id: number, opts?: { signal?: AbortSignal }) {
  return api.get<LungMedicineDetail>(`/api/lung-medicine/${id}`, {
    signal: opts?.signal,
  });
}

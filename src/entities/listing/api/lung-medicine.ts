import {api} from '@shared/api/client';
import {buildPageQuery, type SortParam} from '@shared/api/query';
import type {
  LungMedicineListResponse,
  LungMedicineDetail,
} from '@entities/listing/model/types';

// 리스트 (9개 페이징)
export function fetchLungMedicines(page = 0, size = 9, sorts: SortParam[] = [], opts?: { signal?: AbortSignal }) {
  const safePage = Math.max(0, Math.floor(page));
  const safeSize = Math.max(1, Math.floor(size));
  const qs = buildPageQuery(safePage, safeSize, sorts);

  // api.get<T>(url, { signal }) 형태 가정 (fetch/axios 모두 지원)
  return api.get<LungMedicineListResponse>(`/api/lung-medicine${qs}`, {
    signal: opts?.signal,
  });
}

// 상세
export function fetchLungMedicine(id: number) {
  return api.get<LungMedicineDetail>(`/api/lung-medicine/${id}`);
}

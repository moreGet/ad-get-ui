import {api} from '@shared/api/client';
import {buildPageQuery, type SortParam} from '@shared/api/query';
import type {
  LungMedicineListResponse,
  LungMedicineDetail,
} from '../model/types';

// 리스트 (9개 페이징)
export function fetchLungMedicines(page = 0, size = 9, sorts: SortParam[] = []) {
  const qs = buildPageQuery(page, size, sorts);
  return api.get<LungMedicineListResponse>(`/api/lung-medicine${qs}`);
}

// 상세
export function fetchLungMedicine(id: number) {
  return api.get<LungMedicineDetail>(`/api/lung-medicine/${id}`);
}

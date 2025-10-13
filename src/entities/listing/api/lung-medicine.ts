// src/entities/listing/api/lung-medicine.ts
import {api} from "@shared/api/common/client";
import {buildPageQuery, appendSearchParams, type SortParam, type KeysValues} from "@shared/api/common/query";
import type {LungMedicineListResponse, LungMedicineDetail} from "@entities/listing/model/types";
import {getDefaultSearchFieldList} from "@shared/api/common-code/static.ts";

type FetchOpts = {
  signal?: AbortSignal;
  q?: string;           // 검색어
  fields?: string[];    // 단일/부분 필드 검색 시 지정 (없으면 전체검색)
  filters?: KeysValues; // keys/values 직접 제어
};

export function fetchLungMedicines(page = 0, size = 9, sorts: SortParam[] = [], opts?: FetchOpts) {
  const safePage = Math.max(0, Math.floor(page));
  const safeSize = Math.max(1, Math.floor(size));

  const sp = buildPageQuery(safePage, safeSize, sorts);

  const defaultFields = getDefaultSearchFieldList("lung-medicine"); // 전체 검색용 기본 필드
  appendSearchParams(sp, {
    q: opts?.q,
    fields: opts?.fields?.length ? opts.fields : [...defaultFields],
    filters: opts?.filters,
  });

  const qs = `?${sp.toString()}`;
  return api.get<LungMedicineListResponse>(`/api/lung-medicine${qs}`, {signal: opts?.signal});
}

export function fetchLungMedicine(id: number, opts?: { signal?: AbortSignal }) {
  return api.get<LungMedicineDetail>(`/api/lung-medicine/${id}`, {signal: opts?.signal});
}

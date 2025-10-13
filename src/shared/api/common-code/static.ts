// src/shared/api/common-code/static.ts

/** 하드코딩된 기본 공통코드 */
export const DEFAULT_COMMON_CODE = {
  "lung-medicine": {
    fields: ["all", "installationPlaceName", "roadAddress"] as const,
    labels: {
      all: "전체",
      installationPlaceName: "설치 장소명",
      roadAddress: "도로명주소",
    },
  },
} as const;

export type CommonCodeData = typeof DEFAULT_COMMON_CODE;
export type CommonCodeKey = keyof CommonCodeData; // "lung-medicine"
export type SearchFieldOf<K extends CommonCodeKey> = CommonCodeData[K]["fields"][number];

/**
 * 페이지 코드 요구사항에 맞춰서
 * getDefaultSearchFields가 { fields, labels } 객체를 반환하도록 변경
 * (이 파일만 바꿔도 페이지 기존 코드가 그대로 동작)
 */
export function getDefaultSearchFields<K extends CommonCodeKey>(key: K): {
  fields: ReadonlyArray<SearchFieldOf<K>>;
  labels: Record<SearchFieldOf<K>, string>;
} {
  const res = DEFAULT_COMMON_CODE[key];
  return {
    fields: res.fields as ReadonlyArray<SearchFieldOf<K>>,
    labels: res.labels as Record<SearchFieldOf<K>, string>,
  };
}

/** 배열만 필요한(이전 사용처 호환) 경우용 헬퍼 */
export function getDefaultSearchFieldList<K extends CommonCodeKey>(key: K): ReadonlyArray<SearchFieldOf<K>> {
  return DEFAULT_COMMON_CODE[key].fields as ReadonlyArray<SearchFieldOf<K>>;
}

/** 서버 DTO → 스토어 형태로 정규화 (필요 시 사용) */
export function normalizeCommonCode(
  dto: { resources: Array<{ key: string; fields: string[]; labels?: Record<string, string> }> },
  fallback: CommonCodeData
): CommonCodeData {
  const next = {...fallback} as any;
  for (const r of dto.resources ?? []) {
    if (!r.key) continue;
    const fb = fallback[r.key as keyof CommonCodeData] as any;
    next[r.key] = {
      fields: (r.fields?.length ? r.fields : fb?.fields ?? []) as readonly string[],
      labels: r.labels ?? fb?.labels ?? {},
    };
  }
  return next as CommonCodeData;
}

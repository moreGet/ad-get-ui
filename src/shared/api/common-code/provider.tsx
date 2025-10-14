// src/shared/api/common-code/provider.tsx
import React, {createContext, useContext, useMemo, useState} from "react";
import {type CommonCodeData, DEFAULT_COMMON_CODE} from "./static";
// import {fetchCommonCode} from "./api"; // ← 나중에 /common/code 붙일 때 주석 해제
// import {normalizeCommonCode} from "./static";

type CommonCodeState = {
  data: CommonCodeData;
  refresh: (updater: Partial<CommonCodeData>) => void;
};

const CommonCodeContext = createContext<CommonCodeState | null>(null);

export function CommonCodeProvider({children}: { children: React.ReactNode }) {
  const [data, setData] = useState<CommonCodeData>(DEFAULT_COMMON_CODE);

  const refresh = (updater: Partial<CommonCodeData>) => {
    setData(prev => ({...prev, ...updater}));
  };

  // 🔓 /common/code 연동하려면 주석 해제
  // useEffect(() => {
  //   (async () => {
  //     const dto = await fetchCommonCode();
  //     const merged = normalizeCommonCode(dto, DEFAULT_COMMON_CODE);
  //     setData(merged);
  //   })().catch(() => {/* 실패 시 기본값 유지 */});
  // }, []);

  const value = useMemo(() => ({data, refresh}), [data]);
  return <CommonCodeContext.Provider value={value}>{children}</CommonCodeContext.Provider>;
}

/** 페이지에서 사용: 리소스별 필드/라벨 */
export function useCommonCode<K extends keyof CommonCodeData>(key: K) {
  const ctx = useContext(CommonCodeContext);
  if (!ctx) throw new Error("CommonCodeProvider로 앱 루트를 감싸주세요.");

  return {
    fields: ctx.data[key].fields as ReadonlyArray<CommonCodeData[K]["fields"][number]>,
    labels: ctx.data[key].labels as Record<CommonCodeData[K]["fields"][number], string>,
    refresh: ctx.refresh,
  };
}

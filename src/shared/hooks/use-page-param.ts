import {useCallback, useMemo} from "react";
import {useSearchParams} from "react-router-dom";

type Options = {
  name?: string;          // 쿼리 파라미터 이름 (기본 "page")
  defaultValue?: number;  // 기본값 (기본 0)
  min?: number;           // 최소값 (기본 0)
  replace?: boolean;      // 히스토리 교체 여부 (기본 true)
};

/** page 같은 정수 쿼리 파라미터를 안전하게 다루는 훅 */
export function useIntQueryParam({
                                   name = "page",
                                   defaultValue = 0,
                                   min = 0,
                                   replace = true,
                                 }: Options = {}) {
  const [sp, setSp] = useSearchParams();

  // 읽기: 안전 파싱 (정수/최소값 보장)
  const value = useMemo(() => {
    const raw = sp.get(name);
    const n = Number(raw);
    if (!raw || Number.isNaN(n) || n < min) return defaultValue;
    return Math.floor(n);
  }, [sp, name, defaultValue, min]);

  // 쓰기: 값 설정
  const setValue = useCallback(
    (v: number) => {
      const next = new URLSearchParams(sp);
      next.set(name, String(Math.max(min, Math.floor(v))));
      setSp(next, {replace});
    },
    [sp, setSp, name, min, replace]
  );

  return {value, setValue, sp, setSp};
}

// src/shared/hooks/use-reset-page-on-change.ts
import {useEffect, useRef} from "react";

/** dep가 "실제로 바뀌었을 때만" setPage(0) 하도록 리셋 */
export function useResetPageOnChange(
  dep: unknown,
  setPage: (p: number) => void,
  when?: (dep: unknown) => boolean   // 선택: 조건부 리셋
) {
  const didMountRef = useRef(false);
  const prevDepRef = useRef(dep);

  useEffect(() => {
    // 초기 마운트는 스킵 (StrictMode에서도 2회 setup을 방지)
    if (!didMountRef.current) {
      didMountRef.current = true;
      prevDepRef.current = dep;
      return;
    }

    // dep가 실제로 바뀌지 않았으면 아무 것도 하지 않음
    if (Object.is(prevDepRef.current, dep)) return;

    // 추가 조건이 있으면 검사
    if (when && !when(dep)) {
      prevDepRef.current = dep;
      return;
    }

    // 리셋
    setPage(0);
    prevDepRef.current = dep;
  }, [dep, setPage, when]);
}

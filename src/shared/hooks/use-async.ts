import {useEffect, useRef, useState, type DependencyList} from "react";

type Options<T> = {
  // true면 마운트 시 자동실행
  immediate?: boolean;
  // 의존성 배열(바뀔때마다 실행) / any[] 대신 React.DependencyList(= readonly unknown[])
  deps?: DependencyList;
  // 결과 전처리
  select?: (data: T) => T;
}

export function useAsync<T>(
  fetcher: (signal: AbortSignal) => Promise<T>,
  {immediate = true, deps = [], select}: Options<T> = {}
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(immediate);
  const [error, setError] = useState<string | null>(null);

  const lastAbort = useRef<AbortController | null>(null);

  const run = () => {
    lastAbort.current?.abort();
    const ac = new AbortController();
    lastAbort.current = ac;

    setLoading(true);
    setError(null);

    fetcher(ac.signal)
      .then(res => setData(select ? select(res) : res))
      .catch(() => {
        if (ac.signal.aborted) return;
        setError("데이터 요청중...");
      })
      .finally(() => {
        if (!ac.signal.aborted) setLoading(false)
      });
  };

  useEffect(() => {
    if (!immediate) return;
    run();
    return () => lastAbort.current?.abort();
  }, deps);

  return {data, loading, error, refetch: run, setData, setError, setLoading};
}
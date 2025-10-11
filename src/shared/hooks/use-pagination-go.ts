// src/shared/hooks/use-pagination-go.ts
import {useCallback} from "react";

export function usePaginationGo(
  totalPages: number | undefined,
  setPage: (p: number) => void
) {
  return useCallback(
    (p: number) => {
      if (totalPages == null) return;
      if (p < 0 || p >= totalPages) return;
      setPage(p);
    },
    [totalPages, setPage]
  );
}

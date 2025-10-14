// src/shared/hooks/use-scroll-to-top.ts
import {type DependencyList, type RefObject, useEffect} from "react";

type Opts = {
  behavior?: ScrollBehavior;
  block?: ScrollLogicalPosition;
};

export function useScrollToTop<T extends HTMLElement>(
  ref: RefObject<T | null>,
  deps: DependencyList,
  {behavior = "smooth", block = "start"}: Opts = {}
) {
  useEffect(() => {
    ref.current?.scrollIntoView({behavior, block}); // null 안전
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

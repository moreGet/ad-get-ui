// src/shared/config/pagination.ts
export const DEFAULT_PAGE_SIZE_DESKTOP = 9; // 3열 * 3행
export const DEFAULT_PAGE_SIZE_MOBILE  = 8; // 2열 * 4행

// (선택) 부트스트랩 브레이크포인트도 한 군데에
export const BOOTSTRAP_BREAKPOINTS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
} as const;

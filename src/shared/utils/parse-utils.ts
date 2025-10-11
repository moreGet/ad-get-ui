// src/shared/utils/route.ts
export type ParseIntOptions = {
  min?: number;        // 기본 0
  floor?: boolean;     // 기본 true: 소수점 -> 버림
};

export function parseRouteInt(
  raw: string | undefined,
  {min = 0, floor = true}: ParseIntOptions = {}
): number {
  const n = Number(raw);
  if (!raw || Number.isNaN(n) || n < min) return 0;
  return floor ? Math.floor(n) : n;
}

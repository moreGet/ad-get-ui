export type KstFormatOptions = {
  withSeconds?: boolean;
  includeZone?: boolean;
};

/**
 * UTC 날짜/문자열을 KST(Asia/Seoul) 기준으로 포매팅합니다.
 * 입력: ISO 문자열, Date, 타임스탬프(ms)
 * 출력 예: "2025-11-02 14:30" / "2025-11-02 14:30:12 KST"
 * 값이 없거나 파싱 실패 시: "어제(KST)" 시각을 동일 포맷으로 반환
 */
export function formatUtcToKst(
  value: string | number | Date | null | undefined,
  opts: KstFormatOptions = {}
): string {
  const {withSeconds = false, includeZone = false} = opts;

  // 공통 포매터 (KST)
  const makeFormatter = (withSecs: boolean) =>
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: withSecs ? "2-digit" : undefined,
      hour12: false,
    });

  // 정상 값 -> Date, 실패 시 undefined
  const makeDateSafe = (v: string | number | Date | null | undefined): Date | undefined => {
    if (v == null) return undefined;
    const d = new Date(v);
    return isNaN(d.getTime()) ? undefined : d;
  };

  // 포맷 함수
  const formatKst = (d: Date) => {
    const formatter = makeFormatter(withSeconds);
    const parts = formatter.formatToParts(d);
    const pick = (t: Intl.DateTimeFormatPartTypes) =>
      parts.find(p => p.type === t)?.value ?? "";

    const yyyy = pick("year");
    const mm = pick("month");
    const dd = pick("day");
    const hh = pick("hour");
    const mi = pick("minute");
    const ss = withSeconds ? pick("second") : "";

    const time = withSeconds ? `${hh}:${mi}:${ss}` : `${hh}:${mi}`;
    return includeZone ? `${yyyy}-${mm}-${dd} ${time} KST` : `${yyyy}-${mm}-${dd} ${time}`;
  };

  // 메인 로직
  const safe = makeDateSafe(value);
  if (safe) return formatKst(safe);

  // fallback: "어제(KST)" 시각 반환
  // (한국은 DST가 없으므로 24시간(86400000ms) 감소로 안전)
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return formatKst(yesterday);
}

/**
 * 연산용 KST Date: UTC 기준값에 +9h 적용
 * (화면 출력은 반드시 formatUtcToKst를 사용하세요)
 */
export function asKstDate(value: string | number | Date): Date {
  const d = new Date(value);
  return new Date(d.getTime() + 9 * 60 * 60 * 1000);
}

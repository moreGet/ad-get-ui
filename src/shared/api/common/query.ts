export type SortParam = { by: string; desc: boolean };
export type KeysValues = { keys: string[]; values: string[] };

export function appendSearchParams(
  sp: URLSearchParams,
  opts?: { q?: string; fields?: string[]; filters?: KeysValues }
) {
  // 1) 직접 keys/values 넘겼을 때 (우선순위 높음)
  if (opts?.filters?.keys?.length && opts?.filters?.values?.length) {
    opts.filters.keys.forEach((k) => sp.append("keys", k));
    opts.filters.values.forEach((v) => sp.append("values", v));
    return;
  }

  // 2) q만 넘겼을 때 필드 매핑
  const q = opts?.q?.trim();
  if (q) {
    const fields = (opts?.fields?.length ? opts.fields : []) as string[];
    fields.forEach((f) => sp.append("keys", f));
    fields.forEach(() => sp.append("values", q));
  }
}

export function buildPageQuery(page = 1, size = 9, sorts: SortParam[] = []): URLSearchParams {
  const sp = new URLSearchParams();
  sp.set("currentPage", String(page));
  sp.set("pageSize", String(size));
  sorts.forEach((s) => {
    sp.append("sortBy", s.by);
    sp.append("sortDesc", String(s.desc));
  });
  return sp;
}
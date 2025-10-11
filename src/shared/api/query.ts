export type SortParam = { by: string; desc: boolean };

export function buildPageQuery(page = 1, size = 9, sorts: SortParam[] = []) {
  const sp = new URLSearchParams();
  sp.set('currentPage', String(page));
  sp.set('pageSize', String(size));
  sorts.forEach(s => {
    sp.append('sortBy', s.by);
    sp.append('sortDesc', String(s.desc));
  });
  return `?${sp.toString()}`;
}

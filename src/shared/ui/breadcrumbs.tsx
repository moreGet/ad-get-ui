// src/shared/ui/breadcrumbs.tsx
import {useMemo} from "react";
import {Link, useMatches, type UIMatch} from "react-router-dom";
import type React from "react";

type Crumb = { label: React.ReactNode; to?: string; active?: boolean };

type BreadcrumbsProps = { items?: Crumb[] };

type BreadcrumbFactory = (ctx: {
  data: unknown;
  params: Record<string, string | undefined>;
}) => React.ReactNode;
type RouteHandle = { breadcrumb?: React.ReactNode | BreadcrumbFactory };

// handle에 breadcrumb가 있는지 확인하는 타입가드
function hasBreadcrumb(
  handle: unknown
): handle is { breadcrumb: RouteHandle["breadcrumb"] } {
  return !!handle && typeof handle === "object" && "breadcrumb" in handle;
}

export default function Breadcrumbs({items}: BreadcrumbsProps) {
  // ✅ 훅은 컴포넌트 최상위에서 호출
  const rawMatches = useMatches() as Array<UIMatch<unknown, RouteHandle>>;

  // CSS var 타입 안전
  const dividerStyle: React.CSSProperties & Record<"--bs-breadcrumb-divider", string> = {
    "--bs-breadcrumb-divider": "'>'",
  };

  // items가 없을 때에만 matches로부터 파생
  const crumbs: Crumb[] = useMemo(() => {
    if (items) return items;

    const withBc = rawMatches.filter((m) => hasBreadcrumb(m.handle));
    const sliced = withBc.slice(1); // 홈 제거 (원하면 유지)

    return sliced.map((m, i, arr) => {
      const bc = m.handle.breadcrumb!;
      const label =
        typeof bc === "function"
          ? bc({data: m.data, params: m.params as Record<string, string | undefined>})
          : bc;
      return {label, active: i === arr.length - 1};
    });
  }, [items, rawMatches]);

  return (
    <nav aria-label="breadcrumb" className="small text-secondary mb-2" style={dividerStyle}>
      <ol className="breadcrumb mb-0">
        {crumbs.map((c, idx) => {
          const isActive = c.active ?? (!c.to && idx === crumbs.length - 1);
          return (
            <li
              key={idx}
              className={`breadcrumb-item ${isActive ? "active" : ""}`}
              aria-current={isActive ? "page" : undefined}
            >
              {c.to && !isActive ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

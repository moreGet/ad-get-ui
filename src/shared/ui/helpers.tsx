import React from "react";

type SectionHeaderProps = {
  title: React.ReactNode;
  id?: string;
  className?: string;
};

export function SectionHeader({title, id, className}: SectionHeaderProps) {
  return (
    <h2 id={id} className={`h5 fw-bold mb-3 ${className ?? ""}`}>
      {title}
    </h2>
  );
}

type FieldProps = {
  label: React.ReactNode;
  children: React.ReactNode;
  hint?: React.ReactNode;
  /** 라벨 오른쪽에 배치할 액션 버튼/링크 등 */
  action?: React.ReactNode;
  className?: string;
};

export function Field({label, children, hint, action, className}: FieldProps) {
  return (
    <div className={`mb-3 ${className ?? ""}`}>
      <div className="d-flex align-items-center justify-content-between gap-2">
        <div
          className="text-uppercase text-body-secondary small fw-semibold"
          style={{letterSpacing: ".03em"}}
        >
          {label}
        </div>
        {action}
      </div>

      <div className="fs-5 fw-semibold">{children}</div>

      {hint && <div className="small text-body-secondary mt-1">{hint}</div>}
    </div>
  );
}

import type {ReactNode} from "react";

type ListCardProps = {
  title: string;
  description?: string;
  /** 카드 하단 액션 영역(버튼/링크 등)을 외부에서 주입 */
  children?: ReactNode;
  /** 선택: 추가 클래스 (예: card-hover 등) */
  className?: string;
};

export default function ListCard({title, description, children, className}: ListCardProps) {
  return (
    <div className={`card h-100 ${className ?? ""}`}>
      <div className="card-body text-start d-flex flex-column">
        <h6 className="card-title fw-semibold mb-2">{title}</h6>
        {description && (
          <p className="card-text text-muted small mb-3">{description}</p>
        )}

        {/* 액션(외부 주입) */}
        {children && <div className="mt-auto d-flex gap-2">{children}</div>}
      </div>
    </div>
  );
}

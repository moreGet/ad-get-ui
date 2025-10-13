// src/shared/ui/dashboard-card.tsx
import {Link} from "react-router-dom";

type DashboardCardProps = {
  to: string;              // 라우팅 경로 (예: "/lung-medicine")
  title: string;           // 카드 타이틀
  description?: string;    // 선택 설명
  imgSrc?: string;         // 왼쪽 이미지 (선택)
  imgAlt?: string;         // 이미지 대체 텍스트
};

export default function DashboardCard({
                                        to,
                                        title,
                                        description,
                                        imgSrc,
                                        imgAlt,
                                      }: DashboardCardProps) {
  return (
    <div className="card h-100 shadow-sm position-relative">
      <div className="card-body d-flex align-items-center gap-3">
        {/* 왼쪽 이미지 영역 */}
        {imgSrc ? (
          <img
            src={imgSrc}
            alt={imgAlt ?? ""}
            className="rounded object-fit-cover flex-shrink-0"
            style={{width: 72, height: 72}}
          />
        ) : (
          <div
            className="bg-light rounded d-flex align-items-center justify-content-center text-muted flex-shrink-0"
            style={{width: 72, height: 72}}
            aria-hidden="true"
          >
            📦
          </div>
        )}

        {/* 오른쪽 텍스트 영역 */}
        <div className="text-start">
          <h5 className="card-title mb-1">{title}</h5>
          {description && (
            <p className="card-text text-muted small mb-0">{description}</p>
          )}
        </div>
      </div>

      {/* 카드 전체를 클릭 가능하게 */}
      <Link to={to} className="stretched-link" aria-label={`${title}로 이동`}/>
    </div>
  );
}

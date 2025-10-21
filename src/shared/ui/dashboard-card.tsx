// src/shared/ui/dashboard-card.tsx
import {Link} from "react-router-dom";

type DashboardCardProps = {
  to: string;
  title: string;
  description?: string;
  imgSrc?: string;     // 정지 이미지
  amiImgSrc?: string;  // 애니메이션 이미지 (GIF/APNG 등)
  imgAlt?: string;
};

export default function DashboardCard({
                                        to,
                                        title,
                                        description,
                                        imgSrc,
                                        amiImgSrc,
                                        imgAlt,
                                      }: DashboardCardProps) {
  return (
    <div className="card card-hover h-100 shadow-sm position-relative">
      <div className="card-body d-flex align-items-center gap-3">
        {(imgSrc || amiImgSrc) ? (
          <div className="thumb">
            {imgSrc && (
              <img
                src={imgSrc}
                alt={imgAlt ?? ""}
                loading="lazy"
                decoding="async"
                className="thumb__img thumb__img--still"
              />
            )}
            {amiImgSrc && (
              <img
                src={amiImgSrc}
                alt={imgAlt ?? ""}
                aria-hidden={!!imgSrc}
                loading="lazy"
                decoding="async"
                className="thumb__img thumb__img--anim"
              />
            )}
          </div>
        ) : (
          <div
            className="bg-light rounded d-flex align-items-center justify-content-center text-muted flex-shrink-0"
            style={{width: 72, height: 72}}
            aria-hidden="true"
          >
            📦
          </div>
        )}

        <div className="text-start">
          <h5 className="card-title mb-1">{title}</h5>
          {description && (
            <p className="card-text text-muted small mb-0">{description}</p>
          )}
        </div>
      </div>

      <Link to={to} className="stretched-link" aria-label={`${title}로 이동`}/>
    </div>
  );
}
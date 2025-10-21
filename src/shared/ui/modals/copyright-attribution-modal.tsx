// src/shared/ui/modals/CopyrightAttributionModal.tsx
import {useEffect, useState} from "react"
import {createPortal} from "react-dom"
import certificationAmiImg from "@assets/certification.gif";

type Props = { open: boolean; onClose: () => void }

export default function CopyrightAttributionModal({open, onClose}: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => setMounted(true), 30)
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onEsc)
    return () => {
      clearTimeout(t)
      document.removeEventListener("keydown", onEsc)
      setMounted(false)
    }
  }, [open, onClose])

  if (!open) return null

  // 변경 전: style / inline 스타일 다수
// 변경 후: 클래스 적용만

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="copyright-modal-title"
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center modal-overlay-blur"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow p-4 p-sm-5 modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className={`mb-2 ${mounted ? "is-revealing" : ""}`}>
          <div className="d-flex align-items-center gap-1">
            {/* GIF (제목 왼쪽) */}
            <img
              src={certificationAmiImg}
              alt=""              // 장식용이면 alt 비워두기
              aria-hidden="true"  // 스크린리더 감춤
              width={45}
              height={45}
              loading="lazy"
              decoding="async"
              className="rounded-2"
              style={{objectFit: "contain"}}
            />
            <h5 id="copyright-modal-title" data-reveal="hero" className="m-0">
              저작권 안내
            </h5>
          </div>
          <hr className="title-divider"/>
        </div>

        {/* 본문 */}
        <div className={`pt-3 reveal-stagger ${mounted ? "is-visible" : ""}`}>
          {/* 아이콘/그래픽 출처 (Freepik) */}
          <p className="mb-3">
            이 사이트는 화면에 표시되는 <strong>아이콘/그래픽 일부에 Freepik 리소스</strong>를 사용합니다.
          </p>

          <div className="d-flex align-items-center gap-2">
            <a
              href="https://www.freepik.com"
              target="_blank"
              rel="noreferrer"
              className="badge rounded-pill border fw-medium badge-soft badge-click text-decoration-none"
              title="Freepik 공식 사이트로 이동"
            >
              Designed by <span className="brand-link">Freepik</span> ↗
            </a>

            <a
              href="https://www.freepik.com"
              target="_blank"
              rel="noreferrer"
              className="badge rounded-pill border fw-medium badge-soft badge-click text-decoration-none"
              title="Freepik 공식 사이트로 이동"
            >
              <span className="brand-link">https://www.freepik.com</span> ↗
            </a>
          </div>

          {/* 데이터 출처 명시 (공공데이터) */}
          <hr className="my-4 opacity-25"/>

          <p className="mb-3">
            본 서비스에서 사용하는 <strong>데이터셋은 모두 공공데이터</strong>를 기반으로 합니다.
          </p>

          <div className="d-flex align-items-center gap-2">
            {/* data.go.kr 배지 (URL 표기) */}
            <a
              href="https://www.data.go.kr/"
              target="_blank"
              rel="noreferrer"
              className="badge rounded-pill border fw-medium badge-soft badge-click text-decoration-none"
              title="공공데이터포털 (data.go.kr)로 이동"
            >
              <span className="brand-link">https://www.data.go.kr/</span> ↗
            </a>
          </div>
        </div>

        {/* 액션 */}
        <div className="d-flex justify-content-end gap-2 mt-4">
          <button className="btn btn-primary" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>,
    document.body
  )
}

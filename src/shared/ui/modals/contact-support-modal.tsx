// src/shared/ui/modals/ContactSupportModal.tsx
import {useEffect, useState} from "react"
import {createPortal} from "react-dom"
import contactAmiGif from "@assets/contact.gif"

type Props = {
  open: boolean
  onClose: () => void
  /** 화면에 노출할 고객센터 메일 주소 */
  supportEmail?: string
  /** 큰 아이콘 이미지 경로 (gif/svg/png). 없으면 기본 GIF 사용 */
  iconSrc?: string
}

export default function ContactSupportModal({
                                              open,
                                              onClose,
                                              supportEmail = "support@opendatamaru.kr",
                                              iconSrc = contactAmiGif, // ✅ 기본값: 프로젝트 내 GIF
                                            }: Props) {
  const [mounted, setMounted] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!open) return
    const t = setTimeout(() => setMounted(true), 30)
    const onEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    document.addEventListener("keydown", onEsc)
    return () => {
      clearTimeout(t)
      document.removeEventListener("keydown", onEsc)
      setMounted(false)
      setCopied(false)
    }
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center modal-overlay-blur"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-4 shadow p-4 p-sm-5 modal-card-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className={`mb-2 ${mounted ? "is-revealing" : ""}`}>
          <div className="d-flex justify-content-between align-items-start">
            <div className="d-flex align-items-center gap-1">
              {iconSrc ? (
                <img
                  src={iconSrc}
                  alt=""
                  aria-hidden="true"
                  width={56}
                  height={56}
                  loading="lazy"
                  decoding="async"
                  className="rounded-3 object-fit-contain"
                />
              ) : (
                <div aria-hidden="true" className="icon-box-lg">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M4 6h16v12H4z" stroke="#2b2f36" strokeWidth="1.5"/>
                    <path d="M4 6l8 6 8-6" stroke="#2b2f36" strokeWidth="1.5" fill="none"/>
                  </svg>
                </div>
              )}
              <h5 id="contact-modal-title" data-reveal="hero" className="m-0">
                문의 (Contact Info)
              </h5>
            </div>
          </div>
          <hr className="title-divider"/>
        </div>

        {/* 내용 */}
        <div className={`pt-3 reveal-stagger ${mounted ? "is-visible" : ""}`}>
          <ul className="list-unstyled m-0">
            {/* 고객센터 근무시간 */}
            <li className="mb-3">
              <h6 className="mb-2 d-flex align-items-center gap-2">
                <span className="fw-bold text-dark" aria-hidden="true">ㅇ</span>
                <span>고객센터 운영시간</span>
              </h6>
              <ul className="list-unstyled m-0 ps-4">
                <li className="d-flex">
                  <span className="me-2 text-secondary">-</span>
                  <span>평일 <strong>10:00 ~ 18:00</strong></span>
                </li>
              </ul>
            </li>

            {/* 연락처 */}
            <li className="mb-3">
              <h6 className="mb-2 d-flex align-items-center gap-2">
                <span className="fw-bold text-dark" aria-hidden="true">ㅇ</span>
                <span>연락처</span>
              </h6>
              <ul className="list-unstyled m-0 ps-4">
                <li className="d-flex align-items-center">
                  <span className="me-2 text-secondary">-</span>
                  <span className="me-2">{supportEmail}</span>
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={async () => {
                      try {
                        await navigator.clipboard.writeText(supportEmail)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 1200)
                      } catch {
                        setCopied(false)
                      }
                    }}
                  >
                    {copied ? "복사됨" : "복사"}
                  </button>
                </li>
              </ul>
            </li>
          </ul>

          {/* 안내 문구 */}
          <p className="mt-2 mb-0 small text-muted">※ 주말 및 공휴일은 휴무 입니다.</p>
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

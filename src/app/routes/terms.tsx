import {useEffect, useRef} from "react";
import title from "@assets/logo/title.png";

export default function Terms() {
  const effective = "2025-10-21";
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;

    // 순서: 문서의 DOM 순서대로 NodeList를 가져와 index 기반 지연 적용
    const nodes = root.querySelectorAll<HTMLElement>("[data-reveal]");
    nodes.forEach((el, i) => {
      const delay = reduce ? 0 : (0.06 * i);
      el.style.setProperty('--reveal-delay', `${delay}s`);
    });

    // 뷰포트에 들어오면 한 번만 재생
    if (reduce) {
      root.classList.add("is-revealing");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            root.classList.add("is-revealing");
            io.disconnect();
          }
        });
      },
      {threshold: 0.12, rootMargin: "0px 0px -8% 0px"}
    );
    io.observe(root);
    return () => io.disconnect();
  }, []);

  return (
    <div className="container py-2">
      <div ref={rootRef} className="content-narrow mx-auto">
        {/* 로고 히어로 */}
        <div className="terms-hero text-center mb-4" data-reveal="hero">
          <img
            src={title}
            alt="OpenData Maru"
            className="brand-title img-fluid"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* 제목 */}
        <h1 className="h4 fw-semibold mb-4" data-reveal>
          이용 안내 및 면책 고지
        </h1>

        {/* 1 */}
        <section className="section" data-reveal>
          <h2 className="h6 fw-bold section-title">1. 서비스 개요</h2>
          <ul className="k-bullets k-bullets--dash" data-reveal>
            <li>OpenData Maru는 개인이 비영리로 운영하는 공공데이터 기반 웹사이트입니다.</li>
            <li>공공데이터포털 등에서 제공되는 공개 데이터를 가공·시각화하여 참고용 정보를 제공합니다.</li>
            <li>회원가입·로그인·결제 등 영리 목적 기능을 제공하지 않습니다.</li>
          </ul>
        </section>

        {/* 2 */}
        <section className="section" data-reveal>
          <h2 className="h6 fw-bold section-title">2. 데이터 및 저작권</h2>
          <ul className="k-bullets k-bullets--dash" data-reveal>
            <li>원본 데이터의 저작권과 권리는 각 공공데이터 제공 기관에 귀속됩니다.</li>
            <li>본 사이트는 원본 데이터를 가공·정리·시각화하여 제공합니다.</li>
            <li>사이트 내 UI/디자인/코드 및 시각화 결과 등 2차 저작물의 권리는 운영자에게 귀속됩니다.</li>
          </ul>
          <ul className="k-bullets k-bullets--circle mt-2" data-reveal>
            <li>데이터 재이용 시에는 반드시 원 데이터 제공 기관의 이용정책을 준수해야 합니다.</li>
          </ul>
        </section>

        {/* 3 */}
        <section className="section" data-reveal>
          <h2 className="h6 fw-bold section-title">3. 이용자 유의사항</h2>
          <ul className="k-bullets k-bullets--dash" data-reveal>
            <li>본 사이트의 정보와 자료는 비상업적 참고 목적으로만 사용 가능합니다.</li>
            <li>무단 복제·배포·가공·판매 등 영리적 이용은 금지됩니다.</li>
          </ul>
        </section>

        {/* 4 */}
        <section className="section" data-reveal>
          <h2 className="h6 fw-bold section-title">4. 개인정보</h2>
          <ul className="k-bullets k-bullets--dash" data-reveal>
            <li>본 사이트는 회원가입·로그인 기능을 제공하지 않으며, 개인정보를 수집·저장하지 않습니다.</li>
            <li>방문 기록이 수집되는 경우에도 통계·보안 목적의 비식별 정보로만 활용될 수 있습니다.</li>
          </ul>
        </section>

        {/* 5 */}
        <section className="section" data-reveal>
          <h2 className="h6 fw-bold section-title">5. 책임의 한계 및 면책</h2>
          <ul className="k-bullets k-bullets--dash" data-reveal>
            <li>본 사이트의 정보는 참고용으로 제공되며, 법적 효력을 가지지 않습니다.</li>
            <li>데이터의 정확성·완전성·최신성·적합성에 대하여 어떠한 명시적·묵시적 보증도 제공하지 않습니다.</li>
            <li>공공데이터의 오류·누락·지연, 외부 API 장애, 네트워크·시스템 문제로 발생하는 손해에 대해 일체 책임을 지지 않습니다.</li>
            <li>이용자가 본 사이트의 정보를 사용함으로써 발생하는 직·간접적 손해, 특별·부수적 손해에 대해 책임을 지지 않습니다.</li>
            <li>예고 없이 서비스의 일부 또는 전체를 변경·중단할 수 있으며, 이에 따른 손해에 대해 책임을 지지 않습니다.</li>
          </ul>
          <ul className="k-bullets k-bullets--circle mt-2" data-reveal>
            <li>이 면책은 관련 법령이 허용하는 최대 범위까지 적용됩니다.</li>
          </ul>
        </section>

        {/* 6 */}
        <section className="section" data-reveal>
          <h2 className="h6 fw-bold section-title">6. 기타</h2>
          <ul className="k-bullets k-bullets--dash" data-reveal>
            <li>본 문서는 법적 계약이 아닌, 서비스 이용에 관한 고지를 목적으로 합니다.</li>
            <li>필요 시 내용이 예고 없이 갱신될 수 있습니다.</li>
          </ul>
        </section>

        <p className="text-muted small mt-3 fw-bold" data-reveal>
          적용일자: {effective}
        </p>
      </div>
    </div>
  );
}
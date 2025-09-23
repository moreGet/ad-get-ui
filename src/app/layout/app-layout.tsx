import type {ReactNode} from 'react';

import Navbar from '@widgets/navbar/ui/navbar'
import Footer from '@widgets/footer/ui/footer'
import LeftRail from '@widgets/ad-rail/ui/left-rail'
import RightRail from '@widgets/ad-rail/ui/right-rail'

/**
 * AppLayout
 *
 * - 모든 페이지 공통 레이아웃
 * - Header, Footer, Navbar 등을 이곳에 배치 가능
 * - children 부분에 개별 페이지 내용이 렌더링됨
 */
export default function AppLayout({children}: { children: ReactNode }) {
  return (
    <div className="app-layout d-flex flex-column min-vh-100">
      <header className="app-navbar sticky-top bg-white border-bottom">
        <div className="container-fluid">
          <Navbar/>
        </div>
      </header>

      <div className="container-fluid flex-grow-1">
        <div className="d-flex flex-row flex-nowrap gap-3 py-3">
          <aside className="ad-rail-left flex-shrink-0">
            <div className="rail-sticky"><LeftRail/></div>
          </aside>

          <main className="flex-grow-1 min-w-0 app-content">
            {children}
          </main>

          <aside className="ad-rail-right flex-shrink-0">
            <div className="rail-sticky"><RightRail/></div>
          </aside>
        </div>
      </div>

      <footer className="app-footer border-top bg-white">
        <div className="container-fluid py-3">
          <Footer/>
        </div>
      </footer>
    </div>
  );
}

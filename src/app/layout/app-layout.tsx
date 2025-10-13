import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';
import Navbar from '@widgets/navbar/ui/navbar';
import Footer from '@widgets/footer/ui/footer';
import LeftRail from '@widgets/ad-rail/ui/left-rail';
import RightRail from '@widgets/ad-rail/ui/right-rail';
import {CommonCodeProvider} from "@shared/api/common-code/provider";

export default function AppLayout() {
  return (
    <div className="app-layout d-flex flex-column min-vh-100">
      <header className="app-navbar sticky-top bg-white border-bottom">
        <div className="container-fluid">
          <Navbar/>
        </div>
      </header>

      <div className="container-fluid flex-grow-1">
        <div className="d-flex flex-row flex-nowrap gap-0 py-3">
          <aside className="ad-rail-left flex-shrink-0">
            <div className="rail-sticky"><LeftRail/></div>
          </aside>

          <CommonCodeProvider>
            <main className="flex-grow-1 min-w-0 app-content">
              {/* 페이지 영역 */}
              <Suspense fallback={<div className="container py-5">Loading…</div>}>
                <Outlet/>
              </Suspense>
            </main>
          </CommonCodeProvider>

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

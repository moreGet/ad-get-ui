import React from 'react';
import Navbar from '@widgets/navbar/ui/navbar';
import Footer from '@widgets/footer/ui/footer';
import LeftRail from '@widgets/ad-rail/ui/left-rail';
import RightRail from '@widgets/ad-rail/ui/right-rail';

export default function AppLayout({children}: { children: React.ReactNode }) {
  return (
    <div className="bg-light min-vh-100 d-flex flex-column">
      <Navbar/>
      <main className="container-xxl flex-grow-1 py-3">
        <div className="row g-3">
          <aside className="col-lg-2 d-none d-lg-block"><LeftRail/></aside>
          <section className="col-12 col-lg-8">{children}</section>
          <aside className="col-xl-2 d-none d-xl-block"><RightRail/></aside>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

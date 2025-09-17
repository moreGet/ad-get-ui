import type {ReactNode} from 'react';

/**
 * AppLayout
 *
 * - 모든 페이지 공통 레이아웃
 * - Header, Footer, Navbar 등을 이곳에 배치 가능
 * - children 부분에 개별 페이지 내용이 렌더링됨
 */
export default function AppLayout({children}: { children: ReactNode }) {
  return (
    <div className="app-layout">
      {/* 예: 공통 헤더 */}
      <header className="app-header">
        <h1>My App</h1>
      </header>

      {/* 페이지 개별 콘텐츠 */}
      <main className="app-content">
        {children}
      </main>

      {/* 예: 공통 푸터 */}
      <footer className="app-footer">
        <p>© 2025 My App. All rights reserved.</p>
      </footer>
    </div>
  );
}

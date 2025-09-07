// src/app/routes/index.tsx
import {lazy, Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AppLayout from '@app/layout/app-layout';

// 코드 스플리팅
const HomePage = lazy(() => import('@pages/home'));
const ListingPage = lazy(() => import('@pages/listing'));
const NotFoundPage = lazy(() => import('@pages/not-found'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout><Suspense
      fallback={<div className="container py-5">Loading…</div>}><HomePage/></Suspense></AppLayout>,
    errorElement: (
      <AppLayout>
        <Suspense fallback={<div className="container py-5">Loading…</div>}>
          <NotFoundPage/>
        </Suspense>
      </AppLayout>
    ),
  },
  {
    path: '/listing',
    element: <AppLayout><Suspense
      fallback={<div className="container py-5">Loading…</div>}><ListingPage/></Suspense></AppLayout>,
  },
  // 예: 상세 페이지가 필요하면 이렇게 추가
  // {
  //   path: '/listing/:id',
  //   element: <AppLayout><Suspense fallback={<div className="container py-5">Loading…</div>}><ListingDetailPage /></Suspense></AppLayout>,
  // },
  {
    path: '*',
    element: <AppLayout><Suspense
      fallback={<div className="container py-5">Loading…</div>}><NotFoundPage/></Suspense></AppLayout>
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router}/>;
}

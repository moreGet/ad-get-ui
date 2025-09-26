import {lazy, Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AppLayout from '@app/layout/app-layout';

const HomePage = lazy(() => import('@app/routes/home-page'));
const LungMedicineListPage = lazy(() => import('@app/routes/lung-medicine-list-page'));
const NotFoundPage = lazy(() => import('@app/routes/not-found-page'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <AppLayout>
        <Suspense fallback={<div className="container py-5">Loading…</div>}>
          <HomePage/>
        </Suspense>
      </AppLayout>
    ),
    errorElement: (
      <AppLayout>
        <Suspense fallback={<div className="container py-5">Loading…</div>}>
          <NotFoundPage/>
        </Suspense>
      </AppLayout>
    ),
  },
  {
    path: '/lung-medicine/list',
    element: (
      <AppLayout>
        <Suspense fallback={<div className="container py-5">Loading…</div>}>
          <LungMedicineListPage/>
        </Suspense>
      </AppLayout>
    ),
  },
  {
    path: '*',
    element: (
      <AppLayout>
        <Suspense fallback={<div className="container py-5">Loading…</div>}>
          <NotFoundPage/>
        </Suspense>
      </AppLayout>
    ),
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router}/>;
}

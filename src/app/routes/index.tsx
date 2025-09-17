import {lazy, Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AppLayout from '@app/layout/app-layout';

const HomePage = lazy(() => import('@app/routes/home-page'));
const ListingPage = lazy(() => import('@app/routes/listing-page'));
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
    path: '/listing',
    element: (
      <AppLayout>
        <Suspense fallback={<div className="container py-5">Loading…</div>}>
          <ListingPage/>
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

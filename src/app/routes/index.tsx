// @app/routes/index.tsx
import {createBrowserRouter, RouterProvider, Link} from 'react-router-dom';
import AppLayout from '@app/layout/app-layout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout/>,
    handle: {breadcrumb: () => <Link to="/">홈</Link>},
    // 에러를 레이아웃 안에서 보여주고 싶다면 이렇게:
    errorElement: <AppLayout/>,
    children: [
      {
        index: true,
        lazy: () => import('@app/routes/home-page').then(m => ({Component: m.default})),
      },
      {
        path: 'lung-medicine/list',
        handle: {breadcrumb: () => "(폐)의약품 수거함"},
        lazy: () => import('@app/routes/lung-medicine-list-page').then(m => ({Component: m.default})),
      },
      {
        path: 'lung-medicine/:id',
        lazy: () => import('@app/routes/lung-medicine-detail-page').then(m => ({Component: m.default})),
      },
      {
        path: '*',
        lazy: () => import('@app/routes/not-found-page').then(m => ({Component: m.default})),
      },
    ],
  },
]);

export default function AppRoutes() {
  return <RouterProvider router={router}/>;
}

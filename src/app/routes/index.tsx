// @app/routes/index.tsx
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import AppLayout from '@app/layout/app-layout';

import {ROUTES, TEXT} from "@shared/constants/text";

const router = createBrowserRouter([
  {
    path: ROUTES.home,
    element: <AppLayout/>,
    // 에러를 레이아웃 안에서 보여주고 싶다면 이렇게:
    errorElement: <AppLayout/>,
    children: [
      {
        index: true,
        lazy: () => import('@app/routes/home').then(m => ({Component: m.default})),
      },
      {
        path: ROUTES.lungMedicineList,
        handle: {breadcrumb: () => TEXT.lungMedicine.title},
        lazy: () => import('@app/routes/lung-medicine-list').then(m => ({Component: m.default})),
      },
      {
        path: ROUTES.lungMedicineDetail,
        lazy: () => import('@app/routes/lung-medicine-detail').then(m => ({Component: m.default})),
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

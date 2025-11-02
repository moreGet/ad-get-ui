// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from '@app/routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@assets/global.css';
import {HelmetProvider} from "react-helmet-async";

// 메타태그 확인시 스트릭 모드 끄기
ReactDOM.createRoot(document.getElementById('root')!).render(
  <HelmetProvider>
    <React.StrictMode>
      <AppRoutes/>
    </React.StrictMode>
  </HelmetProvider>
)

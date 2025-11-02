// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from '@app/routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import '@assets/global.css';
import {HelmetProvider} from "react-helmet-async";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <AppRoutes/>
    </HelmetProvider>
  </React.StrictMode>
)

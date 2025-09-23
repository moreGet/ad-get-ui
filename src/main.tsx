// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from '@app/routes'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@assets/global.css';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes/>
  </React.StrictMode>
)

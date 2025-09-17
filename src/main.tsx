// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppRoutes from '@app/routes'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppRoutes/>
  </React.StrictMode>
)

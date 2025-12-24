import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@/shared/styles/index.css'
import AuthListener from '@/shared/auth/AuthListener'

import AppRoutes from './routes/AppRoutes'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthListener />
    <AppRoutes />
  </StrictMode>,
)

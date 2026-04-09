import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PreviewPage } from './pages/PreviewPage.tsx'

const isPreview = window.location.pathname === '/preview';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPreview ? <PreviewPage /> : <App />}
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { PreviewPage } from './pages/PreviewPage.tsx'

const isPreview = ['/preview', '/preview.html', '/preview/'].includes(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isPreview ? <PreviewPage /> : <App />}
  </StrictMode>,
)

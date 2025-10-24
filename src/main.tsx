import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './presentation/app/App.tsx'
// import { GlobalBlobBackground}  from './presentation/components'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
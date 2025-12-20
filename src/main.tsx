import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import HeaderNav from './components/HeaderNav.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HeaderNav />
    <App />
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter wraps App component for routing purposes i.e navigation through app.*/}
    <BrowserRouter>
      <App />
    </BrowserRouter>   
  </StrictMode>,
)

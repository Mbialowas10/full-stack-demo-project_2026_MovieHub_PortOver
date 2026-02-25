import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
<<<<<<< HEAD
=======
import { ClerkProvider } from '@clerk/clerk-react'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
>>>>>>> clerk

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter wraps App component for routing purposes i.e navigation through app.*/}
    <BrowserRouter>
<<<<<<< HEAD
      <App />
=======
      <ClerkProvider publishableKey={clerkPubKey}>
        <App />
      </ClerkProvider>
>>>>>>> clerk
    </BrowserRouter>   
  </StrictMode>,
)

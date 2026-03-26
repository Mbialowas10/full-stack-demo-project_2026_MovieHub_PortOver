import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'

// recall that VITE_ prefix is used to access environment variables in Vite. Here we are accessing the Clerk publishable key from the environment variables to initialize Clerk in our application.
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* BrowserRouter wraps App component for routing purposes i.e navigation through app.*/}
    <BrowserRouter>
      {/* ClerkProvider wraps App component to provide authentication context to the entire app. It takes the publishable key as a prop to initialize Clerk. */}
      <ClerkProvider publishableKey={clerkPubKey}>
        <App />
      </ClerkProvider>
    </BrowserRouter>   
  </StrictMode>,
)

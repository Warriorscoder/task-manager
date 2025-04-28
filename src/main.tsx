import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import Signin from './components/auth/Sign-in'
import Signup from './components/auth/Sign-up'
import Dashboard from './components/Dashboard'
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <BrowserRouter>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* <Route path="/" element={<Navigate to="/dashboard"/>}/> */}
            <Route path="/sign-in" element={<Signin />} />
            <Route path="/sign-up" element={<Signup />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  // <StrictMode> this is commented cuz there are two success notifications when trying to execute "makePrimary" method
    <BrowserRouter>
      <App />
    </BrowserRouter>
)

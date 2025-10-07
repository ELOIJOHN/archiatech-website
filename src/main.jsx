import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ArchiAtechWebsite from './archiatech-website.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ArchiAtechWebsite />
  </StrictMode>,
)
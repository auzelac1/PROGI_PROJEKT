import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import App from './App.jsx'

const colorScheme = window.matchMedia('(prefers-color-scheme: dark)')

function syncBootstrapTheme() {
  document.documentElement.dataset.bsTheme = colorScheme.matches ? 'dark' : 'light'
}

syncBootstrapTheme()
colorScheme.addEventListener('change', syncBootstrapTheme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

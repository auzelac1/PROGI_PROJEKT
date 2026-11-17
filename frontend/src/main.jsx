import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'leaflet/dist/leaflet.css'
import './styles/index.css'
import App from './App.jsx'

import { ProfileProvider } from './contexts/ProfileContext.jsx'

const colorScheme = window.matchMedia('(prefers-color-scheme: light)')

function syncBootstrapTheme() {
  document.documentElement.dataset.bsTheme = colorScheme.matches ? 'dark' : 'light'
}

syncBootstrapTheme()
colorScheme.addEventListener('change', syncBootstrapTheme)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProfileProvider>
      <App />
    </ProfileProvider>
  </StrictMode>,
)

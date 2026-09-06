import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Start fetching the shader chunk (three.js, ~1MB) as soon as this bundle is
// evaluated, rather than waiting for AnimatedGradientBg to mount. The browser
// was only discovering it at ~860ms, which is dead time added onto an already
// long download — and in dark mode that whole window is a blank backdrop.
// Fire-and-forget: AnimatedGradientBg's own lazy() import resolves from the
// same module cache, and a failure here is retried there.
void import('./components/ShaderBackdrop').catch(() => {})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

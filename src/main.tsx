import { StrictMode } from 'react'
import { hydrateRoot, createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

const rootElement = document.getElementById('root')!
const app = (
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)

// If prerendered HTML exists, hydrate instead of full render
if (rootElement.innerHTML.trim().length > 0) {
  hydrateRoot(rootElement, app)
} else {
  createRoot(rootElement).render(app)
}

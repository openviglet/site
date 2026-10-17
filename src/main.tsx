import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// A prerendered route (W39) arrives with its HTML already in #root, so hydrate
// it; a route the build did not render (or `npm run dev`) starts empty.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Cleanup any injected hotmart scripts that might be causing the window.fetch getter error during HMR
document.querySelectorAll('script[src*="hotmart"]').forEach(s => s.remove());
document.querySelectorAll('link[href*="hotmart"]').forEach(l => l.remove());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

import './styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Dashboard from './Dashboard';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('#root element not found');
createRoot(rootElement).render(
  <StrictMode>
    <Dashboard />
  </StrictMode>,
);

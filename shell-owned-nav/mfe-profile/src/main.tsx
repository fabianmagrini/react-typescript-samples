import './styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Profile from './Profile';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('#root element not found');
createRoot(rootElement).render(
  <StrictMode>
    <Profile />
  </StrictMode>,
);

import './styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import Profile from './Profile';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Profile />
  </StrictMode>
);

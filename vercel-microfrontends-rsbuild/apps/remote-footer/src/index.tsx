import React from 'react';
import { createRoot } from 'react-dom/client';
import Footer from './Footer';

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<Footer />);
} else {
  throw new Error('Root element not found');
}
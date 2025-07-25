import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const container = document.getElementById('root-cart');
if (container) {
  const root = ReactDOM.createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
}
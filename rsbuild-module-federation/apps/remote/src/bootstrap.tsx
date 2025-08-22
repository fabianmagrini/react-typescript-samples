import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// This is just for standalone development of the remote app
const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        Remote Micro-Frontend App
      </h1>
      <p className="text-center text-gray-600 mb-8">
        This app is running in standalone mode for development purposes.
        In production, components from this app will be consumed by the host application.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Available Components</h2>
            <ul className="space-y-2">
              <li className="flex items-center">
                <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                ProductList - Product catalog component
              </li>
              <li className="flex items-center">
                <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                OrderHistory - Order management component
              </li>
            </ul>
          </div>
          
          <div className="card">
            <h2 className="text-xl font-semibold mb-4">Module Federation</h2>
            <p className="text-sm text-gray-600">
              This remote application exposes components via Module Federation.
              The host application can dynamically load these components at runtime.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
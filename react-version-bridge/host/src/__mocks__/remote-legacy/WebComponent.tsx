import React from 'react';

// Mock implementation for remote legacy Web Component
const MockLegacyRemoteApp: React.FC = () => {
  return (
    <div data-testid="mock-legacy-remote">
      <h3>Mock Legacy Remote App (React 18)</h3>
      <p>My React version is: <strong>18.2.0</strong></p>
      <p>(Running on React 18 via Bridge Pattern)</p>
    </div>
  );
};

export default MockLegacyRemoteApp;
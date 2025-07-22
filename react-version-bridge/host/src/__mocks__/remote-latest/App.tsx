import React from 'react';

// Mock implementation for remote latest app
const MockRemoteLatestApp: React.FC = () => {
  return (
    <div data-testid="mock-remote-latest">
      <h3>Mock Latest Remote App (React 19)</h3>
      <p>My React version is: <strong>19.0.0-rc</strong></p>
      <p>(This should match the host's version)</p>
    </div>
  );
};

export default MockRemoteLatestApp;
import React from 'react';

const App: React.FC = () => {
  const remoteReactVersion = String(React.version || 'unknown');

  return (
    <div style={{ border: '1px solid purple', padding: '1em' }}>
      <h3>I am the Latest Remote App (React 19)</h3>
      <p>My React version is: <strong>{remoteReactVersion}</strong></p>
      <p>(Sharing React 19 with Host via Singleton Pattern)</p>
    </div>
  );
};

export default App;
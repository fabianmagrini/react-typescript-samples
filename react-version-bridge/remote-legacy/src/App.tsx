import React from 'react';
import ReactDOM from 'react-dom/client';

const App: React.FC = () => {
  const remoteReactVersion = String(React.version || 'unknown');

  return (
    <div style={{ border: '1px solid green', padding: '1em' }}>
      <h3>I am the Legacy Remote App (React 18)</h3>
      <p>My React version is: <strong>{remoteReactVersion}</strong></p>
      <p>(Running on React 18 via Bridge Pattern)</p>
    </div>
  );
};

// Web Component Bridge for React 18
class LegacyRemoteElement extends HTMLElement {
  private root: ReactDOM.Root | null = null;

  connectedCallback() {
    // Create React 18 root when the Web Component is connected
    this.root = ReactDOM.createRoot(this);
    this.root.render(<App />);
  }

  disconnectedCallback() {
    // Clean up React 18 root when the Web Component is disconnected
    if (this.root) {
      this.root.unmount();
      this.root = null;
    }
  }
}

// Register the Web Component
if (!customElements.get('legacy-remote-app')) {
  customElements.define('legacy-remote-app', LegacyRemoteElement);
}

export default App;

// Export the Web Component bridge for the host
export { LegacyRemoteElement };
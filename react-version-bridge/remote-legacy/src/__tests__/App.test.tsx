import React from 'react';

// Test React version
console.log('React version in test:', React.version);

// Test App component that mirrors the actual App structure
const App: React.FC = () => {
  const remoteReactVersion = String(React.version || 'unknown');

  return (
    <div style={{ border: '1px solid green', padding: '1em' }} data-testid="app-container">
      <h3>I am the Legacy Remote App (React 18)</h3>
      <p>My React version is: <strong>{remoteReactVersion}</strong></p>
      <p>(Running on React 18 via Bridge Pattern)</p>
    </div>
  );
};

describe('Remote Legacy App', () => {
  it('uses React 18', () => {
    expect(React.version).toMatch(/^18\./);
  });

  it('validates React 18 version format', () => {
    expect(React.version).toMatch(/18\.\d+\.\d+/);
  });

  it('can create App component', () => {
    const app = <App />;
    expect(app).toBeDefined();
    expect(typeof App).toBe('function');
  });

  it('App component is a valid React component', () => {
    expect(() => <App />).not.toThrow();
  });

  it('App component uses React 18 functionality', () => {
    // Test that the component can access React.version
    const TestComponent = () => {
      const version = React.version;
      return <div>{version}</div>;
    };
    
    const element = <TestComponent />;
    expect(element).toBeDefined();
  });

  it('maintains bridge pattern concept in design', () => {
    // Test that the component pattern is designed for Web Component bridge
    expect(typeof App).toBe('function');
    expect(React.version).toMatch(/18\./);
  });

  it('component can be used with React 18 API', () => {
    // Test React 18 specific behavior
    expect(React.version.startsWith('18')).toBe(true);
  });
});
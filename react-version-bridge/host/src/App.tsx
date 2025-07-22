import React from 'react';

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean}> {
  constructor(props: {children: React.ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.log('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{color: 'red', padding: '1em'}}>Something went wrong loading this component.</div>;
    }

    return this.props.children;
  }
}

// React 18 Legacy Remote via Web Component Bridge
const LegacyWebComponentWrapper: React.FC = () => {
  const [loaded, setLoaded] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    // Import the Web Component from the React 18 remote
    import('remote_legacy/WebComponent')
      .then(() => {
        setLoaded(true);
      })
      .catch((err) => {
        setError(`Failed to load Web Component: ${err.message}`);
      });
  }, []);

  if (error) {
    return <div style={{color: 'red', padding: '1em'}}>Error: {error}</div>;
  }

  if (!loaded) {
    return <div>Loading Legacy Remote via Web Component Bridge...</div>;
  }

  // Use the Web Component that wraps React 18
  return React.createElement('legacy-remote-app');
};

// React 19 Latest Remote via Singleton Sharing
const RemoteLatestApp = React.lazy(() => import('remote_latest/App'));

const App = () => {
  const hostReactVersion = String(React.version || 'unknown');

  return (
    <div style={{ border: '2px solid blue', padding: '1em', borderRadius: '5px' }}>
      <h1>Host Application (React 19)</h1>
      <p>Using React Version: <strong>{hostReactVersion}</strong></p>

      <div style={{ marginTop: '2em', border: '2px dashed green', padding: '1em', borderRadius: '5px' }}>
        <h2>Loading Legacy Remote (Web Component Bridge)</h2>
        <p><small>React 18 remote isolated via Web Components bridge pattern</small></p>
        <ErrorBoundary>
          <LegacyWebComponentWrapper />
        </ErrorBoundary>
      </div>

      <div style={{ marginTop: '2em', border: '2px dashed purple', padding: '1em', borderRadius: '5px' }}>
        <h2>Loading Latest Remote (Singleton Pattern)</h2>
        <p><small>React 19 remote sharing dependencies with host</small></p>
        <ErrorBoundary>
          <React.Suspense fallback={<div>Loading Latest Remote...</div>}>
            <RemoteLatestApp />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default App;
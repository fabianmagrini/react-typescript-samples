import React from 'react'
import ReactDOM from 'react-dom/client'

const RemoteButton = React.lazy(() => import('remote/Button').catch(err => {
  console.error('Failed to load remote Button:', err);
  return { default: () => <div style={{color: 'red'}}>Failed to load Remote Button</div> };
}));

const RemoteCounter = React.lazy(() => import('remote/Counter').catch(err => {
  console.error('Failed to load remote Counter:', err);
  return { default: () => <div style={{color: 'red'}}>Failed to load Remote Counter</div> };
}));

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{color: 'red', padding: '10px', border: '1px solid red'}}>
        Something went wrong with the remote component.
      </div>;
    }
    return this.props.children;
  }
}

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Host Application</h1>
      <p>This is the host application running on port 4000</p>
      <p>It consumes components from the remote application.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h2>Remote Button Component</h2>
        <ErrorBoundary>
          <React.Suspense fallback={<div>Loading Button...</div>}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <RemoteButton variant="primary" onClick={() => alert('Remote Primary clicked!')}>
                Remote Primary
              </RemoteButton>
              <RemoteButton variant="secondary" onClick={() => alert('Remote Secondary clicked!')}>
                Remote Secondary
              </RemoteButton>
              <RemoteButton variant="danger" onClick={() => alert('Remote Danger clicked!')}>
                Remote Danger
              </RemoteButton>
            </div>
          </React.Suspense>
        </ErrorBoundary>
      </div>

      <div>
        <h2>Remote Counter Component</h2>
        <ErrorBoundary>
          <React.Suspense fallback={<div>Loading Counter...</div>}>
            <RemoteCounter initialValue={10} step={5} />
          </React.Suspense>
        </ErrorBoundary>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
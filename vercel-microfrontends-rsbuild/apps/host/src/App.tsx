import React, { Suspense } from 'react';

const RemoteHeader = React.lazy(() => import('remote-header/Header'));
const RemoteFooter = React.lazy(() => import('remote-footer/Footer'));

function App() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Suspense fallback={<div>Loading header...</div>}>
        <RemoteHeader />
      </Suspense>
      
      <main style={{ flex: 1, padding: '2rem', textAlign: 'center' }}>
        <h1>Host Application</h1>
        <p>This is the main host application that loads remote microfrontends.</p>
        <p>Built with Rsbuild + @vercel/microfrontends</p>
        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
          <h3>🎯 Demo Features:</h3>
          <ul style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>✅ Module Federation with Rspack</li>
            <li>✅ @vercel/microfrontends utilities</li>
            <li>✅ Dynamic remote loading</li>
            <li>✅ Shared React dependencies</li>
            <li>✅ Hot reload in development</li>
          </ul>
        </div>
      </main>
      
      <Suspense fallback={<div>Loading footer...</div>}>
        <RemoteFooter />
      </Suspense>
    </div>
  );
}

export default App;
import React from 'react';

// Simple lazy loading of the remote app
const RemoteLatestApp = React.lazy(() => 
  import('remote_latest/App').then(module => ({ default: module.default || module }))
);

const LatestBridge = () => {
  return (
    <React.Suspense fallback="Loading Latest Remote...">
      <RemoteLatestApp />
    </React.Suspense>
  );
};

export default LatestBridge;
declare module 'remote_legacy/App' {
  import React from 'react';
  const App: React.ComponentType;
  export default App;
  export class LegacyRemoteElement extends HTMLElement {}
}

declare module 'remote_legacy/WebComponent' {
  import React from 'react';
  const App: React.ComponentType;
  export default App;
  export class LegacyRemoteElement extends HTMLElement {}
}

declare module 'remote_latest/App' {
  import React from 'react';
  const App: React.ComponentType;
  export default App;
}

declare module 'remote_latest/react' {
  import * as React from 'react';
  export = React;
}

// Web Components types
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'legacy-remote-app': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}
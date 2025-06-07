import { useEffect, useState } from 'react'
import { SingletonService } from './services/SingletonService'
import './App.css'

function App() {
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const singleton = SingletonService.getInstance();
    
    // Check if this is the primary instance
    const checkInstance = () => {
      const primary = singleton.isPrimaryInstance();
      setShowWarning(!primary);
    };

    // Initial check
    checkInstance();

    // Cleanup on unmount
    return () => {
      singleton.cleanup();
    };
  }, []);

  return (
    <div className="app-container">
      <h1>React Singleton Instance Demo</h1>
      {showWarning ? (
        <div className="warning">
          <h2>⚠️ Warning: Another instance is already running</h2>
          <p>This is a secondary instance of the application.</p>
          <p>Please close this tab and use the primary instance.</p>
        </div>
      ) : (
        <div className="primary">
          <h2>✅ This is the primary instance</h2>
          <p>You can open new tabs to test the singleton behavior.</p>
          <p>Only one instance of the application can be primary at a time.</p>
        </div>
      )}
    </div>
  )
}

export default App

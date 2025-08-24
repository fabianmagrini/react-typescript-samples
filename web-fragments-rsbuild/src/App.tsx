import React, { useEffect } from 'react';
import { initFragments } from './fragments';
import { Header, InfoSection, FragmentContainer } from './components';

function App() {
  useEffect(() => {
    // Initialize web fragments when the component mounts
    initFragments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <InfoSection />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FragmentContainer
            title="Demo Fragment 1"
            fragmentId="demo-fragment-1"
            description="This placeholder demonstrates where a web fragment would be loaded (requires server-side gateway setup)"
          />
          
          <FragmentContainer
            title="Demo Fragment 2"
            fragmentId="demo-fragment-2"
            description="Another example web fragment container (requires proper fragment registration)"
          />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">About Web Fragments Architecture</h3>
          <div className="prose max-w-none text-gray-600">
            <p className="mb-4">
              Web Fragments enables truly independent teams to build and release frontend components 
              without fate-sharing. Each fragment can be developed, tested, and deployed independently.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Key Benefits:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>No coupling between fragments</li>
                  <li>Independent deployment schedules</li>
                  <li>Technology stack flexibility</li>
                  <li>Gradual migration support</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">Technical Stack:</h4>
                <ul className="list-disc ml-6 space-y-1">
                  <li>React 19 with TypeScript</li>
                  <li>Rsbuild (Rspack-powered)</li>
                  <li>Tailwind CSS v4</li>
                  <li>Web Fragments runtime</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
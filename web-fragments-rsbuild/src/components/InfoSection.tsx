import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Welcome to Web Fragments
      </h2>
      <div className="prose max-w-none">
        <p className="text-gray-600 mb-4">
          This application demonstrates the power of web fragments for micro-frontend architecture.
          Web fragments are loaded dynamically using the custom &lt;web-fragment&gt; element.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">🚀 Independent Deployment</h4>
            <p className="text-sm text-blue-700">
              Each fragment can be deployed independently without affecting others
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-2">🔧 Technology Freedom</h4>
            <p className="text-sm text-green-700">
              Use different frameworks and libraries for each fragment
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">📈 Scalable Teams</h4>
            <p className="text-sm text-purple-700">
              Enable multiple teams to work independently on different features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoSection;
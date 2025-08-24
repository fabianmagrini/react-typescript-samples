import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-2">Web Fragments with Rsbuild</h1>
        <p className="text-blue-100 text-lg">
          A modern React app showcasing micro-frontend architecture
        </p>
        <div className="mt-4 flex gap-4">
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            React
          </span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            TypeScript
          </span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            Tailwind CSS
          </span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            Rsbuild
          </span>
          <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm">
            Web Fragments
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
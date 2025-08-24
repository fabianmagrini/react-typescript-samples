import React from 'react';

interface FragmentContainerProps {
  title: string;
  description?: string;
  fragmentId: string;
  className?: string;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'web-fragment': {
        'fragment-id': string;
        [key: string]: any;
      };
    }
  }
}

const FragmentContainer: React.FC<FragmentContainerProps> = ({
  title,
  description,
  fragmentId,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg p-6 ${className}`}>
      <h3 className="text-xl font-semibold mb-4">{title}</h3>
      <div className="border-2 border-dashed border-gray-300 p-4 rounded mb-3">
        <web-fragment fragment-id={fragmentId} />
      </div>
      {description && (
        <p className="text-sm text-gray-500">{description}</p>
      )}
    </div>
  );
};

export default FragmentContainer;
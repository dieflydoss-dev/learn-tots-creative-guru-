
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex justify-center items-center py-8">
      <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-sky-500"></div>
    </div>
  );
};

export default LoadingSpinner;

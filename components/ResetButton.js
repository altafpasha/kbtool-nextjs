import React from 'react';

const ResetButton = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        glass-btn glass-btn-danger
        inline-flex items-center gap-2
        ${className}
      `}
      {...props}
    >
      {children}
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70">
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </svg>
    </button>
  );
};

export default ResetButton;

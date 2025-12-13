import React from 'react';

const ZaubaButton = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        glass-btn
        inline-flex items-center gap-2
        ${className}
      `}
      {...props}
    >
      {children}
      <svg
        fill="none"
        height="14"
        viewBox="0 0 24 24"
        width="14"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-60"
      >
        <path
          d="M10.75 8.75L14.25 12L10.75 15.25"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
    </button>
  );
};

export default ZaubaButton;

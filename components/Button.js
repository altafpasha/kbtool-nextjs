import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        glass-btn
        inline-flex items-center justify-center
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
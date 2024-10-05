import React from 'react';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`
        relative inline-flex items-center justify-start
        px-4 py-2
        overflow-hidden
        font-medium text-sm
        transition-all
        bg-white bg-opacity-10 
        backdrop-filter backdrop-blur-lg
        rounded
        border border-white border-opacity-20
        shadow-lg
        text-white
        hover:bg-opacity-20 hover:shadow-xl
        group
        ${className}
      `}
      {...props}
    >
      <span 
        className="
          w-48 h-48 
          rounded rotate-[-40deg] 
          bg-purple-600 
          absolute bottom-0 left-0 
          -translate-x-full 
          ease-out duration-500 
          transition-all 
          translate-y-full 
          mb-9 ml-9 
          group-hover:ml-0 
          group-hover:mb-32 
          group-hover:translate-x-0
        "
      />
      <span 
        className="
          relative w-full 
          text-left 
          transition-colors duration-300 ease-in-out 
          group-hover:text-white
        "
      >
        {children}
      </span>
      <span className="absolute bottom-0 left-1/2 h-px w-4/5 -translate-x-1/2 bg-gradient-to-r from-transparent via-white to-transparent opacity-50" />
    </button>
  );
};

export default Button;
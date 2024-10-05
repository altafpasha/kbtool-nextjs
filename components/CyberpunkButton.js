import React from 'react';

const CyberpunkButton = ({ 
  children, 
  className = '', 
  variant = 'primary',
  size = 'medium',
  glitch = true,
  ...props 
}) => {
  const baseStyles = `
    relative
    inline-flex
    items-center
    justify-center
    font-['Orbitron']
    tracking-wider
    uppercase
    transition-all
    duration-300
    clip-path-button
    overflow-hidden
    group
  `;

  const sizeStyles = {
    small: 'px-4 py-2 text-xs',
    medium: 'px-6 py-3 text-sm',
    large: 'px-8 py-4 text-base'
  };

  const variantStyles = {
    primary: `
      bg-purple-600
      hover:bg-purple-700
      text-white
      before:absolute
      before:inset-0
      before:bg-purple-500
      before:translate-x-[-5px]
      before:clip-path-button
      before:z-[-1]
      before:transition-transform
      before:duration-300
      hover:before:translate-x-0
    `,
    secondary: `
      bg-gray-800
      hover:bg-gray-900
      text-white
      before:absolute
      before:inset-0
      before:bg-gray-700
      before:translate-x-[-5px]
      before:clip-path-button
      before:z-[-1]
      before:transition-transform
      before:duration-300
      hover:before:translate-x-0
    `,
    danger: `
      bg-red-600
      hover:bg-red-700
      text-white
      before:absolute
      before:inset-0
      before:bg-red-500
      before:translate-x-[-5px]
      before:clip-path-button
      before:z-[-1]
      before:transition-transform
      before:duration-300
      hover:before:translate-x-0
    `
  };

  const glitchEffect = glitch ? `
    after:absolute
    after:inset-0
    after:bg-current
    after:opacity-0
    after:clip-path-button
    after:transition-opacity
    after:duration-150
    hover:after:opacity-10
    after:animate-moveBg
  ` : '';

  return (
    <button
      className={`
        ${baseStyles}
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${glitchEffect}
        ${className}
      `}
      {...props}
    >
      {/* Button content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>

      {/* Decorative corner */}
      <span className="
        absolute
        top-1
        right-1
        w-2
        h-2
        bg-current
        opacity-50
      " />

      {/* Glitch overlay */}
      {glitch && (
        <span className="
          absolute
          inset-0
          bg-dot-gray-800/50
          opacity-0
          group-hover:opacity-10
          transition-opacity
          duration-300
        " />
      )}
    </button>
  );
};

export default CyberpunkButton;
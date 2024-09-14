import React from 'react';
import Image from 'next/image';

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`bg-slate-800 no-underline group cursor-pointer relative shadow-2xl via-red-400/90 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block ${className}`}
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </span>
      <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
        {children}
       
        <Image 
          src="https://img.icons8.com/?size=100&id=XQI1YeBtZJbU&format=png&color=000000" 
          alt="icon" 
          width="16" 
          height="16"
        />
      </div>
      <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-red-400/0 via-red-400/90 to-red-400/0 transition-opacity duration-500 group-hover:opacity-40
" />
    </button>
  );
};

export default Button;

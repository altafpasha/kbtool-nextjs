'use client';
import React, { useEffect } from 'react';

const CustomSearch = () => {
  useEffect(() => {
    // Load Google Custom Search script
    const script = document.createElement('script');
    script.src = 'https://cse.google.com/cse.js?cx=YOUR_SEARCH_ENGINE_ID';
    script.async = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script on component unmount
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="w-full">
      <div className="gcse-search"></div>
    </div>
  );
};

export default CustomSearch;
import React, { useState } from 'react';
import { FaSearch, FaSave, FaFolder } from 'react-icons/fa';

const SnippyAdBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 max-w-xl w-full">
        <div className="flex flex-col space-y-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-white">Snipply - SearchClipper</h2>
            <button 
              className="text-white/50 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              onClick={handleClose}
              aria-label="Close popup"
            >
              ✕
            </button>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 rounded-xl overflow-hidden bg-white/20 backdrop-blur-md flex items-center justify-center p-1">
              <img
                src="https://lh3.googleusercontent.com/ersXUm_Eg8abx8FGVhsUTPUFomOEYaE6KBAnc74gkURmEHf--aNkEfJWmjquClLhBBNus0JtvpYHox_MFn_CkJ_RNQ=s60"
                alt="Snipply Logo"
                className="w-20 h-20 rounded-lg"
              />
            </div>
            
            <div className="flex-1">
              <p className="text-white/90 text-base mb-4">
                Clip, search and Copy anything from the web instantly.
              </p>
              <div className="flex space-x-2">
                <a
                  href="https://chromewebstore.google.com/detail/snipply-searchclipper/dmfjbnmfpdnjkalagcjahkaepjaagfkp"
                  target="_blank"
                  className="flex items-center justify-center px-6 py-2 rounded-lg
                    bg-white/20 backdrop-blur-md border border-white/30
                    hover:bg-white/30 transition-all text-white font-medium
                    shadow-lg shadow-blue-500/20"
                >
                  Get Extension
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-2 pt-4 border-t border-white/10">
            <div className="flex justify-between">
              <div className="flex items-center space-x-2">
                <FaSearch className="w-5 h-5 text-blue-400" />
                <span className="text-white/80 text-sm">Universal Search</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaSave className="w-5 h-5 text-green-400" />
                <span className="text-white/80 text-sm">One-Click Save</span>
              </div>
              <div className="flex items-center space-x-2">
                <FaFolder className="w-5 h-5 text-yellow-400" />
                <span className="text-white/80 text-sm">Easy Organization</span>
              </div>
            </div>
          </div>
          
          <div className="mt-2 rounded-lg overflow-hidden shadow-lg shadow-black/20">
            <img
              src="https://lh3.googleusercontent.com/WLH6ROD8Cc39O7d-dL35u5-KENtlYjL6Lxr1FRr0mCKbLDtphGvswU5NpyOCGBkJJi0U5bHiUXnDj-Kkc_mBTNGM2g=s1280-w1280-h800"
              alt="Snipply Demo"
              className="w-full h-auto object-cover"
            />
          </div>
          
          <div className="w-full flex justify-center">
            <p className="text-white/60 text-xs">
              Developed by CodeSec. • Available for Chrome
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SnippyAdBanner;
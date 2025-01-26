import React from 'react';
import { 
  FaYoutube, 
  FaShieldAlt, 
  FaBrain 
} from 'react-icons/fa';

const AdPopup = ({ onClose }) => {
  const ButtonLink = ({ href, icon: Icon, children, color }) => (
    <a 
      href={href} 
      target="_blank" 
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg 
        bg-white/10 backdrop-blur-md border border-white/20 
        hover:bg-white/20 transition-all text-white ${color}`}
    >
      <Icon className="w-4 h-4" />
      <span className="text-sm">{children}</span>
    </a>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-6 max-w-md w-full">
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-white">CodeSec Agency</h2>
            <button onClick={onClose} className="text-white/50 hover:text-white">
              ✕
            </button>
          </div>

          <div className="space-y-3">
            <ButtonLink 
              href="https://www.youtube.com/@codesec-me" 
              icon={FaYoutube} 
              color="hover:bg-red-500/20"
            >
              YouTube Channel
            </ButtonLink>

            <ButtonLink 
              href="https://codesec.me/cybertools" 
              icon={FaShieldAlt} 
              color="hover:bg-blue-500/20"
            >
              Cybersecurity Tools
            </ButtonLink>

            <ButtonLink 
              href="https://appship.me" 
              icon={FaBrain} 
              color="hover:bg-green-500/20"
            >
              AI & Productivity Tools
            </ButtonLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdPopup;
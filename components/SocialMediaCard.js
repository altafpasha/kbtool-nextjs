import React from 'react';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const SocialMediaCard = () => {
  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden">
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
        <path fill="#8A3FFC" d="M44.7,-76.4C58.8,-69.2,71.8,-59,79.6,-45.8C87.4,-32.6,90,-16.3,89.4,-0.3C88.8,15.7,85.1,31.3,77.5,45.9C69.9,60.5,58.4,74,44.4,82.1C30.4,90.2,15.2,92.9,-0.9,94.4C-17,95.9,-34,96.2,-47.1,88.7C-60.2,81.2,-69.4,65.8,-76.6,50.4C-83.8,35,-89,17.5,-89.8,-0.5C-90.6,-18.5,-86.9,-37,-77.8,-51.5C-68.7,-66,-54.1,-76.5,-39.1,-83.1C-24.1,-89.8,-12,-92.6,1.9,-95.8C15.8,-99,31.6,-102.6,44.7,-76.4Z" transform="translate(100 100)" />
      </svg>
      
      <div className="relative z-10 bg-white bg-opacity-90 rounded-lg shadow-lg p-8 m-4">
        <h2 className="text-3xl font-bold text-center mb-6 text-indigo-800">
          Connect With Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Join our community on social media and stay updated with the latest news and events.
        </p>
        <div className="flex justify-center space-x-6">
          <SocialIcon href="https://www.instagram.com/codesec.me/" icon={Instagram} color="text-pink-600" label="Instagram" />
          <SocialIcon href="https://x.com/Codesec_me" icon={Twitter} color="text-blue-400" label="Twitter" />
          <SocialIcon href="https://www.linkedin.com/in/codesec-me/" icon={Linkedin} color="text-blue-700" label="LinkedIn" />
        </div>
      </div>
    </div>
  );
};

const SocialIcon = ({ href, icon: Icon, color, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={`${color} hover:opacity-75 transition-all duration-300 ease-in-out transform hover:scale-110 flex flex-col items-center`}
  >
    <Icon size={32} />
    <span className="mt-2 text-sm font-medium text-gray-700">{label}</span>
  </a>
);

export default SocialMediaCard;
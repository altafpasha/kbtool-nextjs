import React from 'react';
import Link from 'next/link';
import { Home, Github, Linkedin, Twitter, Instagram, Wrench } from 'lucide-react';
import { useRouter } from 'next/router';

const Footer = () => {
  const router = useRouter();

  const isActivePage = (path) => router.pathname === path;

  return (
    <footer className="bg-purple-900 bg-opacity-50 backdrop-blur-md border-t border-purple-800 p-6 text-gray-100">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-4 sm:mb-0">
          <div className="border border-purple-600 rounded-lg p-2 flex flex-wrap justify-center sm:justify-start gap-2">
            <Link href="/" passHref>
              <span className="flex items-center hover:text-white cursor-pointer px-2 py-1">
                <Home className="w-5 h-5 mr-2" />
                Home
              </span>
            </Link>
            <Link href="/business" passHref>
              <span className={`px-2 py-1 rounded-md cursor-pointer ${
                isActivePage('/business')
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-purple-700 hover:text-white'
              }`}>
                Business-Tool
              </span>
            </Link>
            <Link href="/QID_121" passHref>
              <span className={`px-2 py-1 rounded-md cursor-pointer ${
                isActivePage('/QID_121')
                  ? 'bg-purple-600 text-white'
                  : 'hover:bg-purple-700 hover:text-white'
              }`}>
                QID_121
              </span>
            </Link>
          </div>
        </div>

        <div className="border border-purple-600 rounded-lg p-2 mb-4 sm:mb-0">
          <a
            href="https://appship.me"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-purple-400 transition-colors duration-300"
          >
            <Wrench className="w-4 h-4 mr-2" />
            Visit Appship for more tools
          </a>
        </div>

        <div className="text-center sm:text-right mb-4 sm:mb-0">
          <p className="text-sm">
            <a
              href="https://appship.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              Appship
            </a> &copy; 2021 - Powered by{' '}
            <a
              href="https://codesec.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-purple-400 transition-colors duration-300"
            >
              CodeSec
            </a>
          </p>
          <p className="text-sm mt-1">
            Developed by{' '}
            <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Altaf
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <a href="https://github.com/imaltaf" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Github className="w-5 h-5" />
          </a>
          <a href="https://www.linkedin.com/in/altaf-pasha/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Linkedin className="w-5 h-5" />
          </a>
          <a href="https://www.instagram.com/altaf_90s?igsh=a3phcXAwaHNlbWFj" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="https://x.com/Dark_Mechanic" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <Twitter className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
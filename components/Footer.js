import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { 
  Home, 
  Github, 
  Linkedin, 
  Twitter, 
  Instagram, 
  Wrench,
  Chrome
} from 'lucide-react';

const Footer = () => {
  const router = useRouter();
  const isActivePage = (path) => router.pathname === path;

  const NavLink = ({ href, children, isExternal }) => {
    const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 text-white";
    
    if (isExternal) {
      return (
        <a 
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} passHref>
        <span className={`${baseClasses} ${
          isActivePage(href) ? 'bg-white/20' : ''
        }`}>
          {children}
        </span>
      </Link>
    );
  };

  const SocialIcon = ({ href, icon: Icon }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-full hover:bg-white/10 transition-all duration-300"
    >
      <Icon className="w-5 h-5 text-white" />
    </a>
  );

  return (
    <footer className="relative backdrop-blur-md bg-purple-900/30 border-t border-purple-400/20">
      <div className="absolute inset-0 bg-gradient-to-b from-purple-600/5 to-pink-500/5" />
      
      <div className="relative container mx-auto px-4 py-6">
        <div className="flex flex-col gap-8 md:gap-6 lg:flex-row lg:items-center lg:justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo/appship-full.png"
              alt="Appship Logo"
              width={150}
              height={40}
              className="object-contain"
            />
          </div>

          {/* Navigation Links */}
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <NavLink href="/">
              <Home className="w-5 h-5" />
              <span>Home</span>
            </NavLink>
            <NavLink href="/business">
              <Wrench className="w-5 h-5" />
              <span>Business-Tool</span>
            </NavLink>
            <NavLink href="/QID_121">
              <span>QID_121</span>
            </NavLink>
          </div>

          {/* Chrome Extension Button */}
          <a
            href="https://chromewebstore.google.com/search/codesec"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/50 to-pink-500/50 rounded-lg hover:from-purple-500/70 hover:to-pink-500/70 transition-all duration-300 backdrop-blur-sm"
          >
            <Chrome className="w-5 h-5" />
            <span>Get Chrome Extension</span>
          </a>

          {/* Company Info */}
          <div className="text-center lg:text-right">
            <p className="text-sm text-white">
              <a
                href="https://appship.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-200 transition-colors"
              >
                Appship
              </a>{' '}
              &copy; {new Date().getFullYear()} - Powered by{' '}
              <a
                href="https://codesec.me"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-300 transition-colors"
              >
                CodeSec
              </a>
            </p>
            <p className="text-sm mt-1 text-white">
              Developed by{' '}
              <span className="font-semibold text-purple-700">
                Altaf
              </span>
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-2">
            <SocialIcon href="https://github.com/imaltaf" icon={Github} />
            <SocialIcon href="https://www.linkedin.com/in/altaf-pasha/" icon={Linkedin} />
            <SocialIcon href="https://www.instagram.com/altaf_90s?igsh=a3phcXAwaHNlbWFj" icon={Instagram} />
            <SocialIcon href="https://x.com/Dark_Mechanic" icon={Twitter} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
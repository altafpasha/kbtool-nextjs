import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Home, Github, Linkedin, Instagram, Wrench, Calculator } from 'lucide-react';
import LogoutButton from './LogoutButton';

// X (Twitter) Icon Component
const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = () => {
  const router = useRouter();
  const isActivePage = (path) => router.pathname === path;

  const NavLink = ({ href, children, isExternal }) => {
    const baseClasses = "flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 text-white/70 hover:text-white hover:bg-white/5";

    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={baseClasses}>
          {children}
        </a>
      );
    }

    return (
      <Link href={href} passHref>
        <span className={`${baseClasses} ${isActivePage(href) ? 'bg-white/10 text-white' : ''}`}>
          {children}
        </span>
      </Link>
    );
  };

  const SocialIcon = ({ href, icon: Icon, isCustom }) => (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
    >
      {isCustom ? <Icon className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
    </a>
  );

  return (
    <footer className="relative glass-card border-0 border-t border-white/5 rounded-none">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {/* Left - Brand */}
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-white/90">KBTool</span>
            <span className="text-xs text-white/40">by Altaf</span>
          </div>

          {/* Center - Navigation */}
          <div className="flex flex-wrap gap-1 justify-center">
            <NavLink href="/">
              <Home className="w-4 h-4" />
              <span className="text-sm">Home</span>
            </NavLink>
            <NavLink href="/tools">
              <Calculator className="w-4 h-4" />
              <span className="text-sm">Tools</span>
            </NavLink>
            <NavLink href="/business">
              <Wrench className="w-4 h-4" />
              <span className="text-sm">Business</span>
            </NavLink>
            <NavLink href="/QID_121">
              <span className="text-sm">QID_121</span>
            </NavLink>
          </div>

          {/* Right - Social + Copyright + Logout */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <SocialIcon href="https://github.com/altafpasha" icon={Github} />
              <a
                href="https://x.com/altafpasha_h"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
              >
                <XIcon className="w-4 h-4" />
              </a>
              <SocialIcon href="https://instagram.com/altafpasha_h" icon={Instagram} />
              <SocialIcon href="https://www.linkedin.com/in/altaf-pasha/" icon={Linkedin} />
              <div className="w-px h-4 bg-white/10 mx-1"></div>
              <LogoutButton />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
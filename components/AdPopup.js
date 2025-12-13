import React, { useState, useEffect } from 'react';
import { Shield, Scan, Sparkles, X, Smartphone, Apple, Github, Instagram } from 'lucide-react';

// X (Twitter) Icon Component
const XIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const QRGuardAdPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [taglineIndex, setTaglineIndex] = useState(0);

  const taglines = [
    "Scan QR Codes Safely",
    "AI-Powered QR Security",
    "Stop Malicious QR Links",
    "Think Before You Scan",
    "Protect Yourself from QR Scams",
    "Scan Safe. Stay Secure."
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
      setIsAnimating(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  };

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-50 p-4 transition-opacity duration-300 ${isAnimating ? 'opacity-100' : 'opacity-0'}`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-gradient-to-br from-slate-900/98 via-slate-800/98 to-slate-900/98 backdrop-blur-2xl rounded-3xl border border-white/10 max-w-md w-full shadow-2xl transition-all duration-500 overflow-hidden ${isAnimating ? 'scale-100 translate-y-0' : 'scale-90 translate-y-8'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl" />

        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white/30 hover:text-white transition-all w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 z-20"
          onClick={handleClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="relative p-8 flex flex-col items-center text-center space-y-6">

          {/* Logo */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/40 to-cyan-500/40 rounded-3xl blur-2xl animate-pulse" />
            <div className="relative w-24 h-24 rounded-3xl overflow-hidden bg-gradient-to-br from-slate-700 to-slate-900 border-2 border-white/10 p-1.5 shadow-2xl shadow-emerald-500/20">
              <img
                src="https://play-lh.googleusercontent.com/nvnz5pAK3bcU_AMUooG-eIH1lbT2RN96rdqTMtN_3s_HDmSQyrmeRyOu3sXu_F1IQvq6=w480-h960-rw"
                alt="QRGuard AI Logo"
                className="w-full h-full rounded-2xl object-cover"
              />
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">QRGuard AI</h2>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-emerald-500 to-cyan-500 text-white">
                NEW
              </span>
            </div>
            <p className="text-lg text-emerald-400 font-medium h-7 transition-all duration-500">
              {taglines[taglineIndex]}
            </p>
            <p className="text-white/50 text-sm">
              Smart QR Scanner with AI Protection
            </p>
          </div>

          {/* Features */}
          <div className="w-full grid grid-cols-3 gap-3">
            <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-500/5 border border-emerald-500/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-emerald-400" />
              </div>
              <span className="text-xs text-white/60 font-medium">AI Security</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 border border-cyan-500/20 flex items-center justify-center">
                <Scan className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-xs text-white/60 font-medium">Fast Scan</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/5 border border-white/5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500/20 to-purple-500/5 border border-purple-500/20 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-purple-400" />
              </div>
              <span className="text-xs text-white/60 font-medium">AI Powered</span>
            </div>
          </div>

          {/* Download Buttons */}
          <div className="w-full space-y-3">
            <a
              href="https://play.google.com/store/apps/details?id=com.darkmechanic.qrguardscanner&pcampaignid=web_share"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full group relative overflow-hidden block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 group-hover:from-emerald-500 group-hover:to-cyan-500 transition-all duration-300 rounded-2xl" />
              <div className="relative flex items-center justify-center gap-3 px-6 py-4 rounded-2xl">
                <Smartphone className="w-5 h-5 text-white" />
                <span className="text-white font-bold text-base">Download for Android</span>
              </div>
            </a>

            <div className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white/5 border border-white/5">
              <Apple className="w-4 h-4 text-white/40" />
              <span className="text-white/40 text-sm font-medium">iOS Coming Soon</span>
            </div>
          </div>

          {/* Footer with Social Links */}
          <div className="pt-4 border-t border-white/5 w-full space-y-3">
            <p className="text-white/40 text-xs">
              Developed by <span className="text-emerald-400">Altaf</span>
            </p>

            {/* Social Links */}
            <div className="flex items-center justify-center gap-3">
              <a
                href="https://github.com/altafpasha"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Github className="w-4 h-4 text-white/60" />
              </a>
              <a
                href="https://x.com/altafpasha_h"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <XIcon className="w-4 h-4 text-white/60" />
              </a>
              <a
                href="https://instagram.com/altafpasha_h"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all"
              >
                <Instagram className="w-4 h-4 text-white/60" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRGuardAdPopup;
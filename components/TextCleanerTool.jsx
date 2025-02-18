'use client';
import { useState, useRef } from 'react';

const SpecialCharacterRemover = () => {
  const [input, setInput] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [autoCopy, setAutoCopy] = useState(false);
  const inputRef = useRef(null);

  const cleanText = (text) => {
    // Replace special characters with spaces, then trim multiple spaces
    return text.replace(/[^a-zA-Z0-9]/g, ' ').replace(/\s+/g, ' ').trim();
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    const cleaned = cleanText(newText);
    setInput(cleaned);
    
    if (autoCopy && cleaned) {
      navigator.clipboard.writeText(cleaned).then(() => {
        showCopyNotification();
        setTimeout(() => setInput(''), 500);
      });
    }
  };

  const handlePaste = (e) => {
    // Prevent default paste behavior
    e.preventDefault();
    
    // Get text from clipboard
    navigator.clipboard.readText().then(pastedText => {
      const cleaned = cleanText(pastedText);
      setInput(cleaned);
      
      if (autoCopy && cleaned) {
        navigator.clipboard.writeText(cleaned).then(() => {
          showCopyNotification();
          setTimeout(() => setInput(''), 500);
        });
      }
    });
  };

  const copyToClipboard = () => {
    if (input) {
      navigator.clipboard.writeText(input).then(() => {
        showCopyNotification();
        setTimeout(() => setInput(''), 500);
      });
    }
  };

  const showCopyNotification = () => {
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const toggleAutoCopy = () => {
    setAutoCopy(!autoCopy);
  };

  return (
    <div className="flex items-center justify-center w-full p-4">
      <div className="max-w-md w-full backdrop-blur-lg bg-white/20 rounded-2xl shadow-2xl p-8 relative overflow-visible border border-white/30">
        <div className="absolute -top-3 -right-3 z-20">
          <span className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            New
          </span>
        </div>

        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-6 text-white">Special Character Remover</h2>
          
          <div className="flex items-center justify-between mb-4">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={toggleAutoCopy}
            >
              <div className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 bg-white/30 hover:bg-white/40">
                <div className={`absolute h-5 w-5 transform rounded-full bg-white transition-transform duration-300 ${
                  autoCopy ? 'translate-x-[22px]' : 'translate-x-0.5'
                }`} />
              </div>
              <span className="text-sm font-medium text-white select-none">
                {autoCopy ? 'Auto-copy ON' : 'Auto-copy OFF'}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            <textarea
              ref={inputRef}
              value={input}
              onChange={handleInputChange}
              onPaste={handlePaste}
              className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent backdrop-blur-sm"
              rows={4}
              placeholder="Type or paste text here..."
            />

            {!autoCopy && (
              <button
                onClick={copyToClipboard}
                className="w-full bg-white/20 text-white py-3 px-4 rounded-xl hover:bg-white/30 transition-colors border border-white/30 backdrop-blur-sm group relative"
              >
                <span className="inline-block transition-transform duration-200 group-hover:scale-105">
                  {showCopied ? 'Copied!' : 'Copy Clean Text'}
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialCharacterRemover;
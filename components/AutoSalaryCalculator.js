'use client';
import React, { useState, useEffect, useRef } from 'react';

const CombinedCalculator = () => {
  // Salary Calculator States
  const [salariesInput, setSalariesInput] = useState('');
  const [averageResult, setAverageResult] = useState('');
  const [autoCopied, setAutoCopied] = useState('');
  const [totalSalary, setTotalSalary] = useState(0);
  const [salaryCount, setSalaryCount] = useState(0);

  // Special Character Remover States
  const [input, setInput] = useState('');
  const [showCopied, setShowCopied] = useState(false);
  const [autoCopy, setAutoCopy] = useState(true);
  const inputRef = useRef(null);

  // Salary Calculator Effects
  useEffect(() => {
    if (averageResult.startsWith('Average Salary: ')) {
      navigator.clipboard.writeText(averageResult.replace('Average Salary: ', ''))
        .then(() => {
          setAutoCopied('Auto copied!');
          const copyTimer = setTimeout(() => {
            setAutoCopied('');
          }, 3000);

          const resetTimer = setTimeout(() => {
            setSalariesInput('');
            setAverageResult('');
            setTotalSalary(0);
            setSalaryCount(0);
          }, 5000);

          return () => {
            clearTimeout(copyTimer);
            clearTimeout(resetTimer);
          };
        })
        .catch(err => console.error('Failed to copy:', err));
    }
  }, [averageResult]);

  // Salary Calculator Functions
  const calculateAverage = (input) => {
    const salaries = input.split(/[,\s]+/).map(parseFloat).filter(value => !isNaN(value));
    if (salaries.length === 0) {
      setAverageResult('Please enter valid salaries.');
      setTotalSalary(0);
      setSalaryCount(0);
      return;
    }
    const total = salaries.reduce((acc, current) => acc + current, 0);
    const average = total / salaries.length;
    setAverageResult(`Average Salary: ${average.toFixed(0)}`);
    setTotalSalary(total);
    setSalaryCount(salaries.length);
  };

  const handleSalaryChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9,\s]/g, '');
    setSalariesInput(newValue);
    calculateAverage(newValue);
  };

  const handleSalaryPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9,\s]/g, '');
    const newValue = salariesInput + pastedData;
    setSalariesInput(newValue);
    calculateAverage(newValue);
  };

  // Special Character Remover Functions
  const cleanText = (text) => {
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

  const handleCharacterPaste = (e) => {
    e.preventDefault();
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
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      {/* Salary Calculator Section */}
      <div className="backdrop-blur-lg bg-white/20 rounded-2xl shadow-2xl p-8 relative border border-white/30">
        <h2 className="text-2xl font-bold mb-6 text-white">Salary Calculator</h2>
        <div className="space-y-4">
          <input
            type="text"
            value={salariesInput}
            onChange={handleSalaryChange}
            onPaste={handleSalaryPaste}
            className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter salaries (numbers only)"
          />
          <div className="text-purple-500">{autoCopied}</div>
          <div className="text-lg font-bold text-white">{averageResult}</div>
          <div className="text-sm text-gray-200">
            Total Salary: {totalSalary.toFixed(0)}
            <br />
            Number of Salaries: {salaryCount}
          </div>
          {averageResult && (
            <div className="text-xs text-gray-300">
              Auto-reset in 5 seconds...
            </div>
          )}
        </div>
      </div>

      {/* Special Character Remover Section */}
      <div className="backdrop-blur-lg bg-white/20 rounded-2xl shadow-2xl p-8 relative border border-white/30">
        <div className="absolute -top-3 -right-3 z-20">
          <span className="bg-gradient-to-r from-green-400 to-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            New
          </span>
        </div>

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
            onPaste={handleCharacterPaste}
            className="w-full p-4 bg-white/10 border border-white/30 rounded-xl text-white placeholder-white/50 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
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
  );
};

export default CombinedCalculator;
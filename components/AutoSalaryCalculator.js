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
    // Split by comma or whitespace, parse as float, then truncate decimal part
    const salaries = input.split(/[,\s]+/)
      .map(val => {
        // Truncate decimal part - if 1777.88, only take 1777
        const num = parseFloat(val);
        return isNaN(num) ? NaN : Math.floor(num);
      })
      .filter(value => !isNaN(value));
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
    // Allow digits, commas, spaces, and dots (for decimal numbers)
    const newValue = e.target.value.replace(/[^0-9,.\s]/g, '');
    setSalariesInput(newValue);
    calculateAverage(newValue);
  };

  const handleSalaryPaste = (e) => {
    e.preventDefault();
    // Allow digits, commas, spaces, and dots (for decimal numbers)
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9,.\s]/g, '');
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
    <div className="space-y-6">
      {/* Salary Calculator Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white/90">Salary Calculator</h2>
        <div className="space-y-3">
          <input
            type="text"
            value={salariesInput}
            onChange={handleSalaryChange}
            onPaste={handleSalaryPaste}
            className="w-full glass-input"
            placeholder="Enter salaries (numbers only)"
          />
          <div className="text-green-400 text-sm">{autoCopied}</div>
          <div className="text-base font-semibold text-white">{averageResult}</div>
          <div className="text-sm text-white/60">
            Total Salary: {totalSalary.toFixed(0)}
            <br />
            Number of Salaries: {salaryCount}
          </div>
          {averageResult && (
            <div className="text-xs text-white/40">
              Auto-reset in 5 seconds...
            </div>
          )}
        </div>
      </div>

      {/* Special Character Remover Section */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white/90">Special Character Remover</h2>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleAutoCopy}
        >
          <div className="relative inline-flex h-5 w-10 items-center rounded-full transition-colors duration-300 bg-white/10">
            <div className={`absolute h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${autoCopy ? 'translate-x-[22px]' : 'translate-x-0.5'
              }`} />
          </div>
          <span className="text-sm text-white/70">
            {autoCopy ? 'Auto-copy ON' : 'Auto-copy OFF'}
          </span>
        </div>

        <div className="space-y-3">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onPaste={handleCharacterPaste}
            className="w-full glass-input min-h-[100px] resize-none"
            rows={3}
            placeholder="Type or paste text here..."
          />

          {!autoCopy && (
            <button
              onClick={copyToClipboard}
              className="w-full glass-btn"
            >
              {showCopied ? 'Copied!' : 'Copy Clean Text'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CombinedCalculator;
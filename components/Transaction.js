import React, { useState } from 'react';
import Button from './Button';

const Transaction = () => {
  // State declarations
  const [copied, setCopied] = useState(false);
  const [loanId, setLoanId] = useState('');
  const [ids, setIds] = useState('');
  const [output, setOutput] = useState('Result will be displayed here');
  const [resetCounter, setResetCounter] = useState(0);
  const [autoMode, setAutoMode] = useState(true);
  const [autoReset, setAutoReset] = useState(true);
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [duplicateIds, setDuplicateIds] = useState([]);

  // Styles with fixed z-index and positioning


  const glassmorphismStyle = `
    relative
    bg-gradient-to-br from-black/70 to-gray-900/70
    backdrop-blur-3xl
    border-4 border-gray-600/50
    shadow-xl
    rounded-2xl
    overflow-visible
  `;

  const inputStyle = `
    bg-transparent
    border border-white/20
    text-white
    placeholder-white/50
    rounded-lg
    p-2
    w-full
    focus:outline-none
    focus:ring-2
    focus:ring-purple-500
    transition
    relative
    z-10
  `;

  const toggleStyle = `relative inline-flex items-center cursor-pointer`;
  const toggleLabelStyle = `ml-3 text-sm font-medium text-gray-300`;

  // Modified formatResult function to detect duplicates
  const formatResult = (inputIds) => {
    const idsArray = inputIds.trim().split(/[,\s]+/).filter(id => id !== '');

    // Find duplicates
    const idCounts = {};
    const duplicates = [];
    idsArray.forEach(id => {
      idCounts[id] = (idCounts[id] || 0) + 1;
      if (idCounts[id] > 1 && !duplicates.includes(id)) {
        duplicates.push(id);
      }
    });

    if (duplicates.length > 0) {
      setDuplicateIds(duplicates);
      setShowDuplicateWarning(true);
      setTimeout(() => setShowDuplicateWarning(false), 5000);
      return '';
    }

    const idsCount = idsArray.length;
    const idsOutput = idsArray.join(",");

    let result = '';
    if (idsCount > 0) {
      result = `${idsCount}:${idsOutput}`;
      if (loanId) {
        result = `${loanId}:${result}`;
      }
    }

    return result;
  };

  const copyResult = (result) => {
    if (result) {
      navigator.clipboard.writeText(result).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }

    if (autoReset) {
      setResetCounter(prev => prev + 1);
      setTimeout(resetFields, 5000);
    }
  };

  const resetFields = () => {
    setLoanId('');
    setIds('');
    setOutput('Result will be displayed here');
  };

  const handleLoanIdChange = (e) => {
    setLoanId(e.target.value);
  };

  const handleIdsChange = (e) => {
    const newIds = e.target.value;
    setIds(newIds);
    if (autoMode) {
      const newResult = formatResult(newIds);
      setOutput(newResult);
      if (newResult) copyResult(newResult);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text');
    setIds(pastedText);
    if (autoMode) {
      const newResult = formatResult(pastedText);
      setOutput(newResult);
      if (newResult) copyResult(newResult);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && autoMode) {
      const result = formatResult(ids);
      setOutput(result);
      if (result) copyResult(result);
    }
  };

  const handleManualConvertAndCopy = () => {
    const result = formatResult(ids);
    setOutput(result);
    if (result) copyResult(result);
  };

  return (

    <div className="p-4 space-y-4">
      {/* Notification Area with higher z-index */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4">
        {showDuplicateWarning && (
          <div className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between animate-fade-in">
            <div>
              <h4 className="font-bold">Duplicate IDs Detected!</h4>
              <p className="text-sm">
                Duplicates found: {duplicateIds.join(', ')}
              </p>
            </div>
            <button
              onClick={() => setShowDuplicateWarning(false)}
              className="ml-4 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        )}
      </div>

      {copied && (
        <div className="bg-green-600/80 backdrop-blur-sm text-white py-2 px-4 rounded text-sm mb-4 relative z-20">
          Copied to clipboard!
        </div>
      )}


      <div className="space-y-3 relative z-10">
        <input
          type="text"
          value={loanId}
          onChange={handleLoanIdChange}
          placeholder="QID 106 and 117"
          onKeyPress={handleKeyPress}
          className="glass-input lg:w-40"
        />
        <input
          type="text"
          value={ids}
          onChange={handleIdsChange}
          onPaste={handlePaste}
          placeholder="Enter transactions_id"
          onKeyPress={handleKeyPress}
          className="glass-input w-full"
        />

        <div className="flex flex-wrap gap-2 items-center relative z-10">
          <Button onClick={handleManualConvertAndCopy} className="text-xs sm:text-sm">
            Convert & Copy
          </Button>
          <Button onClick={resetFields} className="text-xs sm:text-sm">
            Reset <span>{resetCounter}</span>
          </Button>
          <label className={`${toggleStyle} relative z-10`}>
            <input
              type="checkbox"
              checked={autoMode}
              onChange={() => setAutoMode(!autoMode)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/25"></div>
            <span className={toggleLabelStyle}>{autoMode ? 'Auto' : 'Manual'}</span>
          </label>
          <label className={`${toggleStyle} relative z-10`}>
            <input
              type="checkbox"
              checked={autoReset}
              onChange={() => setAutoReset(!autoReset)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-white/25"></div>
            <span className={toggleLabelStyle}>Auto-Reset</span>
          </label>
        </div>
      </div>
      <div id="output" className="glass-input min-h-[50px] mt-3">
        {output}
      </div>
    </div>


  );
};

export default Transaction;
import React, { useState, useEffect } from 'react';

const AutoSalaryCalculator = () => {
  const [salariesInput, setSalariesInput] = useState('');
  const [averageResult, setAverageResult] = useState('');
  const [autoCopied, setAutoCopied] = useState('');
  const [totalSalary, setTotalSalary] = useState(0);
  const [salaryCount, setSalaryCount] = useState(0);

  useEffect(() => {
    if (averageResult.startsWith('Average Salary: ')) {
      navigator.clipboard.writeText(averageResult.replace('Average Salary: ', ''))
        .then(() => {
          setAutoCopied('Auto copied!');
          const copyTimer = setTimeout(() => {
            setAutoCopied('');
          }, 3000);

          // Auto reset after 5 seconds
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

  const handleChange = (e) => {
    const newValue = e.target.value.replace(/[^0-9,\s]/g, '');
    setSalariesInput(newValue);
    calculateAverage(newValue);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').replace(/[^0-9,\s]/g, '');
    const newValue = salariesInput + pastedData;
    setSalariesInput(newValue);
    calculateAverage(newValue);
  };

  const inputStyle = `
    bg-transparent
    border border-purple-300/20
    text-white
    placeholder-purple-200/40
    rounded-lg
    px-4 py-3
    w-full
    focus:outline-none
    focus:ring-2
    focus:ring-purple-500/50
    focus:border-transparent
    transition-all duration-300 ease-in-out
    backdrop-blur-sm
    shadow-inner
    text-sm
    font-medium
    hover:border-purple-400/30
  `;

  return (
    <div className="p-4 relative">
      <h3 className="text-lg text-gray-300 font-bold mb-2">Auto Salary Average Calculator</h3>
      <div className="mb-2">
        <input
          type="text"
          value={salariesInput}
          onChange={handleChange}
          onPaste={handlePaste}
          className={inputStyle}
          placeholder="Enter salaries (numbers only)"
        />
      </div>
      <div id="auto-copied" className="text-purple-500 mb-2">{autoCopied}</div>
      <div id="result" className="text-lg font-bold text-gray-300">{averageResult}</div>
      <div className="text-sm text-gray-400 mt-2">
        Total Salary: {totalSalary.toFixed(0)}
        <br />
        Number of Salaries: {salaryCount}
      </div>
      {averageResult && (
        <div className="text-xs text-gray-500 mt-2">
          Auto-reset in 5 seconds...
        </div>
      )}
      <span className="absolute bottom-0 left-4 h-px w-[calc(100%-2rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500" />
    </div>
  );
};

export default AutoSalaryCalculator;
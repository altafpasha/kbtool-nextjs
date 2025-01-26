import { useState } from 'react';
import ZaubaButton from './ZaubaButton';
import ResetButton from './ResetButton';
import CyberpunkButton from './CyberpunkButton';

const CompanySearch = () => {
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');

  const handleSearch = (query) => {
    // Validate input to prevent special characters
    const sanitizedName = companyName.replace(/[^a-zA-Z0-9\s]/g, '');

    if (!companyName.trim()) {
      setError('Please enter a company name');
      return;
    }

    const urlMap = {
      zauba: `https://www.google.com/search?q=zauba+${sanitizedName}`,
      companyCheck: `https://www.google.com/search?q=thecompanycheck.com+${sanitizedName}`,
      tofler: `https://www.google.com/search?q=tofler.in+${sanitizedName}`,
      site: `https://www.google.com/search?q=site:+${sanitizedName}`,
      falconebiz: `https://www.google.com/search?q=falconebiz.com+${sanitizedName}`
    };

    window.open(urlMap[query], "_blank");
    setError('');
  };

  const handleReset = () => {
    setCompanyName('');
    setError('');
  };

  return (
    <div className="p-6 ">
      <h1 className="text-gray-300 text-2xl font-bold mb-4">Company Search Engine</h1>
      <input
        type="text"
        id="companyName"
        className="p-2 w-full mb-4 rounded bg-transparent text-white w-full mb-2 text-sm sm:text-base split-border border border border-white/20 placeholder-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-500 "
        placeholder="Enter Company Name"
        value={companyName}
        onChange={(e) => {
          setCompanyName(e.target.value);
          setError('');
        }}
      />
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex flex-wrap justify-center gap-2">
        <ResetButton onClick={handleReset}>Reset </ResetButton>
        <ZaubaButton onClick={() => handleSearch('zauba')}>Zauba</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('companyCheck')}>Company Check</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('tofler')}>Tofler</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('site')}>WebSite</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('falconebiz')}>Falconebiz</ZaubaButton>
      </div>
      <span className="absolute bottom-0 left-4 h-px w-[calc(100%-2rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500" />
    </div>
  );
};

export default CompanySearch;
import { useState } from 'react';
import ZaubaButton from './ZaubaButton';
import ResetButton from './ResetButton';
import CyberpunkButton from './CyberpunkButton';


const CompanySearch = () => {
  const [companyName, setCompanyName] = useState('');

  const handleSearch = (query) => {
    const urlMap = {
      zauba: `https://www.google.com/search?q=zauba+${companyName}`,
      companyCheck: `https://www.google.com/search?q=thecompanycheck.com+${companyName}`,
      tofler: `https://www.google.com/search?q=tofler.in+${companyName}`,
      site: `https://www.google.com/search?q=site:+${companyName}`
    };
    window.open(urlMap[query], "_blank");
  };

  const handleReset = () => {
    setCompanyName('');
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
    <div className="p-6 ">
      
      <h1 className="text-gray-300 text-2xl font-bold mb-4">Company Search Engine</h1>
      <input
        type="text"
        id="companyName"
        className="p-2 w-full mb-4 rounded bg-transparent text-white w-full mb-2 text-sm sm:text-base split-border border border border-white/20 placeholder-purple-200/40 focus:outline-none focus:ring-2 focus:ring-purple-500 "
        placeholder="Enter Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
      />
      <div className="flex flex-wrap justify-center gap-2">
        <ResetButton onClick={handleReset}>Reset </ResetButton>
        <ZaubaButton onClick={() => handleSearch('zauba')}>Zauba</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('companyCheck')}>Company Check</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('tofler')}>Tofler</ZaubaButton>
        <ZaubaButton onClick={() => handleSearch('site')}>WebSite</ZaubaButton>
      </div>
      <span className="absolute bottom-0 left-4 h-px w-[calc(100%-2rem)] bg-gradient-to-r from-purple-400/0 via-purple-400/90 to-purple-400/0 transition-opacity duration-500" />
    </div>
  );
};

export default CompanySearch;

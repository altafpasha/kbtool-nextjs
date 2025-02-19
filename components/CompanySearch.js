import { useState, useEffect } from 'react';
import ZaubaButton from './ZaubaButton';
import ResetButton from './ResetButton';
import CyberpunkButton from './CyberpunkButton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CompanySearch = () => {
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showPopupWarning, setShowPopupWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, []);

  const getUrlMap = (sanitizedName) => ({
    zauba: `https://www.google.com/search?q=zauba+${sanitizedName}`,
    companyCheck: `https://www.google.com/search?q=thecompanycheck.com+${sanitizedName}`,
    tofler: `https://www.google.com/search?q=tofler.in+${sanitizedName}`,
    site: `https://www.google.com/search?q=site:+${sanitizedName}`,
    falconebiz: `https://www.google.com/search?q=falconebiz.com+${sanitizedName}`
  });

  const validateInput = (input) => {
    if (!input.trim()) return 'Please enter a company name';
    if (input.length < 2) return 'Company name must be at least 2 characters long';
    if (input.length > 100) return 'Company name is too long';
    return '';
  };

  const sanitizeInput = (input) => input.replace(/[^a-zA-Z0-9\s]/g, '').trim();

  const openUrlWithFallback = (url) => {
    const newWindow = window.open(url, '_blank');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      setShowPopupWarning(true);
      return false;
    }
    return true;
  };

  const updateSearchHistory = (sanitizedName) => {
    const newHistory = [
      { 
        name: sanitizedName, 
        timestamp: new Date().toISOString() 
      }, 
      ...searchHistory.filter(item => item.name !== sanitizedName).slice(0, 9)
    ];
    setSearchHistory(newHistory);
    localStorage.setItem('searchHistory', JSON.stringify(newHistory));
  };

  const handleSearch = async (query, searchTerm = companyName) => {
    const validationError = validateInput(searchTerm);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);
    setError('');
    setShowPopupWarning(false);
    setShowSuccess(false);

    try {
      const sanitizedName = sanitizeInput(searchTerm);
      const urlMap = getUrlMap(sanitizedName);

      if (query === 'all') {
        const buttons = Object.keys(urlMap);
        for (const button of buttons) {
          const buttonElement = document.querySelector(`button[data-search="${button}"]`);
          if (buttonElement) {
            buttonElement.click();
            await new Promise(resolve => setTimeout(resolve, 300));
          }
        }
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        openUrlWithFallback(urlMap[query]);
      }

      updateSearchHistory(sanitizedName);
    } catch {
      setError('An error occurred while performing the search');
    } finally {
      setIsLoading(false);
    }
  };

  const handleHistoryItemClick = (historyItem, searchType) => {
    setCompanyName(historyItem.name);
    if (searchType) {
      handleSearch(searchType, historyItem.name);
    }
  };

  const handleReset = () => {
    setCompanyName('');
    setError('');
    setIsLoading(false);
    setShowPopupWarning(false);
    setShowSuccess(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch('all');
  };

  useEffect(() => {
    if (showPopupWarning) {
      const timer = setTimeout(() => setShowPopupWarning(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [showPopupWarning]);

  return (
    <div className="p-6 relative">
      <h1 className="text-gray-300 text-2xl font-bold mb-4">Company Search Engine</h1>

      {showPopupWarning && (
        <Alert className="mb-4 bg-yellow-500/10 text-yellow-200 border-yellow-500/50">
          <AlertDescription>
            Please allow popup windows for this site to use the multi-search feature.
          </AlertDescription>
        </Alert>
      )}

      {showSuccess && (
        <Alert className="mb-4 bg-green-500/10 text-green-200 border-green-500/50">
          <AlertDescription>
            Successfully opened all search tabs!
          </AlertDescription>
        </Alert>
      )}

      <div className="relative">
        <input
          type="text"
          className="p-2 w-full mb-4 rounded bg-transparent text-white border border-white/20"
          placeholder="Enter Company Name"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
        />
        {companyName && <button className="absolute right-2 top-2" onClick={handleReset}>×</button>}
      </div>

      {error && <p className="text-red-500 mb-4 text-sm">{error}</p>}

      <div className="flex flex-wrap gap-2 mb-4">
        <ResetButton onClick={handleReset} disabled={isLoading}>Reset</ResetButton>
        <ZaubaButton onClick={() => handleSearch('all')} disabled={isLoading}>Open All Tabs</ZaubaButton>
        {Object.keys(getUrlMap('')).map(key => (
          <ZaubaButton 
            key={key} 
            onClick={() => handleSearch(key)} 
            disabled={isLoading}
            data-search={key}
          >
            {key}
          </ZaubaButton>
        ))}
      </div>

      {searchHistory.length > 0 && (
        <div className="mt-6">
          <h2 className="text-gray-400 text-sm mb-2">Recent Searches</h2>
          {searchHistory.map((search, index) => (
            <div key={index} className="mb-2">
              <div className="text-gray-400 text-sm py-1 px-2 hover:bg-white/5 rounded cursor-pointer flex items-center justify-between">
                <span onClick={() => handleHistoryItemClick(search)}>
                  {search.name} 
                  <span className="text-gray-500 text-xs ml-2">
                    {new Date(search.timestamp).toLocaleTimeString()}
                  </span>
                </span>
                <div className="flex gap-2">
                  <button 
                    className="text-xs text-blue-400 hover:text-blue-300"
                    onClick={() => handleHistoryItemClick(search, 'all')}
                  >
                    Open All
                  </button>
                  {Object.keys(getUrlMap('')).map(key => (
                    <button
                      key={key}
                      className="text-xs text-blue-400 hover:text-blue-300"
                      onClick={() => handleHistoryItemClick(search, key)}
                    >
                      {key}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CompanySearch;
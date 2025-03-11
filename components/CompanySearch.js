import { useState, useEffect } from 'react';
import ZaubaButton from './ZaubaButton';
import ResetButton from './ResetButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";
import CompanySearchGlass from './CompanySearchGlass';

const CompanySearch = () => {
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [showPopupWarning, setShowPopupWarning] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showAllHistory, setShowAllHistory] = useState(false);
  const [showRecentSearches, setShowRecentSearches] = useState(true);

  // Load search history and show popup warning on component mount
  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
    // Show popup warning immediately
    setShowPopupWarning(true);
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

  const openMultipleUrls = async (urls) => {
    try {
      // Open URLs sequentially with a longer delay
      for (const url of urls) {
        await new Promise((resolve) => {
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          
          setTimeout(() => {
            try {
              link.click();
              document.body.removeChild(link);
              resolve(true);
            } catch (err) {
              console.error(`Error opening URL ${url}:`, err);
              resolve(false);
            }
          }, 300); // Increased delay to 300ms
        });
      }
      return true;
    } catch (error) {
      console.error('Error in openMultipleUrls:', error);
      return false;
    }
  };

  const openUrlWithFallback = (url) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        const urls = Object.values(urlMap);
        const success = await openMultipleUrls(urls);
        
        if (success) {
          setShowSuccess(true);
          setTimeout(() => setShowSuccess(false), 3000);
        } else {
          setShowPopupWarning(true);
        }
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

  // Get the display history based on showAllHistory state
  const displayHistory = showAllHistory ? searchHistory : searchHistory.slice(0, 4);

  return (
    <Card className="bg-black/50 border-white/10">
      <CardHeader>
        <CardTitle className="text-gray-300">Company Search Engine</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {showPopupWarning && (
          <Alert className="bg-yellow-500/10 text-yellow-200 border-yellow-500/50">
            <AlertDescription>
              &quot;Open All Tabs Fixed&quot; - Please allow popup windows for this site to use the multi-search feature.
            </AlertDescription>
          </Alert>
        )}

        {showSuccess && (
          <Alert className="bg-green-500/10 text-green-200 border-green-500/50">
            <AlertDescription>
              Successfully opened all search tabs!
            </AlertDescription>
          </Alert>
        )}

        <div className="relative">
          <input
            type="text"
            className="p-2 w-full rounded bg-transparent text-white border border-white/20"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          {companyName && (
            <button 
              className="absolute right-2 top-2 text-gray-400 hover:text-white" 
              onClick={handleReset}
            >
              ×
            </button>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex flex-wrap gap-2">
          <ResetButton onClick={handleReset} disabled={isLoading}>Reset</ResetButton>
          <ZaubaButton 
            onClick={() => handleSearch('all')} 
            disabled={isLoading}
          >
            {isLoading ? 'Opening...' : 'Open All Tabs'}
          </ZaubaButton>
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
        <CompanySearchGlass />
        
      </CardContent>
    </Card>
  );
};

export default CompanySearch;
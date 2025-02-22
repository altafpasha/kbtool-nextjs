import { useState, useEffect } from 'react';
import ZaubaButton from './ZaubaButton';
import ResetButton from './ResetButton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ScrollArea } from "@/components/ui/scroll-area";

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

        {searchHistory.length > 0 && (
          <div className="relative">            
            <button
              onClick={() => setShowRecentSearches(!showRecentSearches)}
              className="absolute -top-8 right-0 text-gray-400 hover:text-white text-sm flex items-center gap-1"
            >
              {showRecentSearches ? (
                <>
                  <span>Hide Recent</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Show Recent</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
            {showRecentSearches && (
              <Card className="relative backdrop-blur-md bg-white/5 border-white/10 overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-gray-400 text-sm">Recent Searches</CardTitle>
              {searchHistory.length > 4 && (
                <button
                  onClick={() => setShowAllHistory(!showAllHistory)}
                  className="text-xs text-blue-400 hover:text-blue-300"
                >
                  {showAllHistory ? 'Show Less' : 'Show More'}
                </button>
              )}
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-full max-h-[280px] overflow-y-auto rounded-md">
                <div className="space-y-2 pr-4">
                  {displayHistory.map((search, index) => (
                    <div 
                      key={index}
                      className="text-gray-400 text-sm py-2 px-3 hover:bg-white/10 rounded-lg transition-colors duration-200 backdrop-blur-sm"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <span 
                          onClick={() => handleHistoryItemClick(search)}
                          className="flex items-center cursor-pointer"
                        >
                          {search.name}
                          <span className="text-gray-500 text-xs ml-2">
                            {new Date(search.timestamp).toLocaleTimeString()}
                          </span>
                        </span>
                        <div className="flex flex-wrap gap-2">
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
              </ScrollArea>
            </CardContent>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CompanySearch;
import React, { useState } from 'react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Search, AlertTriangle, Building2, Newspaper, ArrowRight, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';

const CompanySearchGlass = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyOne, setCompanyOne] = useState('');
  const [companyTwo, setCompanyTwo] = useState('');
  const [newsCompany, setNewsCompany] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (companyName.trim()) {
      const searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(companyName)}&source=llmSuggest&summary=1&lang=en-in`;
      window.open(searchUrl, '_blank');
    }
  };

  const handleCompareSearch = (e) => {
    e.preventDefault();
    if (companyOne.trim() && companyTwo.trim()) {
      const searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(`${companyOne} ${companyTwo} is this both company are same organization`)}&source=llmSuggest&summary=1&lang=en-in`;
      window.open(searchUrl, '_blank');
    }
  };

  const handleNewsSearch = (e) => {
    e.preventDefault();
    if (newsCompany.trim()) {
      const searchUrl = `https://search.brave.com/search?q=${encodeURIComponent(`${newsCompany} is this company a news media or news company`)}&source=llmSuggest&summary=1&lang=en-in`;
      window.open(searchUrl, '_blank');
    }
  };

  const handleReset = (type) => {
    switch(type) {
      case 'search':
        setCompanyName('');
        break;
      case 'compare':
        setCompanyOne('');
        setCompanyTwo('');
        break;
      case 'news':
        setNewsCompany('');
        break;
    }
  };

  return (
    <div className="flex items-center justify-center   text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 p-1 rounded-xl mb-3">
            <div className="bg-slate-900 px-4 py-2 rounded-lg">
              <h1 className="text-2xl sm:text-3xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400">
               AI Company Search & Intelligence
              </h1>
            </div>
          </div>
          <p className="text-slate-300 text-sm sm:text-base">Advanced research tools for corporate analysis</p>
        </div>
        
        <Alert className="mb-4 bg-red-900/20 border border-red-500/30 backdrop-blur-sm text-red-200 shadow-lg">
          <div className="flex items-center">
            <div className="bg-red-500/20 p-2 rounded-lg mr-3">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <AlertDescription className="text-sm">
              <span className="font-semibold">Disclaimer:</span> AI search results may not be accurate. We are not responsible for decisions made based on this information.
            </AlertDescription>
          </div>
        </Alert>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-slate-800/50 backdrop-blur-sm w-full max-w-full">
            <TabsTrigger 
              value="search" 
              className="data-[state=active]:bg-indigo-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-700/70 transition-all duration-200 min-w-fit py-2 text-xs sm:text-sm"
            >
              <Building2 className="h-4 w-4 mr-1 hidden sm:inline" />
              Basic Search
            </TabsTrigger>
            <TabsTrigger 
              value="compare" 
              className="data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-700/70 transition-all duration-200 min-w-fit py-2 text-xs sm:text-sm"
            >
              <ArrowRight className="h-4 w-4 mr-1 hidden sm:inline" />
              Relationships
            </TabsTrigger>
            <TabsTrigger 
              value="news" 
              className="data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=active]:shadow-md hover:bg-slate-700/70 transition-all duration-200 min-w-fit py-2 text-xs sm:text-sm"
            >
              <Newspaper className="h-4 w-4 mr-1 hidden sm:inline" />
              News & Media
            </TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <Card className="backdrop-blur-lg bg-slate-800/30 border border-slate-700/50 shadow-xl rounded-xl p-6">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-block  rounded-lg px-4 py-2 mb-2">
                    <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                      <Building2 className="h-6 w-6 text-indigo-400" />
                      Company Search
                    </h2>
                  </div>
                  <p className="text-slate-300">Find detailed information about any company</p>
                </div>
                
                <form onSubmit={handleSearch} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter company name (e.g., KreditBee)"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-400 pr-10 focus:ring-2 focus:ring-indigo-500/50 transition-all"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium shadow-lg shadow-indigo-700/20 transition-all hover:shadow-indigo-700/40"
                    >
                      Search Company
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleReset('search')}
                      variant="outline"
                      className="bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="compare">
            <Card className="backdrop-blur-lg bg-slate-800/30 border border-slate-700/50 shadow-xl rounded-xl p-6">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-block rounded-lg px-4 py-2 mb-2">
                    <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-purple-400">
                        <circle cx="18" cy="18" r="3" />
                        <circle cx="6" cy="6" r="3" />
                        <path d="M13 6h3a2 2 0 0 1 2 2v7" />
                        <path d="M11 18H8a2 2 0 0 1-2-2V9" />
                      </svg>
                      Company Relationship Checker
                    </h2>
                  </div>
                  <p className="text-slate-300">Discover if companies are related, subsidiaries, or competitors</p>
                </div>
                
                <form onSubmit={handleCompareSearch} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 items-center">
                    <div className="relative sm:col-span-2">
                      <Input
                        type="text"
                        placeholder="First Company"
                        value={companyOne}
                        onChange={(e) => setCompanyOne(e.target.value)}
                        className="bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/50 transition-all"
                      />
                    </div>
                    
                    <div className="flex justify-center sm:col-span-1">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-purple-600/30 border border-purple-500/30">
                        <ArrowRight className="h-4 w-4 text-purple-400" />
                      </div>
                    </div>
                    
                    <div className="relative sm:col-span-2">
                      <Input
                        type="text"
                        placeholder="Second Company"
                        value={companyTwo}
                        onChange={(e) => setCompanyTwo(e.target.value)}
                        className="bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-purple-500/50 transition-all"
                      />
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium shadow-lg shadow-purple-700/20 transition-all hover:shadow-purple-700/40"
                    >
                      Compare Companies
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleReset('compare')}
                      variant="outline"
                      className="bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="bg-purple-900/20 p-3 rounded-lg border border-purple-500/20">
                    <p className="text-xs text-slate-300">
                      Checks if companies are related through:
                    </p>
                    <ul className="text-xs text-slate-300 mt-1 grid grid-cols-2 gap-1">
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-1"></span> Parent-subsidiary</li>
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-1"></span> Sister companies</li>
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-1"></span> Merger history</li>
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-purple-400 mr-1"></span> Acquisition details</li>
                    </ul>
                  </div>
                </form>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="news">
            <Card className="backdrop-blur-lg bg-slate-800/30 border border-slate-700/50 shadow-xl rounded-xl p-6">
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <div className="inline-block  rounded-lg px-4 py-2 mb-2">
                    <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
                      <Newspaper className="h-6 w-6 text-blue-400" />
                      Media & Press Analysis
                    </h2>
                  </div>
                  <p className="text-slate-300">Analyze if a company is a media outlet or check its connections</p>
                </div>
                
                <form onSubmit={handleNewsSearch} className="space-y-4">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Enter company name for news analysis"
                      value={newsCompany}
                      onChange={(e) => setNewsCompany(e.target.value)}
                      className="bg-slate-700/30 border-slate-600/50 text-white placeholder:text-slate-400 pr-10 focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                    <Newspaper className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg shadow-blue-700/20 transition-all hover:shadow-blue-700/40"
                    >
                      Check News Status
                    </Button>
                    <Button
                      type="button"
                      onClick={() => handleReset('news')}
                      variant="outline"
                      className="bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-500/20">
                    <p className="text-xs text-slate-300">
                      Identifies if the company is:
                    </p>
                    <ul className="text-xs text-slate-300 mt-1 grid grid-cols-2 gap-1">
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-1"></span> News organization</li>
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-1"></span> Media outlet</li>
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-1"></span> Defense connection</li>
                      <li className="flex items-center"><span className="h-1.5 w-1.5 rounded-full bg-blue-400 mr-1"></span> Foreign investment</li>
                    </ul>
                  </div>
                </form>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

       
      </div>
    </div>
  );
};

export default CompanySearchGlass;
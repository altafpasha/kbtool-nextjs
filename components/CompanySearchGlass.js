import React, { useState } from 'react';
import { Search, AlertTriangle, Building2, Newspaper, ArrowRight, RotateCcw, Sparkles, Link2 } from 'lucide-react';

const CompanySearchGlass = () => {
  const [companyName, setCompanyName] = useState('');
  const [companyOne, setCompanyOne] = useState('');
  const [companyTwo, setCompanyTwo] = useState('');
  const [newsCompany, setNewsCompany] = useState('');
  const [activeTab, setActiveTab] = useState('search');

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
    switch (type) {
      case 'search': setCompanyName(''); break;
      case 'compare': setCompanyOne(''); setCompanyTwo(''); break;
      case 'news': setNewsCompany(''); break;
    }
  };

  const tabs = [
    { id: 'search', label: 'AI Search', icon: Sparkles },
    { id: 'compare', label: 'Compare', icon: Link2 },
    { id: 'news', label: 'Media Check', icon: Newspaper }
  ];

  return (
    <div className="mt-6 pt-6 border-t border-white/5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-white/60" />
        <h3 className="text-lg font-semibold text-white/90">AI Company Intelligence</h3>
        <span className="text-xs px-2 py-0.5 rounded bg-green-500/20 text-green-400">AI Powered</span>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 mb-4">
        <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-white/60">
          AI results may not be accurate. Verify information independently.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-lg bg-white/5 mb-4">
        {tabs.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-md text-sm transition-all ${activeTab === id
                ? 'bg-white/10 text-white'
                : 'text-white/50 hover:text-white/70'
              }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* AI Search Tab */}
      {activeTab === 'search' && (
        <form onSubmit={handleSearch} className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
            <Building2 className="w-4 h-4" />
            <span>Deep company analysis with AI</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter company name (e.g., KreditBee)"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="glass-input w-full pr-10"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 glass-btn glass-btn-info">
              Search with AI
            </button>
            <button
              type="button"
              onClick={() => handleReset('search')}
              className="glass-btn"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </form>
      )}

      {/* Compare Tab */}
      {activeTab === 'compare' && (
        <form onSubmit={handleCompareSearch} className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
            <Link2 className="w-4 h-4" />
            <span>Check if companies are related</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 items-center">
            <input
              type="text"
              placeholder="First Company"
              value={companyOne}
              onChange={(e) => setCompanyOne(e.target.value)}
              className="glass-input sm:col-span-2"
            />
            <div className="flex justify-center">
              <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
                <ArrowRight className="w-3 h-3 text-white/50" />
              </div>
            </div>
            <input
              type="text"
              placeholder="Second Company"
              value={companyTwo}
              onChange={(e) => setCompanyTwo(e.target.value)}
              className="glass-input sm:col-span-2"
            />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 glass-btn glass-btn-info">
              Compare Companies
            </button>
            <button
              type="button"
              onClick={() => handleReset('compare')}
              className="glass-btn"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-white/40">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
              Parent-subsidiary
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
              Sister companies
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
              Merger history
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
              Acquisition details
            </div>
          </div>
        </form>
      )}

      {/* News Tab */}
      {activeTab === 'news' && (
        <form onSubmit={handleNewsSearch} className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-white/60 mb-2">
            <Newspaper className="w-4 h-4" />
            <span>Check if company is a media outlet</span>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter company name for media analysis"
              value={newsCompany}
              onChange={(e) => setNewsCompany(e.target.value)}
              className="glass-input w-full pr-10"
            />
            <Newspaper className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 w-4 h-4" />
          </div>
          <div className="flex gap-2">
            <button type="submit" className="flex-1 glass-btn glass-btn-info">
              Check Media Status
            </button>
            <button
              type="button"
              onClick={() => handleReset('news')}
              className="glass-btn"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-white/40">
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
              News organization
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
              Media outlet
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
              Defense connection
            </div>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
              Foreign investment
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default CompanySearchGlass;
import { useState } from 'react';
import { Search, Globe, Building2, FileText, ExternalLink, Sparkles, Link2, Newspaper, ArrowRight, RotateCcw, AlertTriangle, ExternalLinkIcon } from 'lucide-react';

const CompanySearch = () => {
  const [mode, setMode] = useState('basic');

  // Basic Search States
  const [companyName, setCompanyName] = useState('');
  const [error, setError] = useState('');

  // AI Search States
  const [aiCompanyName, setAiCompanyName] = useState('');
  const [companyOne, setCompanyOne] = useState('');
  const [companyTwo, setCompanyTwo] = useState('');
  const [newsCompany, setNewsCompany] = useState('');
  const [aiTab, setAiTab] = useState('search');

  const searchSources = [
    { key: 'zauba', label: 'Zauba', icon: Building2, query: 'site:zaubacorp.com' },
    { key: 'companyCheck', label: 'CompanyCheck', icon: FileText, query: 'site:thecompanycheck.com' },
    { key: 'tofler', label: 'Tofler', icon: Globe, query: 'site:tofler.in' },
    { key: 'falconebiz', label: 'FalconeBiz', icon: ExternalLink, query: 'site:falconebiz.com' }
  ];

  const openSearch = async (source) => {
    if (!companyName.trim()) { setError('Enter company name first'); return; }
    setError('');

    if (source === 'all') {
      for (const s of searchSources) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(`${s.query} ${companyName}`)}`, '_blank');
        await new Promise(r => setTimeout(r, 300));
      }
    } else {
      const s = searchSources.find(x => x.key === source);
      window.open(`https://www.google.com/search?q=${encodeURIComponent(`${s.query} ${companyName}`)}`, '_blank');
    }
  };

  const handleReset = (type) => {
    if (type === 'basic') { setCompanyName(''); setError(''); }
    else if (type === 'search') setAiCompanyName('');
    else if (type === 'compare') { setCompanyOne(''); setCompanyTwo(''); }
    else if (type === 'news') setNewsCompany('');
  };

  // AI Handlers
  const handleAiSearch = (e) => { e.preventDefault(); if (aiCompanyName.trim()) window.open(`https://search.brave.com/search?q=${encodeURIComponent(aiCompanyName)}&source=llmSuggest&summary=1`, '_blank'); };
  const handleCompareSearch = (e) => { e.preventDefault(); if (companyOne.trim() && companyTwo.trim()) window.open(`https://search.brave.com/search?q=${encodeURIComponent(`${companyOne} ${companyTwo} is this both company are same organization`)}&source=llmSuggest&summary=1`, '_blank'); };
  const handleNewsSearch = (e) => { e.preventDefault(); if (newsCompany.trim()) window.open(`https://search.brave.com/search?q=${encodeURIComponent(`${newsCompany} is this company a news media or news company`)}&source=llmSuggest&summary=1`, '_blank'); };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white/90">Company Search</h3>
        <div className="flex p-1 rounded-lg bg-white/5">
          <button onClick={() => setMode('basic')} className={`px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 ${mode === 'basic' ? 'bg-white/10 text-white' : 'text-white/50'}`}>
            <Search className="w-3 h-3" />Basic
          </button>
          <button onClick={() => setMode('ai')} className={`px-3 py-1.5 rounded-md text-xs flex items-center gap-1.5 ${mode === 'ai' ? 'bg-white/10 text-white' : 'text-white/50'}`}>
            <Sparkles className="w-3 h-3" />AI
          </button>
        </div>
      </div>

      {/* Basic Search */}
      {mode === 'basic' && (
        <div className="space-y-3">
          {/* Input */}
          <div className="relative">
            <input type="text" className="glass-input w-full pr-10" placeholder="Enter company name..." value={companyName}
              onChange={(e) => setCompanyName(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && openSearch('zauba')} />
            {companyName && <button className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white" onClick={() => handleReset('basic')}>×</button>}
          </div>

          {error && <p className="text-red-400 text-xs">{error}</p>}

          {/* Open All */}
          <button onClick={() => openSearch('all')} className="w-full glass-btn glass-btn-success text-xs flex items-center justify-center gap-2">
            <ExternalLinkIcon className="w-3 h-3" />Open All Tabs
          </button>

          {/* Source Buttons */}
          <div className="grid grid-cols-2 gap-2">
            {searchSources.map(({ key, label, icon: Icon }) => (
              <button key={key} onClick={() => openSearch(key)} className="glass-btn text-xs flex items-center justify-center gap-2">
                <Icon className="w-3 h-3 opacity-60" />{label}
              </button>
            ))}
          </div>

          {/* Reset */}
          <button onClick={() => handleReset('basic')} className="w-full glass-btn glass-btn-danger text-xs flex items-center justify-center gap-2">
            <RotateCcw className="w-3 h-3" />Reset
          </button>
        </div>
      )}

      {/* AI Search */}
      {mode === 'ai' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 p-2 rounded bg-red-500/10 border border-red-500/20">
            <AlertTriangle className="w-3 h-3 text-red-400" /><p className="text-xs text-white/50">AI results may not be accurate</p>
          </div>
          <div className="flex gap-1 p-1 rounded-lg bg-white/5">
            {[{ id: 'search', label: 'Search', icon: Sparkles }, { id: 'compare', label: 'Compare', icon: Link2 }, { id: 'news', label: 'Media', icon: Newspaper }].map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setAiTab(id)} className={`flex-1 py-1.5 rounded-md text-xs flex items-center justify-center gap-1 ${aiTab === id ? 'bg-white/10 text-white' : 'text-white/50'}`}>
                <Icon className="w-3 h-3" />{label}
              </button>
            ))}
          </div>
          {aiTab === 'search' && (
            <form onSubmit={handleAiSearch} className="space-y-2">
              <input type="text" placeholder="Company name..." value={aiCompanyName} onChange={(e) => setAiCompanyName(e.target.value)} className="glass-input w-full" />
              <div className="flex gap-2"><button type="submit" className="flex-1 glass-btn glass-btn-info text-xs">Search AI</button><button type="button" onClick={() => handleReset('search')} className="glass-btn"><RotateCcw className="w-3 h-3" /></button></div>
            </form>
          )}
          {aiTab === 'compare' && (
            <form onSubmit={handleCompareSearch} className="space-y-2">
              <div className="flex gap-2 items-center"><input type="text" placeholder="Company 1" value={companyOne} onChange={(e) => setCompanyOne(e.target.value)} className="glass-input flex-1" /><ArrowRight className="w-4 h-4 text-white/30" /><input type="text" placeholder="Company 2" value={companyTwo} onChange={(e) => setCompanyTwo(e.target.value)} className="glass-input flex-1" /></div>
              <div className="flex gap-2"><button type="submit" className="flex-1 glass-btn glass-btn-info text-xs">Compare</button><button type="button" onClick={() => handleReset('compare')} className="glass-btn"><RotateCcw className="w-3 h-3" /></button></div>
            </form>
          )}
          {aiTab === 'news' && (
            <form onSubmit={handleNewsSearch} className="space-y-2">
              <input type="text" placeholder="Company name..." value={newsCompany} onChange={(e) => setNewsCompany(e.target.value)} className="glass-input w-full" />
              <div className="flex gap-2"><button type="submit" className="flex-1 glass-btn glass-btn-info text-xs">Check Media</button><button type="button" onClick={() => handleReset('news')} className="glass-btn"><RotateCcw className="w-3 h-3" /></button></div>
            </form>
          )}
        </div>
      )}
    </div>
  );
};

export default CompanySearch;
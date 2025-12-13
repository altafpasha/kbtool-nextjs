import { useState, useEffect } from 'react';
import { Check, X, MessageSquare, Plus, Copy, Trash2 } from 'lucide-react';

const CommentsTool = () => {
  const [activeTab, setActiveTab] = useState('approved');
  const [customButtons, setCustomButtons] = useState([]);
  const [buttonName, setButtonName] = useState('');
  const [buttonContent, setButtonContent] = useState('');
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem('customButtons');
    if (saved) setCustomButtons(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem('customButtons', JSON.stringify(customButtons));
  }, [customButtons]);

  const addCustomButton = () => {
    if (buttonName && buttonContent) {
      setCustomButtons([...customButtons, { name: buttonName, content: buttonContent }]);
      setButtonName('');
      setButtonContent('');
    }
  };

  const deleteButton = (index) => {
    setCustomButtons(customButtons.filter((_, i) => i !== index));
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) { }
  };

  const tabs = [
    { id: 'approved', label: 'Approved', icon: Check, color: 'emerald' },
    { id: 'reject', label: 'Reject', icon: X, color: 'red' },
    { id: 'comments', label: 'Comments', icon: MessageSquare, color: 'blue' }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white/90">Common Comments</h3>

      {/* Tab Buttons */}
      <div className="flex gap-2">
        {tabs.map(({ id, label, icon: Icon, color }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${activeTab === id
                ? color === 'emerald'
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 shadow-lg shadow-emerald-500/10'
                  : color === 'red'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/30 shadow-lg shadow-red-500/10'
                    : 'bg-blue-500/20 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10'
                : 'bg-white/5 text-white/50 border border-white/5 hover:bg-white/10 hover:text-white/70'
              }`}
          >
            <Icon className="w-4 h-4" />
            <span className="hidden sm:inline">{label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="p-4 rounded-xl bg-white/5 border border-white/5 min-h-[200px]">
        {/* Approved Tab */}
        {activeTab === 'approved' && (
          <div className="space-y-3">
            <p className="text-xs text-white/40 mb-3">Quick approval comments</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['Verified & Approved', 'Documents Complete', 'All Clear', 'Processed Successfully'].map((text, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(text, `a${i}`)}
                  className="flex items-center justify-between gap-2 p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group"
                >
                  <span className="text-sm text-emerald-400">{text}</span>
                  {copied === `a${i}` ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-emerald-400/50 group-hover:text-emerald-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Reject Tab */}
        {activeTab === 'reject' && (
          <div className="space-y-3">
            <p className="text-xs text-white/40 mb-3">Quick rejection reasons</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {['Invalid Documents', 'Incomplete Information', 'Not Eligible', 'Verification Failed', 'Duplicate Entry', 'Expired Documents'].map((text, i) => (
                <button
                  key={i}
                  onClick={() => handleCopy(text, `r${i}`)}
                  className="flex items-center justify-between gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 transition-all group"
                >
                  <span className="text-sm text-red-400">{text}</span>
                  {copied === `r${i}` ? (
                    <Check className="w-4 h-4 text-red-400" />
                  ) : (
                    <Copy className="w-4 h-4 text-red-400/50 group-hover:text-red-400" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="space-y-4">
            <p className="text-xs text-white/40">Create custom comment buttons</p>

            {/* Add New Button Form */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                value={buttonName}
                onChange={(e) => setButtonName(e.target.value)}
                placeholder="Button name..."
                className="glass-input flex-1 text-sm"
              />
              <input
                type="text"
                value={buttonContent}
                onChange={(e) => setButtonContent(e.target.value)}
                placeholder="Content to copy..."
                className="glass-input flex-1 text-sm"
              />
              <button
                onClick={addCustomButton}
                disabled={!buttonName || !buttonContent}
                className="glass-btn glass-btn-success px-4 py-2 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span className="sm:hidden">Add</span>
              </button>
            </div>

            {/* Custom Buttons */}
            {customButtons.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {customButtons.map((btn, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20 group"
                  >
                    <button
                      onClick={() => handleCopy(btn.content, `c${index}`)}
                      className="flex-1 flex items-center justify-between gap-2 hover:text-blue-300 transition-colors"
                    >
                      <span className="text-sm text-blue-400 truncate">{btn.name}</span>
                      {copied === `c${index}` ? (
                        <Check className="w-4 h-4 text-blue-400" />
                      ) : (
                        <Copy className="w-4 h-4 text-blue-400/50" />
                      )}
                    </button>
                    <button
                      onClick={() => deleteButton(index)}
                      className="p-1 rounded hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-white/30 text-sm py-4">No custom buttons yet. Add one above!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentsTool;

import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';
import { Building2, Copy, RotateCcw, MapPin, Calendar, FileText } from 'lucide-react';

const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jammu and Kashmir", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep",
  "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
  "West Bengal"
];

const removeSpecialCharacters = (inputString) => {
  return inputString.replace(/[^\w\s]/gi, "");
};

const validateDate = (dateString) => {
  const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
  if (!regex.test(dateString)) return false;

  const [day, month, year] = dateString.split('/');
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  const yearNum = parseInt(year, 10);

  if (monthNum < 1 || monthNum > 12) return false;
  if (dayNum < 1 || dayNum > 31) return false;

  if (monthNum === 2) {
    const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
    if (dayNum > (isLeapYear ? 29 : 28)) return false;
  } else if ([4, 6, 9, 11].includes(monthNum) && dayNum > 30) {
    return false;
  }

  return true;
};

const BusinessPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    tradeName: '', natureOfBusiness: '', line1: '', line2: '',
    pinCode: '', city: '', state: '', RegNo: '', RegDate: '', ExpiryDate: ''
  });
  const [formattedContent, setFormattedContent] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    if (['tradeName', 'natureOfBusiness', 'line1', 'line2', 'city', 'state'].includes(id)) {
      newValue = removeSpecialCharacters(value);
    } else if (id === 'pinCode') {
      newValue = value.replace(/\D/g, '').slice(0, 6);
    } else if (id === 'RegDate' || id === 'ExpiryDate') {
      newValue = value.replace(/[^\d/]/g, '');
      const parts = newValue.split('/');
      if (parts[0]?.length > 2) parts[0] = parts[0].slice(0, 2);
      if (parts[1]?.length > 2) parts[1] = parts[1].slice(0, 2);
      if (parts[2]?.length > 4) parts[2] = parts[2].slice(0, 4);
      newValue = parts.join('/');

      if (value.length === 2 && !value.includes('/') && parseInt(value) <= 31) {
        newValue = value + '/';
      } else if (value.length === 5 && value.split('/').length === 2) {
        const [, month] = value.split('/');
        if (parseInt(month) <= 12) newValue = value + '/';
      }
    }

    setFormData(prev => ({ ...prev, [id]: newValue }));
    if (id === 'state') handleStateInputChange(newValue);
  };

  const handleStateInputChange = (inputText) => {
    const filtered = indianStates.filter(state =>
      state.toLowerCase().includes(inputText.toLowerCase())
    );
    setSuggestions(filtered);
  };

  const handleStateSuggestionClick = (suggestion) => {
    setFormData(prev => ({ ...prev, state: suggestion }));
    setSuggestions([]);
  };

  const generateFormattedText = () => {
    const { tradeName, natureOfBusiness, line1, line2, pinCode, city, state, RegNo, RegDate, ExpiryDate } = formData;
    return `Trade Name/Name of Business: ${tradeName} | Nature of Business/Line of Business/Type of Business: ${natureOfBusiness} | Line1: ${line1} | Line2: ${line2} | PinCode: ${pinCode} | City: ${city} | State: ${state} | RegNo: ${RegNo} | RegDate: ${RegDate} | ExpiryDate: ${ExpiryDate}`;
  };

  const handleCopyButtonClick = async () => {
    if (isProcessing) {
      toast.info('Please wait...');
      return;
    }

    const { tradeName, natureOfBusiness, line1, pinCode, city, state, RegNo, RegDate, ExpiryDate } = formData;

    if (!tradeName || !natureOfBusiness || !line1 || !pinCode || !city || !state || !RegNo || !RegDate || !ExpiryDate) {
      toast.error('Please fill all required fields');
      return;
    }

    if (pinCode.length !== 6) {
      toast.error('PIN code must be 6 digits');
      return;
    }

    if (!indianStates.includes(state)) {
      toast.error('Please select a valid state');
      return;
    }

    if (!validateDate(RegDate) || !validateDate(ExpiryDate)) {
      toast.error('Enter valid dates (DD/MM/YYYY)');
      return;
    }

    try {
      setIsProcessing(true);
      const formattedText = generateFormattedText();
      setFormattedContent(formattedText);
      await navigator.clipboard.writeText(formattedText);
      toast.success('Copied to clipboard!');
    } catch (error) {
      toast.error('Failed to copy');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReset = () => {
    setFormData({
      tradeName: '', natureOfBusiness: '', line1: '', line2: '',
      pinCode: '', city: '', state: '', RegNo: '', RegDate: '', ExpiryDate: ''
    });
    setSuggestions([]);
    setFormattedContent('');
  };

  const InputField = ({ id, label, placeholder, icon: Icon }) => (
    <div className="space-y-1">
      {label && <label className="text-xs text-white/50">{label}</label>}
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 z-10" />}
        <input
          type="text"
          id={id}
          className={`glass-input w-full ${Icon ? 'has-icon' : ''}`}
          placeholder={placeholder}
          value={formData[id]}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen dark-bg text-white flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-6">
          <div className="glass-card p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
              <Building2 className="w-6 h-6 text-white/60" />
              <h1 className="text-xl font-bold text-white/90">Business Information</h1>
            </div>

            {/* Form Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField id="tradeName" placeholder="Trade Name / Business Name" icon={Building2} />
              <InputField id="natureOfBusiness" placeholder="Nature of Business" icon={FileText} />
              <InputField id="line1" placeholder="Address Line 1" icon={MapPin} />
              <InputField id="line2" placeholder="Address Line 2 (Optional)" />
              <InputField id="pinCode" placeholder="PIN Code (6 digits)" />
              <InputField id="city" placeholder="City" />

              {/* State with suggestions */}
              <div className="space-y-1 relative">
                <input
                  type="text"
                  id="state"
                  className="glass-input w-full"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                {suggestions.length > 0 && (
                  <ul className="absolute z-20 w-full bg-[#0a0a0f] border border-white/10 rounded-lg mt-1 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, i) => (
                      <li
                        key={i}
                        className="cursor-pointer px-3 py-2 hover:bg-white/10 text-sm"
                        onClick={() => handleStateSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <InputField id="RegNo" placeholder="Registration Number" />
              <InputField id="RegDate" label="Registration Date" placeholder="DD/MM/YYYY" icon={Calendar} />
              <InputField id="ExpiryDate" label="Expiry Date" placeholder="DD/MM/YYYY" icon={Calendar} />
            </div>

            {/* Output */}
            <textarea
              className="glass-input w-full mt-6 min-h-[100px] resize-none"
              value={formattedContent}
              readOnly
              placeholder="Formatted output will appear here..."
            />

            {/* Actions */}
            <div className="flex gap-3 mt-4">
              <button
                onClick={handleCopyButtonClick}
                disabled={isProcessing}
                className="glass-btn glass-btn-success flex items-center gap-2"
              >
                <Copy className="w-4 h-4" />
                {isProcessing ? 'Processing...' : 'Copy'}
              </button>
              <button onClick={handleReset} className="glass-btn glass-btn-danger flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default BusinessPage;
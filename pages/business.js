import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer';

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
  if (!regex.test(dateString)) {
    return false;
  }

  const [day, month, year] = dateString.split('/');

  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  const yearNum = parseInt(year, 10);

  if (monthNum < 1 || monthNum > 12) {
    return false;
  }
  if (dayNum < 1 || dayNum > 31) {
    return false;
  }

  // Check days in month
  if (monthNum === 2) {
    const isLeapYear = (yearNum % 4 === 0 && yearNum % 100 !== 0) || yearNum % 400 === 0;
    if (dayNum > (isLeapYear ? 29 : 28)) {
      return false;
    }
  } else if ([4, 6, 9, 11].includes(monthNum) && dayNum > 30) {
    return false;
  }

  return true;
};

const BusinessPage = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [formData, setFormData] = useState({
    tradeName: '',
    natureOfBusiness: '',
    line1: '',
    line2: '',
    pinCode: '',
    city: '',
    state: '',
    RegNo: '',
    RegDate: '',
    ExpiryDate: ''
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
      // Remove any non-digit and non-slash characters
      newValue = value.replace(/[^\d/]/g, '');
      
      // Split the string by slashes
      const parts = newValue.split('/');
      
      // Handle each part separately
      if (parts[0] && parts[0].length > 2) {
        parts[0] = parts[0].slice(0, 2);
      }
      if (parts[1] && parts[1].length > 2) {
        parts[1] = parts[1].slice(0, 2);
      }
      if (parts[2] && parts[2].length > 4) {
        parts[2] = parts[2].slice(0, 4);
      }
      
      // Join parts back together
      newValue = parts.join('/');
      
      // Add slashes automatically
      if (value.length === 2 && !value.includes('/') && parseInt(value) <= 31) {
        newValue = value + '/';
      } else if (value.length === 5 && value.split('/').length === 2) {
        const [day, month] = value.split('/');
        if (parseInt(month) <= 12) {
          newValue = value + '/';
        }
      }
    }

    setFormData(prevData => ({ ...prevData, [id]: newValue }));
    if (id === 'state') {
      handleStateInputChange(newValue);
    }
  };

  // Add state validation to match schema constraints
  const handleStateInputChange = (inputText) => {
    const filteredSuggestions = indianStates.filter(state => 
      state.toLowerCase().includes(inputText.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleStateSuggestionClick = (suggestion) => {
    setFormData(prevData => ({ ...prevData, state: suggestion }));
    setSuggestions([]);
  };

  // Generate formatted text based on form data
  const generateFormattedText = () => {
    const {
      tradeName, natureOfBusiness, line1, line2, pinCode, city, state, RegNo, RegDate, ExpiryDate
    } = formData;
    
    return `Trade Name/Name of Business: ${tradeName} | Nature of Business/Line of Business/Type of Business: ${natureOfBusiness} | Line1: ${line1} | Line2: ${line2} | PinCode: ${pinCode} | City: ${city} | State: ${state} | RegNo: ${RegNo} | RegDate: ${RegDate} | ExpiryDate: ${ExpiryDate}`;
  };

  const handleCopyButtonClick = async () => {
    if (isProcessing) {
      toast.info('Please wait while processing...');
      return;
    }

    const {
      tradeName, natureOfBusiness, line1, pinCode, city, state, RegNo, RegDate, ExpiryDate
    } = formData;

    // Validate all required fields
    if (!tradeName || !natureOfBusiness || !line1 || !pinCode || !city || !state || !RegNo || !RegDate || !ExpiryDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    // PIN code validation
    if (pinCode.length !== 6) {
      toast.error('PIN code must be exactly 6 digits');
      return;
    }
    
    // State validation
    if (!indianStates.includes(state)) {
      toast.error('Please select a valid Indian state from the suggestions');
      return;
    }

    const isRegDateValid = validateDate(RegDate);
    const isExpiryDateValid = validateDate(ExpiryDate);

    if (!isRegDateValid || !isExpiryDateValid) {
      toast.error('Please enter valid dates in DD/MM/YYYY format');
      return;
    }

    try {
      setIsProcessing(true);
      
      const formattedText = generateFormattedText();
      setFormattedContent(formattedText);
      
      // Copy to clipboard
      await navigator.clipboard.writeText(formattedText);
      toast.success('Text copied to clipboard!');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to copy to clipboard');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResetButtonClick = () => {
    setFormData({
      tradeName: '',
      natureOfBusiness: '',
      line1: '',
      line2: '',
      pinCode: '',
      city: '',
      state: '',
      RegNo: '',
      RegDate: '',
      ExpiryDate: ''
    });
    setSuggestions([]);
    setFormattedContent('');
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col">
      <div className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="bg-gradient-to-br from-purple-900/30 to-black rounded-3xl shadow-2xl p-8 border border-purple-500/30 backdrop-blur-sm">
            <h1 className="text-4xl font-bold mb-8 text-center text-purple-300">Business Information</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                id="tradeName"
                className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Trade Name/Name of Business"
                value={formData.tradeName}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="natureOfBusiness"
                className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Nature of Business/Line of Business/Type of Business"
                value={formData.natureOfBusiness}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="line1"
                className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Line1"
                value={formData.line1}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="line2"
                className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="Line2"
                value={formData.line2}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="pinCode"
                className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="PinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
              />
              <input
                type="text"
                id="city"
                className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
              />
              <div className="relative">
                <input
                  type="text"
                  id="state"
                  className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition w-full"
                  placeholder="State"
                  value={formData.state}
                  onChange={handleInputChange}
                />
                {suggestions.length > 0 && (
                  <ul className="absolute z-10 w-full bg-black/80 border border-purple-500/30 rounded-lg mt-1 max-h-40 overflow-y-auto">
                    {suggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="cursor-pointer p-2 hover:bg-purple-500/30"
                        onClick={() => handleStateSuggestionClick(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <input
                type="text"
                id="RegNo"
                className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                placeholder="RegNo"
                value={formData.RegNo}
                onChange={handleInputChange}
              />
              <div>
                <label htmlFor="RegDate" className="text-purple-300 mb-2 block">Registration Date (DD/MM/YYYY)</label>
                <input
                  type="text"
                  id="RegDate"
                  className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition w-full"
                  placeholder="DD/MM/YYYY"
                  value={formData.RegDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="ExpiryDate" className="text-purple-300 mb-2 block">Expiry Date (DD/MM/YYYY)</label>
                <input
                  type="text"
                  id="ExpiryDate"
                  className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition w-full"
                  placeholder="DD/MM/YYYY"
                  value={formData.ExpiryDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <textarea
              className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 w-full mt-6 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
              rows="5"
              value={formattedContent}
              readOnly
              placeholder="Formatted data will appear here after clicking 'Copy'"
            ></textarea>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCopyButtonClick}
                disabled={isProcessing}
                className={`${isProcessing ? 'bg-purple-800' : 'bg-purple-600 hover:bg-purple-700'} text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105`}
              >
                {isProcessing ? 'Processing...' : 'Copy'}
              </button>
              <button
                onClick={handleResetButtonClick}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
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
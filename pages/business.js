import React, { useState } from 'react';
import { Client, Databases } from 'appwrite';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/Footer'; // Adjust this path if necessary

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;

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

  const [, day, month, year] = dateString.match(regex);

  if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) return false;
  if (parseInt(day, 10) < 1 || parseInt(day, 10) > 31) return false;

  if (parseInt(month, 10) === 2) {
    const isLeapYear = (parseInt(year, 10) % 4 === 0 && parseInt(year, 10) % 100 !== 0) || parseInt(year, 10) % 400 === 0;
    if (parseInt(day, 10) > (isLeapYear ? 29 : 28)) return false;
  }

  return true;
};

const formatDate = (inputDate) => {
  const [year, month, day] = inputDate.split('-');
  return `${day}/${month}/${year}`;
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
  const [isDataSaved, setIsDataSaved] = useState(false);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    let newValue = value;

    if (['tradeName', 'natureOfBusiness', 'line1', 'line2', 'city', 'state'].includes(id)) {
      newValue = removeSpecialCharacters(value);
    } else if (id === 'pinCode') {
      newValue = value.replace(/\D/g, '').slice(0, 6);
    }

    setFormData(prevData => ({ ...prevData, [id]: newValue }));
    if (id === 'state') {
      handleStateInputChange(newValue);
    }
  };

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

  const handleCopyButtonClick = async () => {
    const {
      tradeName, natureOfBusiness, line1, line2, pinCode, city, state, RegNo, RegDate, ExpiryDate
    } = formData;

    if (!tradeName || !natureOfBusiness || !line1 || !line2 || !pinCode || !city || !state || !RegNo || !RegDate || !ExpiryDate) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const formattedRegDate = formatDate(RegDate);
    const formattedExpiryDate = formatDate(ExpiryDate);

    if (!validateDate(formattedRegDate) || !validateDate(formattedExpiryDate)) {
      toast.error("Invalid date format. Please use DD/MM/YYYY format.");
      return;
    }

    const formattedText = `Trade Name/Name of Business: ${tradeName} | Nature of Business/Line of Business/Type of Business: ${natureOfBusiness} | Line1: ${line1} | Line2: ${line2} | PinCode: ${pinCode} | City: ${city} | State: ${state} | RegNo: ${RegNo} | RegDate: ${formattedRegDate} | ExpiryDate: ${formattedExpiryDate}`;

    setFormattedContent(formattedText);
    navigator.clipboard.writeText(formattedText);
    toast.success("Content copied to clipboard!");

    if (!isDataSaved) {
      try {
        const response = await databases.createDocument(
          DATABASE_ID,
          COLLECTION_ID,
          'unique()',
          {
            tradeName,
            natureOfBusiness,
            line1,
            line2,
            pinCode,
            city,
            state,
            RegNo,
            RegDate: formattedRegDate,
            ExpiryDate: formattedExpiryDate,
          }
        );
        console.log('Document created:', response);
        setIsDataSaved(true);
        toast.success("Data converted.");
      } catch (error) {
        console.error('Error :', error);
        toast.error(`Failed to converted : ${error.message}`);
      }
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
    setIsDataSaved(false);
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
                <label htmlFor="RegDate" className="text-purple-300 mb-2 block">Registration Date</label>
                <input
                  type="date"
                  id="RegDate"
                  className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition w-full"
                  value={formData.RegDate}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label htmlFor="ExpiryDate" className="text-purple-300 mb-2 block">Expiry Date</label>
                <input
                  type="date"
                  id="ExpiryDate"
                  className="bg-transparent border border-purple-500/30 text-white placeholder-purple-300/50 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-purple-500 transition w-full"
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
            ></textarea>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleCopyButtonClick}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Copy
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
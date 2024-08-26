import { useState } from 'react';
import Link from 'next/link';
import ZaubaButton from '../components/ZaubaButton';
import ResetButton from '../components/ResetButton';
import { Client, Databases } from 'appwrite';

const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const databases = new Databases(client);

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID;


const indianStates = [
  "Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh",
  "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Goa", "Gujarat", "Haryana",
  "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Ladakh", "Lakshadweep", "Madhya Pradesh",
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab",
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
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

const HomePage = () => {
  const [state, setState] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showBusinessTool, setShowBusinessTool] = useState(false);

  const handleStateInputChange = (e) => {
    const inputText = e.target.value.toLowerCase();
    const filteredSuggestions = indianStates.filter(state => state.toLowerCase().includes(inputText));
    setSuggestions(filteredSuggestions);
    setState(e.target.value);
  };

  const handleStateSuggestionClick = (suggestion) => {
    setState(suggestion);
    setSuggestions([]);
  };

  const handleCopyButtonClick = async () => {
    const tradeName = removeSpecialCharacters(document.getElementById("tradeName").value);
    const natureOfBusiness = removeSpecialCharacters(document.getElementById("natureOfBusiness").value);
    const line1 = removeSpecialCharacters(document.getElementById("line1").value);
    const line2 = removeSpecialCharacters(document.getElementById("line2").value);
    const pinCode = removeSpecialCharacters(document.getElementById("pinCode").value);
    const city = removeSpecialCharacters(document.getElementById("city").value);
    const state = removeSpecialCharacters(document.getElementById("state").value);
    const RegNo = document.getElementById("RegNo").value;
    const RegDate = formatDate(document.getElementById("RegDate").value);
    const ExpiryDate = formatDate(document.getElementById("ExpiryDate").value);

    if (!tradeName || !natureOfBusiness || !line1 || !line2 || !pinCode || !city || !state || !RegNo) {
      alert("Please fill in all the required fields.");
      return;
    }

    if (!validateDate(RegDate) || !validateDate(ExpiryDate)) {
      alert("Invalid date format. Please use DD/MM/YYYY format.");
      return;
    }

    const formattedText = `Trade Name/Name of Business: ${tradeName} | Nature of Business/Line of Business/Type of Business: ${natureOfBusiness} | Line1: ${line1} | Line2: ${line2} | PinCode: ${pinCode} | City: ${city} | State: ${state} | RegNo: ${RegNo} | RegDate: ${RegDate} | ExpiryDate: ${ExpiryDate}`;

    const formattedContent = document.getElementById("formattedContent");
    formattedContent.value = formattedText;
    formattedContent.select();
    document.execCommand("copy");

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
          RegDate,
          ExpiryDate,
        }
      );
      //console.log('Document created:', response);
      //alert("Data saved to Appwrite successfully.");
    } catch (error) {
      //console.error('Error saving data to Appwrite:', error);
      //alert(`Failed to save data to Appwrite: ${error.message}`);
    }
  };

  const handleResetButtonClick = () => {
    document.querySelectorAll("input[type='text'], input[type='date']").forEach(input => {
      input.value = "";
    });
    document.getElementById("formattedContent").value = "";
    setState('');
    setSuggestions([]);
  };


  return (
    <div className="min-h-screen dark:bg-white bg-black dark:bg-dot-black/[0.2] bg-dot-white/[0.2] relative flex flex-col p-4">
      <div className="mx-auto">
        <div className="bg-gradient-to-br from-black/70 to-gray-900/70 rounded-2xl shadow-3xl p-6 border-4 border-gray-600/50 mb-6">
          <h1 className="text-3xl font-bold mb-6 text-white">Business Information</h1>
          {showBusinessTool ? (
            <>
              <input type="text" id="tradeName" className="bg-transparent border border-white/20 text-white placeholder-white/50 mb-4 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" placeholder="Trade Name/Name of Business" />
              <input type="text" id="natureOfBusiness" className="bg-transparent border border-white/20 text-white placeholder-white/50 mb-4 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" placeholder="Nature of Business/Line of Business/Type of Business" />
              <input type="text" id="line1" className="bg-transparent border border-white/20 text-white placeholder-white/50 mb-4 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" placeholder="Line1" />
              <input type="text" id="line2" className="bg-transparent border border-white/20 text-white placeholder-white/50 mb-4 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" placeholder="Line2" />
              <input type="text" id="pinCode" className="bg-transparent border border-white/20 text-white placeholder-white/50 mb-4 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" placeholder="PinCode" />
              <input type="text" id="city" className="bg-transparent border border-white/20 text-white placeholder-white/50 mb-4 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" placeholder="City" />
              <input type="text" id="state" className="bg-transparent border border-white/20 text-white placeholder-white/50 mb-4 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" value={state} onChange={handleStateInputChange} placeholder="State" />
              <ul className="list-disc pl-5 mb-4">
                {suggestions.map((suggestion, index) => (
                  <li key={index} className="cursor-pointer hover:bg-white hover:bg-opacity-30 text-white" onClick={() => handleStateSuggestionClick(suggestion)}>{suggestion}</li>
                ))}
              </ul>
              <input type="text" id="RegNo" className="bg-transparent border border-white/20 text-white placeholder-white/50 mb-4 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" placeholder="RegNo" />
              <div className="flex gap-4 mb-4">
                <div className="w-1/2">
                  <label htmlFor="RegDate" className="text-white mb-2 block">Registration Date</label>
                  <input type="date" id="RegDate" className="bg-transparent border border-white/20 text-white placeholder-white/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" />
                </div>
                <div className="w-1/2">
                  <label htmlFor="ExpiryDate" className="text-white mb-2 block">Expiry Date</label>
                  <input type="date" id="ExpiryDate" className="bg-transparent border border-white/20 text-white placeholder-white/50 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500 w-full transition" />
                </div>
              </div>
            </>
          ) : (
            <ZaubaButton onClick={() => setShowBusinessTool(true)}>
              <Link href="#">Add Business Tool</Link>
            </ZaubaButton>
          )}
          <textarea id="formattedContent" className="bg-transparent border border-white/20 text-white placeholder-white/50 mb-4 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-purple-500 transition" rows="5" readOnly></textarea>
          <div className="flex gap-4">
            <ZaubaButton onClick={handleCopyButtonClick}>Copy</ZaubaButton>
            <ResetButton onClick={handleResetButtonClick}>Reset</ResetButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
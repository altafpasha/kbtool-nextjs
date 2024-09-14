import { useState } from 'react';
import Image from 'next/image';


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

  const handleCopyButtonClick = () => {
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
  };

  const handleResetButtonClick = () => {
    document.querySelectorAll("input[type='text'], input[type='date']").forEach(input => {
      input.value = "";
    });
    document.getElementById("formattedContent").value = "";
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <div className="bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Business Information</h1>
        <input type="text" id="tradeName" className="border rounded p-2 mb-2 w-full" placeholder="Trade Name/Name of Business" />
        <input type="text" id="natureOfBusiness" className="border rounded p-2 mb-2 w-full" placeholder="Nature of Business/Line of Business/Type of Business" />
        <input type="text" id="line1" className="border rounded p-2 mb-2 w-full" placeholder="Line1" />
        <input type="text" id="line2" className="border rounded p-2 mb-2 w-full" placeholder="Line2" />
        <input type="text" id="pinCode" className="border rounded p-2 mb-2 w-full" placeholder="PinCode" />
        <input type="text" id="city" className="border rounded p-2 mb-2 w-full" placeholder="City" />
        <input type="text" id="state" className="border rounded p-2 mb-2 w-full" value={state} onChange={handleStateInputChange} placeholder="State" />
        <ul className="list-disc pl-5">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="cursor-pointer hover:bg-gray-200" onClick={() => handleStateSuggestionClick(suggestion)}>{suggestion}</li>
          ))}
        </ul>
        <input type="text" id="RegNo" className="border rounded p-2 mb-2 w-full" placeholder="RegNo" />
        <div className="flex space-x-4 mb-4">
          <input type="date" id="RegDate" className="border rounded p-2 w-full" />
          <input type="date" id="ExpiryDate" className="border rounded p-2 w-full" />
        </div>
        <button id="copyButton" onClick={handleCopyButtonClick} className="bg-blue-500 text-white rounded py-2 px-4 mr-2">Copy</button>
        <button id="resetButton" onClick={handleResetButtonClick} className="bg-gray-500 text-white rounded py-2 px-4">Reset</button>
        <h2 className="text-xl font-semibold mt-4">Formatted Information</h2>
        <textarea id="formattedContent" className="border rounded p-2 w-full mt-2" rows="5" readOnly></textarea>
      </div>
      <footer className="mt-6 text-center">
        <Image src="/img/favicon_io/android-chrome-192x192.png" alt="Short Logo" className="mx-auto mb-2" />
        <p>&copy; 2022 <a href="https://opensecai.com" className="text-blue-500">OpensecAi</a>. All rights reserved <a href="https://imaltaf.online" className="text-blue-500">Developed by ALTAF</a></p>
      </footer>
    </div>
  );
};

export default HomePage;

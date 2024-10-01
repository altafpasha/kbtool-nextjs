import React, { useState, useEffect } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { Copy, RefreshCw, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer'; // Adjust the import path as necessary
import { useRouter } from 'next/router';

export default function AddressVerificationForm() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [copiedOutput, setCopiedOutput] = useState('');
  const [isPinCodeValid, setIsPinCodeValid] = useState(true);
  const clipboard = useClipboard();
  const router = useRouter();

  const sanitizeInput = (input) => {
    return input.replace(/[^a-zA-Z0-9\s]/g, '');
  };

  const handleInputChange = (setter) => (e) => {
    setter(sanitizeInput(e.target.value));
  };

  const handlePinCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPinCode(value);
  };

  useEffect(() => {
    setIsPinCodeValid(pinCode.length === 6);
  }, [pinCode]);

  const formatAddress = () => {
    return `Line1: ${line1} | Line2: ${line2}| PinCode: ${pinCode}| City: ${city}| State: ${state}`;
  };

  const handleCopyAndSave = () => {
    if (!isPinCodeValid) {
      setAlertType('error');
      setAlertMessage('PIN code must be exactly 6 digits long.');
      setShowAlert(true);
      return;
    }

    const formattedAddress = formatAddress();
    clipboard.copy(formattedAddress);
    setCopiedOutput(formattedAddress);

    setAlertType('success');
    setAlertMessage('Address copied successfully!');
    setShowAlert(true);
  };

  const handleReset = () => {
    setLine1('');
    setLine2('');
    setPinCode('');
    setCity('');
    setState('');
    setShowAlert(false);
    setCopiedOutput('');
    setIsPinCodeValid(true);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-black to-purple-900">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-black bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl shadow-lg border border-purple-500/20">
          <div className="p-4">
            <button
              onClick={handleBack}
              className="text-purple-300 hover:text-purple-100 flex items-center"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </button>
          </div>
          <div className="p-8 pt-0">
            <h2 className="text-3xl font-bold mb-6 text-purple-300 text-center">Address Verification</h2>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="line1" className="text-purple-300 block mb-1">Line 1 (House No or Street Address)</label>
                <input
                  id="line1"
                  value={line1}
                  onChange={handleInputChange(setLine1)}
                  placeholder="Enter Line 1"
                  className="w-full bg-purple-900/20 border border-purple-500/50 text-purple-100 placeholder-purple-400/50 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="line2" className="text-purple-300 block mb-1">Line 2 (Additional Address Details)</label>
                <input
                  id="line2"
                  value={line2}
                  onChange={handleInputChange(setLine2)}
                  placeholder="Enter Line 2"
                  className="w-full bg-purple-900/20 border border-purple-500/50 text-purple-100 placeholder-purple-400/50 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="pinCode" className="text-purple-300 block mb-1">PIN Code (6 digits)</label>
                <input
                  id="pinCode"
                  value={pinCode}
                  onChange={handlePinCodeChange}
                  placeholder="Enter PIN Code"
                  className={`w-full bg-purple-900/20 border ${isPinCodeValid ? 'border-purple-500/50' : 'border-red-500'} text-purple-100 placeholder-purple-400/50 rounded-md p-2`}
                />
                {!isPinCodeValid && <p className="text-red-400 text-sm mt-1">PIN code must be exactly 6 digits.</p>}
              </div>
              <div>
                <label htmlFor="city" className="text-purple-300 block mb-1">City</label>
                <input
                  id="city"
                  value={city}
                  onChange={handleInputChange(setCity)}
                  placeholder="Enter City"
                  className="w-full bg-purple-900/20 border border-purple-500/50 text-purple-100 placeholder-purple-400/50 rounded-md p-2"
                />
              </div>
              <div>
                <label htmlFor="state" className="text-purple-300 block mb-1">State</label>
                <input
                  id="state"
                  value={state}
                  onChange={handleInputChange(setState)}
                  placeholder="Enter State"
                  className="w-full bg-purple-900/20 border border-purple-500/50 text-purple-100 placeholder-purple-400/50 rounded-md p-2"
                />
              </div>
            </div>

            <div className="mt-8 space-x-4 flex justify-center">
              <button
                onClick={handleCopyAndSave}
                disabled={!line1 || !line2 || !isPinCodeValid || !city || !state}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Copy className="mr-2 h-4 w-4" /> Copy
              </button>
              <button
                onClick={handleReset}
                className="border border-purple-500 text-purple-300 hover:bg-purple-900/30 px-4 py-2 rounded-md flex items-center"
              >
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </button>
            </div>

            {showAlert && (
              <div className={`mt-6 p-4 rounded-lg ${
                alertType === 'success' ? 'bg-green-900/30 border-green-500/50' : 
                alertType === 'error' ? 'bg-red-900/30 border-red-500/50' :
                'bg-blue-900/30 border-blue-500/50'
              }`}>
                <span className="text-purple-200 font-semibold">{alertType === 'success' ? 'Success' : alertType === 'error' ? 'Error' : 'Info'}</span>
                <p className="text-purple-300 mt-1">{alertMessage}</p>
              </div>
            )}

            {copiedOutput && (
              <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/50">
                <h3 className="text-lg font-semibold text-purple-300 mb-2">Copied Output:</h3>
                <p className="text-purple-100 break-words">{copiedOutput}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

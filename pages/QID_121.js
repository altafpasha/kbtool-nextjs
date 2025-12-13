import React, { useState, useEffect } from 'react';
import { useClipboard } from 'use-clipboard-copy';
import { Copy, RefreshCw, ArrowLeft, MapPin, Home, Building } from 'lucide-react';
import Footer from '../components/Footer';
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

  const sanitizeInput = (input) => input.replace(/[^a-zA-Z0-9\s]/g, '');

  const handleInputChange = (setter) => (e) => {
    setter(sanitizeInput(e.target.value));
  };

  const handlePinCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 6);
    setPinCode(value);
  };

  useEffect(() => {
    setIsPinCodeValid(pinCode.length === 6 || pinCode.length === 0);
  }, [pinCode]);

  const formatAddress = () => {
    return `Line1: ${line1} | Line2: ${line2}| PinCode: ${pinCode}| City: ${city}| State: ${state}`;
  };

  const handleCopyAndSave = () => {
    if (pinCode.length !== 6) {
      setAlertType('error');
      setAlertMessage('PIN code must be exactly 6 digits.');
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

  const InputField = ({ id, label, value, onChange, placeholder, icon: Icon, error }) => (
    <div className="space-y-1">
      <label htmlFor={id} className="text-xs text-white/50">{label}</label>
      <div className="relative">
        {Icon && <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 z-10" />}
        <input
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`glass-input w-full ${Icon ? 'has-icon' : ''} ${error ? 'border-red-500/50' : ''}`}
        />
      </div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col dark-bg">
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-md w-full glass-card p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => router.back()}
              className="glass-btn flex items-center gap-2 text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-white/60" />
              <h2 className="text-lg font-bold text-white/90">QID_121</h2>
            </div>
          </div>

          <p className="text-sm text-white/50 mb-6 text-center">Address Verification Tool</p>

          {/* Form */}
          <div className="space-y-4">
            <InputField
              id="line1"
              label="Line 1 (House No / Street)"
              value={line1}
              onChange={handleInputChange(setLine1)}
              placeholder="Enter Line 1"
              icon={Home}
            />
            <InputField
              id="line2"
              label="Line 2 (Additional Details)"
              value={line2}
              onChange={handleInputChange(setLine2)}
              placeholder="Enter Line 2"
              icon={Building}
            />
            <InputField
              id="pinCode"
              label="PIN Code (6 digits)"
              value={pinCode}
              onChange={handlePinCodeChange}
              placeholder="Enter PIN Code"
              error={pinCode && pinCode.length !== 6 ? 'PIN must be 6 digits' : null}
            />
            <div className="grid grid-cols-2 gap-3">
              <InputField
                id="city"
                label="City"
                value={city}
                onChange={handleInputChange(setCity)}
                placeholder="City"
              />
              <InputField
                id="state"
                label="State"
                value={state}
                onChange={handleInputChange(setState)}
                placeholder="State"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 mt-6">
            <button
              onClick={handleCopyAndSave}
              disabled={!line1 || !line2 || pinCode.length !== 6 || !city || !state}
              className="flex-1 glass-btn glass-btn-success flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Copy className="w-4 h-4" />
              Copy
            </button>
            <button
              onClick={handleReset}
              className="glass-btn glass-btn-danger flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Reset
            </button>
          </div>

          {/* Alert */}
          {showAlert && (
            <div className={`mt-4 p-3 rounded-lg text-sm ${alertType === 'success' ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
              alertType === 'error' ? 'bg-red-500/10 border border-red-500/20 text-red-400' :
                'bg-blue-500/10 border border-blue-500/20 text-blue-400'
              }`}>
              {alertMessage}
            </div>
          )}

          {/* Output */}
          {copiedOutput && (
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="text-xs text-white/50 mb-1">Copied Output:</p>
              <p className="text-sm text-white/80 break-words">{copiedOutput}</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

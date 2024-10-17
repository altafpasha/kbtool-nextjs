import React, { useState } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const AdPopup = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email address.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('email_subscribers')
        .insert([{ email: email }]);

      if (error) throw error;

      setMessage('Thank you! You will be notified when the app launches on the Play Store.');
      setEmail('');
    } catch (error) {
      console.error('Error storing email:', error);
      if (error.code === '23505') {
        setMessage('This email is already subscribed. Thank you for your interest!');
      } else {
        setMessage('An error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-3xl shadow-xl max-w-md w-full p-8 relative border border-white border-opacity-30">
        <div className="flex flex-col items-center">
          <img
            src="/img/ic_launcher.png"
            alt="Appship Logo"
            className="w-24 h-24 mb-4 rounded-full shadow-lg"
          />
          <h1 className="text-4xl font-bold mb-2 text-white tracking-wide">Appship</h1>
          <div className="w-16 h-1 bg-yellow-400 mb-4 rounded-full"></div>
          <h2 className="text-2xl font-semibold mb-2 text-white">Coming Soon to Play Store!</h2>
          <p className="mb-6 text-white text-center text-lg">
            Get ready for our exciting new Android app, launching soon on Google Play Store!
          </p>
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <div className="flex items-center border-b border-yellow-400 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-white mr-3 py-1 px-2 leading-tight focus:outline-none placeholder-white placeholder-opacity-75"
                type="email"
                placeholder="Enter your email"
                aria-label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="flex-shrink-0 bg-yellow-400 hover:bg-yellow-500 text-indigo-900 font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                type="submit"
              >
                Notify Me
              </button>
            </div>
          </form>
          {message && <p className="mt-4 text-yellow-300 text-center">{message}</p>}
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-yellow-400 transition duration-300 ease-in-out"
          aria-label="Close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default AdPopup;
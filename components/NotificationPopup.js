import React from 'react';

const NotificationPopup = ({ message, onClose, onProClick }) => {
  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">Notification</h3>
            <p className="mt-1 text-sm text-white">{message}</p>
          </div>
          <button onClick={onClose} className="text-white hover:text-gray-200">
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <button
          onClick={onProClick}
          className="mt-4 w-full py-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-bold rounded-lg shadow-md hover:from-yellow-300 hover:to-yellow-400 transition-colors"
        >
          Pro Subscription coming soon
        </button>
      </div>
    </div>
  );
};

export default NotificationPopup;

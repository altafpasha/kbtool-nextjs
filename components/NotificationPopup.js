import React from 'react';

const NotificationPopup = ({ onClose }) => {
  return (
    <div className="fixed bottom-4 right-4 max-w-sm w-full">
      <div className="bg-gradient-to-br from-white/20 to-white/10 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg p-4">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white">codesec</h3>
            <p className="mt-1 text-sm text-white">
              <a
                href="https://codesec.me"
                target="_blank"
                rel="noopener noreferrer"
                className="text-yellow-400 hover:underline"
              >
                https://codesec.me
              </a>
            </p>
            <p className="mt-1 text-xs text-gray-300">Developed by A L T A F</p>
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
        <div className="mt-4 flex justify-center">
          <a
            href="https://github.com/imaltaf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-yellow-400 hover:underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 mr-2"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.49 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.26.1-2.62 0 0 .84-.27 2.75 1.03a9.52 9.52 0 012.5-.34c.85 0 1.7.11 2.5.34 1.91-1.3 2.75-1.03 2.75-1.03.55 1.36.2 2.37.1 2.62.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.33-.01 2.4-.01 2.72 0 .27.18.59.69.49A10.02 10.02 0 0022 12c0-5.52-4.48-10-10-10z"
                clipRule="evenodd"
              />
            </svg>
            GitHub: @imaltaf
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;

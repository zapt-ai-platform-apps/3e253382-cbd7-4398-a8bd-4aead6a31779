import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-4 shadow-inner">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-600 text-sm">
          &copy; {new Date().getFullYear()} Ayamku Stock Telor. All rights reserved.
        </p>
        <p className="text-gray-500 text-xs mt-1">
          <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors">
            Made on ZAPT
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
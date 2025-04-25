import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-amber-600 text-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm mb-2 md:mb-0">
            &copy; {new Date().getFullYear()} Ayamku stock telor - Aplikasi manajemen stok telor untuk peternak ayam petelur
          </p>
          <div className="flex items-center">
            <span className="text-xs mr-2">Made on</span>
            <a href="https://www.zapt.ai" target="_blank" rel="noopener noreferrer" className="text-white font-bold">
              ZAPT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
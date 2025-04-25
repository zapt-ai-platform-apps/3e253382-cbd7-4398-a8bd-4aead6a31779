import React from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'production', label: 'Produksi Telor' },
    { id: 'distribution', label: 'Distribusi' },
    { id: 'history', label: 'Riwayat' }
  ];

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between py-3">
          <div className="flex items-center mb-3 sm:mb-0">
            <img 
              src="https://supabase.zapt.ai/storage/v1/render/image/public/icons/c7bd5333-787f-461f-ae9b-22acbc0ed4b0/55145115-0624-472f-96b9-d5d88aae355f.png?width=48&height=48" 
              alt="Ayamku Logo" 
              className="h-10 w-10 mr-3"
            />
            <h1 className="text-xl font-bold text-amber-600">Ayamku stock telor</h1>
          </div>
          
          <nav className="flex flex-wrap justify-center">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`px-4 py-2 mx-1 rounded-md transition-colors ${
                  currentPage === item.id
                    ? 'bg-amber-500 text-white'
                    : 'text-gray-600 hover:bg-amber-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
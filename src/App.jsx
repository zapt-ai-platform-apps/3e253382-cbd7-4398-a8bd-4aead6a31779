import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import ProductionForm from './pages/ProductionForm';
import DistributionForm from './pages/DistributionForm';
import History from './pages/History';
import Footer from './components/Footer';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Function to render the current page
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'production':
        return <ProductionForm />;
      case 'distribution':
        return <DistributionForm />;
      case 'history':
        return <History />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow container mx-auto px-4 py-6">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}
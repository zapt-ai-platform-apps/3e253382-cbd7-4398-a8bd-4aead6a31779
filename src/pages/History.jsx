import React, { useState, useEffect } from 'react';
import { 
  getProductionRecords, 
  getDistributionRecords, 
  deleteProductionRecord, 
  deleteDistributionRecord 
} from '../utils/storage';
import HistoryTable from '../components/HistoryTable';

const History = () => {
  const [activeTab, setActiveTab] = useState('production');
  const [productionRecords, setProductionRecords] = useState([]);
  const [distributionRecords, setDistributionRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    setLoading(true);
    // Load production and distribution records
    const productions = getProductionRecords();
    const distributions = getDistributionRecords();
    
    setProductionRecords(productions);
    setDistributionRecords(distributions);
    setLoading(false);
  };

  const handleDeleteRecord = (timestamp) => {
    let success = false;
    
    if (activeTab === 'production') {
      success = deleteProductionRecord(timestamp);
      if (success) {
        setProductionRecords(prevRecords => 
          prevRecords.filter(record => record.timestamp !== timestamp)
        );
        setMessage({ 
          text: 'Data produksi berhasil dihapus', 
          type: 'success' 
        });
      }
    } else {
      success = deleteDistributionRecord(timestamp);
      if (success) {
        setDistributionRecords(prevRecords => 
          prevRecords.filter(record => record.timestamp !== timestamp)
        );
        setMessage({ 
          text: 'Data distribusi berhasil dihapus', 
          type: 'success' 
        });
      }
    }
    
    if (!success) {
      setMessage({ 
        text: 'Gagal menghapus data. Silakan coba lagi.', 
        type: 'error' 
      });
    }
    
    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage({ text: '', type: '' });
    }, 3000);
  };

  const renderRecords = () => {
    if (loading) {
      return (
        <div className="text-center py-6">
          <p>Memuat data...</p>
        </div>
      );
    }

    if (activeTab === 'production') {
      return productionRecords.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p>Belum ada data produksi yang disimpan</p>
        </div>
      ) : (
        <HistoryTable 
          records={productionRecords}
          type="production" 
          onDelete={handleDeleteRecord}
        />
      );
    } else {
      return distributionRecords.length === 0 ? (
        <div className="text-center py-6 text-gray-500">
          <p>Belum ada data distribusi yang disimpan</p>
        </div>
      ) : (
        <HistoryTable 
          records={distributionRecords}
          type="distribution" 
          onDelete={handleDeleteRecord}
        />
      );
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Riwayat Aktivitas</h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <div className="mb-6 flex border-b">
        <button
          onClick={() => setActiveTab('production')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'production'
              ? 'text-amber-600 border-b-2 border-amber-500'
              : 'text-gray-500 hover:text-amber-500'
          }`}
        >
          Produksi
        </button>
        <button
          onClick={() => setActiveTab('distribution')}
          className={`py-2 px-4 font-medium ${
            activeTab === 'distribution'
              ? 'text-amber-600 border-b-2 border-amber-500'
              : 'text-gray-500 hover:text-amber-500'
          }`}
        >
          Distribusi
        </button>
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {renderRecords()}
      </div>
    </div>
  );
};

export default History;
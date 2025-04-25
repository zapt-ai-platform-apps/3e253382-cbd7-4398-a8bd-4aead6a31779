import React, { useState, useEffect } from 'react';
import { getSummaryData } from '../utils/storage';
import DashboardCard from '../components/DashboardCard';

const Dashboard = () => {
  const [summaryData, setSummaryData] = useState({
    totalProduction: 0,
    totalDistribution: 0,
    availableStock: 0,
    avgPrice: 0
  });

  useEffect(() => {
    // Load summary data
    const data = getSummaryData();
    setSummaryData(data);
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <DashboardCard 
          title="Total Produksi"
          value={`${summaryData.totalProduction.toLocaleString()} kg`}
          description={`${(summaryData.totalProduction * 16).toLocaleString()} butir`}
          icon="🥚"
          color="bg-green-100"
          textColor="text-green-700"
        />
        
        <DashboardCard 
          title="Total Distribusi"
          value={`${summaryData.totalDistribution.toLocaleString()} kg`}
          description={`${Math.floor(summaryData.totalDistribution / 10).toLocaleString()} peti + ${(summaryData.totalDistribution % 10).toLocaleString()} kg`}
          icon="📦"
          color="bg-blue-100"
          textColor="text-blue-700"
        />
        
        <DashboardCard 
          title="Stok Tersedia"
          value={`${summaryData.availableStock.toLocaleString()} kg`}
          description={`${(summaryData.availableStock * 16).toLocaleString()} butir`}
          icon="🔄"
          color="bg-yellow-100"
          textColor="text-yellow-700"
        />
        
        <DashboardCard 
          title="Harga Rata-rata"
          value={`Rp${summaryData.avgPrice.toLocaleString()}/kg`}
          description={`Rp${Math.round(summaryData.avgPrice / 16).toLocaleString()}/butir`}
          icon="💰"
          color="bg-purple-100"
          textColor="text-purple-700"
        />
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Konversi Cepat</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2">1 kg = 16 butir telor</h4>
            <p className="text-gray-600 mb-2">1 peti = 10 kg = 160 butir telor</p>
            <p className="text-gray-600">Harga rata-rata per kg: Rp{summaryData.avgPrice.toLocaleString()}</p>
          </div>
          
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Tips Pencatatan</h4>
            <ul className="list-disc pl-5 text-gray-600 text-sm">
              <li>Catat produksi setiap hari untuk hasil yang akurat</li>
              <li>Update harga ketika ada perubahan di pasar</li>
              <li>Periksa stok fisik secara berkala untuk memastikan keakuratan data</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
import React from 'react';

const HistoryTable = ({ records, type }) => {
  // Sort records by date descending
  const sortedRecords = [...records].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };
  
  const renderProductionTable = () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah (kg)</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah (butir)</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sortedRecords.map((record, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(record.date)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.amount.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{(record.amount * 16).toLocaleString()}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{record.notes || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  const renderDistributionTable = () => (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tujuan</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Jumlah (kg)</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga (Rp/kg)</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Nilai (Rp)</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Catatan</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {sortedRecords.map((record, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDate(record.date)}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.destination}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.amount.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.pricePerKg.toLocaleString()}</td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.totalValue.toLocaleString()}</td>
            <td className="px-6 py-4 text-sm text-gray-900">{record.notes || '-'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  return (
    <div className="overflow-x-auto">
      {type === 'production' ? renderProductionTable() : renderDistributionTable()}
    </div>
  );
};

export default HistoryTable;
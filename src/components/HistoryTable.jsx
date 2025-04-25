import React from 'react';

const HistoryTable = ({ records, type, onDelete }) => {
  // Format date for better display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tanggal</th>
            
            {type === 'production' ? (
              <>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Jumlah (Butir)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Jumlah (kg)</th>
              </>
            ) : (
              <>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Jumlah (kg)</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Harga per kg</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Tujuan</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Total Nilai</th>
              </>
            )}
            
            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Catatan</th>
            <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Aksi</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {records.map(record => (
            <tr key={record.timestamp} className="hover:bg-gray-50">
              <td className="px-4 py-3 text-sm">{formatDate(record.date)}</td>
              
              {type === 'production' ? (
                <>
                  <td className="px-4 py-3 text-sm">{record.eggs} butir</td>
                  <td className="px-4 py-3 text-sm">{record.amount.toFixed(2)} kg</td>
                </>
              ) : (
                <>
                  <td className="px-4 py-3 text-sm">{record.amount.toFixed(2)} kg</td>
                  <td className="px-4 py-3 text-sm">Rp{record.pricePerKg.toLocaleString()}</td>
                  <td className="px-4 py-3 text-sm">{record.destination}</td>
                  <td className="px-4 py-3 text-sm">Rp{record.totalValue.toLocaleString()}</td>
                </>
              )}
              
              <td className="px-4 py-3 text-sm">{record.notes || '-'}</td>
              <td className="px-4 py-3 text-sm text-center">
                <button
                  onClick={() => onDelete(record.timestamp)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm cursor-pointer"
                  title="Hapus data ini"
                >
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
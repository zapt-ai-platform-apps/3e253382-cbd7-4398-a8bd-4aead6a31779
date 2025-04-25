import React, { useState, useEffect } from 'react';
import { addDistributionRecord, getSummaryData, updateSummaryData } from '../utils/storage';

const DistributionForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    pricePerKg: '',
    destination: '',
    notes: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [availableStock, setAvailableStock] = useState(0);
  const [boxesCount, setBoxesCount] = useState({ boxes: 0, remainder: 0 });

  useEffect(() => {
    // Get available stock
    const summary = getSummaryData();
    setAvailableStock(summary.availableStock);
  }, []);

  useEffect(() => {
    // Calculate boxes and remainder when amount changes
    if (formData.amount && !isNaN(formData.amount)) {
      const amount = parseFloat(formData.amount);
      const boxes = Math.floor(amount / 10);
      const remainder = amount % 10;
      setBoxesCount({ boxes, remainder });
    } else {
      setBoxesCount({ boxes: 0, remainder: 0 });
    }
  }, [formData.amount]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const amount = parseFloat(formData.amount);
    const pricePerKg = parseFloat(formData.pricePerKg);
    
    if (isNaN(amount) || amount <= 0) {
      setMessage({ text: 'Jumlah distribusi harus berupa angka positif', type: 'error' });
      return;
    }
    
    if (isNaN(pricePerKg) || pricePerKg <= 0) {
      setMessage({ text: 'Harga per kg harus berupa angka positif', type: 'error' });
      return;
    }
    
    if (amount > availableStock) {
      setMessage({ text: `Stok tidak mencukupi. Stok tersedia: ${availableStock} kg`, type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add distribution record
      const record = {
        ...formData,
        amount: amount,
        pricePerKg: pricePerKg,
        totalValue: amount * pricePerKg,
        timestamp: new Date().toISOString(),
        type: 'distribution'
      };
      
      addDistributionRecord(record);
      
      // Update summary data
      const summary = getSummaryData();
      summary.totalDistribution += amount;
      summary.availableStock -= amount;
      
      // Update average price (weighted)
      const totalValue = summary.totalDistribution * summary.avgPrice;
      const newValue = record.totalValue;
      const newTotalValue = totalValue + newValue;
      summary.avgPrice = newTotalValue / summary.totalDistribution;
      
      updateSummaryData(summary);
      setAvailableStock(summary.availableStock);
      
      // Reset form and show success message
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        pricePerKg: '',
        destination: '',
        notes: ''
      });
      
      setMessage({ text: 'Data distribusi berhasil disimpan', type: 'success' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Error saving distribution data:', error);
      setMessage({ text: 'Terjadi kesalahan saat menyimpan data', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Pencatatan Distribusi Telor</h2>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        <div className="mb-4 p-3 bg-blue-50 text-blue-700 rounded">
          <p className="font-medium">Stok tersedia: {availableStock.toLocaleString()} kg ({(availableStock * 16).toLocaleString()} butir)</p>
        </div>
        
        {message.text && (
          <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Tanggal Distribusi
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 box-border"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="destination" className="block text-gray-700 font-medium mb-2">
              Tujuan Distribusi
            </label>
            <input
              type="text"
              id="destination"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              placeholder="Nama toko/pembeli"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 box-border"
              required
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
              Jumlah Distribusi (kg)
            </label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="Masukkan jumlah dalam kg"
              step="0.1"
              min="0"
              max={availableStock}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 box-border"
              required
            />
            {formData.amount && !isNaN(formData.amount) && (
              <div className="text-gray-600 text-sm mt-1">
                <p>Setara dengan {(parseFloat(formData.amount) * 16).toFixed(0)} butir telor</p>
                <p>
                  {boxesCount.boxes > 0 && `${boxesCount.boxes} peti`}
                  {boxesCount.boxes > 0 && boxesCount.remainder > 0 && ' dan '}
                  {boxesCount.remainder > 0 && `${boxesCount.remainder} kg`}
                </p>
              </div>
            )}
          </div>
          
          <div className="mb-4">
            <label htmlFor="pricePerKg" className="block text-gray-700 font-medium mb-2">
              Harga per Kg (Rp)
            </label>
            <input
              type="number"
              id="pricePerKg"
              name="pricePerKg"
              value={formData.pricePerKg}
              onChange={handleChange}
              placeholder="Masukkan harga per kg"
              step="100"
              min="0"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 box-border"
              required
            />
            {formData.pricePerKg && !isNaN(formData.pricePerKg) && (
              <p className="text-gray-600 text-sm mt-1">
                Harga per butir: Rp{(parseFloat(formData.pricePerKg) / 16).toFixed(0)}
              </p>
            )}
          </div>
          
          {formData.amount && formData.pricePerKg && 
           !isNaN(formData.amount) && !isNaN(formData.pricePerKg) && (
            <div className="mb-4 p-3 bg-amber-50 rounded">
              <p className="font-medium">
                Total Nilai: Rp{(parseFloat(formData.amount) * parseFloat(formData.pricePerKg)).toLocaleString()}
              </p>
            </div>
          )}
          
          <div className="mb-6">
            <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">
              Catatan (opsional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Tambahkan catatan jika diperlukan"
              rows="3"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 box-border"
            ></textarea>
          </div>
          
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-amber-500 hover:bg-amber-600 text-white font-medium py-2 px-6 rounded-md transition-colors cursor-pointer disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data Distribusi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DistributionForm;
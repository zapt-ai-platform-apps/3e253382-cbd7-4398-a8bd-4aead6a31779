import React, { useState } from 'react';
import { addProductionRecord, getSummaryData, updateSummaryData } from '../utils/storage';

const ProductionForm = () => {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    notes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.amount || isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      setMessage({ text: 'Jumlah produksi harus berupa angka positif', type: 'error' });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Add production record
      const amountInKg = parseFloat(formData.amount);
      const record = {
        ...formData,
        amount: amountInKg,
        timestamp: new Date().toISOString(),
        type: 'production'
      };
      
      addProductionRecord(record);
      
      // Update summary data
      const summary = getSummaryData();
      summary.totalProduction += amountInKg;
      summary.availableStock += amountInKg;
      updateSummaryData(summary);
      
      // Reset form and show success message
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        notes: ''
      });
      
      setMessage({ text: 'Data produksi berhasil disimpan', type: 'success' });
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000);
    } catch (error) {
      console.error('Error saving production data:', error);
      setMessage({ text: 'Terjadi kesalahan saat menyimpan data', type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Pencatatan Produksi Telor</h2>
      
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl mx-auto">
        {message.text && (
          <div className={`mb-4 p-3 rounded ${message.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
            {message.text}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="date" className="block text-gray-700 font-medium mb-2">
              Tanggal Produksi
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
            <label htmlFor="amount" className="block text-gray-700 font-medium mb-2">
              Jumlah Produksi (kg)
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Masukkan jumlah dalam kg"
                step="0.1"
                min="0"
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 box-border"
                required
              />
            </div>
            {formData.amount && !isNaN(formData.amount) && (
              <p className="text-gray-600 text-sm mt-1">
                Setara dengan {(parseFloat(formData.amount) * 16).toFixed(0)} butir telor
              </p>
            )}
          </div>
          
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
              {isSubmitting ? 'Menyimpan...' : 'Simpan Data Produksi'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductionForm;
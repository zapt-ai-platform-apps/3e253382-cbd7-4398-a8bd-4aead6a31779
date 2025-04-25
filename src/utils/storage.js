// Constants for localStorage keys
const PRODUCTION_RECORDS_KEY = 'ayamku_production_records';
const DISTRIBUTION_RECORDS_KEY = 'ayamku_distribution_records';
const SUMMARY_DATA_KEY = 'ayamku_summary_data';

// Initialize summary data if not exists
export const initStorageIfNeeded = () => {
  // Check if summary data exists
  if (!localStorage.getItem(SUMMARY_DATA_KEY)) {
    // Initialize with default values
    const defaultSummary = {
      totalProduction: 0,
      totalDistribution: 0,
      availableStock: 0,
      avgPrice: 0
    };
    localStorage.setItem(SUMMARY_DATA_KEY, JSON.stringify(defaultSummary));
  }
  
  // Check if records arrays exist
  if (!localStorage.getItem(PRODUCTION_RECORDS_KEY)) {
    localStorage.setItem(PRODUCTION_RECORDS_KEY, JSON.stringify([]));
  }
  
  if (!localStorage.getItem(DISTRIBUTION_RECORDS_KEY)) {
    localStorage.setItem(DISTRIBUTION_RECORDS_KEY, JSON.stringify([]));
  }
};

// Initialize storage when this module is imported
initStorageIfNeeded();

// Get summary data
export const getSummaryData = () => {
  try {
    const data = localStorage.getItem(SUMMARY_DATA_KEY);
    return JSON.parse(data) || {
      totalProduction: 0,
      totalDistribution: 0,
      availableStock: 0,
      avgPrice: 0
    };
  } catch (error) {
    console.error('Error getting summary data:', error);
    return {
      totalProduction: 0,
      totalDistribution: 0,
      availableStock: 0,
      avgPrice: 0
    };
  }
};

// Update summary data
export const updateSummaryData = (summaryData) => {
  try {
    localStorage.setItem(SUMMARY_DATA_KEY, JSON.stringify(summaryData));
    return true;
  } catch (error) {
    console.error('Error updating summary data:', error);
    return false;
  }
};

// Get production records
export const getProductionRecords = () => {
  try {
    const records = localStorage.getItem(PRODUCTION_RECORDS_KEY);
    return JSON.parse(records) || [];
  } catch (error) {
    console.error('Error getting production records:', error);
    return [];
  }
};

// Add production record
export const addProductionRecord = (record) => {
  try {
    const records = getProductionRecords();
    records.push(record);
    localStorage.setItem(PRODUCTION_RECORDS_KEY, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error('Error adding production record:', error);
    return false;
  }
};

// Delete production record and update summary
export const deleteProductionRecord = (timestamp) => {
  try {
    const records = getProductionRecords();
    const recordToDelete = records.find(record => record.timestamp === timestamp);
    
    if (!recordToDelete) {
      return false;
    }
    
    // Update records
    const updatedRecords = records.filter(record => record.timestamp !== timestamp);
    localStorage.setItem(PRODUCTION_RECORDS_KEY, JSON.stringify(updatedRecords));
    
    // Update summary data
    const summary = getSummaryData();
    summary.totalProduction -= recordToDelete.amount;
    summary.availableStock -= recordToDelete.amount;
    
    // Make sure values don't go below zero due to rounding errors
    summary.totalProduction = Math.max(0, summary.totalProduction);
    summary.availableStock = Math.max(0, summary.availableStock);
    
    updateSummaryData(summary);
    return true;
  } catch (error) {
    console.error('Error deleting production record:', error);
    return false;
  }
};

// Get distribution records
export const getDistributionRecords = () => {
  try {
    const records = localStorage.getItem(DISTRIBUTION_RECORDS_KEY);
    return JSON.parse(records) || [];
  } catch (error) {
    console.error('Error getting distribution records:', error);
    return [];
  }
};

// Add distribution record
export const addDistributionRecord = (record) => {
  try {
    const records = getDistributionRecords();
    records.push(record);
    localStorage.setItem(DISTRIBUTION_RECORDS_KEY, JSON.stringify(records));
    return true;
  } catch (error) {
    console.error('Error adding distribution record:', error);
    return false;
  }
};

// Delete distribution record and update summary
export const deleteDistributionRecord = (timestamp) => {
  try {
    const records = getDistributionRecords();
    const recordToDelete = records.find(record => record.timestamp === timestamp);
    
    if (!recordToDelete) {
      return false;
    }
    
    // Update records
    const updatedRecords = records.filter(record => record.timestamp !== timestamp);
    localStorage.setItem(DISTRIBUTION_RECORDS_KEY, JSON.stringify(updatedRecords));
    
    // Update summary data
    const summary = getSummaryData();
    summary.totalDistribution -= recordToDelete.amount;
    summary.availableStock += recordToDelete.amount;
    
    // Recalculate average price if needed
    if (summary.totalDistribution > 0 && recordToDelete.pricePerKg && recordToDelete.totalValue) {
      // Remove this record's contribution from the total value calculation
      const oldTotalValue = summary.totalDistribution * summary.avgPrice + recordToDelete.amount * recordToDelete.pricePerKg;
      const newTotalValue = oldTotalValue - recordToDelete.totalValue;
      summary.avgPrice = newTotalValue / summary.totalDistribution;
    } else if (summary.totalDistribution === 0) {
      summary.avgPrice = 0;
    }
    
    // Make sure values don't go below zero due to rounding errors
    summary.totalDistribution = Math.max(0, summary.totalDistribution);
    summary.availableStock = Math.max(0, summary.availableStock);
    
    updateSummaryData(summary);
    return true;
  } catch (error) {
    console.error('Error deleting distribution record:', error);
    return false;
  }
};
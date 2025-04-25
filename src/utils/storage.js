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
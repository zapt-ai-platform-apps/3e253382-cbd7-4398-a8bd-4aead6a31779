import React from 'react';

const DashboardCard = ({ title, value, description, icon, color, textColor }) => {
  return (
    <div className={`${color} rounded-lg shadow p-5`}>
      <div className="flex justify-between items-start">
        <div>
          <h3 className={`${textColor} font-semibold text-lg`}>{title}</h3>
          <p className="text-2xl font-bold mt-2">{value}</p>
          <p className="text-gray-600 text-sm mt-1">{description}</p>
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </div>
  );
};

export default DashboardCard;
import React from 'react';
import '../TotalSpending.css'; 

const TotalSpending = () => {
  return (
    <div className="total-spending-container">
      <div className="total-spending-title">Total Spending</div>
      <div className="total-spending-figures">
        <img src="/moneybags.png" alt="Total Spending" />
        <div className="total-spending-value">
          <span className="dollar-amount">$2.500</span>
        </div>
        <div className="total-spending-change">
          Up by <strong>5%</strong> from Last Year
        </div>
      </div>
    </div>
  );
};

export default TotalSpending;

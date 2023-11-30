import React from 'react';
import '../TotalPurchases.css';

const TotalPurchases = () => {
  return (
    <div className="total-purchases-container">
      <div className="total-purchases-title">Total Purchases</div>
      <div className="total-purchases-figures">
        <img src="/cart.png" alt="Total Purchases" />
        <div className="total-purchases-value">
          <span className="number-amount">2.500</span>
        </div>
        <div className="total-purchases-change">
          Up by <strong>5%</strong> from Last Year
        </div>
      </div>
    </div>
  );
};

export default TotalPurchases;

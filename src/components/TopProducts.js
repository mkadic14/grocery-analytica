import React from 'react';
import '../TopProducts.css';

// Mock Data
const products = [
  { name: 'Strawberries', amount: 40.00, change: 5, icon: '🍓' },
  { name: 'Milk', amount: 40.00, change: 5, icon: '🥛' },
  { name: 'Bread', amount: 40.00, change: -5, icon: '🍞' },
  { name: 'Chicken', amount: 40.00, change: +5, icon: '🍗' },
  { name: 'Chips', amount: 40.00, change: -5, icon: '🍟' },

];

const TopProducts = () => {
  return (
    <div className="top-products-container">
      <h2>Top Products</h2>
      <ul>
        {products.map((product) => (
          <li key={product.name} className="product-item">
            <span className="product-icon">{product.icon}</span>
            <span className="product-name">{product.name}</span>
            <span className="product-amount">${product.amount.toFixed(2)}</span>
            <span className={`product-change ${product.change >= 0 ? 'positive' : 'negative'}`}>
              {product.change >= 0 ? '▲' : '▼'} {Math.abs(product.change)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;

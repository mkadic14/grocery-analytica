import React, { useState, useEffect } from 'react';
import '../TopProducts.css';

const TopProducts = () => {
  const [topProducts, setTopProducts] = useState([]);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/top-products');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setTopProducts(data);
      } catch (error) {
        console.error('Error fetching top products:', error);
      }
    };

    fetchTopProducts();
  }, []);

  return (
    <div className="top-products-container">
      <h2>Top Products</h2>
      <ul>
        {topProducts.map((product) => (
          <li key={product.name} className="product-item">
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

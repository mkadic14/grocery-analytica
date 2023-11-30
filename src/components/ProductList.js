// ProductList.js

import React from 'react';

const ProductList = ({ data }) => {
  return (
    <ul>
      {data.map(product => (
        <li key={product.productName}>
          <img src={product.imageUrl} alt={product.productName} />
          <span>{product.productName}</span>
          <span>{product.purchaseCount}</span>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;

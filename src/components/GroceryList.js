import React from 'react';
import Sidebar from './Sidebar';


const GroceryList = () => {
  return (
    <div className="grocery-list-container">
      <Sidebar />
      <main className="grocery-list-main-content">
        {/* Content will be rendered here based on routing or state */}
      </main>
    </div>
  );
};

export default GroceryList;

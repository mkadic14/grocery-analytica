import React, { useState } from 'react';
import '../GroceryList.css'; 

// Mock data simulating items from a database
const allItems = [
  { id: 1, name: 'Apples', category: 'Produce', cost: 1.2 },
  { id: 2, name: 'Bread', category: 'Bakery', cost: 2.5 },

];

const GroceryList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groceryItems, setGroceryItems] = useState([]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const addItemToList = (item) => {
    setGroceryItems([...groceryItems, { ...item, quantity: 1, purchased: false }]);
  };

  const removeItemFromList = (id) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
  };

  const markItemAsPurchased = (id) => {
    setGroceryItems(groceryItems.map((item) => 
      item.id === id ? { ...item, purchased: !item.purchased } : item
    ));
  };

  const filteredItems = searchTerm
    ? allItems.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : allItems;

  return (
    <div className="grocery-list-page">
      <h1>Grocery List</h1>
      <input
        type="text"
        placeholder="Search for items"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-box"
      />
      <ul className="item-list">
        {filteredItems.map((item) => (
          <li key={item.id} className="item-tile">
            {item.name} - ${item.cost.toFixed(2)}
            <button onClick={() => addItemToList(item)} className="button">Add to List</button>
          </li>
        ))}
      </ul>
      <h2>Your List</h2>
      <ul className="grocery-list">
        {groceryItems.map((item) => (
          <li key={item.id} className={`list-tile ${item.purchased ? 'purchased' : ''}`}>
            {item.quantity} x {item.name} - ${item.cost.toFixed(2)}
            <div>
              <button onClick={() => markItemAsPurchased(item.id)} className="button">
                {item.purchased ? 'Unmark' : 'Mark as Purchased'}
              </button>
              <button onClick={() => removeItemFromList(item.id)} className="button">Remove</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;

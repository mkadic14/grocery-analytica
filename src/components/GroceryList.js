import React, { useState } from 'react';
import '../GroceryList.css'; // Ensure this path correctly points to your CSS file

// Mock data simulating items from a database
const allItems = [
  { id: 1, name: 'Apples', category: 'Produce', cost: 1.2 },
  { id: 2, name: 'Bread', category: 'Bakery', cost: 2.5 },
  // ... more items
];

const GroceryList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groceryItems, setGroceryItems] = useState([]);

  // Handles search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Adds an item to the grocery list
  const addItemToList = (item) => {
    setGroceryItems([...groceryItems, { ...item, quantity: 1 }]);
  };

  // Removes an item from the grocery list
  const removeItemFromList = (id) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
  };

  // Filters items based on the search term
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
      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.cost.toFixed(2)}
            <button onClick={() => addItemToList(item)}>Add to List</button>
          </li>
        ))}
      </ul>
      <h2>Your List</h2>
      <ul>
        {groceryItems.map((item) => (
          <li key={item.id}>
            {item.quantity} x {item.name} - ${item.cost.toFixed(2)}
            <button onClick={() => removeItemFromList(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GroceryList;

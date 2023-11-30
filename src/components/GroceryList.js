import React, { useState, useEffect } from 'react';
import '../GroceryList.css'; 

const GroceryList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groceryItems, setGroceryItems] = useState([]);
  const [allItems, setAllItems] = useState([]); // Store all items from the database

  // Fetch items from the server when the component mounts
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('/api/items');
        const data = await response.json();
        setAllItems(data);
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    fetchItems();
  }, []);

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
      <div className="item-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="item-tile">
            {item.name} - ${item.cost.toFixed(2)}
            <button onClick={() => addItemToList(item)} className="button">Add to List</button>
          </div>
        ))}
      </div>
      <h2>Your List</h2>
      <div className="grocery-list">
        {groceryItems.map((item) => (
          <div key={item.id} className={`list-tile ${item.purchased ? 'purchased' : ''}`}>
            {item.quantity} x {item.name} - ${item.cost.toFixed(2)}
            <div>
              <button onClick={() => markItemAsPurchased(item.id)} className="button">
                {item.purchased ? 'Unmark' : 'Mark as Purchased'}
              </button>
              <button onClick={() => removeItemFromList(item.id)} className="button">Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroceryList;
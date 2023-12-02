import React, { useState, useEffect } from 'react';
import '../GroceryList.css';

const GroceryList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [groceryItems, setGroceryItems] = useState([]);
  const [allItems, setAllItems] = useState([]);


  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/items');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
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
    saveItemToDatabase(item);
  };

  const updateItemInList = async (id, updatedItem) => {
    setGroceryItems(groceryItems.map((item) => 
      item.id === id ? { ...item, ...updatedItem } : item
    ));

   
    try {
      const response = await fetch(`http://localhost:3001/api/items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedItem),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Item updated:', await response.json());
    } catch (error) {
      console.error('Error updating item:', error);
    }
  };

  const removeItemFromList = (id) => {
    setGroceryItems(groceryItems.filter((item) => item.id !== id));
    deleteItemFromDatabase(id);
  };

  const saveItemToDatabase = async (item) => {
    try {
      const response = await fetch('http://localhost:3001/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const savedItem = await response.json();
      console.log('Item saved:', savedItem);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const deleteItemFromDatabase = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/items/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      console.log('Item deleted:', await response.json());
    } catch (error) {
      console.error('Error deleting item:', error);
    }
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
              <button onClick={() => updateItemInList(item.id, { ...item, purchased: !item.purchased })} className="button">
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
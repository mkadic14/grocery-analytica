const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

// Initialize express app
const app = express();
app.use(cors());
app.use(express.json());

// Configure PostgreSQL connection
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Nutritional Facts',
  password: 'Sparky98',
  port: 5432,
});

// GET Endpoint: Fetch items from the database
app.get('/api/items', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Product Table'); // Replace with your actual table name
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// POST Endpoint: Add a new item to the database
app.post('/api/add-item', async (req, res) => {
  const { name, category, cost } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO your_table_name (name, category, cost) VALUES ($1, $2, $3) RETURNING *', 
      [name, category, cost]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT Endpoint: Update an existing item in the database
app.put('/api/update-item/:id', async (req, res) => {
  const { id } = req.params;
  const { name, category, cost } = req.body;
  try {
    const result = await pool.query(
      'UPDATE your_table_name SET name = $1, category = $2, cost = $3 WHERE id = $4 RETURNING *', 
      [name, category, cost, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE Endpoint: Delete an item from the database
app.delete('/api/delete-item/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM your_table_name WHERE id = $1', [id]);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

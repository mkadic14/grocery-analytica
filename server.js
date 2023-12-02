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
    const result = await pool.query('SELECT * FROM Product Table');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.post('/api/items', async (req, res) => {
  const { name, cost, userEmail } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO Product Table (name, cost, user_email) VALUES ($1, $2, $3) RETURNING *', 
      [name, cost, userEmail]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// PUT Endpoint: Update an existing item in the database
app.put('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const { name, cost } = req.body;
  const userEmail = 'grocery-analytica-test@gmail.com';
  try {
    const result = await pool.query(
      'UPDATE Product Table SET name = $1, cost = $2 WHERE id = $3 AND user_email = $4 RETURNING *', 
      [name, cost, id, userEmail]
    );
    if (result.rows.length === 0) {
      return res.status(404).send('Item not found or user not authorized.');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// DELETE Endpoint: Delete an item from the database
app.delete('/api/items/:id', async (req, res) => {
  const { id } = req.params;
  const userEmail = 'grocery-analytica-test@gmail.com';
  try {
    await pool.query('DELETE FROM your_table_name WHERE id = $1 AND user_email = $2', [id, userEmail]);
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

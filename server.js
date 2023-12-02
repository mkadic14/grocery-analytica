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

// POST Endpoint: Add a new item to the database
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
    await pool.query('DELETE FROM Product Table WHERE id = $1 AND user_email = $2', [id, userEmail]);
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// GET Endpoint: Fetch Top Products and their percentage change
app.get('/api/top-products', async (req, res) => {
  const userEmail = req.query.userEmail;

  try {
    const topProductsQuery = `
      SELECT name, COUNT(*) AS purchase_count, SUM(cost) AS total_amount
      FROM purchases
      WHERE user_email = $1
      GROUP BY name
      ORDER BY purchase_count DESC
      LIMIT 5;
    `;

    const topProducts = await pool.query(topProductsQuery, [userEmail]);

    // For each top product, calculate the percent change in purchases
    for (let product of topProducts.rows) {
      const percentChangeQuery = `
        SELECT
          (COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE)) -
          COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1)) 
          / NULLIF(COUNT(*) FILTER (WHERE EXTRACT(YEAR FROM date) = EXTRACT(YEAR FROM CURRENT_DATE) - 1), 0) * 100
          AS percent_change
        FROM purchases
        WHERE name = $1 AND user_email = $2;
      `;
      const percentChangeResult = await pool.query(percentChangeQuery, [product.name, userEmail]);
      product.percent_change = percentChangeResult.rows[0]?.percent_change || 0;
    }

    res.json(topProducts.rows);
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

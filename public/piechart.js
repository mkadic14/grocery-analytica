const { Client } = require('pg');

async function executeQuery(query) {
  const connectionParams = {
    user: 'postgres',
    host: 'localhost',
    database: 'Nutritional Facts',
    password: 'Sparky98',
    port: 5432,
  };

  const client = new Client(connectionParams);

  try {
    await client.connect();

    const result = await client.query(query);

    return result.rows;
  } catch (error) {
    console.error(`Error executing query: ${error}`);
  } finally {
    await client.end();
    console.log('Database connection closed.');
  }
}

const collectDataQuery = `
  SELECT
    name,
    category,
    cost
  FROM
    "Product Data";
`;


(async () => {
  const dataResult = await executeQuery(collectDataQuery);


  console.log('\nName, Category, and Cost of Each Item:');
  dataResult.forEach(row => console.log(`Name: ${row.name}, Category: ${row.category}, Cost: $${row.cost}`));
})();

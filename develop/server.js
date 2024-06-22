const express = require('express');
// Import and require Pool (node-postgres)
const { Pool } = require('pg');

const PORT = 3000;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const pool = new Pool(
  {
    user: 'postgres',
    password: 'postgres',
    host: 'localhost',
    database: 'employeeinventory_db'
  },
  console.log(`Connected to the employeeinventory_db database.`)
)

pool.connect();

// let deletedRow = 2;

// pool.query(
// `DELETE FROM employeeinventory_db WHERE id = $1`, [deletedRow],(err, { row }) => {
//     if (err) {
//    console.log();
//   }
// });

// // Query database
pool.query('SELECT * FROM department', function (err, result) {
  if (err) {
      console.error('Error executing query:', err);
  } else {
      console.log(result.rows);
  }
});

// // Query database
pool.query('SELECT * FROM role', function (err, result) {
  if (err) {
      console.error('Error executing query:', err);
  } else {
      console.log(result.rows);
  }
});

// // Query database
pool.query('SELECT * FROM employee', function (err, result) {
  if (err) {
      console.error('Error executing query:', err);
  } else {
      console.log(result.rows);
  }
});

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

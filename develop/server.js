const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const PORT = 3000;
const app = express();

// Connect to database
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'employeeinventory_db'
});

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// serve static files
app.use(express.static('Develop'));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.js'));
});

// Function to fetch all employees from the database
async function findAllEmployees() {
  const sql = `
    SELECT employee.id, employee.first_name, employee.last_name, role.title AS role,
           department.name AS department, role.salary,
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;
  `;
  const { rows } = await pool.query(sql);
  return rows;
}


// Exporting findAllEmployees function
module.exports = {
  findAllEmployees: findAllEmployees
};

// Set up API endpoint for employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await findAllEmployees();
    res.json(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Default endpoint for 404 errors
app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // Export app for testing or further use

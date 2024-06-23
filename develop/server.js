// // handles the backend logic
// //exporting functions related to database operations from server.js 
// const express = require('express');
// const { Pool } = require('pg');
// const path = require('path');
// const app = express();

// const PORT = 3000;

// // Connect to database (postgres pool)
// const pool = new Pool({
//   user: 'postgres',
//   password: 'postgres',
//   host: 'localhost',
//   database: 'employeeinventory_db'
// });

// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err);
//   process.exit(-1);
// });

// // middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

// // serve static files
// app.use(express.static('Develop'));

// // Route to serve index.html
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'index.js'));
// });


// // Function to fetch all employees from the database
// async function findAllEmployees() {
//   const sql = `
//     SELECT employee.id, employee.first_name, employee.last_name, role.title AS role,
//            department.name AS department, role.salary,
//            CONCAT(manager.first_name, ' ', manager.last_name) AS manager
//     FROM employee
//     LEFT JOIN employee manager on manager.id = employee.manager_id
//     INNER JOIN role ON (role.id = employee.role_id)
//     INNER JOIN department ON (department.id = role.department_id)
//     ORDER BY employee.id;
//   `;
//   const { rows } = await pool.query(sql);
//   return rows;
// }


// // Exporting findAllEmployees function
// module.exports = {
//   findAllEmployees
// };

// // Set up API endpoint for employees
// app.get('/api/employees', async (req, res) => {
//   try {
//     const employees = await findAllEmployees();
//     res.json(employees);
//   } catch (err) {
//     console.error('Error fetching employees:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Default endpoint for 404 errors
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

// module.exports = app; // Export app for testing or further use


// server.js

const express = require('express');
const { Pool } = require('pg');
const app = express();


// Create a PostgreSQL pool
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'employeeinventory_db'
});



// Function to fetch all employees from the database
async function findAllEmployees() {
  const sql = 'SELECT * FROM employee';
  const result = await pool.query(sql);
  return result.rows;
}

// Function to fetch all departments from the database
async function findAllDepartments() {
  const sql = 'SELECT * FROM department';
  const result = await pool.query(sql);
  return result.rows;
}

// Function to fetch all roles by department from the database
async function findAllRoles() {
  const sql = 'SELECT * FROM role';
  const result = await pool.query(sql);
  return result.rows;
}


// Function to fetch and display employees before removal
async function viewEmployeesForRemoval() {
  try {
    const employee = await findAllEmployees();
    console.log('\nAll Employees:');
    employee.forEach(employee => {
      // Log employee details
      console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name}`);
    });
    return employee; // Return employees array for further use
  } catch (err) {
    console.error('Error fetching employees:', err);
    throw err; // Propagate the error back for further handling
  }
}

// Function to remove an employee by ID
async function removeEmployee(employee_Id) {
  try {
    const employees = await findAllEmployees(); // Fetch all employees
    if (!employees || employees.length === 0) {
      console.log('No employees found.'); // Handle case where no employees are returned
      return 0;
    }

    const employeeToRemove = employees.find(emp => emp.id === parseInt(employee_Id));
    if (!employeeToRemove) {
      console.log(`Employee with ID ${employee_Id} not found.`);
      return 0;
    }

    const deleteSql = 'DELETE FROM employee WHERE id = $1';
    const deleteValues = [employee_Id];
    const deleteResult = await pool.query(deleteSql, deleteValues);

    console.log(`Employee with ID ${employee_Id} removed successfully.`);
    return deleteResult.rowCount;
  } catch (err) {
    console.error('Error removing employee:', err);
    throw err;
  }
}




// Function to update an employee by first and last name
async function updateEmployee({ first_name, last_name }, updates) {
  try {
    // Validate first_name and last_name
    if (!first_name || !last_name) {
      console.log('Employee first name or last name is undefined.'); // Debugging message
      return 0; // Or handle this case as needed
    }

    // Query to check if employee exists
    const employee = await findEmployeeByName(first_name, last_name);
    if (!employee) {
      console.log(`Employee with name ${first_name} ${last_name} not found.`);
      return 0;
    }

    // Destructure updates object
    const { new_first_name, new_last_name, role_id, manager_id } = updates;
    const updateSql = `
      UPDATE employee 
      SET first_name = $1, last_name = $2, role_id = $3, manager_id = $4
      WHERE id = $5
    `;
    const updateValues = [new_first_name, new_last_name, role_id, manager_id, employee.id];
    const updateResult = await pool.query(updateSql, updateValues);

    console.log(`Employee with name ${first_name} ${last_name} updated successfully.`);
    return updateResult.rowCount;
  } catch (err) {
    console.error('Error updating employee:', err);
    throw err;
  }
}


// Function to find an employee by first and last name
async function findEmployeeByName(first_name, last_name) {
  const sql = 'SELECT * FROM employee WHERE first_name = $1 AND last_name = $2';
  const values = [first_name, last_name];

  try {
    const result = await pool.query(sql, values);
    return result.rows[0]; // Return the first row (assuming first_name and last_name combination is unique) or null if not found
  } catch (err) {
    console.error('Error fetching employee:', err);
    throw err; // Propagate the error back to the caller for handling
  }
}


async function findAllManagers() {
  const sql = 'SELECT * FROM manager';
  const result = await pool.query(sql);
  return result.rows;
}



// Export functions for use in other modules
module.exports = {
  pool,
  findAllEmployees,
  findAllDepartments,
  findAllRoles,
  viewEmployeesForRemoval,
  removeEmployee,
  findEmployeeByName,
  updateEmployee,
  findAllManagers, 
  };

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

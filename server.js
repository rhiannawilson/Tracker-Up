// FETCHING DATA FROM DATABASE
// contains the logic to configure an Express server 
// and manage database interactions.

const express = require('express');
const { Pool } = require('pg');
const { prompt } = require('inquirer');

const PORT = process.env.PORT || 3002;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// connects to SQL database
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'employeeinventory_db',
}, 
console.log('Connected to the employeeinventory_db database!')
);

pool.connect();

// Basic route to test server
app.get('/', (req, res) => {
  res.send('Hello, world!');
});



// Function to fetch all employees from the database
async function findAllEmployees() {
  const sql = 'SELECT * FROM employee';
  const result = await pool.query(sql);
  return result.rows;
};

// Function to fetch all departments from the database
async function findAllDepartments() {
  const sql = 'SELECT * FROM department';
  const result = await pool.query(sql);
  return result.rows;
};

// Function to fetch all roles from the database
async function findAllRoles() {
  const sql = 'SELECT * FROM role';
  const result = await pool.query(sql);
  return result.rows;
};

// Function to fetch all managers from the database
async function findAllManagers() {
  const sql = 'SELECT * FROM manager';
  const result = await pool.query(sql);
  return result.rows;
};

// Function to add a department
function addDepartment() {
  prompt([
    {
      type: 'input',
      name: 'department_name',
      message: 'Enter the name of the department:'
    }
  ]).then((answers) => {
    const { department_name } = answers;

    // Query to insert department into database
    const sql = 'INSERT INTO department (department_name) VALUES ($1)';
    const values = [department_name];

    pool.query(sql, values)
      .then(() => {
        console.log(`\nDepartment '${department_name}' added successfully!\n`);
        // After adding, display all departments including the new one
        viewDepartments();
      })
      .catch((err) => {
        console.error('Error adding department:', err);
      });
  }).catch((err) => {
    console.error('Error:', err);
    loadMainPrompts(); // Assuming loadMainPrompts() handles restarting prompts
  });
}


// Example usage:
addDepartment();

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
};

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
};0

// Correct handler function
const viewEmployees = (req, res) => {
  const employee = [
      { id: 1, name: 'John Doe', position: 'Developer' },
      { id: 2, name: 'Jane Smith', position: 'Designer' },
  ];
  res.JSON(employee); // Correctly use res.json to send the response
}

// Function to update an employee by ID
async function updateEmployee( employee_id, first_name, last_name, role_id, manager_id, department_id) {
  try {
    const query = `
      UPDATE employee
      SET employee_id = ?, first_name = ?, last_name = ? role_id = ?, manager_id = ?, department_id = ?
      WHERE id = ?
    `;
    const values = [employee_id, first_name, last_name, role_id, manager_id, department_id];
    const result = await pool.query(query, values);
    console.log(`Employee with ID ${employee_id} updated successfully`);
    return result.rowCount; // Return the number of rows affected
  } catch (error) {
    console.error('Error updating employee:', error);
    return 0; // Return 0 if an error occurs
  }
}

// Route to update an employee
app.put('/employee/:id', async (req, res) => {
  const { first_name, last_name, role_id, manager_id, department_id } = req.body;
  const employee_id = req.params.id;
  const rowsAffected = await updateEmployee(employee_id, first_name, last_name, role_id, manager_id, department_id);
  res.json({ rowsAffected });
});

// Correct route setup
app.get('/employee', viewEmployees);


  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
 });

// Export functions for use in other modules
module.exports = {
  pool,
  findAllEmployees,
  findAllDepartments,
  findAllRoles,
  addDepartment,
  viewEmployeesForRemoval,
  removeEmployee,
  findAllManagers,
  updateEmployee
  };

  // Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});



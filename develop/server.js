const express = require('express');
const { default: inquirer } = require('inquirer');
const { Pool } = require('pg');
const app = express();

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
};

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
};


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
};

// // Function to update an employee by first and last name
// async function updateEmployee({ first_name, last_name }, updates) {
//   try {
//     // Validate first_name and last_name
//     if (!first_name || !last_name) {
//       console.log(first_name, last_name)
//       console.log('Employee first name or last name is undefined.'); // Debugging message
//       return 0; // Or handle this case as needed
//     }

//     // Query to check if employee exists
//     const employee = await findAllEmployees(first_name, last_name);
//     if (!employee) {
//       console.log(`Employee with name ${first_name} ${last_name} not found.`);
//       return 0;
//     }

//     // Destructure updates object
//     const { title, manager_name } = updates;

//     // Start transaction to update both employee and role tables
//     await pool.query('BEGIN');

//     // Update employee table
//     const updateEmployeeSql = `
//       UPDATE employee 
//       SET role_id = (SELECT id FROM role WHERE title = $1), manager_id = (SELECT id FROM employee WHERE first_name = $2 AND last_name = $3)
//       WHERE id = $4
//     `;
//     const updateEmployeeValues = [title, manager_name, employee.id];
//     const updateEmployeeResult = await pool.query(updateEmployeeSql, updateEmployeeValues);

//     // Update role table (assuming title update is also needed)
//     const updateRoleSql = `
//       UPDATE role
//       SET title = $1
//       WHERE id = $2
//     `;
//     const updateRoleValues = [title, employee.role_id];
//     const updateRoleResult = await pool.query(updateRoleSql, updateRoleValues);

//     console.log(`Employee with name ${first_name} ${last_name} updated successfully.`);
//     return updateEmployeeResult.rowCount; // Return rowCount from employee table update
//   } catch (err) {
//     await pool.query('ROLLBACK'); // Rollback transaction on error
//     console.error('Error updating employee:', err);
//     throw err;
//   }
// };

let employees = [
  { first_name: 'Rhianna', last_name: 'Doe', title: 'Full Stack Engineer', manager_name: 'Ryan Able' },
  { first_name: 'Jessica', last_name: 'Walker', title: 'Accountant', manager_name: 'Rebecca Southerland' },
  { first_name: 'Peter', last_name: 'Matthews', title: 'Customer Services Agent', manager_name: 'Joy Kelly' }
];

// Function to update employee information
function updateEmployee(first_name, last_name, updates) {
  // Find the employee by first and last name
  let employee = employees.find(emp => emp.first_name === first_name && emp.last_name === last_name);

  if (employee) {
    // Update employee properties based on updates object
    for (let key in updates) {
      if (updates.hasOwnProperty(key)) {
        employee[key] = updates[key];
      }
    }
    console.log(`Employee ${first_name} ${last_name} updated successfully.`);
  } else {
    console.log(`Employee with name ${first_name} ${last_name} not found.`);
  }
}

// Example usage:
updateEmployee('Rhianna', 'Wilson', { title: 'Full Stack Engineer' });
console.log(employees);
updateEmployee('Jessica', 'Walker', { title: 'Accountant', manager_name: 'John Doe' });
console.log(employees);
updateEmployee('Peter', 'Matthews', { title: 'Customer Services Agent' }); // Non-existing employee


// Export functions for use in other modules
module.exports = {
  pool,
  findAllEmployees,
  findAllDepartments,
  findAllRoles,
  viewEmployeesForRemoval,
  removeEmployee,
  updateEmployee,
  };

// Start the Express server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

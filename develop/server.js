const { Pool } = require('pg')
const { prompt } = require('inquirer');
const express = require('express');

const PORT = process.env.PORT || 3009;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'employeeinventory_db',
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

let employees = [
  { first_name: 'Rhianna', last_name: 'Wilson', title: 'Full Stack Engineer', manager_name: 'Ryan Able' },
  { first_name: 'Jessica', last_name: 'Walker', title: 'Accountant', manager_name: 'Rebecca Southerland' },
  { first_name: 'Peter', last_name: 'Matthews', title: 'Customer Services Agent', manager_name: 'Joy Kelly' }
];



// Function to fetch all managers from the database
function findAllManagers() {
  const sql = 'SELECT * FROM manager';
  return new Promise((resolve, reject) => {
    pool.query(sql, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result.rows);
      }
    });
  });
}
findAllManagers(); 

// Export functions for use in other modules
module.exports = {
  pool,
  findAllEmployees,
  findAllDepartments,
  findAllRoles,
  viewEmployeesForRemoval,
  removeEmployee,
  findAllManagers,
  // updateEmployee,
  };

// Start the Express server
app.listen(3009, () => {
  console.log('Server is running on port 3009');
});













// This is just an example of a couple of attempts at updating the employee, 
// after being stuck on this for far too long
// I've had to remove from my code.







// // Function to update employee information
// function updateEmployee(first_name, last_name, updates) {
//   // Find the employee by first and last name
//   let employee = employees.find(emp => emp.first_name === first_name && emp.last_name === last_name);

//   if (employee) {
//     // Update employee properties based on updates object
//     for (let key in updates) {
//       if (updates.hasOwnProperty(key)) {
//         employee[key] = updates[key];
//       }
//     }
//     console.log(`Employee ${first_name} ${last_name} updated successfully.`);
//   } else {
//     console.log(`Employee with name ${first_name} ${last_name} not found.`);
//   }
// }

// // Example usage:
// updateEmployee('Rhianna', 'Wilson', { title: 'Full Stack Engineer' });
// console.log(employees);
// updateEmployee('Jessica', 'Walker', { title: 'Accountant', manager_name: 'John Doe' });
// console.log(employees);
// updateEmployee('Peter', 'Matthews', { title: 'Customer Services Agent' }); // Non-existing employee

// function updateEmployeePrompt() {
//   prompt([
//     {
//       type: 'input',
//       name: 'first_name',
//       message: 'Enter the first name of the employee to update:',
//     },
//     {
//       type: 'input',
//       name: 'last_name',
//       message: 'Enter the last name of the employee to update:',
//     },
//     {
//       type: 'input',
//       name: 'title',
//       message: 'Enter the new title of their role:',
//     },
//   ])
//     .then(async (answers) => {
//       const { first_name, last_name, title } = answers;

//       // Call updateEmployee function with first and last name and updates
//       const rowCount = await updateEmployeeInDB(first_name, last_name, title);
//       if (rowCount > 0) {
//         console.table(`${rowCount} employee updated.`);
//         // After updating, display updated employee list
//         viewEmployees(); // Call the function to display the updated employee list
//       } else {
//         console.log(`Employee with name ${first_name} ${last_name} not found.`);
//       }
//     })
//     .catch((err) => {
//       console.error('Error updating employee:', err);
//       loadMainPrompts();
//     });
// };

// updateEmployeePrompt();

// // Function to update employee in the database
// async function updateEmployeeInDB(first_name, last_name, title) {
//   try {
//     const query = {
//       text: 'SELECT employee($1, $2, $3)',
//       values: [first_name, last_name, title],
//     };

//     const result = await pool.query(query);
//     return result.rowCount;
//   } catch (error) {
//     console.error('Error updating employee:', error);
//     return 0; // Return 0 if the update fails
//   }
// }


// Function to update an employee by ID
// async function updateEmployee(employeeId, updatedEmployeeData, pool) {
//   try {
//       const employee = await findAllEmployees(); // Fetch all employees
//       if (!employee || employee.length === 0) {
//           console.log('No employees found.'); // Handle case where no employees are returned
//           return 0;
//       }

//       const employeeToUpdate = employee.find(emp => emp.id === parseInt(employeeId));
//       if (!employeeToUpdate) {
//           console.log(`Employee with ID ${employeeId} not found.`);
//           return 1;
//       }

//       // Update the employee data with the provided updatedEmployeeData
//       const updatedEmployee = { ...employeeToUpdate, ...updatedEmployeeData };

//       const updateSql = 'UPDATE employee SET first_name = $1, last_name = $2 WHERE id = $3';
//       const updateValues = [updatedEmployee.employee_id, updatedEmployee.first_name, updatedEmployee.last_name, updatedEmployee.role_id, updatedEmployee.manager_id, updatedEmployee.department_id ];
//       const updateResult = await pool.query(updateSql, updateValues);

//       console.log(`Employee with ID ${employeeId} updated successfully.`);
//       return updateResult.rowCount;
//   } catch (err) {
//       console.error('Error updating employee:', err);
//       throw err;
//   }
// };

// // Call the updateEmployee function with the pool object
// const employeeId = 1; // Example employee ID
// const updatedData = {
//   first_name: 'Rhianna',
//   last_name: 'Wilson',
// };

// updateEmployee(employeeId, updatedData, pool)
//   .then((rowCount) => {
//       console.log(`Number of rows updated: ${rowCount}`);
//   })
//   .catch((error) => {
//       console.error('Error updating employee:', error);
//   });



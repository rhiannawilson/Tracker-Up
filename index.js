// CALLING THE DATA FROM SERVER
// initializes the application, handles user prompts, 
// and calls functions from server.js based on user input.

const fs = require("fs");
const inquirer = require("inquirer");
const colors = require('colors');
const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());

const { Pool } = require('pg');

// connects to SQL database
const pool = new Pool({
  user: '',
  password: '',
  host: 'localhost',
  database: 'employeeinventory_db',
}, 
console.log('Connected to the employeeinventory_db database!')
);

pool.connect();


// display logo text, load main prompts
function init() {
    const logoText = logo({name: 'Tracker Up Employee Manager'}).render();

    console.log(logoText);

    loadMainPrompts();
};

// Function to load main prompts
function loadMainPrompts() {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: colors.brightMagenta('What would you like to do?'),
      choices: [
        { name: 'View all employees', value: 'VIEW_EMPLOYEES' },
        { name: 'View all departments', value: 'VIEW_DEPARTMENTS' },
        { name: 'View all roles', value: 'VIEW_ROLES' },
        { name: 'View all managers', value: 'VIEW_MANAGERS'},
        { name: 'Add Department', value: 'ADD_DEPARTMENT' },
        { name: 'Remove Department', value: 'REMOVE_DEPARTMENT' },
        { name: 'Add Role', value: 'ADD_ROLE' },
        { name: 'Add Employee', value: 'ADD_EMPLOYEE' },
        { name: 'Remove Employee', value: 'REMOVE_EMPLOYEE' },
        { name: 'Update employee', value: 'UPDATE_EMPLOYEE' },
        { name: 'Quit', value: 'QUIT' }
      ]
    }
  ]).then((res) => {
    let choice = res.choice;

    switch (choice) {
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case 'VIEW_DEPARTMENTS':
        viewDepartments();
        break;
      case 'VIEW_ROLES':
        viewRoles();
      case 'ADD_DEPARTMENT':
        addDepartment();
        break;
      case 'REMOVE_DEPARTMENT':
        removeDepartment();
        break; 
      case 'ADD_ROLE':
        addRole();
        break;
      case 'ADD_EMPLOYEE':
        addEmployee();
        break;
      case 'REMOVE_EMPLOYEE':
        viewEmployeesForRemoval(),
        removeEmployeePrompt();
        break;
      case 'UPDATE_EMPLOYEE':
        updateEmployee();
        break;
      case 'VIEW_MANAGERS':
        viewAllManagers();
          break;
      case 'QUIT':
        console.log('Exiting the application. Goodbye!');
        break;
      default:
        console.log('Invalid choice');
        break;
    }
  }).catch((err) => {
    console.error('Error:', err);
  });
};

// Function to view all employees
function viewEmployees() {
  findAllEmployees()
    .then((employee) => {
      console.log('\nAll Employees:');
      employee.forEach(employee => {
        // Log employee details including role and manager information
        console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name} | Role: ${employee.role || 'N/A'} | Manager: ${employee.manager || 'N/A'}`);
      });
      loadMainPrompts();
    })
    .catch((err) => {
      console.error('Error fetching employees:', err);
      loadMainPrompts();
    });
};

// Function to view all departments
function viewDepartments() {
  findAllDepartments()
    .then((department) => {
      console.log('\nAll Departments:');
      console.table(department);
      loadMainPrompts();
    })
    .catch((err) => {
      console.error('Error fetching departments:', err);
      loadMainPrompts();
    });
};

// Function to view all roles
function viewRoles() {
   findAllRoles()
     .then((role) => {
       console.log('\nAll Roles:');
       console.table(role);
       loadMainPrompts();
     })
     .catch((err) => {
       console.error('Error fetching departments:', err);
       loadMainPrompts();
     });
};


function addRole() {
  // First, prompt for title and salary
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Enter the title of the role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the role:'
    }
  ]).then((answers) => {
    const { title, salary } = answers;

    // Fetch and display all departments
    return findAllDepartments().then((departments) => {
      console.log('\nAll Departments:');
      console.table(departments);

      // Prompt for department_id after displaying departments
      return inquirer.prompt([
        {
          type: 'input',
          name: 'department_id',
          message: 'Enter the department ID for the role:'
        }
      ]).then((answers) => {
        const { department_id } = answers;

        // SQL query to insert role into database
        const sql = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
        const values = [title, salary, department_id];

        // Execute the query
        return pool.query(sql, values)
          .then(() => {
            console.log(`\nRole '${title}' added successfully!\n`);
            // Optionally, you might want to display all roles including the new one
            return viewRoles();
          })
          .catch((err) => {
            console.error('Error adding role:', err);
            loadMainPrompts(); // Or handle errors as appropriate
          });
      });
    }).catch((err) => {
      console.error('Error fetching departments:', err);
      loadMainPrompts(); // Or handle errors as appropriate
    });
  }).catch((err) => {
    console.error('Error:', err);
    loadMainPrompts(); // Or handle errors as appropriate
  });
};



// Function to add an employee
function addEmployee() {
  // Prompt user for employee details
  prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee:'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee:'
    },
    {
      type: 'input',
      name: 'role.title',
      message: 'Enter to assign a new role ID for the employee:'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter to assign a new manager ID for the employee:'
    }
  ]).then((answers) => {
    const { first_name, last_name, role_id, manager_id } = answers;

    // Validate inputs and convert role_id and manager_id to integers if provided
    const roleId = parseInt(role_id, 10) || null;
    const managerId = parseInt(manager_id, 10) || null;

    // SQL query to insert employee into database
    const sql = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
    const values = [first_name, last_name, roleId, managerId];

    // Execute the query
    pool.query(sql, values)
      .then(() => {
        console.log(`\nEmployee '${first_name} ${last_name}' added successfully!\n`);
        // Optionally, display all employees including the new one
        viewEmployees();
      })
      .catch((err) => {
        console.error('Error adding employee:', err);
        loadMainPrompts(); // Or handle errors as appropriate
      });
  }).catch((err) => {
    console.error('Error:', err);
    loadMainPrompts(); // Or handle errors as appropriate
  });
};

// Function to prompt for employee removal
function removeEmployeePrompt() {
  findAllEmployees()
    .then((employee) => {
      prompt([
        {
          type: 'input',
          name: 'employee_Id',
          message: 'Enter the ID of the employee you want to remove:'
        }
      ]).then((answers) => {
        const { employee_Id } = answers;

        // Validate employeeId input against available employees
        const employeeToRemove = employee.find(emp => emp.id === parseInt(employee_Id));
        if (!employeeToRemove) {
          console.log(`Employee with ID ${employee_Id} not found.`);
          loadMainPrompts();
          return;
        }

        removeEmployee(employee_Id)
          .then((rowCount) => {
            console.log(`${rowCount} employee removed.`);
            // After removing, display updated employee list
            viewEmployees();
          })
          .catch((err) => {
            console.error('Error removing employee:', err);
            loadMainPrompts();
          });
      }).catch((err) => {
        console.error('Error:', err);
        loadMainPrompts();
      });
    })
    .catch((err) => {
      console.error('Error fetching employees:', err);
      loadMainPrompts();
    });
};

function viewAllManagers() {
  findAllManagers()
    .then((manager) => {
      console.log('\nAll Managers:');
      manager.forEach(manager => {
        console.log(`ID: ${manager.id} | Name: ${manager.name} | Department ID: ${manager.department_id}`);
      });
      loadMainPrompts();
    })
    .catch((error) => {
      console.error("Error fetching managers:", error);
    });
};

// Start the application
init();


// FETCHING DATA FROM DATABASE
// contains the logic to configure an Express server and manage database interactions.


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
    const sql = 'INSERT INTO department (department_name, id) VALUES ($1, $2)';
    const values = [department_name, 7];

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

// Function to prompt for employee removal
function removeDepartment() {
  findAllDepartments()
    .then((department) => {
      prompt([
        {
          type: 'input',
          name: 'department_name',
          message: 'Enter the name of the department you want to remove:'
        }
      ]).then((answers) => {
        const { department_name  } = answers;

        // Validate employeeId input against available employees
        const departmentToRemove = department.find(emp => department.name === parseInt(department_name ));
        if (!departmentToRemove) {
          console.log(`Department with ID ${department_name} not found.`);
          loadMainPrompts();
          return;
        }

        removeEmployee(department_name )
          .then((rowCount) => {
            console.log(`${rowCount} department removed.`);
            // After removing, display updated employee list
            viewDepartments();
          })
          .catch((err) => {
            console.error('Error removing Department:', err);
            loadMainPrompts();
          });
      }).catch((err) => {
        console.error('Error:', err);
        loadMainPrompts();
      });
    })
    .catch((err) => {
      console.error('Error fetching Department:', err);
      loadMainPrompts();
    });
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
};0

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



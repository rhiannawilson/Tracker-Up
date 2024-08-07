// CALLING THE DATA FROM SERVER
// initializes the application, handles user prompts, 
// and calls functions from server.js based on user input.

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
        { name: 'Remove Role', value: 'REMOVE_ROLE' },
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
      case 'REMOVE_ROLE':
        removeRole();
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
      console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name}`);
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
  prompt([
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
      return prompt([
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

function removeRole() {
  // Fetch and display all roles first
  findAllRoles().then((roles) => {
    if (roles.length === 0) {
      console.log('\nNo roles available to remove.\n');
      loadMainPrompts(); // Return to main prompts if no roles are available
      return;
    }

    console.log('\nAll Roles:');
    console.table(roles);

    // Prompt for the role ID to remove
    return prompt([
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the role ID to remove:'
      }
    ]).then((answers) => {
      const { role_id } = answers;

      // SQL query to delete the role from the database
      const sql = 'DELETE FROM role WHERE id = $1';
      const values = [role_id];

      // Execute the query
      return pool.query(sql, values)
        .then(() => {
          console.log(`\nRole with ID '${role_id}' removed successfully!\n`);
          loadMainPrompts(); // Return to main prompts after successful removal
        })
        .catch((err) => {
          console.error('Error removing role:', err);
          loadMainPrompts(); // Handle errors as appropriate
        });
    }).catch((err) => {
      console.error('Error:', err);
      loadMainPrompts(); // Handle errors as appropriate
    });
  }).catch((err) => {
    console.error('Error fetching roles:', err);
    loadMainPrompts(); // Handle errors as appropriate
  });
};


// Function to add an employee
function addEmployee() {
  inquirer.prompt([
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
      name: 'role_id',
      message: 'Enter the role ID for the employee (or leave blank):'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee (or leave blank):'
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for the employee (or leave blank):'
    }
  ]).then((answers) => {
    const { first_name, last_name, role_id, manager_id, department_id } = answers;

    // Convert empty strings to null
    const role_id_value = role_id ? parseInt(role_id) : null;
    const manager_id_value = manager_id ? parseInt(manager_id) : null;
    const department_id_value = department_id ? parseInt(department_id) : null;

    // SQL query to insert employee into the database
    const sql = `
      INSERT INTO employee (first_name, last_name, role_id, manager_id, department_id)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [first_name, last_name, role_id_value, manager_id_value, department_id_value];

    pool.query(sql, values)
      .then(() => {
        console.log(`\nEmployee '${first_name} ${last_name}' added successfully!\n`);
        loadMainPrompts(); // Return to main prompts after successful addition
      })
      .catch((err) => {
        console.error('Error adding employee:', err);
        loadMainPrompts(); // Handle errors as appropriate
      });
  }).catch((err) => {
    console.error('Error:', err);
    loadMainPrompts(); // Handle errors as appropriate
  });
}

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

function addDepartment() {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the short name of the department:'
    },
    {
      type: 'input',
      name: 'department_name',
      message: 'Enter the full name of the department:'
    }
  ]).then((answers) => {
    const { name, department_name } = answers;

    // SQL query to insert department into the database
    const sql = 'INSERT INTO department (name, department_name) VALUES ($1, $2)';
    const values = [name, department_name];

    pool.query(sql, values)
      .then(() => {
        console.log(`\nDepartment '${department_name}' added successfully!\n`);
        return findAllDepartments().then((departments) => {
          console.log('\nAll Departments:');
          console.table(departments);
          loadMainPrompts();
        });
      })
      .catch((err) => {
        console.error('Error adding department:', err);
        loadMainPrompts(); // Or handle errors as appropriate
      });
  }).catch((err) => {
    console.error('Error:', err);
    loadMainPrompts(); // Or handle errors as appropriate
  });
}

function removeDepartment() {
  // Fetch and display all departments first
  findAllDepartments().then((departments) => {
    if (departments.length === 0) {
      console.log('\nNo departments available to remove.\n');
      loadMainPrompts(); // Return to main prompts if no departments are available
      return;
    }

    console.log('\nAll Departments:');
    console.table(departments);

    // Prompt for the department ID to remove
    return inquirer.prompt([
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the department ID to remove:',
        validate: (input) => {
          if (!input || isNaN(input)) {
            return 'Please enter a valid department ID.';
          }
          return true;
        }
      }
    ]).then((answers) => {
      const { department_id } = answers;

      // SQL query to delete the department from the database
      const sql = 'DELETE FROM department WHERE id = $1';
      const values = [department_id];

      // Execute the query
      return pool.query(sql, values)
        .then(() => {
          console.log(`\nDepartment with ID '${department_id}' removed successfully!\n`);
          loadMainPrompts(); // Return to main prompts after successful removal
        })
        .catch((err) => {
          console.error('Error removing department:', err);
          loadMainPrompts(); // Handle errors as appropriate
        });
    }).catch((err) => {
      console.error('Error:', err);
      loadMainPrompts(); // Handle errors as appropriate
    });
  }).catch((err) => {
    console.error('Error fetching departments:', err);
    loadMainPrompts(); // Handle errors as appropriate
  });
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


function viewEmployees() {
  const sql = 'SELECT * FROM employee';

  return pool.query(sql)
    .then((res) => {
      console.table(res.rows);
      return res.rows;
    })
    .catch((err) => {
      console.error('Error fetching employees:', err);
      throw err;
    });
}

function updateEmployee() {
  viewEmployees().then((employees) => {
    if (employees.length === 0) {
      console.log('\nNo employees available to update.\n');
      loadMainPrompts(); // Return to main prompts if no employees are available
      return;
    }

    inquirer.prompt([
      {
        type: 'input',
        name: 'employee_id',
        message: 'Enter the ID of the employee to update:'
      },
      {
        type: 'input',
        name: 'first_name',
        message: 'Enter the new first name of the employee (leave blank to keep current):'
      },
      {
        type: 'input',
        name: 'last_name',
        message: 'Enter the new last name of the employee (leave blank to keep current):'
      },
      {
        type: 'input',
        name: 'role_id',
        message: 'Enter the new role ID for the employee (leave blank to keep current):'
      },
      {
        type: 'input',
        name: 'manager_id',
        message: 'Enter the new manager ID for the employee (leave blank to keep current):'
      },
      {
        type: 'input',
        name: 'department_id',
        message: 'Enter the new department ID for the employee (leave blank to keep current):'
      }
    ]).then((answers) => {
      const { employee_id, first_name, last_name, role_id, manager_id, department_id } = answers;

      // Create an array to store the fields to be updated
      const fields = [];
      const values = [];

      if (first_name) {
        fields.push('first_name = $' + (fields.length + 1));
        values.push(first_name);
      }
      if (last_name) {
        fields.push('last_name = $' + (fields.length + 1));
        values.push(last_name);
      }
      if (role_id) {
        fields.push('role_id = $' + (fields.length + 1));
        values.push(parseInt(role_id) || null);
      }
      if (manager_id) {
        fields.push('manager_id = $' + (fields.length + 1));
        values.push(parseInt(manager_id) || null);
      }
      if (department_id) {
        fields.push('department_id = $' + (fields.length + 1));
        values.push(parseInt(department_id) || null);
      }

      // If no fields to update, return early
      if (fields.length === 0) {
        console.log('No updates were provided.');
        loadMainPrompts();
        return;
      }

      // Add employee_id to the values array
      values.push(parseInt(employee_id));

      // Create the SQL update statement
      const sql = `UPDATE employee SET ${fields.join(', ')} WHERE id = $${fields.length + 1}`;

      pool.query(sql, values)
        .then(() => {
          console.log(`\nEmployee with ID '${employee_id}' updated successfully!\n`);
          loadMainPrompts(); // Return to main prompts after successful update
        })
        .catch((err) => {
          console.error('Error updating employee:', err);
          loadMainPrompts(); // Handle errors as appropriate
        });
    }).catch((err) => {
      console.error('Error:', err);
      loadMainPrompts(); // Handle errors as appropriate
    });
  }).catch((err) => {
    console.error('Error fetching employees:', err);
    loadMainPrompts(); // Handle errors as appropriate
  });
}
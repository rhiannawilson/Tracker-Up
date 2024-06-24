

const { prompt } = require('inquirer');
const colors = require('colors');
const { pool, findAllEmployees, findAllDepartments, findAllRoles, removeEmployee, viewEmployeesForRemoval, updateEmployee } = require('./develop/server');
const logo = require('asciiart-logo');
const config = require('./package.json');
console.log(logo(config).render());

// display logo text, load main prompts
function init() {
    const logoText = logo({name: 'Tracker Up Employee Manager'}).render();

    console.log(logoText);

    loadMainPrompts();
}



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
        { name: 'View all managers', value: 'VIEW_MANAGERS' },
        { name: 'Add Department', value: 'ADD_DEPARTMENT' },
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
      case 'VIEW_EMPLOYEES':
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
        updateEmployeePrompt();
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
}


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
}

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
}

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
}

// Function to add a department
function addDepartment() {
  prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Enter the name of the department:'
    }
  ]).then((answers) => {
    const { name } = answers;

    // Query to insert department into database
    const sql = 'INSERT INTO department (name) VALUES ($1)';
    const values = [name];

    pool.query(sql, values)
      .then(() => {
        console.log(`\nDepartment '${name}' added successfully!\n`);
        // After adding, display all departments including the new one
        viewDepartments();
      })
      .catch((err) => {
        console.error('Error adding department:', err);
        loadMainPrompts();
      });
  }).catch((err) => {
    console.error('Error:', err);
    loadMainPrompts();
  });
}


// Function to add a role
function addRole() {
  // Prompt user for role details
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
    },
    {
      type: 'input',
      name: 'department_id',
      message: 'Enter the department ID for the role:'
    }
  ]).then((answers) => {
    const { title, salary, department_id } = answers;

    // SQL query to insert role into database
    const sql = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
    const values = [title, salary, department_id];

    // Execute the query
    pool.query(sql, values)
      .then(() => {
        console.log(`\nRole '${title}' added successfully!\n`);
        // Optionally, you might want to display all roles including the new one
        viewRoles();
      })
      .catch((err) => {
        console.error('Error adding role:', err);
        loadMainPrompts(); // Or handle errors as appropriate
      });
  }).catch((err) => {
    console.error('Error:', err);
    loadMainPrompts(); // Or handle errors as appropriate
  });
}

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
      name: 'role_id',
      message: 'Enter the role ID for the employee (optional):'
    },
    {
      type: 'input',
      name: 'manager_id',
      message: 'Enter the manager ID for the employee (optional):'
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
}

// Function to view all employees
function viewEmployees() {
  findAllEmployees()
    .then((employee) => {
      console.log('\nAll Employees:');
      employee.forEach(employee => {
        // Log employee details
        console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name}`);
      });
      loadMainPrompts();
    })
    .catch((err) => {
      console.error('Error fetching employees:', err);
      loadMainPrompts();
    });
}

// Function to prompt for employee removal
function removeEmployeePrompt() {
  findAllEmployees()
    .then((employees) => {
      prompt([
        {
          type: 'input',
          name: 'employee_Id',
          message: 'Enter the ID of the employee you want to remove:'
        }
      ]).then((answers) => {
        const { employee_Id } = answers;

        // Validate employeeId input against available employees
        const employeeToRemove = employees.find(emp => emp.id === parseInt(employee_Id));
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
}

module.exports = {
  removeEmployeePrompt
}; 

// Function to view all employees
function viewEmployees() {
  findAllEmployees()
    .then((employee) => {
      console.log('\nAll Employees:');
      employee.forEach(employee => {
        // Log employee details
        console.log(`ID: ${employee.id} | Name: ${employee.first_name} ${employee.last_name}`);
      });
      loadMainPrompts();
    })
    .catch((err) => {
      console.error('Error fetching employees:', err);
      loadMainPrompts();
    });
}


// Function to prompt for updating an employee by first and last name
function updateEmployeePrompt() {
  prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'Enter the first name of the employee to update:',
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'Enter the last name of the employee to update:',
    },
    {
      type: 'input',
      name: 'title',
      message: 'Enter the new title of their role:',
    },
    {
      type: 'input',
      name: 'manager_name',
      message: 'Enter the new manager they will now fall under (if necessary):',
    },
  ])
    .then((answers) => {
      const { first_name, last_name, title, manager_name } = answers;

      // Call updateEmployee function with first and last name and updates
      return updateEmployee({ first_name, last_name }, { title, manager_name });
    })
    .then((rowCount) => {
      if (rowCount > 0) {
        console.log(`${rowCount} employee updated.`);
        // After updating, display updated employee list
        viewEmployees();
      } else {
        console.log(`Employee with name ${first_name} ${last_name} not found.`);
        loadMainPrompts(); // Return to main menu or handle as appropriate
      }
    })
    .catch((err) => {
      console.error('Error updating employee:', err);
      loadMainPrompts();
    });
}

// // Function to view all managers
// function viewAllManagers() {
//   findManagers().then(manager => {
//     console.log('All Managers:');
//     manager.forEach(manager => {
//       console.log(`ID: ${manager.id} | Name: ${manager.name}`);
//     });
//   }).catch(err => {
//     console.error('Error fetching managers:', err);
//   });
// }

// 
// Start the application
loadMainPrompts();

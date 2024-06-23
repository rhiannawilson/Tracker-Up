// const {prompt} = require('inquirer');
// const logo = require('asciiart-logo');
// const config = require('./package.json');
// console.log(logo(config).render());
// const db = require ('./develop/server');
// const colors = require('colors'); // Assuming you use colors for styling



// // display logo text, load main prompts
// function init() {
//     const logoText = logo({name: 'Tracker Up Employee Manager'}).render();

//     console.log(logoText);

//     loadMainPrompts();
// }



// function loadMainPrompts () {
//     prompt([
//         {
//             type: 'list',
//             name: 'choice',
//             message: colors.brightMagenta ('What would you like to do?'),
//             choices: [
//                 {
//                     name: 'View all employees',
//                     value: 'VIEW_EMPLOYEES',
//                 },
//                 {
//                     name: 'View all departments',
//                     value: 'VIEW_DEPARTMENTS',
//                 },
//                 {
//                     name: 'View all employees by departments',
//                     value: 'VIEW_EMPLOYEE_BY_DEPARTMENTS',
//                 },
//                 {
//                     name: 'View all roles',
//                     value: 'VIEW_ROLES',
//                 },
//                 {
//                     name: 'Add Department',
//                     value: 'ADD_DEPARTMENT',
//                 },
//                 {
//                     name: 'Add Role',
//                     value: 'ADD_ROLE',
//                 },
//                 {
//                     name: 'Add Employee',
//                     value: 'ADD_EMPLOYEE',
//                 },
//                 {
//                     name: 'Update an employee',
//                     value: 'UPDATE_AN_EMPLOYEE',
//                 },
//                 {
//                     name: 'Remove Employee',
//                     value: 'REMOVE_EMPLOYEE',
//                 },
//                 {
//                     name:'Quit',
//                     value: 'QUIT',
//                 },
//             ],
//         },
//     ]).then((res) => {
//         let choice =res.choice;
//         // call the appropriate function depending on what the user chooses
//         switch (choice) {
//             case 'VIEW_EMPLOYEES': 
//                 viewEmployees();
//                 break;
//             case 'VIEW_DEPARTMENTS': 
//                 viewDepartments();
//                 break;
//             case 'VIEW_ROLES': 
//                 viewRoles();
//                 break;
//             case 'ADD_DEPARTMENT': 
//                 addDepartment();
//                 break;
//             case 'ADD_ROLE': 
//                 addRole();
//                 break;
//             case 'ADD_EMPLOYEE': 
//                 addEmployee();
//                 break;
//             case 'UPDATE_AN_EMPLOYEE': 
//                 updateAnEmployee();
//                 break;
//             case 'REMOVE_EMPLOYEE': 
//                 removeAnEmployee();
//                 break;
//         }
//     })
// }

// // VIEW ALL EMPLOYEES

// function viewEmployees() {
//     db.findAllEmployees()
//     .then(({rows  }) => {
//         let employee = rows;
//         console.log('/n');
//         console.table(employee)
//     })
//     .then(() => loadMainPrompts)
// }

// // VIEW ALL DEPARTMENT

// function viewDepartments() {
//     db.findAllDepartments()
//     .then(({ rows }) => {
//         let department = rows;
//         console.log('\n');
//         console.table(department);
//     })
//     .then(loadMainPrompts);
// }


// // VIEW ALL EMPLOYEES THAT BELONG TO A DEPARTMENT

// function viewEmployeesByDepartment() {
//     db.findAllEmployeesByDepartment()
//     .then(({ rows }) => {
//         let employee = rows;
//         console.log('\n');
//         console.table(employee);
//     })
//     .then(loadMainPrompts);
// }

// // is the above this:  .then(loadMainPrompts); OR
// // .then(()=> loadMainPrompts());

// // VIEW ALL ROLES

// function viewRoles() {
//     db.findAllRoles()
//     .then(({ rows }) => {
//         let department = rows;
//         console.log('\n');
//         console.table(department);
//     })
//     .then(loadMainPrompts);
// }

// // ADD A DEPARTMENT VERSION 1
// function addDepartment() {
//     db.findAllDepartments()
//     .then(({ rows }) => {
//         let department = rows;
//         console.log('\n');
//         console.table(department);
//     })
//     .then(loadMainPrompts);
// }

// // ADD A DEPARTMENT VERSION 2
// // function addDepartment() {
// //     const name = prompt('What is the name of the department? ');
// //     return name;
// // }
// // function main() {
// //     const departmentName = addDepartment();
// //     // Here you can use departmentName as needed, e.g., save it to a database, print it, etc.
// //     console.log(`Department "${departmentName}" added successfully.`);
// // }

// // ADD A ROLE
// function addRole() {
//     db.findAllRoles()
//     .then(({ rows }) => {
//         let role = rows;
//         console.log('\n');
//         console.table(role);
//     })
//     .then(loadMainPrompts);
// }

// // ADD EMPLOYEE VERSION 2
// function addEmployee() {
//     const name = prompt('What is the name of the employee? ');
//     const role = prompt('What is the role of the employee? ');
//     const departmentId = prompt('What is the department ID of the employee? '); // Assuming you need department ID for employee

//     // You can add additional prompts for other employee details as needed

//     return { name, role, departmentId };
// }

// // Example usage:
// function main() {
//     const newEmployee = addEmployee();
//     console.log('New Employee Details:');
//     console.log(newEmployee);
//     // Save newEmployee to database or perform other actions
// }

// main(); // Call main to start the process



// // Update an Employee
// function updateAnEmployee() {
//     db.findAllEmployees()
//     .then(({ rows }) => {
//         let employee = rows;
//         console.log('\n');
//         console.table(employee);
//     })
//     .then(loadMainPrompts);
// }

// // Remove an Employee
// function removeAnEmployee() {
//     db.findAllEmployees()
//     .then(({ rows }) => {
//         let employee = rows;
//         console.log('\n');
//         console.table(employee);
//     })
//     .then(loadMainPrompts);
// }




// // inquirer
// //   .prompt([
// //     {
// //       type: 'input',
// //       name: 'name',
// //       message: colors.brightMagenta('What is your name?'),
// //     },
// //     {
// //       type: 'checkbox',
// //       message: colors.brightMagenta('What languages do you know?'),
// //       name: 'stack',
// //       choices: ['HTML', 'CSS', 'JavaScript', 'MySQL'],
// //     },
// //     {
// //       type: 'list',
// //       message: colors.brightMagenta('What is your preferred method of communication?'),
// //       name: 'contact',
// //       choices: ['email', 'phone', 'telekinesis'],
// //     },
// //   ])
// //   .then((data) => {
// //     const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;

// //     fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
// //       err ? console.log(err) : console.log('Success!')
// //     );
// //   });

// // EXIT THE APPLICATION
// function quit() {
//     console.log('Goodbye, see you next time!');
//     process.exit();
// }

// init();





























































const { prompt } = require('inquirer');
const logo = require('asciiart-logo');
const db = require('./develop/server.js'); // Adjust the path if necessary
const colors = require('colors'); // Assuming you use colors for styling

// Display logo text, load main prompts
function init() {
  const logoText = logo({ name: 'Tracker Up Employee Manager' }).render();
  console.log(logoText);

  loadMainPrompts();
}

function loadMainPrompts() {
  prompt([
    {
      type: 'list',
      name: 'choice',
      message: colors.brightMagenta('What would you like to do?'),
      choices: [
        { name: 'View all employees', value: 'VIEW_EMPLOYEES' },
        { name: 'View all departments', value: 'VIEW_DEPARTMENTS' },
        { name: 'View all employees by departments', value: 'VIEW_EMPLOYEES_BY_DEPARTMENTS' },
        { name: 'View all roles', value: 'VIEW_ROLES' },
        { name: 'Add Department', value: 'ADD_DEPARTMENT' },
        { name: 'Add Role', value: 'ADD_ROLE' },
        { name: 'Add Employee', value: 'ADD_EMPLOYEE' },
        { name: 'Update an employee', value: 'UPDATE_AN_EMPLOYEE' },
        { name: 'Remove Employee', value: 'REMOVE_EMPLOYEE' },
        { name: 'Quit', value: 'QUIT' },
      ]
    }
  ]).then((res) => {
    let choice = res.choice;

    // Call the appropriate function depending on what the user chooses
    switch (choice) {
      case 'VIEW_EMPLOYEES':
        viewEmployees();
        break;
      case 'VIEW_DEPARTMENTS':
        viewDepartments();
        break;
      case 'VIEW_EMPLOYEES_BY_DEPARTMENTS':
        viewEmployeesByDepartments();
        break;
      case 'VIEW_ROLES':
        viewRoles();
        break;
      case 'ADD_DEPARTMENT':
        addDepartment();
        break;
      case 'ADD_ROLE':
        addRole();
        break;
      case 'ADD_EMPLOYEE':
        addEmployee();
        break;
      case 'UPDATE_AN_EMPLOYEE':
        updateAnEmployee();
        break;
      case 'REMOVE_EMPLOYEE':
        removeAnEmployee();
        break;
      case 'QUIT':
        console.log('Exiting the application. Goodbye!');
        // Optionally, you might want to add a process.exit(0); here to exit Node.js process
        break;
      default:
        console.log('Invalid choice');
        break;
    }
  }).catch((err) => {
    console.error('Error:', err);
  });
}

db.findAllEmployees()
  .then((employees) => {
    console.log('All Employees:');
    console.table(employees);
  })
  .catch((err) => {
    console.error('Error fetching employees:', err);
  });

function viewEmployees() {
  db.findAllEmployees()
    .then((rows) => {
      console.log('\nAll Employees:');
      console.table(rows);
      loadMainPrompts(); // Continue after viewing employees
    })
    .catch((err) => {
      console.error('Error:', err);
      loadMainPrompts(); // Continue after error
    });
}


// Implement other functions (addDepartment, addRole, addEmployee, updateAnEmployee, removeAnEmployee) similarly

// Start the application
init();

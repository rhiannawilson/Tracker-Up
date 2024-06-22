const {prompt} = require('inquirer');
const logo = require('asciiart-logo');
const db = require ('./develop/db');

init();

// display logo text, load main prompts
function init() {
    const logoText = logo({name: 'Tracker Up Employee Manager'}).render();

    console.log(logoText);

    loadMainPrompts();
}

function loadMainPrompts () {
    prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'What would you like to do?',
            choices: [
                {
                    name: 'View all employees',
                    value: 'VIEW_EMPLOYEES',
                },
                {
                    name: 'View all departments',
                    value: 'VIEW_DEPARTMENTS',
                },
                {
                    name: 'View all roles',
                    value: 'VIEW_ROLES',
                },
                {
                    name: 'Add Department',
                    value: 'ADD_DEPARTMENT',
                },
                {
                    name: 'Add Role',
                    value: 'ADD_ROLE',
                },
                {
                    name: 'Add Employee',
                    value: 'ADD_EMPLOYEE',
                },
                {
                    name: 'Update an employee',
                    value: 'UPDATE_AN_EMPLOYEE',
                },
                {
                    name: 'Remove Department',
                    value: 'REMOVE_DEPARTMENT',
                },
            ]
        }
    ])
}

// VIEW ALL EMPLOYEES

function viewEmployees() {
    db.findAllEmployees()
    .then(({rows  }) => {
        let employee = rows;
        console.log('/n');
        console.table(employee)
    })
    .then(() => loadMainPrompts)
}

// VIEW ALL EMPLOYEES THAT BELONG TO A DEPARTMENT

function viewEmployeesByDepartment() {
    db.findAllEmployeesByDepartment()
    .then(({ rows }) => {
        let employee = rows;
        console.log('\n');
        console.table(employee);
    })
    .then(loadMainPrompts);
}


// VIEW ALL DEPARTMENT

function viewDepartments() {
    db.findAllDepartments()
    .then(({ rows }) => {
        let department = rows;
        console.log('\n');
        console.table(department);
    })
    .then(loadMainPrompts);
}

// is the above this:  .then(loadMainPrompts); OR
// .then(()=> loadMainPrompts());

// VIEW ALL ROLES

function viewRoles() {
    db.findAllRoles()
    .then(({ rows }) => {
        let department = rows;
        console.log('\n');
        console.table(department);
    })
    .then(loadMainPrompts);
}


// ADD A DEPARTMENT
function addDepartment() {
    prompt((
        {
            name: 'name',
            message: 'What is the name of the department?',
        },
    )).then((res) => {
        let name = res;
    })
}

// ADD An EMPLOYEE
function addEmployee() {
    prompt((
        {
            name: 'name',
            message: 'What is the name of the department?',
        },
    )).then((res) => {
        let name = res;
    })
}
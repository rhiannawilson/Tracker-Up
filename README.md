# Tracker-Up
Employee Tracker System 

# Description
Employee Tracker System is built via a command-line application from scratch, to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.

## Walkthrough Video
This assignment is not deployed and was submitted as requested via video demonstration, see below:
- [Video Demo](https://drive.google.com/file/d/15rvslFZB9807FZFkwcwFUZ_WnMEYsVv5/view?usp=sharing)

## Tracker Up - README.MD
### Table of Contents:
- [Description](#description)
- [Video Demo](#walkthrough-video)
- [Directory Structure](#directory-structure)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Usage & Technical Details](#usage--instructions)
- [Contributions](#contributions)
- [Credits](#credits)
- [License](#license)
- [Author](#author)

## Directory Structure
```  
├── Assets/ 
├── lib/                
    ├── shapes.js       
    ├── shapes.test.js  
├── node_modules           
├── .gitignore          
├── index.js    
├── LICENSE
├── logo.svg  
├── package-lock.json
├── package.json
└── README.md         
```
[Back to Table of Contents](#table-of-contents)

## User Story
```md
AS A business owner
I WANT to be able to view and manage the departments, roles, and employees in my company
SO THAT I can organize and plan my business
```
[Back to Table of Contents](#table-of-contents)

## Acceptance Criteria
```md
GIVEN a command-line application that accepts user input
WHEN I start the application
THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
WHEN I choose to view all departments
THEN I am presented with a formatted table showing department names and department ids
WHEN I choose to view all roles
THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
WHEN I choose to view all employees
THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
WHEN I choose to add a department
THEN I am prompted to enter the name of the department and that department is added to the database
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
WHEN I choose to add an employee
THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role and this information is updated in the database 
```
[Back to Table of Contents](#table-of-contents)

## Appearance & Functionality 
The following images display the web application's appearance and functionality:

### Images
![index.js vscode preview](./Assets/index.js%20preview.png)
![SVG Green Circle Logo](./Assets/challenge%20logo.png)

#### Main Site Page
![Main Website Image](./assets/images/WD-Main%20Site%20Page.png)

#### Weather Forecast Display
![Forecast Display Image](./assets/images/WD-Weather%20Forecast%20Search%20Function%20and%20History%20List.png)

[Back to Table of Contents](#table-of-contents)

## Usage & Instructions
    1. Clone a copy of this repo to your local machine
    2. Install the packages below to practice connecting to your server and databases
    3. Open the integrated terminal in your code editor
    4. Make sure you're in the correct path, copy the 'parent folder' that your .sql files live in
    4. Connect to your POSTGRES SERVER by entering the command 'psql -U postgres' and password you created when initially installed the Postgres 'local' server
    5. Run the command \list to see what databases you have already
    6. Practice executing the statments listed inside the schema.sql file, an automated process, by executing the command \i schema.sql
    7. \list to view the NEWLY created database 'sample_db;'
    \c sample_db; to change to that database \c postgres to change back to postgres  
    \q to quit and exit the postgres or any databas eyou're in 

### Technical Details
    > Node Package Manager
    > Express - Node JS Framework
    > Inquirer@8.2.4 - NPM package
    > PG Package - a non-blocking PostgreSQL client for Node.js
    > Postgres
    > SQL

### .gitignore 
    > .DS_store
    > node_modules
    
[Back to Table of Contents](#table-of-contents)

## Contributions

## Credits
N/A
[Back to Table of Contents](#table-of-contents)

## License
![alt text](https://img.shields.io/badge/License-_MIT-blue.svg)

## Author
@ Rhianna Wilson
[Back to Table of Contents](#table-of-contents)
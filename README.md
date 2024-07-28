# Tracker-Up
Employee Tracker System 

# Description
Employee Tracker System is built via a command-line application from scratch, to manage a company's employee database, using Node.js, Inquirer, and PostgreSQL.

## Walkthrough Video
This assignment is not deployed and was submitted as requested via video demonstration, see below:
- [Video Demo](https://drive.google.com/file/d/192C38E9PJpaPStWaz4n9qio4L7v-vUFC/view?usp=sharing)
- [github repo](https://github.com/rhiannawilson/Tracker-Up?tab=readme-ov-file)

## Tracker Up - README.MD
### Table of Contents:
- [Description](#description)
- [Video Demo](#walkthrough-video)
- [Directory Structure](#directory-structure)
- [User Story](#user-story)
- [Acceptance Criteria](#acceptance-criteria)
- [Appearance & Functionality](#appearance--functionality) 
- [Usage & Technical Details](#usage--instructions)
- [Contributions](#contributions)
- [Credits](#credits)
- [License](#license)
- [Author](#author)

## Directory Structure
```  
├── TRACKER-UP
    ├── assets/
        ├──Example of View All departments.png
        ├──assets/Example of View All Roles.png
        ├──assets/Example View All Employees.png
    ├── develop/                
        ├── db/
            ├── queries.sql
            ├── schema.sql
            ├── seeds.sql              
    ├── node_modules/           
    ├── .gitignore          
    ├── index.js    
    ├── LICENSE
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
#### View All Departments Example
>![View All Departments Example](./assets/Example%20of%20View%20All%20Departments.png)

#### View All Roles Example
>![View All Roles Example](./assets/Example%20of%20View%20All%20Roles.png)

#### View All Employees Example
>![View All Employees Example](./assets/Example%20View%20All%20Employees.png)

[Back to Table of Contents](#table-of-contents)

## Usage & Instructions
    1. Clone a copy of this repo to your local machine
    2. Install the packages below to practice connecting to your server and databases
    3. Open the integrated terminal in your code editor
    4. Make sure you're in the correct path, copy the parent folder that your .sql files live in
    5. Connect to your POSTGRES SERVER by entering the command **psql -U postgres** or **psql -d postgres** and the password you created, when initially installing the Postgres local server
    6. Run the command **\list** to see what databases you have already
    7. Execute the statments listed inside the schema.sql file, using the command **\i schema.sql**
    8. You'll need to seed your data, use the command \i seeds.sql
    9. Command **\list** to view the NEWLY created database 'nameofdatabas_db;'
    10. Command **\c nameofdatabas_db;** to change to your database and **\c postgres** to change back to postgres
    11. To run the application, exit the database use command **\q** to quit and exit postgres.
    12. Navigate to the same file path as index.js and run command **node index.js** to run the application

### Technical Details
- > Node Package Manager - 'npm i node'
- > Inquirer@8.2.4, NPM package - 'npm install Inquirer@8.2.4'
- > PG Package, a non-blocking PostgreSQL client for Node - 'npm install pg'
- > Postgres
- > SQL

### .gitignore 
- > .DS_store 
- > node_modules
    
[Back to Table of Contents](#table-of-contents)
## Contributions
N/A

[Back to Table of Contents](#table-of-contents)

## Credits
N/A

[Back to Table of Contents](#table-of-contents)

## License
![alt text](https://img.shields.io/badge/License-_MIT-blue.svg)

## Author
@ Rhianna Wilson
[Back to Table of Contents](#table-of-contents)

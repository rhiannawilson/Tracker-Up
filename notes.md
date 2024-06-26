_Rhianna's Notes_
_TO DO_

// 1. Set up a REPO in github & create unique name 
// 1a. clone to local machine
// 1b. Open folder in VS Code
// 2c. create folder structure and basic README file structure

// 2. install packages 
// 2a. node
// 2b. npm 
// 2c. npm i inquirer@8.2.4
// 2d. pg package
// 2e. install express application
You’ll need to use the pg package to connect to your PostgreSQL database and perform queries, and the Inquirer package to interact with the user via the command line.

3. Connect to database
3a. to login to sql, psql -U postgres & enter password
3b. \list to see how many databases you have or 'open'
3c. you can technically now input SELECT * FROM database_name.db, however there is aother way
and that's through a .SQL file (aka schema.sql)


4. create tables of data 

OPTIONS given
view all departments //
view all roles //
view all employees //
view employees by departments //
add a department //
add a role//
add an employee//
and update an employee role //


_TABLE SECTION - DONE_
WHEN departments
department names 
department ids
_INSERT SECTION - DONE_


_TABLE SECTION - DONE_
WHEN view all roles
job title
role id
department
and the salary
_INSERT SECTION - DONE_


_TABLE SECTION - DONE_
WHEN I choose to view all employees
employee ids, 
first names, 
last names, 
job titles, 
departments, 
salaries, 
and managers 
_INSERT SECTION - DONE_

_DONE_
WHEN add a department
THEN I am prompted to enter the name of the department and that department is added to the database

_DONE_
WHEN I choose to add a role
THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database

_DONE_
WHEN I choose to add an employee
THEN I am prompted to enter the 
employee’s first name, 
last name, 
role, and manager, 
and that employee is added to the database

_Partially done, needs reviewing at a later stage_
WHEN I choose to update an employee role
THEN I am prompted to select an employee to update and their new role 
this information is updated in the database

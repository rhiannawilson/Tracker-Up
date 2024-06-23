-- this file 'query' contains the creation of a database and a table to hold our data

DROP DATABASE IF EXISTS employeeinventory_db;
--creates employeeInventory database if there isn't one already
CREATE DATABASE employeeinventory_db;
-- \c employeeInventory_db; - change to the database you created 

\c employeeinventory_db;

-- creates the table departments within employeeInventory_db
CREATE TABLE department (
    id SERIAL PRIMARY KEY, 
    department_id INT,
    name VARCHAR (30) UNIQUE NOT NULL
);

-- creates the table employees within employeeInventory_db
CREATE TABLE role (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL, 
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- creates the table employees within employeeInventory_db
CREATE TABLE employee (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    department_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
    ON DELETE SET NULL
);

CREATE TABLE manager (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

-- remember the order 'column name', 'data type', 'constraint'

-- DATA TYPES
-- CREATE TABLE courses ß(
--    id INTEGER NOT NULL,
--    course_title VARCHAR(30) NOT NULL, 
--    course_description TEXT NOT NULL, 
--    active BOOLEAN NOT NULL, 
 --   date_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
--);

-- serial = unique integer that has auto incrementation built into it
-- primary key = a constraint to ensure no duplication of IDs


--    FOREIGN KEY (employee_id)
--    REFERENCES employees(id)
--    ON DELETE SET NULL

-- relational databases
-- employees

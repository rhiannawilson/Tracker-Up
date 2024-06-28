DROP DATABASE IF EXISTS employeeinventory_db;

--creates employeeInventory database if there isn't one already
CREATE DATABASE employeeinventory_db;

-- \c employeeInventory_db; - change to the database you created 
\c employeeinventory_db;

-- creates the table departments within employeeInventory_db
CREATE TABLE department (
    id SERIAL PRIMARY KEY, 
    name VARCHAR (30) NOT NULL
);
CREATE TABLE manager (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
-- creates the table role within employeeInventory_db
CREATE TABLE role (
    id SERIAL PRIMARY KEY, 
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
-- -- creates the table employees within employeeInventory_db
CREATE TABLE employee (
    id SERIAL PRIMARY KEY, 
    first_name VARCHAR (50) NOT NULL,
    last_name VARCHAR (50) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    department_id INTEGER, 
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE SET NULL,
    FOREIGN KEY (department_id) REFERENCES department(id)
);
-- creates the table employees and their roles 
CREATE TABLE employeeRole (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    role_id INTEGER,
    manager_id INTEGER,
    employee_id INTEGER,
    department_id INTEGER,
    FOREIGN KEY (employee_id) REFERENCES employee(id)
 );
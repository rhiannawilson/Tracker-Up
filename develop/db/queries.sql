-- View all roles with their corresponding departments
SELECT 
    role.id AS role_id,
    role.title AS role_title,
    department.id AS department_id,
    department.name AS department_name
FROM 
    role
JOIN 
    department ON role.department_id = department.id;

-- View all employees with their roles and departments
SELECT 
    e.id AS employee_id,
    CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
    r.id AS role_id,
    r.title AS role_title,
    d.id AS department_id,
    d.name AS department_name
FROM 
    employee e
JOIN 
    role r ON e.role_id = r.id
JOIN 
    department d ON r.department_id = d.id;

-- View all employees with detailed information including manager's name
SELECT 
    e.id AS employee_id,
    e.first_name,
    e.last_name,
    r.title AS role,
    d.name AS department,
    r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM 
    employee e
LEFT JOIN 
    employee m ON m.id = e.manager_id
JOIN 
    role r ON r.id = e.role_id
JOIN 
    department d ON d.id = r.department_id
ORDER BY 
    e.id;

-- Remove an employee by ID
DELETE FROM employee
WHERE id = 4;

-- Update an employee by ID
-- Parameters: employeeId (integer), firstName (varchar), lastName (varchar), roleId (integer), managerId (integer)
UPDATE employee
SET first_name = Rhianna, last_name = Wilson, role_id = 7, manager_id = 3
WHERE id = 1;

-- SQL statement to find an employee by ID
SELECT * FROM employee WHERE id = 5;

-- View all manager_ids from employee table
SELECT DISTINCT manager_id
FROM employee;

-- View all role_ids from employee table
SELECT DISTINCT role_id
FROM employee;

-- View all role ids from role table
SELECT id AS role_id
FROM role;

-- List all managers
SELECT * FROM manager;

-- PostgreSQL example function to list managers
CREATE OR REPLACE FUNCTION listManagers()
RETURNS TABLE(manager_id INT, name VARCHAR(100), department_id INT) AS $$
BEGIN
    RETURN QUERY
    SELECT manager_id, name, department_id FROM manager;
END;
$$ LANGUAGE plpgsql;

-- Example of calling listManagers function
SELECT * FROM listManagers();

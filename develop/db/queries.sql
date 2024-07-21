--     -- Retrieve data from tables
-- SELECT * FROM department;
-- SELECT * FROM manager;
-- SELECT * FROM role;
-- SELECT * FROM employee;
-- SELECT * FROM employeeRole;

-- Join role and department tables to show role details with department information
-- SELECT 
--     role.id AS role_id,
--     role.title AS role_title,
--     department.id AS department_id,
--     department.name AS department_name
-- FROM 
--     role
-- JOIN 
--     department ON role.department_id = department.id;

-- -- View all employees with their roles and departments
-- SELECT 
--     e.id AS employee_id,
--     CONCAT(e.first_name, ' ', e.last_name) AS employee_name,
--     r.id AS role_id,
--     r.title AS role_title,
--     d.id AS department_id,
--     d.name AS department_name
-- FROM 
--     employee e
-- JOIN 
--     role r ON e.role_id = r.id
-- JOIN 
--     department d ON r.department_id = d.id;

-- -- View all employees with detailed information including manager's name
-- SELECT 
--     e.id AS employee_id,
--     e.first_name,
--     e.last_name,
--     r.title AS role,
--     d.name AS department,
--     r.salary,
--     CONCAT(m.first_name, ' ', m.last_name) AS manager
-- FROM 
--     employee e
-- LEFT JOIN 
--     employee m ON m.id = e.manager_id
-- JOIN 
--     role r ON r.id = e.role_id
-- JOIN 
--     department d ON d.id = r.department_id
-- ORDER BY 
--     e.id;

-- -- Remove an employee by ID
-- DELETE FROM employee
-- WHERE id = 4;

-- -- Update an employee by ID
-- UPDATE employee
-- SET first_name = 'Rhianna', last_name = 'Wilson', manager_id = 1, role_id = 3
-- WHERE id = 0;

-- -- View all manager_ids from employee table
-- SELECT DISTINCT manager_id
-- FROM employee;

-- -- View all role_ids from employee table
-- SELECT DISTINCT role_id
-- FROM employee;

-- -- View all role ids from role table
-- SELECT id AS role_id
-- FROM role;


-- -- Example of calling findAllManagers function
-- SELECT * FROM findAllManagers();

-- -- Calculate total sum of salaries
-- SELECT SUM(salary) AS total_salary
-- FROM role;

-- -- Update functions
-- UPDATE employee
-- SET AS title = 'Full Stack Engineer', manager_name = 'Ryan Able';

UPDATE employee 
SET role_id = 1, manager_id = (SELECT id FROM employee WHERE first_name = 'Rhianna' AND last_name = 'Wilson')
WHERE id = 1;


SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';


-- UPDATE role
-- SET title = 'Customer Services Agent'
-- WHERE id = 3;


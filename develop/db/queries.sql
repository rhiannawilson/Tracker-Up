SELECT * 
FROM role 
JOIN department ON role.department_id = department.id;

-- view all employees
SELECT e.id AS employee_id, e.name AS employee_name, r.id AS role_id, r.title AS role_title, d.id AS department_id, d.name AS department_name
FROM employee e
JOIN role r ON e.role_id = r.id
JOIN department d ON r.department_id = d.id;



  SELECT employee.id, employee.first_name, employee.last_name, role.title AS role,
           department.name AS department, role.salary,
           CONCAT(manager.first_name, ' ', manager.last_name) AS manager
    FROM employee
    LEFT JOIN employee manager on manager.id = employee.manager_id
    INNER JOIN role ON (role.id = employee.role_id)
    INNER JOIN department ON (department.id = role.department_id)
    ORDER BY employee.id;
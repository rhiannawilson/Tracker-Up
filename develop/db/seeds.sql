-- this file contains the creation of multiple rows for my table, initially created in my query schema.sql
 -- inserts data into my departments table 
INSERT INTO department (name)
    VALUES  ('Web Development'),
            ('Finance'),
            ('Customer Services'),
            ('Marketing'),
            ('Operations'),
            ('Administration');

-- -- inserts data into my roles table 
INSERT INTO role (title, salary, department_id) VALUES  
            ('Customer Services Agent', '80000', 3),
            ('Accountant', '110000', 2),
            ('Full Stack Engineer', '180000', 1),
            ('Marketing Coordinator', '100000', 4),
            ('Receptionist', '75000', 6),
            ('Marketing Manager', '150000', 4),
            ('Front-End Engineer', '180000', 1),
            ('Admin Assistant', '70000', 5),
            ('Runner', '60000', 6);
            


-- inserts data into my employees table 
INSERT INTO employee (first_name, last_name)
  VALUES    ('Rhianna', 'Wilson'),
            ('Jessica', 'Walker'),
            ('Peter', 'Matthews');

-- Web development 'John Jones'),
   --         ('Jessica', 'Walker', 'Accountant', 'Finance', '110000', 'Max Gerald'),
     --       ('Peter', 'Matthews', 'Customer Service Rep', 'Customer Service', '80000', 'Sarah James');



-- -- WHEN add a department
-- -- WHEN I choose to add a role
-- -- WHEN I choose to add an employee
-- -- WHEN I choose to update an employee role 


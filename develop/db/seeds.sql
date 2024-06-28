
-- this file contains the creation of multiple rows for my table, initially created in my query schema.sql
 -- inserts data into my departments table 
INSERT INTO department (name, id)
VALUES  ('Web Development', 1), 
        ('Finance', 2), 
        ('Customer Services', 3), 
        ('Marketing', 4), 
        ('Operations', 5), 
        ('Administration', 6);

INSERT INTO manager (id, name, department_id)
VALUES ('87', 'Ryan Able', 1),  -- Web Development
       ('88', 'Rebecca Southerland', 2),  -- Finance
       ('89', 'Joy Kelly', 3),  -- Customer Services
       ('90', 'Daniel Vicks', 4),  -- Marketing
       ('91', 'Shaun Schole', 5),  -- Operations
       ('92', 'Nicholas Black', 6);  -- Administration



-- -- inserts data into my roles table 
INSERT INTO role (title, salary, department_id)
VALUES ('Customer Services Agent', 80000, 3),  -- Customer Services
       ('Accountant', 110000, 2),  -- Finance
       ('Full Stack Engineer', 180000, 1),  -- Web Development
       ('Marketing Coordinator', 100000, 4),  -- Marketing
       ('Receptionist', 75000, 6),  -- Administration
       ('Marketing Manager', 150000, 4),  -- Marketing
       ('Front-End Engineer', 180000, 5),  -- Operations
       ('Admin Assistant', 70000, 6),  -- Administration
       ('Runner', 60000, 6);  -- Administration
            

-- inserts data into my employees table 
INSERT INTO employee (first_name, last_name)
    VALUES  ('Rhianna', 'Wilson'),
            ('Jessica', 'Walker'),
            ('Peter', 'Matthews'),
            ('Jack', 'Williams'),
            ('George', 'Peters'),
            ('Jane', 'Doe'),
            ('Sarah', 'Southland'),
            ('Matt', 'Jeffery'),
            ('Manuela', 'Tiang'), 
            ('Dan', 'Ryi'),
            ('Kate', 'Maoun'),
            ('Jeffery', 'Smithers'),
            ('Emily', 'Keenes');

INSERT INTO employeeRole (first_name, last_name, manager_id, role_id)
VALUES ('Rhianna', 'Wilson', 1, 3),  -- Ryan Able, Full Stack Engineer
       ('Jessica', 'Walker', 2, 2),  -- Rebecca Southerland, Accountant
       ('Peter', 'Matthews', 3, 1),  -- Joy Kelly, Customer Services Agent
       ('Jack', 'Williams', 5, 7),  -- Shaun Schole, Front-End Engineer
       ('George', 'Peters', 6, 9),  -- Nicholas Black, Runner
       ('Jane', 'Doe', 2, 2),  -- Rebecca Southerland, Accountant
       ('Sarah', 'Southland', 5, 7),  -- Shaun Schole, Front-End Engineer
       ('Matt', 'Jeffery', 3, 1),  -- Joy Kelly, Customer Services Agent
       ('Manuela', 'Tiang', 4, 4),  -- Daniel Vicks, Marketing Coordinator
       ('Dan', 'Ryi', 3, 1),  -- Joy Kelly, Customer Services Agent
       ('Kate', 'Maoun', 2, 2),  -- Rebecca Southerland, Accountant
       ('Jeffery', 'Smithers', 1, 3),  -- Ryan Able, Full Stack Engineer
       ('Emily', 'Keenes', 1, 3);  -- Ryan Able, Full Stack Engineer
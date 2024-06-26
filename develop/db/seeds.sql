
-- this file contains the creation of multiple rows for my table, initially created in my query schema.sql
 -- inserts data into my departments table 
INSERT INTO department (name, department_id)
    VALUES  ('Web Development', 007),
            ('Finance', 009),
            ('Customer Services', 008),
            ('Marketing', 006),
            ('Operations', 011),
            ('Administration', 016);

INSERT INTO manager (name, department_id)
  VALUES  ('Ryan Able', 007), -- Web Development
          ('Rebecca Southerland', 009), -- Finance
          ('Joy Kelly', 008), -- Customer Services\
          ('Daniel Vicks', 006), -- Marketing
          ('Shaun Schole', 011), -- Operations
          ('Nicholas Black', 016); -- Administration


-- -- inserts data into my roles table 
INSERT INTO role (title, salary, department_id) 
  VALUES  ('Customer Services Agent', '80000', 008),
          ('Accountant', '110000', 009),
          ('Full Stack Engineer', '180000', 007),
          ('Marketing Coordinator', '100000', 006),
          ('Receptionist', '75000', 016),
          ('Marketing Manager', '150000', 006),
          ('Front-End Engineer', '180000', 015),
          ('Admin Assistant', '70000', 011),
          ('Runner', '60000', 016);
            

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

INSERT INTO employeeRole (first_name, last_name, role.id, manager.id, department_id)
    VALUES  ('Rhianna', 'Wilson', 011),
            ('Jessica', 'Walker', 009),
            ('Peter', 'Matthews', 009),
            ('Jack', 'Williams', 011),
            ('George', 'Peters', 016),
            ('Jane', 'Doe', 016), 
            ('Sarah', 'Southland', 011),
            ('Matt', 'Jeffery', 008),
            ('Manuela', 'Tiang', 008),
            ('Dan', 'Ryi', 008),
            ('Kate', 'Maoun', 008),
            ('Jeffery', 'Smithers', 007),
            ('Emily', 'Keenes', 007);

-- this file contains the creation of multiple rows for my table, initially created in my query schema.sql
 -- inserts data into my departments table 
INSERT INTO department (name)
    VALUES  ('Web Development'),
            ('Finance'),
            ('Customer Services'),
            ('Marketing'),
            ('Operations'),
            ('Administration');

INSERT INTO manager (name, department_id)
  VALUES  ('Ryan Able', 1), -- Web Development
          ('Rebecca Southerland', 2), -- Finance
          ('Joy Kelly', 3), -- Customer Services
          ('Daniel Vicks', 4), -- Marketing
          ('Shaun Schole', 5), -- Operations
          ('Nicholas Black', 6); -- Administration


-- -- inserts data into my roles table 
INSERT INTO role (title, salary, department_id) 
  VALUES  ('Customer Services Agent', '80000', 3),
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
    VALUES  ('Rhianna', 'Wilson'),
            ('Jessica', 'Walker'),
            ('Peter', 'Matthews'),
            ('Jack', 'Williams'),
            ('George', 'Peters'),
            ('Jane', 'Doe'),
            ('Sarah', 'Southland'),
            ('Matt', 'Jeffery'),
            ('Manuela', 'Tiang');

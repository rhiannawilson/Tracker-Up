-- this is my query file which will execute an 'update statement' in my table
-- UPDATE employees
-- SET name = 'kiwi'
-- WHERE id = 1;

UPDATE employee SET role_id = 1, manager_id = 3 WHERE id = 2; 
UPDATE employee SET role_id = 2, manager_id = 1 WHERE id = 1; 
UPDATE employee SET role_id = 3, manager_id = 2 WHERE id = 3; 
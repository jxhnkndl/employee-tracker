-- Use Employees database
USE employees_db;

-- Insert Departments
INSERT INTO departments (name)
VALUES
  ('Engineering'),
  ('Legal'),
  ('Finance'),
  ('Sales'),
  ('Marketing');

-- Insert Roles
INSERT INTO roles (title, salary, department_id)
VALUES
  ('Chief Technology Officer', 350000, 1),  -- 1
  ('Senior Engineer', 100000, 1),           -- 2
  ('Junior Engineer', 60000, 1),            -- 3
  ('Data Analyst', 100000, 1),              -- 4
  ('Legal Team Lead', 250000, 2),           -- 5
  ('Associate Counsel', 200000, 2),         -- 6
  ('Chief Financial Officer', 350000, 3),   -- 7
  ('Accountant', 120000, 3),                -- 8
  ('Account Manager', 80000, 3),            -- 9
  ('Sales Team Lead', 100000, 4),           -- 10
  ('Salesperson', 75000, 4),                -- 11
  ('Marketing Team Lead', 150000, 5),       -- 12
  ('Community Manager', 50000, 5),          -- 13
  ('Brand Ambassador', 30000, 5);           -- 14

-- Insert Employees
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
  ('J.K.', 'Royston', 1, null),       -- Chief Technology
  ('Ford', 'Wesson', 12, null),       -- Marketing Lead
  ('Topher', 'Talley', 5, null),      -- Legal Team Lead
  ('Jimmy', 'Royston', 7, null),      -- Chief Financial
  ('Nicole', 'Smith', 10, null),      -- Sales Team Lead
  ('Dan', 'Mineart', 2, 1),           -- Senior Engineer
  ('Chris', 'McPeters', 3, 1),        -- Junior Engineer
  ('Weslie', 'Thomas', 3, 1),         -- Junior Engineer
  ('Audrey', 'Wray', 13, 2),          -- Community Manager
  ('Devon', 'Kraus', 14, 2),          -- Brand Ambassador
  ('Riley', 'Hamilton', 11, 5),       -- Salesperson
  ('Caitlin', 'Lane', 6, 3),          -- Associate Counsel
  ('Ryan', 'Tinsley', 8, 4),          -- Accountant
  ('Taylor', 'Hughes', 11, 5),        -- Salesperson
  ('Josh', 'Reich', 4, 4);            -- Data Analyst
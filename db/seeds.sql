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
  ('Elliot', 'Alderson', 1, null),          -- Chief Technology
  ('Darlene', 'Alderson', 12, null),        -- Marketing Lead
  ('Walter', 'Bishop', 5, null),            -- Legal Team Lead
  ('Peter', 'Bishop', 7, null),             -- Chief Financial
  ('Olivia', 'Dunham', 10, null),           -- Sales Team Lead
  ('Spencer', 'Reid', 2, 1),                -- Senior Engineer
  ('Eric', 'Taylor', 3, 1),                 -- Junior Engineer
  ('Sara', 'Manning', 3, 1),                -- Junior Engineer
  ('Winston', 'Bishop', 13, 2),             -- Community Manager
  ('Nick', 'Miller', 14, 2),                -- Brand Ambassador
  ('Jessica', 'Day', 11, 5),                -- Salesperson
  ('John', 'Reese', 6, 3),                  -- Associate Counsel
  ('Phillip', 'Price', 8, 4),               -- Accountant
  ('Jed', 'Bartlett', 11, 5),               -- Salesperson
  ('Leslie', 'Knope', 4, 4);                -- Data Analyst
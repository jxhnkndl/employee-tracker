// SQL queries object
module.exports = {
  // Query: View employees
  viewEmployees: `
    SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.name, roles.salary, 
    CASE
        WHEN employees.manager_id = 1 THEN 'J.K. Royston'
        WHEN employees.manager_id = 2 THEN 'Ford Wesson'
        WHEN employees.manager_id = 3 THEN 'Topher Talley'
        WHEN employees.manager_id = 4 THEN 'Jimmy Royston'
        WHEN employees.manager_id = 5 THEN 'Nicole Smith'
        ELSE null
    END AS 'Manager'
    FROM employees
    INNER JOIN roles
    ON employees.role_id = roles.id
    INNER JOIN departments
    ON roles.department_id = departments.id
  `,

  // Query: View roles
  viewRoles: `
    SELECT roles.id, roles.title, roles.salary, departments.name
    FROM roles
    INNER JOIN departments
    ON roles.department_id = departments.id
    ORDER BY departments.name ASC, roles.title ASC
  `,

  // Query: View departments
  viewDepts: `
    SELECT *,
    CASE
        WHEN departments.id = 1 THEN 'J.K. Royston'
        WHEN departments.id = 2 THEN 'Ford Wesson'
        WHEN departments.id = 3 THEN 'Topher Talley'
        WHEN departments.id = 4 THEN 'Jimmy Royston'
        WHEN departments.id = 5 THEN 'Nicole Smith'
        ELSE null
    END AS 'Department Chief'
    FROM departments
    ORDER BY departments.name ASC;
    `,

  // Query: Add employee
  addEmployee: `INSERT INTO employees SET ?`,

  // Query: Add role
  addRole: `INSERT INTO roles SET ?`,

  // Query: Add department
  addDept: `INSERT INTO departments SET ?`,

  // Query: Update employee role or manager
  updateEmployee: `UPDATE employees SET ? WHERE ?`,

  // Query: Delete employee
  deleteEmployee: `DELETE FROM employees WHERE ?`,

  // Query: Delete role
  deleteRole: `DELETE FROM roles WHERE ?`,

  // Query: Delete department
  deleteDept: `DELETE FROM departments WHERE ?`,
}
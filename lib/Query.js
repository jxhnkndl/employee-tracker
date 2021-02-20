// Import third-party modules
const mysql = require('mysql');
const table = require('console.table');

// Configure MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employees_db',
});

// Establish connection with database
connection.connect((err) => {
  console.log(`Connection at id ${connection.threadId}`);
});

// Init Query class
class Query {
  constructor() {

    // Query: View employees
    this.viewEmployees = `
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
      ORDER BY employees.first_name ASC;
    `;

    // Query: View roles
    this.viewRoles = `
      SELECT roles.id, roles.title, roles.salary, departments.name
      FROM roles
      INNER JOIN departments
      ON roles.department_id = departments.id
      ORDER BY departments.name ASC, roles.title ASC
    `;

    // Query: View departments
    this.viewDepts = `
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
    `;

    // Query: Add employee
    this.addEmployee = `INSERT INTO employees SET ?`;

    // Query: Add role
    this.addRole = `INSERT INTO roles SET ?`;

    // Query: Add department
    this.addDept = `INSERT INTO departments SET ?`;

    // Query: Update employee role or manager
    this.updateEmployee = `UPDATE employees SET ? WHERE ?`;

    // Query: Delete employee
    this.deleteEmployee = `DELETE FROM employees WHERE ?`;

    // Query: Delete role
    this.deleteRole = `DELETE FROM roles WHERE ?`;

    // Query: Delete department
    this.deleteDept = `DELETE FROM departments WHERE ?`;

  }

  // View data from database
  getData(queryString, msg) {
    const query = connection.query(queryString, (err, res) => {
      if (err) throw err;
      console.log(msg);
      console.table(res);
    });
  }

  // Add data to database
  addData(queryString, data, msg) {
    const query = connection.query(queryString, data, (err, res) => {
      if (err) throw err;
      console.log(msg);
    });
  }

  // Update data in database
  updateData(queryString, data, msg) {
    const query = connection.query(queryString, data, (err, res) => {
      if (err) throw err;
      console.log(msg);
    });
  }

  // Delete data from database
  deleteData(queryString, data, msg) {
    const query = connection.query(queryString, data, (err, res) => {
      if (err) throw err;
      console.log(msg);
    });
  }
}

// Export class
module.exports = Query;
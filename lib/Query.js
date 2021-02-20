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

    this.viewRoles = `
      SELECT roles.id, roles.title, roles.salary, departments.name
      FROM roles
      INNER JOIN departments
      ON roles.department_id = departments.id
      ORDER BY departments.name ASC, roles.title ASC
    `;

    this.viewDepartments = `
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
  }

  // View data from database
  getData(queryString, msg) {
    const query = connection.query(queryString, (err, res) => {
      if (err) throw err;
      console.log(msg);
      console.table(res);
    });
  }
}

// Export class
module.exports = Query;
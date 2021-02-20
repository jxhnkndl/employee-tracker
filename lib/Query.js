// Import third-party modules
const mysql = require('mysql');
const table = require('console.table');

// Configure MySQL
const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'employees_db'
});

// Establish connection with database
connection.connect((err) => {
  console.log(`Connection at id ${connection.threadId}`);
});

// Init Query class
class Query {

  // View all departments
  viewDepartments() {
    const query = connection.query(
      'SELECT departments.id, departments.name, CASE WHEN ',
      (err, res) => {
        if (err) throw err;
        // Insert confirmation
        console.table(res);
      }
    );
  }
}

// Export class
module.exports = Query;
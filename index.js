// Import modules
const mysql = require('mysql');
const table = require('console.table');
const inquirer = require('inquirer');

// Import object organizing SQL queries
const query = require('./helpers/query');

// Import object organizing Inquirer prompt arrays
const questions = require('./helpers/questions');

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

// Init
ask();

// Primary logic routing function
function ask() {
  inquirer.prompt(questions.ask).then((answer) => {
    const { input } = answer;

    switch (input) {
      case 'View All Employees':
        viewData(query.viewEmployees);
        break;
      case 'Add New Employee':
        addEmployee();
        break;
      case 'Update Employee Role':
        break;
      case 'View All Roles':
        viewData(query.viewRoles);
        break;
      case 'Add New Role':
        addRole();
        break;
      case 'View All Departments':
        viewData(query.viewDepts);
        break;
      case 'Add New Department':
        addDepartment();
        break;
      case 'Exit':
        exit();
        break;
      default:
        console.log('Something went wrong. Please ask again.');
        ask();
    }
  });
}

// Add employee to database
function addEmployee() {
  inquirer.prompt(questions.addEmployee).then((answers) => {
    addData(query.addEmployee, query.viewEmployees, answers, 'employee');
  });
}

// Add role to database
function addRole() {
  inquirer.prompt(questions.addRole).then((answers) => {

    addData(query.addRole, query.viewRoles, answers, 'role');
  });
}

// Add department to database
function addDepartment() {
  inquirer.prompt(questions.addDept).then((answers) => {
    addData(query.addDept, query.viewDepts, answers, 'department');
  });
}

// Update employee record
function updateEmployee() {
  
}





// Query function: View data
function viewData(queryString) {
  console.log('Requesting data from database... \n');

  const results = connection.query(queryString, (err, res) => {
    if (err) throw err;

    console.log('Data downloaded. View below: \n');
    console.table(res);

    ask();
  });
}

// Query function: Add data to database
function addData(queryString, reQueryString, data, keyword) {
  console.log(`Adding new ${keyword} to database... \n`);

  const query = connection.query(queryString, data, (err) => {
    if (err) throw err;

    console.log(`New ${keyword} successfully added to database. \n`);

    viewData(reQueryString);
  });
}



// Exit application
function exit() {
  console.log('Goodbye!');
  connection.end();
}

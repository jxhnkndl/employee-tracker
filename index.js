// Import modules
const mysql = require('mysql');
const table = require('console.table');
const inquirer = require('inquirer');

// Import object organizing SQL queries
const query = require('./helpers/query');

// Local data arrays (for adding dynamically inserted data into inquirer prompts)
const departments = [];
const employees = [];
const managers = [];
const roles = [];

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
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'input',
        choices: [
          'View All Employees',
          'Add New Employee',
          'Update Employee Role',
          'View All Roles',
          'Add New Role',
          'View All Departments',
          'Add New Department',
          'Exit',
        ],
        message: 'What would you like to do?',
      },
    ])
    .then((answer) => {
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

  // Update local roles and managers array used in the prompts below
  updateRoleData(query.updateRoleData);
  updateManagerData(query.updateManagerData);

  // Collect new employee information from user
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "Employee's First Name:",
      },
      {
        type: 'input',
        name: 'last_name',
        message: "Employee's Last Name:",
      },
      {
        type: 'list',
        name: 'role_id',
        choices: roles,
        message: "Employee's Role:",
      },
      {
        type: 'list',
        name: 'manager_id',
        choices: managers,
        message: "Employee's Manager:",
      },
    ])
    .then((answers) => {

      console.log(answers);

    });
}

// Query function: View data from database
async function viewData(queryString) {
  console.log('Requesting data from database... \n');

  const results = await getData(queryString);
  console.log('Data retrieved. View Below: \n');
  console.table(results);

  ask();
}

// Update local roles array used as choices array in inquirer prompts
async function updateRoleData(queryString) {
  const results = await getData(queryString);

  results.forEach((row) => {
    const { id, title } = row;
    roles.push({ value: id, name: title });
  });
}

// Update local managers array used as choices array in inquirer prompts
async function updateManagerData(queryString) {
  const results = await getData(queryString);

  results.forEach((row) => {
    const { id, first_name, last_name } = row;
    managers.push({ value: id, name: `${first_name} ${last_name}` });
  });
}

// Helper: Promisify the retrieval of data from the database
function getData(queryString) {
  return new Promise((resolve, reject) => {
    connection.query(queryString, 
    (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

// Exit application
function exit() {
  console.log('Goodbye!');
  connection.end();
}

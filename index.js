// Import modules
const mysql = require('mysql');
const table = require('console.table');
const inquirer = require('inquirer');
const query = require('./helpers/query');

// Employee roles array
const roles = [
  { value: 1, name: 'Chief Technology Officer' },
  { value: 2, name: 'Senior Engineer' },
  { value: 3, name: 'Junior Engineer' },
  { value: 4, name: 'Data Analyst' },
  { value: 5, name: 'Legal Team Lead' },
  { value: 6, name: 'Associate Counsel' },
  { value: 7, name: 'Chief Financial Officer' },
  { value: 8, name: 'Accountant' },
  { value: 9, name: 'Account Manager' },
  { value: 10, name: 'Sales Team Lead' },
  { value: 11, name: 'Sales Associate' },
  { value: 12, name: 'Marketing Team Lead' },
  { value: 13, name: 'Community Manager' },
  { value: 14, name: 'Brand Ambassador' },
];

// Employee managers array
const managers = [
  { value: 1, name: 'J.K. Royston' },
  { value: 2, name: 'Ford Wesson' },
  { value: 3, name: 'Topher Talley' },
  { value: 4, name: 'Jimmy Royston' },
  { value: 5, name: 'Nicole Smith' },
  { value: null, name: 'No Manager' },
];

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
          break;
        case 'View All Departments':
          viewData(query.viewDepts);
          break;
        case 'Add New Department':
          break;
        case 'Exit':
          break;
        default:
          console.log('Something went wrong. Please ask again.');
          ask();
      }
    });
}

// Gather user input to add new employee to database
function addEmployee() {
  inquirer.prompt([
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
  ]).then(answers => {

    

  });
}

// View data
function viewData(queryString) {
  console.log('Requesting data from database... \n');
  const results = connection.query(queryString, (err, res) => {
    if (err) throw err;
    console.log('Data downloaded. View below: \n');
    console.table(res);
    ask();
  });
}
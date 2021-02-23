// Import modules
const mysql = require('mysql');
const table = require('console.table');
const inquirer = require('inquirer');

// Import object organizing SQL queries
const query = require('./helpers/query');

// Local data arrays (for adding dynamically inserted data into inquirer prompts)
const departments = [];
const employees = [];
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
          viewRecords(query.viewEmployees);
          break;
        case 'Add New Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          break;
        case 'View All Roles':
          viewRecords(query.viewRoles);
          break;
        case 'Add New Role':
          addRole();
          break;
        case 'View All Departments':
          viewRecords(query.viewDepts);
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
  refreshRoles(query.refreshRoles);
  refreshEmployees(query.refreshEmployees);

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
        choices: employees,
        message: "Employee's Manager:",
      },
    ])
    .then((answers) => {
      console.log(`Adding ${answers.first_name} ${answers.last_name} to database...\n`);
      
      addRecords(query.addEmployee, query.viewEmployees, answers);
    });
}

// Add role to database
function addRole() {

  // Update local roles and managers array used in the prompts below
  refreshRoles(query.refreshRoles);
  refreshDepts(query.refreshDepts);

  // Collect new role information from user
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: "Role's Title:"
    },
    {
      type: 'input',
      name: 'salary',
      message: "Role's Salary:"
    },
    {
      type: 'list',
      name: 'department_id',
      choices: departments,
      message: "Add to Department:"
    }
  ]).then((answers) => {
    console.log(`Adding new ${answers.title} role to database...\n`);

    addRecords(query.addRole, query.viewRoles, answers);
  });
}

// View data from database
async function viewRecords(queryString) {
  console.log('Requesting data from database... \n');

  const results = await getData(queryString);
  console.log('Data retrieved. View Below: \n');
  console.table(results);

  ask();
}

// Add data to database
async function addRecords(queryString, reQueryString, data) {
  const results = await addData(queryString, data);

  console.log(`Operation complete - ${results.affectedRows} rows affected.\n`);
  console.log(`New record created with id ${results.insertId}.\n`);

  viewRecords(reQueryString);
}


// Refresh employees array to use as list options in Inquirer prompt
async function refreshEmployees(queryString) {
  const results = await getData(queryString);

  results.forEach((row) => {
    const { id, first_name, last_name } = row;
    employees.push({ value: id, name: `${first_name} ${last_name}` });
  });

  employees.push({ value: null, name: 'No Manager' });
}


// Refresh roles array to use as list options in Inquirer prompt
async function refreshRoles(queryString) {
  const results = await getData(queryString);

  results.forEach((row) => {
    const { id, title } = row;
    roles.push({ value: id, name: title });
  });
}

// Refresh departments array to use as list options in Inquirer prompt
async function refreshDepts(queryString) {
  const results = await getData(queryString);

  results.forEach((row) => {
    const { id, name } = row;
    departments.push({ value: id, name: name });
  });

  departments.push({ id: null, name: 'No Department' });
}



// Promisify getting data from database
function getData(queryString) {
  return new Promise((resolve, reject) => {
    connection.query(queryString, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

// Promisify adding data to database
async function addData(queryString, data) {
  return new Promise((resolve, reject) => {
    connection.query(queryString, data, (err, res) => {
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

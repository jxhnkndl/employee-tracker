// // // // // // // //
// APPLICATION SETUP //
// // // // // // // //

// Import modules
const mysql = require('mysql');
const table = require('console.table');
const inquirer = require('inquirer');

// Import object organizing SQL queries
const query = require('./lib/query');

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
  // Note that password has temporarily been set to 'password' for 
  // submitted assignments with public repositories
  password: 'password',
  database: 'employees_db',
});

// // // // // // //
// INITIALIZATION //
// // // // // // //

// Init
init();

// Group initailization functions
function init() {
  // Establish connection with database
  connection.connect((err) => {
    console.log(`Connection at id ${connection.threadId}`);
  });

  // Populate local list choice arrays
  refresh();

  // Start user prompts
  ask();
}

// // // // // // // // // // //
//  MODULAR INQUIRER PROMPTS  //
//  &&                        //
//  PRIMARY APPLICATION LOGIC //
// // // // // // // // // // //

// Primary logic routing function
function ask() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'input',
        choices: [
          'View All Employees',
          'View Employees by Manager',
          'Add New Employee',
          "Update Employee's Role",
          "Update Employee's Manager",
          'Delete Employee',
          'View All Roles',
          'Add New Role',
          'Delete Role',
          'View All Departments',
          'Add New Department',
          'Delete Department',
          'Exit',
        ],
        message: 'What would you like to do?',
      },
    ])
    .then((answer) => {
      const { input } = answer;

      switch (input) {
        case 'View All Employees':
          console.clear();
          viewRecords(query.viewEmployees);
          break;
        case 'View Employees by Manager':
          viewByManager();
          break;
        case 'Add New Employee':
          addEmployee();
          break;
        case "Update Employee's Role":
          updateRole();
          break;
        case "Update Employee's Manager":
          updateManager();
          break;
        case 'Delete Employee':
          deleteEmployee();
          break;
        case 'View All Roles':
          console.clear();
          viewRecords(query.viewRoles);
          break;
        case 'Add New Role':
          addRole();
          break;
        case 'Delete Role':
          deleteRole();
          break;
        case 'View All Departments':
          console.clear();
          viewRecords(query.viewDepts);
          break;
        case 'Add New Department':
          addDept();
          break;
        case 'Delete Department':
          deleteDept();
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
      console.clear();
      console.log(
        `Adding ${answers.first_name} ${answers.last_name} to database...\n`
      );

      updateRecords(query.addEmployee, query.viewEmployees, answers);
    });
}

// View employee by manager
function viewByManager() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'manager_id',
        choices: managers,
        message: 'Select Manager:',
      },
    ])
    .then((answers) => {
      console.clear();
      console.log(`Accessing direct report records...`);

      if (!answers.manager_id) {
        console.log(`Invalid selection. Please try again.`);
        ask();
        return;
      }

      viewSpecificRecords(query.viewByManager, answers.manager_id);
    });
}

// Add role to database
function addRole() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'title',
        message: "Role's Title:",
      },
      {
        type: 'input',
        name: 'salary',
        message: "Role's Salary:",
      },
      {
        type: 'list',
        name: 'department_id',
        choices: departments,
        message: 'Add to Department:',
      },
    ])
    .then((answers) => {
      console.clear();
      console.log(`Adding new ${answers.title} role to database...\n`);

      updateRecords(query.addRole, query.viewRoles, answers);
    });
}

// Add department to database
function addDept() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Department's Name:",
      },
    ])
    .then((answers) => {
      console.clear();
      console.log(`Adding ${answers.name} department to database...\n`);

      updateRecords(query.addDept, query.viewDepts, answers);
    });
}

// Update employee's role
function updateRole() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'id',
        choices: employees,
        message: "Which employee's records do you want to update?",
      },
      {
        type: 'list',
        name: 'role_id',
        choices: roles,
        message: "What is the employee's new role?",
      },
    ])
    .then((answers) => {
      if (!answers.id) {
        console.log(`Invalid selection. Please try again.\n`);
        ask();
      }

      const { id, role_id } = answers;

      console.clear();
      console.log(`Updating employee records...\n`);

      updateRecords(query.updateEmployee, query.viewEmployees, [role_id, id]);
    });
}

// Update employee's manager
function updateManager() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'id',
        choices: employees,
        message: "Which employee's manager has changed?",
      },
      {
        type: 'list',
        name: 'manager_id',
        choices: managers,
        message: "Choose the employee's new manager:",
      },
    ])
    .then((answers) => {
      const { id, manager_id } = answers;

      console.clear();
      console.log(`Updating employee records...\n`);

      updateRecords(query.updateManager, query.viewEmployees, [manager_id, id]);
    });
}

// Delete employee
function deleteEmployee() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'id',
        choices: employees,
        message: 'Which employee record would you like to delete?',
      },
      {
        type: 'confirm',
        name: 'confirm_delete',
        message: 'Are you sure you want to delete?',
      },
    ])
    .then((answers) => {
      if (!answers.confirm_delete) {
        ask();
        return;
      }

      console.clear();
      console.log('Deleting employee records...');

      updateRecords(query.deleteEmployee, query.viewEmployees, answers.id);
    });
}

// Delete role
function deleteRole() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'id',
        choices: roles,
        message: 'Which position would you like to delete?',
      },
      {
        type: 'confirm',
        name: 'confirm_delete',
        message: 'Are you sure you want to delete?',
      },
    ])
    .then((answers) => {
      if (!answers.confirm_delete) {
        ask();
        return;
      }

      console.clear();
      console.log('Deleting position records...');

      updateRecords(query.deleteRole, query.viewRoles, answers.id);
    });
}

// Delete department
function deleteDept() {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'id',
        choices: departments,
        loop: false,
        message: 'Which department would you like to delete?',
      },
      {
        type: 'confirm',
        name: 'confirm_delete',
        message: 'Are you sure you want to delete?',
      },
    ])
    .then((answers) => {
      if (!answers.confirm_delete) {
        ask();
        return;
      }

      console.clear();
      console.log('Deleting department records...\n');

      updateRecords(query.deleteDept, query.viewDepts, answers.id);
    });
}

// // // // // // // // // // // //
//  PROMISIFIED QUERY FUNCTIONS  //
// // // // // // // // // // // //

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
async function alterData(queryString, data) {
  return new Promise((resolve, reject) => {
    connection.query(queryString, data, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

// // // // // // // // // // // // // // //
// ASYNC/AWAIT QUERY INITIATING FUNCTIONS //
// // // // // // // // // // // // // // //

// View data from database
async function viewRecords(queryString) {
  console.log('Requesting data from database... \n');

  const results = await getData(queryString);
  console.log('Data retrieved.\n');
  console.table(results);

  ask();
}

// View data by parameter
async function viewSpecificRecords(queryString, data) {
  console.log('Requesting data from database... \n');

  const results = await alterData(queryString, data);
  console.log('Data retrieved.\n');
  console.table(results);

  ask();
}

// Add, update, or delete data to/from database
async function updateRecords(queryString, reQueryString, data) {
  const results = await alterData(queryString, data);

  console.log(`Operation complete - ${results.affectedRows} rows affected.\n`);

  refresh();
  viewRecords(reQueryString);
}

// // // // // // // // // // // // // //
//  INQUIRER PROMPT LIST CHOICE ARRAY  //
//  REFRESH FUNCTIONS                  //
// // // // // // // // // // // // // //

// Refresh employees array to use as list choices in Inquirer prompt
async function refreshEmployees(queryString) {
  employees.length = 0;
  managers.length = 0;

  const results = await getData(queryString);

  results.forEach((row) => {
    const { id, first_name, last_name } = row;
    employees.push({ value: id, name: `${first_name} ${last_name}` });

    if (id < 6) {
      managers.push({ value: id, name: `${first_name} ${last_name}` });
    } else if (id === 7) {
      managers.push({ value: null, name: 'None' });
    }
  });
}

// Refresh roles array to use as list choices in Inquirer prompt
async function refreshRoles(queryString) {
  roles.length = 0;

  const results = await getData(queryString);

  results.forEach((row) => {
    const { id, title } = row;
    roles.push({ value: id, name: title });
  });
}

// Refresh departments array to use as list choices in Inquirer prompt
async function refreshDepts(queryString) {
  departments.length = 0;

  const results = await getData(queryString);

  results.forEach((row) => {
    const { id, name } = row;
    departments.push({ value: id, name: name });
  });
}

// Consolidate refresh function calls
function refresh() {
  refreshRoles(query.refreshRoles);
  refreshEmployees(query.refreshEmployees);
  refreshDepts(query.refreshDepts);
}

// // // // // // // //
// APPLICATION EXIT  //
// // // // // // // //

// Exit application
function exit() {
  console.log('Goodbye!');
  connection.end();
}

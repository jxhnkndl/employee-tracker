// Import modules
const mysql = require('mysql');
const table = require('console.table');
const inquirer = require('inquirer');

// Import object organizing SQL queries
const query = require('./lib/query');

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
init();

// Group initailization functions
function init() {

  // Populate local list choice arrays
  refreshRoles(query.refreshRoles);
  refreshEmployees(query.refreshEmployees);
  refreshDepts(query.refreshDepts);

  // Start user prompts
  ask();
}

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
          'Delete Record',
          'Exit',
        ],
        message: 'What would you like to do?',
      },
    ])
    .then((answer) => {

      // Refresh all local list choice arrays
      refreshRoles(query.refreshRoles);
      refreshEmployees(query.refreshEmployees);
      refreshDepts(query.refreshDepts);

      const { input } = answer;

      switch (input) {
        case 'View All Employees':
          viewRecords(query.viewEmployees);
          break;
        case 'Add New Employee':
          addEmployee();
          break;
        case 'Update Employee Role':
          updateRole();
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
        case 'Delete Record':
          deleteRecord();
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
        choices: employees,
        message: "Employee's Manager:",
      },
    ])
    .then((answers) => {
      console.log(
        `Adding ${answers.first_name} ${answers.last_name} to database...\n`
      );
      updateRecords(query.addEmployee, query.viewEmployees, answers);
    });
}

// Add role to database
function addRole() {
  // Collect new role information from user
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
      console.log(`Adding new ${answers.title} role to database...\n`);

      updateRecords(query.addRole, query.viewRoles, answers);
    });
}

// Add department to database
function addDepartment() {
  inquirer
    .prompt([
      {
        type: 'input',
        name: 'name',
        message: "Department's Name:",
      },
    ])
    .then((answers) => {
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
      const { id, role_id } = answers;

      console.log(`Updating employee records...\n`);

      updateRecords(query.updateEmployee, query.viewEmployees, [role_id, id]);
    });
}

// Delete a record
function deleteRecord() {
  refreshRoles(query.refreshRoles);
  refreshEmployees(query.refreshEmployees);
  refreshDepts(query.refreshDepts);

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'table',
        choices: ['Employees', 'Roles', 'Departments'],
        message: 'Which type of record would you like to delete?',
      },
      {
        type: 'list',
        name: 'id',
        choices: employees,
        when: (answers) => answers.table === 'Employees',
        message: 'Which employee record would you like to delete?',
      },
      {
        type: 'list',
        name: 'id',
        choices: roles,
        when: (answers) => answers.table === 'Roles',
        message: 'Which position record would you like to delete?',
      },
      {
        type: 'list',
        name: 'id',
        choices: departments,
        when: (answers) => answers.table === 'Departments',
        message: 'Which department record would you like to delete?',
      },
      {
        type: 'confirm',
        name: 'confirm_delete',
        message: 'Are you sure you want to delete?'
      }
    ])
    .then((answers) => {
      if (!answers.confirm_delete) {
        ask();
        return;
      }

      if (answers.table === 'Employees') {
        console.log('Deleting employee records...');
        updateRecords(query.deleteEmployee, query.viewEmployees, answers.id);

      } else if (answers.table === 'Roles') {
        console.log('Deleting position records...');
        updateRecords(query.deleteRole, query.viewRoles, answers.id);

      } else if (answers.table === 'Departments') {
        console.log('Deleting department records...');
        updateRecords(query.deleteDept, query.viewDepts, answers.id)

      }
    });
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
async function alterData(queryString, data) {
  return new Promise((resolve, reject) => {
    connection.query(queryString, data, (err, res) => {
      if (err) reject(err);
      resolve(res);
    });
  });
}

// View data from database
async function viewRecords(queryString) {
  console.log('Requesting data from database... \n');

  const results = await getData(queryString);
  console.log('Data retrieved.\n');
  console.table(results);

  ask();
}

// Add data to database
async function updateRecords(queryString, reQueryString, data) {
  const results = await alterData(queryString, data);

  console.log(`Operation complete - ${results.affectedRows} rows affected.\n`);

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

// Exit application
function exit() {
  console.log('Goodbye!');
  connection.end();
}

// Import modules
const mysql = require('mysql');
const table = require('console.table');

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
          break;
        case 'Add New Employee':
          break;
        case 'Update Employee Role':
          break;
        case 'View All Roles':
          break;
        case 'Add New Role':
          break;
        case 'View All Departments':
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
// User actions for inquirer prompts
const actions = [
  'View All Employees',
  'Add New Employee',
  'Update Employee Role',
  'View All Roles',
  'Add New Role',
  'View All Departments',
  'Add New Department',
  'Exit',
];

// Roles array for inquirer prompts
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

// Editable managers array for inquirer prompts
const managers = [
  { value: null, name: 'No Manager' },
  { value: 1, name: 'J.K. Royston' },
  { value: 2, name: 'Ford Wesson' },
  { value: 3, name: 'Topher Talley' },
  { value: 4, name: 'Jimmy Royston' },
  { value: 5, name: 'Nicole Smith' },
];

// Editable deparments array for inquirer prompts
const departments = [
  { value: null, name: 'No Department' },
  { value: 1, name: 'Engineering' },
  { value: 2, name: 'Legal' },
  { value: 3, name: 'Finance' },
  { value: 4, name: 'Sales' },
  { value: 5, name: 'Marketing' },
];

// Primary inquirer prompts object
module.exports = {

  // Prompts: ask()
  ask: [
    {
      type: 'list',
      name: 'input',
      choices: actions,
      message: 'What would you like to do?',
    },
  ],

  // Prompts: addEmployee()
  addEmployee: [
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
  ],

  // Prompts: addRole()
  addRole: [
    {
      type: 'input',
      name: 'title',
      message: 'Role Title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Role Salary:'
    },
    {
      type: 'list',
      name: 'department_id',
      choices: departments,
      message: 'Department Assignment:'
    }
  ],

  // Prompts: addDepartment()
  addDept: [
    {
      type: 'input',
      name: 'name',
      message: 'Department Name:'
    }
  ],

  // Update employee's role
  updateRole: [
    {
      type: 'list'
    }
  ]
}

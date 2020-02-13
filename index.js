var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "seven11spell$",
  database: "employees_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  runSearch();
  retrieveEmployeeNames();
  retrieveEmployeesFullData();
  retrieveRoles();
  retrieveDepartments();
});

//create arrays

const employeesByName = [];
const employeesFull = [];
const roles = [];
const departments = [];

//retrieve data and push data into the different arrays
function retrieveEmployeeNames() {
  var query = "SELECT first_name, last_name FROM employees";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      employeesByName.push(res[i].first_name + " " + res[i].last_name);
    }
  })
};

function retrieveEmployeesFullData() {
  var query = "SELECT first_name AS 'First Name', last_name AS 'Last Name', title AS 'Role', department_name AS 'Department', managers.first_name, managers.last_name FROM employees ";
  query += "LEFT JOIN roles ON employees.role_id = roles.id ";
  query += "LEFT JOIN departments ON roles.department_id = departments.id ";
  query += "LEFT JOIN employees AS managers ON employees.manager_id = managers.id";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      employeesFull.push(res[i]);
    }
  })
}

function retrieveRoles() {
  var query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      roles.push(res[i]);
    }
  })
}

function retrieveDepartments() {
  var query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    if (err) throw err;

    for (var i = 0; i < res.length; i++) {
      departments.push(res[i]);
    }
  })
}

//create main function that runs the process
function runSearch() {
  inquirer.prompt(startQuestion)
    .then(function (answer) {
      switch (answer.startV) {

        case "View All Employees":
          viewAllEmployees();
          break;

        case "View All Employees By Department":

          break;

        case "View All Employees By Manager":

          break;

        case "Add Employee":
          addEmployee();
          break;

        case "Remove Employee":

          break;

        case "Update Employee Role":

          break;

        case "Update Employee's Manager":

          break;

        case "View All Roles":
          viewAllRoles();
          break;

        case "Add Role":

          break;

        case "Remove Role":

          break;

        case "View All Departments":
          viewAllDepts();
          break;

        case "Add Department":

          break;

        case "Remove Department":

          break;
      }
    })
}

//create sub functions to feed into the main function's switch/case
function addEmployee() {
  inquirer.prompt(addEmployeeQuestions)
  .then(function(answer){
    var query = "INSERT INTO employees SET ?"
    connection.query(query, {
      first_name: answer.addFirstV,
      last_name: answer.addLastV,
      role_id: answer.addRoleV,
      manager_id: answer.addManagerV,
    }, function (err){
      if (err) throw err;
      console.log("Employee added successfully.")
      runSearch();
    })

  })
}

function viewAllEmployees() {
  console.table(employeesFull);
  runSearch();
};

function viewAllRoles() {
  console.table(roles);
  runSearch();
};

function viewAllDepts() {
  console.table(departments);
  runSearch();
};



// List of Inquirer Questions
const startQuestion = [
  {
    type: "list",
    message: "What would you like to do?",
    name: "startV",
    choices: ["View All Employees", "View All Employees By Department", "View All Employees By Manager", "Add Employee", "Remove Employee", "Update Employee Role", "Update Employee's Manager", "View All Roles", "Add Role", "Remove Role", "View All Departments", "Add Department", "Remove Department"]
  },
]

//BONUS
// const viewEmployeesByDeptQuestion = [
//   {
//     type: "list",
//     message: "Select department you want to view all employees by:",
//     name: "viewbyDeptV",
//     choices: []
//   }
// ]

//BONUS
// const viewEmployeesByMgrQuestion = [
//   {
//     type: "list",
//     message: "Select manager you want to view all employees by:",
//     name: "viewbyMgrV",
//     choices: []
//   }
// ]

const addEmployeeQuestions = [
  {
    type: "input",
    message: "Enter Employee's first name:",
    name: "addFirstV"
  },
  {
    type: "input",
    message: "Enter Employee's last name:",
    name: "addLastV"
  },
  {
    type: "list",
    message: "Select Employee's role:",
    name: "addRoleV",
    choices: ["Salesperson", "Trader", "Business Manager", "Technology Lead", "Software Engineer", "Accountant", "Operations Specialist", "Lawyer", "Compliance Officer", "Internal Audit Officer"]
  },
  {
    type: "list",
    message: "Select Employee's manager:",
    name: "addManagerV",
    choices: employeesByName,
  }
]

//BONUS
// const removeEmployeeQuestion = [
//   {
//     type: "list",
//     message: "Select employee you want to remove:",
//     name: "removeEmployeeV",
//     choices: []
//   }
// ]

const updateEmployeeRoleQuestions = [
  {
    type: "list",
    message: "Select employee for which you want to update role:",
    name: "selectEmployeeRoleV",
    choices: []
  },
  {
    type: "list",
    message: "Select role to update:",
    name: "updateEmployeeRoleV",
    choices: []
  }
]

//BONUS
// const updateEmployeeMgrQuestions = [
//   {
//     type: "list",
//     message: "Select employee for which you want to update manager:",
//     name: "selectEmployeeMgrV",
//     choices: []
//   },
//   {
//     type: "list",
//     message: "Select Employee's manager:",
//     name: "updateEmployeeMgrV",
//     choices: []
//   }
// ]

const addRoleQuestion = [
  {
    type: "input",
    message: "Enter role to add:",
    name: "addRoleV"
  }
]

//BONUS
// const removeRoleQuestion = [
//   {
//     type: "list",
//     message: "Select role to remove:",
//     name: "removeRoleV",
//     choices: []
//   }
// ]

const addDeptQuestions = [
  {
    type: "input",
    message: "Enter department to add:",
    name: "addDeptV"
  }
]

//BONUS
// const removeDeptQuestion = [
//   {
//     type: "list",
//     message: "Select department to remove:",
//     name: "removeDeptV",
//     choices: []
//   }
// ]













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
  database: "test_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  // printText();

});

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
//     choices: generateChoicesFromDatabase(results),
//   }
// ]

//BONUS
// const viewEmployeesByMgrQuestion = [
//   {
//     type: "list",
//     message: "Select manager you want to view all employees by:",
//     name: "viewbyMgrV",
//     choices: generateChoicesFromDatabase(results),
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
    name: "addRoleManagerV",
    choices: generateChoicesFromDatabase(results),
  }
]

//BONUS
// const removeEmployeeQuestion = [
//   {
//     type: "list",
//     message: "Select employee you want to remove:",
//     name: "removeEmployeeV",
//     choices: generateChoicesFromDatabase(results),
//   }
// ]

const updateEmployeeRoleQuestions = [
  {
    type: "list",
    message: "Select employee for which you want to update role:",
    name: "selectEmployeeRoleV",
    choices: generateChoicesFromDatabase(results),
  },
  {
    type: "list",
    message: "Select role to update:",
    name: "updateEmployeeRoleV",
    choices: generateChoicesFromDatabase(results),
  }
]

//BONUS
// const updateEmployeeMgrQuestions = [
//   {
//     type: "list",
//     message: "Select employee for which you want to update manager:",
//     name: "selectEmployeeMgrV",
//     choices: generateChoicesFromDatabase(results),
//   },
//   {
//     type: "list",
//     message: "Select Employee's manager:",
//     name: "updateEmployeeMgrV",
//     choices: generateChoicesFromDatabase(results),
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
//     choices: generateChoicesFromDatabase(results),
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
//     choices: generateChoicesFromDatabase(results),
//   }
// ]

function generateChoicesFromDatabase(results){
  var choicesArray = [];

  for (var i = 0; i < results.length; i++){
    choicesArray.push(results[i].item)
  }
  return choicesArray;
};


function viewAllEmployees(){

};

function viewAllRoles(){

};

function viewAllDepts(){

};

















// function printText() {

//   connection.query("SELECT * FROM testTable", function (err, res) {
//     if (err) throw err;
//     for (var i = 0; i < res.length; i++) {
//       console.log(res[i].id + " | " + res[i].text);
//     }
//     console.log("-----------------------------------");
//   });
// }
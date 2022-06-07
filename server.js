const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
// const db = require(".");
require('dotenv').config();

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "employee_db"
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Logged In! Welcome to Busy Business");
  runBusyBusiness();
});

function runBusyBusiness() {
  inquirer
    .prompt({
      type: "list",
      choices: [
        "View all departments",
        "View all roles",
        "View employees",
        "Add a department",
        "Add a role",
        "Add an employee",
        "Update an employee's role",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "option"
    })
    .then(function (result) {
      console.log("You entered: " + result.option);

      switch (result.option) {
        case "View all departments":
          viewDepartments();
          break;
        case "View all roles":
          viewRoles();
          break;
        case "View employees":
          viewEmployees();
          break;
        case "Add a department":
          addDepartment();
          break;
        case "Add a role":
          addRole();
          break;
        case "Add an employee":
          addEmployee();
          break;
        case "Update an employee's role":
          updateEmployee();
          break;
        default:
          quit();
      }
    });
}

function viewDepartments() {
  let query = "SELECT * FROM departments";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runBusyBusiness();
  });
}

function viewRoles() {
  let query = "SELECT * FROM roles";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runBusyBusiness();
  });
}

function viewEmployees() {
  let query = "SELECT * FROM employees";
  connection.query(query, function (err, res) {
    if (err) throw err;
    console.table(res);
    runBusyBusiness();
  });
}

function addDepartment() {

  inquirer.prompt({

    type: "input",
    message: "What is the name of the department?",
    name: "deptName"

  }).then(function (answer) {

    connection.query("INSERT INTO departments (name) VALUES (?)", [answer.deptName], function (err, res) {
      if (err) throw err;
      console.table(res)
      runBusyBusiness()
    })
  })
};

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
      }
    ])
    .then(function (answer) {

      connection.query("INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function (err, res) {
        if (err) throw err;
        console.table(res);
        runBusyBusiness();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "newFirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "newLastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "newRoleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "newManagerID"
      }
    ])
    .then(function (answer) {
      connection.query("INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.newFirstName, answer.newLastName, answer.newRoleID, answer.newManagerID], function (err, res) {
        if (err) throw err;
        console.table(res);
        runBusyBusiness();
      });
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the first name of the employee you would like to update?",
        name: "updateEmpFirstName"
      },
      {
        type: "input",
        message: "What is the last name of the employee you would like to update?",
        name: "updateEmpLastName"
      },

      {
        type: "input",
        message: "What is the id of the employee's new role?",
        name: "updateRole"
      }
    ])
    .then(function (answer) {

      connection.query('UPDATE employees SET role_id=? WHERE first_name= ? AND last_name= ?', [answer.updateRole, answer.updateEmpFirstName, answer.updateEmpLastName], function (err, res) {
        if (err) throw err;
        console.table(res);
        runBusyBusiness();
      });
    });
}



function quit() {
  connection.end();
  process.exit();
}